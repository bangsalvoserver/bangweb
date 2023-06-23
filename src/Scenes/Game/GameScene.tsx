import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import Button from "../../Components/Button";
import getLabel from "../../Locale/GetLabel";
import { useMapRef, useRefLazy } from "../../Utils/LazyRef";
import { useInterval } from "../../Utils/UseInterval";
import { LobbyContext, getUser } from "../Lobby/Lobby";
import AnimationView from "./Animations/AnimationView";
import { CardTrackerImpl, PocketPositionMap } from "./Animations/CardTracker";
import CardChoiceView from "./CardChoiceView";
import GameLogView from "./GameLogView";
import GameStringComponent, { LocalizedCardName } from "./GameStringComponent";
import { PocketType } from "./Model/CardEnums";
import { Card, Player, getCard, getPlayer, newGameTable } from "./Model/GameTable";
import gameTableReducer from "./Model/GameTableReducer";
import { GameString, PlayerId } from "./Model/GameUpdate";
import { GameChannel, GameUpdateHandler } from "./Model/GameUpdateHandler";
import { TargetSelector, isCardCurrent, isResponse, newTargetSelector, selectorCanConfirm, selectorCanPlayCard, selectorCanUndo } from "./Model/TargetSelector";
import { handleAutoSelect, handleClickCard, handleClickPlayer, handleSendGameAction } from "./Model/TargetSelectorManager";
import targetSelectorReducer from "./Model/TargetSelectorReducer";
import PlayerView from "./PlayerView";
import CountPocket from "./Pockets/CountPocket";
import PocketView, { PocketPosition } from "./Pockets/PocketView";
import TrainView from "./Pockets/TrainView";
import PromptView from "./PromptView";
import "./Style/GameScene.css";
import "./Style/PlayerGridDesktop.css";
import "./Style/PlayerGridMobile.css";

const FRAMERATE = 60;

export interface GameProps {
  channel: GameChannel;
  handleReturnLobby: () => void;
}

export const GameTableContext = createContext(newGameTable());
export const TargetSelectorContext = createContext<TargetSelector>(newTargetSelector({}));

