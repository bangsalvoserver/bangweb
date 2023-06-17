import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import Button from "../../Components/Button";
import getLabel from "../../Locale/GetLabel";
import { setMapRef, useRefLazy } from "../../Utils/LazyRef";
import { useInterval } from "../../Utils/UseInterval";
import { LobbyContext } from "../Lobby/Lobby";
import AnimationView from "./Animations/AnimationView";
import { CardTrackerImpl } from "./Animations/CardTracker";
import CardButtonView from "./CardButtonView";
import CardChoiceView from "./CardChoiceView";
import CountPocket from "./CountPocket";
import GameStringComponent from "./GameStringComponent";
import { PocketType } from "./Model/CardEnums";
import { Card, Player, getCard, getPlayer, newGameTable } from "./Model/GameTable";
import gameTableReducer from "./Model/GameTableReducer";
import { GameString, PlayerId } from "./Model/GameUpdate";
import { GameChannel, GameUpdateHandler } from "./Model/GameUpdateHandler";
import { TargetMode, TargetSelector, isResponse, newTargetSelector, selectorCanConfirm, selectorCanUndo } from "./Model/TargetSelector";
import { handleAutoSelect, handleClickCard, handleClickPlayer, handleSendGameAction } from "./Model/TargetSelectorManager";
import targetSelectorReducer from "./Model/TargetSelectorReducer";
import PlayerView from "./PlayerView";
import PocketView, { PocketPosition, PocketPositionMap } from "./PocketView";
import PromptView from "./PromptView";
import "./Style/GameScene.css";
import "./Style/PlayerGridDesktop.css";
import "./Style/PlayerGridMobile.css";
import TrainView from "./TrainView";

const FRAMERATE = 60;

export interface GameProps {
  channel: GameChannel;
}

export const GameTableContext = createContext(newGameTable());
export const TargetSelectorContext = createContext<TargetSelector>(newTargetSelector({}));

