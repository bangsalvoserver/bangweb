import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import Button from "../../Components/Button";
import getLabel from "../../Locale/GetLabel";
import { useMapRef, useRefLazy } from "../../Utils/LazyRef";
import { FRAMERATE, useInterval, useTimeout } from "../../Utils/UseInterval";
import { LobbyContext, getUser } from "../Lobby/Lobby";
import AnimationView from "./Animations/AnimationView";
import CardChoiceView from "./CardChoiceView";
import GameLogView from "./GameLogView";
import GameStringComponent, { LocalizedCardName } from "./GameStringComponent";
import { PocketType } from "./Model/CardEnums";
import { CardTrackerImpl, PocketPosition, PocketPositionMap } from "./Model/CardTracker";
import { Card, Player, getCard, getPlayer, newGameTable } from "./Model/GameTable";
import gameTableReducer from "./Model/GameTableReducer";
import { GameString, PlayerId } from "./Model/GameUpdate";
import { GameChannel, GameUpdateHandler } from "./Model/GameUpdateHandler";
import { TargetSelector, getAutoSelectCard, isCardCurrent, isResponse, newTargetSelector, selectorCanConfirm, selectorCanPlayCard, selectorCanUndo } from "./Model/TargetSelector";
import { handleClickCard, handleClickPlayer, handleSendGameAction } from "./Model/TargetSelectorManager";
import targetSelectorReducer from "./Model/TargetSelectorReducer";
import PlayerView from "./PlayerView";
import PocketView from "./Pockets/PocketView";
import StackPocket from "./Pockets/StackPocket";
import StationsView from "./Pockets/StationsView";
import TrainView from "./Pockets/TrainView";
import PromptView from "./PromptView";
import "./Style/GameScene.css";
import "./Style/PlayerGridDesktop.css";
import "./Style/PlayerGridMobile.css";

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
  const [gameError, setGameError] = useState<GameString>();

  const handler = useRefLazy(() => new GameUpdateHandler(channel, table, tableDispatch, selectorDispatch, setGameLogs, setGameError));
  useInterval((timeElapsed: number) => handler.current.tick(timeElapsed), 1000 / FRAMERATE, []);

  useEffect(() => handler.current.setTable(table), [table]);

  useTimeout(() => {
    if (gameError) {
      setGameError(undefined);
    }
  }, 5000, [gameError])

  const pocketPositions = useMapRef<PocketType, PocketPosition>();
  const playerPositions = useMapRef<PlayerId, PocketPositionMap>();
  const cubesRef = useRef<HTMLDivElement>(null);

  const isGameOver = table.status.flags.includes('game_over');

  const setPos = (pocket: PocketType) => {
    return (value: PocketPosition | null) => {
      pocketPositions.set(pocket, value);
    };
  };
  
  const getTracker = () => new CardTrackerImpl(table.status.scenario_holders, pocketPositions, playerPositions, cubesRef.current);

  const clickIsAllowed = !isGameOver
      && table.self_player !== undefined
      && selector.selection.mode != 'finish'
      && selector.prompt.type == 'none';

  const onClickCard = clickIsAllowed ? (card: Card) => handleClickCard(table, selector, selectorDispatch, card) : undefined;
  const onClickPlayer = clickIsAllowed ? (player: Player) => handleClickPlayer(table, selector, selectorDispatch, player) : undefined;
  
  const handleConfirm = (clickIsAllowed && selectorCanConfirm(selector)) ? () => selectorDispatch({ confirmPlay: {} }) : undefined;
  const handleUndo = (clickIsAllowed && selectorCanUndo(selector)) ? () => selectorDispatch({ undoSelection: { table } }) : undefined;
  
  useEffect(() => handleSendGameAction(channel, selector), [selector]);

  const shopPockets = (table.pockets.shop_deck.length != 0 || table.pockets.shop_selection.length != 0) && (
    <div className="inline-block relative">
      <div className="absolute">
        <StackPocket ref={setPos('shop_discard')} cards={table.pockets.shop_discard} />
      </div>
      <StackPocket showCount ref={setPos('shop_deck')} cards={table.pockets.shop_deck} />
      <PocketView ref={setPos('shop_selection')} cards={table.pockets.shop_selection.slice(0).reverse()} onClickCard={onClickCard} />
    </div>
  );

  const trainPockets = (table.pockets.stations.length !== 0 || table.pockets.train_deck.length !== 0) && (
    <div className="train-row">
      <div className="train-row-inner">
        <StackPocket showCount ref={setPos('train_deck')} cards={table.pockets.train_deck} />
        <div className="train-stations-container">
          <StationsView cards={table.pockets.stations} onClickCard={onClickCard} />
          <TrainView ref={setPos('train')} onClickCard={onClickCard} />
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
    <StackPocket slice={10} ref={setPos('discard_pile')} cards={table.pockets.discard_pile} onClickCard={onClickCard} />
    <StackPocket showCount ref={setPos('main_deck')} cards={table.pockets.main_deck} onClickCard={onClickCard} />
  </>;

  const scenarioCards = <>
    { table.pockets.scenario_card.length != 0 &&
        <StackPocket ref={setPos('scenario_card')} cards={table.pockets.scenario_card} onClickCard={onClickCard} /> }
    { table.pockets.wws_scenario_card.length != 0 && 
        <StackPocket ref={setPos('wws_scenario_card')} cards={table.pockets.wws_scenario_card} onClickCard={onClickCard} /> }
  </>;

  const selectionPocket = table.pockets.selection.length != 0 && (
    <div className="selection-view whitespace-nowrap">
      <PocketView ref={setPos('selection')} cards={table.pockets.selection} onClickCard={onClickCard} />
    </div>
  );

  const playerViews = table.alive_players.map((player_id, index) => {
    const player = getPlayer(table, player_id);
    const user = getUser(users, player.userid);

    return <div key={player_id} className="player-grid-item" player-index={index}>
      <PlayerView ref={value => playerPositions.set(player_id, value)} user={user} player={player}
        onClickPlayer={onClickPlayer}
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
        <Button key={id} color={color} onClick={onClickCard ? () => onClickCard(card) : undefined}>
          <LocalizedCardName name={card.cardData.name} />
        </Button>
      );
    } else {
      return [];
    }
  })

  const confirmButton = handleConfirm && <Button color='blue' onClick={handleConfirm}>{getLabel('ui', 'BUTTON_OK')}</Button>;
  const undoButton = handleUndo && <Button color='red' onClick={handleUndo}>{getLabel('ui', 'BUTTON_UNDO')}</Button>;

  const statusBar = (() => {
    if (isGameOver) {
      return <div className="status-bar">
        { getLabel('ui', 'STATUS_GAME_OVER') }
        { myUserId == lobbyOwner && <Button color='green' onClick={handleReturnLobby}>{getLabel('ui', 'BUTTON_RETURN_LOBBY')}</Button> }
      </div>;
    } else if (gameError) {
      return <div className="status-bar font-bold">
        <GameStringComponent message={gameError} />
        <Button color='blue' onClick={() => setGameError(undefined)}>{getLabel('ui', 'BUTTON_OK')}</Button>
      </div>
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
            <div>
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