export default function GameScene({ channel, handleReturnLobby }: GameProps) {
  const { myUserId, users, lobbyOwner } = useContext(LobbyContext);
  
  const [table, tableDispatch] = useReducer(gameTableReducer, myUserId, newGameTable);
  const [selector, selectorDispatch] = useReducer(targetSelectorReducer, {}, newTargetSelector);
  const [gameLogs, setGameLogs] = useState<GameString[]>([]);

  const handler = useRefLazy(() => new GameUpdateHandler(channel, tableDispatch, selectorDispatch, setGameLogs));
  useInterval((timeElapsed: number) => handler.current.tick(timeElapsed), 1000 / FRAMERATE, []);

  const pocketPositions = useMapRef<PocketType, PocketPosition>();
  const playerPositions = useMapRef<PlayerId, PocketPositionMap>();
  const cubesRef = useRef<HTMLDivElement>(null);

  const isGameOver = table.status.flags.includes('game_over');
  
  const getTracker = () => new CardTrackerImpl(table.status.scenario_holders, pocketPositions, playerPositions, cubesRef.current);

  const isClickAllowed = () => {
    return !isGameOver
      && table.self_player !== undefined
      && !handler.current.pendingUpdates()
      && !('playpickundo' in selector.prompt)
      && selector.selection.mode != 'finish';
  };

  const onClickCard = (card: Card) => { if (isClickAllowed()) handleClickCard(table, selector, selectorDispatch, card) };
  const onClickPlayer = (player: Player) => { if (isClickAllowed()) handleClickPlayer(table, selector, selectorDispatch, player) };
  const handleConfirm = () => { if (isClickAllowed()) selectorDispatch({ confirmPlay: {} }) };
  const handleUndo = () => { if (isClickAllowed()) selectorDispatch({ undoSelection: {} }) };

  useEffect(() => handleAutoSelect(table, selector, selectorDispatch), [selector]);
  useEffect(() => handleSendGameAction(channel, selector), [selector]);

  const shopPockets = table.pockets.shop_deck.length != 0 || table.pockets.shop_discard.length != 0 ? <>
    <div className="inline-block relative">
      <div className="absolute">
        <CountPocket noCount ref={pocketPositions.set('shop_discard')} cards={table.pockets.shop_discard} />
      </div>
      <CountPocket ref={pocketPositions.set('shop_deck')} cards={table.pockets.shop_deck} />
    </div>
    <PocketView ref={pocketPositions.set('shop_selection')} cards={table.pockets.shop_selection.slice(0).reverse()} onClickCard={onClickCard} />
  </> : null;

  const trainPockets = table.pockets.stations.length != 0 && (
    <div className="train-row m-auto">
      <div className="train-row-inner">
        <CountPocket ref={pocketPositions.set('train_deck')} cards={table.pockets.train_deck} />
        <div className="train-stations-container">
          <PocketView ref={pocketPositions.set('stations')} cards={table.pockets.stations} onClickCard={onClickCard} />
          <TrainView ref={pocketPositions.set('train')} onClickCard={onClickCard} />
        </div>
      </div>
    </div>
  );

  const tableCubes = <div className='table-cubes' ref={cubesRef}>
    { table.status.num_cubes > 0 && <>
      <img src='/media/sprite_cube.png' />
      <div>x{table.status.num_cubes}</div>
    </> }
  </div>;

  const mainDeck = <>
    <CountPocket slice={10} noCount ref={pocketPositions.set('discard_pile')} cards={table.pockets.discard_pile} onClickCard={onClickCard} />
    <CountPocket ref={pocketPositions.set('main_deck')} cards={table.pockets.main_deck} onClickCard={onClickCard} />
  </>;

  const scenarioCards = <>
    { table.pockets.scenario_card.length != 0 &&
        <CountPocket noCount ref={pocketPositions.set('scenario_card')} cards={table.pockets.scenario_card} onClickCard={onClickCard} /> }
    { table.pockets.wws_scenario_card.length != 0 && 
        <CountPocket noCount ref={pocketPositions.set('wws_scenario_card')} cards={table.pockets.wws_scenario_card} onClickCard={onClickCard} /> }
  </>;

  const selectionPocket = table.pockets.selection.length != 0 && (
    <div className="selection-view whitespace-nowrap">
      <PocketView ref={pocketPositions.set('selection')} cards={table.pockets.selection} onClickCard={onClickCard} />
    </div>
  );

  const playerViews = table.alive_players.map((player_id, index) => {
    const player = getPlayer(table, player_id);
    const user = getUser(users, player.userid);

    return <div key={player_id} className="player-grid-item" player-index={index}>
      <PlayerView ref={playerPositions.set(player_id)} user={user} player={player}
        onClickPlayer={() => onClickPlayer(player)}
        onClickCard={onClickCard}
      />
    </div>;
  });

  const statusText = isResponse(selector) && <GameStringComponent message={selector.request.status_text} />;

  const buttonRow = table.pockets.button_row.flatMap(id => {
    const card = getCard(table, id);
    const isCurrent = isCardCurrent(selector, card);
    const isPlayable = selectorCanPlayCard(selector, card);
    if (isCurrent || isPlayable) {
      const color = isResponse(selector) ? 'red' : isCurrent ? 'blue' : 'green';
      return (
        <Button key={id} color={color} onClick={() => onClickCard(card)}>
          <LocalizedCardName name={card.cardData.name} />
        </Button>
      );
    } else {
      return [];
    }
  })

  const confirmButton = selectorCanConfirm(selector) && <Button color='blue' onClick={handleConfirm}>{getLabel('ui', 'BUTTON_OK')}</Button>;
  const undoButton = selectorCanUndo(selector) && <Button color='red' onClick={handleUndo}>{getLabel('ui', 'BUTTON_UNDO')}</Button>;

  const statusBar = (() => {
    if (isGameOver) {
      return <div className="status-bar">
        { getLabel('ui', 'STATUS_GAME_OVER') }
        { myUserId == lobbyOwner && <Button color='green' onClick={handleReturnLobby}>{getLabel('ui', 'BUTTON_RETURN_LOBBY')}</Button> }
      </div>;
    } else if (statusText || buttonRow.length !== 0 || confirmButton || undoButton ) {
      return <div className="status-bar">
        { statusText}{ buttonRow }{ confirmButton }{ undoButton }
      </div>
    } else {
      return null;
    }
  })();

  return (
    <GameTableContext.Provider value={table}>
      <TargetSelectorContext.Provider value={selector}>
        <div className="game-scene">
          <div className="main-deck-row">
            <div className="m-auto">
              { shopPockets } { tableCubes } { mainDeck } { scenarioCards }
            </div>
            { trainPockets }
          </div>
          <div className="player-grid" num-players={table.alive_players.length}>
            { playerViews }
          </div>
          { statusBar }
          { selectionPocket }
          <PromptView prompt={selector.prompt} selectorDispatch={selectorDispatch} />
          <CardChoiceView getTracker={getTracker} onClickCard={onClickCard}/>
          <AnimationView getTracker={getTracker} />
          <GameLogView logs={gameLogs} />
        </div>
      </TargetSelectorContext.Provider>
    </GameTableContext.Provider>
  );
}