export default function GameScene({ channel }: GameProps) {
  const { users, myUserId, lobbyOwner } = useContext(LobbyContext);
  
  const [table, tableDispatch] = useReducer(gameTableReducer, myUserId, newGameTable);
  const [selector, selectorDispatch] = useReducer(targetSelectorReducer, {}, newTargetSelector);
  const [gameLogs, setGameLogs] = useState<GameString[]>([]);

  const handler = useRefLazy(() => new GameUpdateHandler(channel, tableDispatch, selectorDispatch, setGameLogs));
  useInterval((timeElapsed: number) => handler.current.tick(timeElapsed), 1000 / FRAMERATE, []);

  const pocketPositions = useRefLazy(() => new Map<PocketType, PocketPosition>());
  const playerPositions = useRefLazy(() => new Map<PlayerId, PocketPositionMap>());
  const cubesRef = useRef<HTMLDivElement>(null);

  const isGameOver = table.status.flags.includes('game_over');
  
  const getTracker = () => new CardTrackerImpl(table.status.scenario_holders, pocketPositions.current, playerPositions.current, cubesRef.current);

  const isClickAllowed = () => {
    return !isGameOver
      && table.self_player !== undefined
      && !handler.current.pendingUpdates()
      && !('playpickundo' in selector.prompt)
      && selector.mode != TargetMode.finish;
  };

  const onClickCard = (card: Card) => { if (isClickAllowed()) handleClickCard(table, selector, selectorDispatch, card) };
  const onClickPlayer = (player: Player) => { if (isClickAllowed()) handleClickPlayer(table, selector, selectorDispatch, player) };
  const handleConfirm = () => { if (isClickAllowed()) selectorDispatch({ confirmPlay: {} }) };
  const handleUndo = () => { if (isClickAllowed()) selectorDispatch({ undoSelection: {} }) };

  useEffect(() => handleAutoSelect(table, selector, selectorDispatch), [selector]);
  useEffect(() => handleSendGameAction(channel, selector), [selector]);

  const shopPockets = table.pockets.shop_deck.length != 0 || table.pockets.shop_discard.length != 0 ? <>
    <div className="stack-pockets">
      <div className="stack-pockets-inner single-card-pocket">
        <PocketView ref={setMapRef(pocketPositions, 'shop_discard')} cards={table.pockets.shop_discard.slice(-1)} />
      </div>
      <CountPocket ref={setMapRef(pocketPositions, 'shop_deck')} cards={table.pockets.shop_deck} />
    </div>
    <PocketView ref={setMapRef(pocketPositions, 'shop_selection')} cards={table.pockets.shop_selection.slice(0).reverse()} onClickCard={onClickCard} />
  </> : null;

  const trainPockets = table.pockets.stations.length != 0 ?
    <div className="train-row m-auto">
      <div className="train-row-inner">
        <CountPocket ref={setMapRef(pocketPositions, 'train_deck')} cards={table.pockets.train_deck} />
        <div className="train-stations-container">
          <PocketView ref={setMapRef(pocketPositions, 'stations')} cards={table.pockets.stations} onClickCard={onClickCard} />
          <TrainView ref={setMapRef(pocketPositions, 'train')} onClickCard={onClickCard} />
        </div>
      </div>
    </div> : null;

  const tableCubes = <div className='inline-block' ref={cubesRef}>
    {table.status.num_cubes > 0 ?
      <div className='table-cubes'><img src='/media/sprite_cube.png' />x{table.status.num_cubes}</div> : null}
  </div>;

  const mainDeck = <>
    <div className="single-card-pocket">
      <PocketView ref={setMapRef(pocketPositions, 'discard_pile')} cards={table.pockets.discard_pile.slice(-2)} onClickCard={onClickCard} />
    </div>
    <CountPocket ref={setMapRef(pocketPositions, 'main_deck')} cards={table.pockets.main_deck} onClickCard={onClickCard} />
  </>;

  const scenarioCards = <>
    { table.pockets.scenario_card.length != 0 ?
      <div className="single-card-pocket">
        <PocketView ref={setMapRef(pocketPositions, 'scenario_card')} cards={table.pockets.scenario_card.slice(-2)} onClickCard={onClickCard} />
      </div> : null }
    { table.pockets.wws_scenario_card.length != 0 ?
      <div className="single-card-pocket">
        <PocketView ref={setMapRef(pocketPositions, 'wws_scenario_card')} cards={table.pockets.wws_scenario_card.slice(-2)} onClickCard={onClickCard} />
      </div> : null }
  </>;

  const selectionPocket = <PocketView ref={setMapRef(pocketPositions, 'selection')} cards={table.pockets.selection} onClickCard={onClickCard} />;

  const statusText = isResponse(selector) ? <GameStringComponent message={selector.request.status_text} /> : null;
  
  const gameOverStatus = () => {
    if (myUserId == lobbyOwner) {
      return (
        <Button color='blue' onClick={channel.handleReturnLobby}>{getLabel('ui', 'RETURN_LOBBY')}</Button>
      );
    } {
      return <>{getLabel('ui', 'GAME_OVER_STATUS')}</>;
    }
  };

  const playerViews = table.alive_players.map((player_id, index) => {
    const player = getPlayer(table, player_id);
    const user = users.find(user => user.id === player.userid);

    return <div key={player_id} className="player-grid-item" player-index={index}>
      <PlayerView ref={setMapRef(playerPositions, player_id)} user={user} player={player}
        onClickPlayer={() => onClickPlayer(player)}
        onClickCard={onClickCard}
      />
    </div>;
  });

  const buttonRow = table.pockets.button_row.map(id => {
    const card = getCard(table, id);
    return <CardButtonView key={id} card={card} onClickCard={() => onClickCard(card)} />;
  });

  const confirmButton = selectorCanConfirm(selector) && <Button color='blue' onClick={handleConfirm}>{getLabel('ui', 'BUTTON_OK')}</Button>;
  const undoButton = selectorCanUndo(selector) && <Button color='red' onClick={handleUndo}>{getLabel('ui', 'BUTTON_UNDO')}</Button>;

  return (
    <GameTableContext.Provider value={table}>
      <TargetSelectorContext.Provider value={selector}>
        <div className="game-scene-top">
          <div className="game-scene">
            <div className="main-deck-row">
              <div className="m-auto">
                { shopPockets } { tableCubes } { mainDeck } { scenarioCards } { selectionPocket }
              </div>
              { trainPockets }
            </div>
            <div className="status-text">
              { isGameOver ? gameOverStatus() : <>{ statusText }{ buttonRow }{ confirmButton }{ undoButton }</> }
            </div>
            <div className="player-grid" num-players={table.alive_players.length}>
              { playerViews }
            </div>
          </div>
          {/* <GameLogView logs={gameLogs} /> */}
          <PromptView prompt={selector.prompt} selectorDispatch={selectorDispatch} />
          <CardChoiceView getTracker={getTracker} onClickCard={onClickCard}/>;
          <AnimationView getTracker={getTracker} />
        </div>
      </TargetSelectorContext.Provider>
    </GameTableContext.Provider>
  );
}