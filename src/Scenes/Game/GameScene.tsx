import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import { useMapRef, useReducerRef, useRefLazy } from "../../Utils/LazyRef";
import { FRAMERATE, useInterval, useTimeout } from "../../Utils/UseInterval";
import { LobbyContext, getUser } from "../Lobby/Lobby";
import AnimationView from "./Animations/AnimationView";
import CardChoiceView from "./CardChoiceView";
import GameLogView from "./GameLogView";
import { PocketType, TablePocketType } from "./Model/CardEnums";
import { CardTrackerImpl, PocketPosition, PocketPositionMap } from "./Model/CardTracker";
import { Card, Player, getPlayer, newGameTable } from "./Model/GameTable";
import gameTableReducer from "./Model/GameTableReducer";
import { GameString, PlayerId } from "./Model/GameUpdate";
import { GameChannel, GameUpdateHandler } from "./Model/GameUpdateHandler";
import { TargetSelector, newTargetSelector, selectorCanConfirm, selectorCanUndo } from "./Model/TargetSelector";
import { handleClickCard, handleClickPlayer, handleSendGameAction } from "./Model/TargetSelectorManager";
import targetSelectorReducer from "./Model/TargetSelectorReducer";
import PlayerView from "./PlayerView";
import PocketView from "./Pockets/PocketView";
import StackPocket from "./Pockets/StackPocket";
import StationsView from "./Pockets/StationsView";
import TrainView from "./Pockets/TrainView";
import PromptView from "./PromptView";
import StatusBar from "./StatusBar";
import "./Style/GameScene.css";
import "./Style/PlayerGridDesktop.css";
import "./Style/PlayerGridMobile.css";
import ScenarioPocketView from "./Pockets/ScenarioPocketView";

export interface GameProps {
  channel: GameChannel;
  handleReturnLobby: () => void;
}

const EMPTY_TABLE = newGameTable();
export const GameTableContext = createContext(EMPTY_TABLE);
export const TargetSelectorContext = createContext<TargetSelector>(newTargetSelector({ current: EMPTY_TABLE }));

export default function GameScene({ channel, handleReturnLobby }: GameProps) {
  const { myUserId, users } = useContext(LobbyContext);
  
  const [table, tableDispatch, tableRef] = useReducerRef(gameTableReducer, myUserId, newGameTable);
  const [selector, selectorDispatch] = useReducer(targetSelectorReducer, tableRef, newTargetSelector);
  const [gameLogs, setGameLogs] = useState<GameString[]>([]);
  const [gameError, setGameError] = useState<GameString>();

  const handler = useRefLazy(() => new GameUpdateHandler(channel, tableDispatch, selectorDispatch, setGameLogs, setGameError));
  useInterval((timeElapsed: number) => handler.current.tick(timeElapsed), 1000 / FRAMERATE, []);

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
  
  const getTracker = () => new CardTrackerImpl(pocketPositions, playerPositions, cubesRef.current);

  const clickIsAllowed = !isGameOver
      && table.self_player !== undefined
      && selector.selection.mode != 'finish'
      && selector.prompt.type == 'none';

  const onClickCard = clickIsAllowed ? (card: Card) => handleClickCard(selector, selectorDispatch, card) : undefined;
  const onClickPlayer = clickIsAllowed ? (player: Player) => handleClickPlayer(selector, selectorDispatch, player) : undefined;
  
  const handleConfirm = (clickIsAllowed && selectorCanConfirm(selector)) ? () => selectorDispatch({ confirmPlay: {} }) : undefined;
  const handleUndo = (clickIsAllowed && selectorCanUndo(selector)) ? () => selectorDispatch({ undoSelection: {} }) : undefined;
  
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

  const getScenarioPocketView = (deck: TablePocketType, active: TablePocketType) => {
    return <ScenarioPocketView ref={ref => {
        pocketPositions.set(deck, ref?.deckRef.current ?? null);
        pocketPositions.set(active, ref?.activeRef.current ?? null);
      }}
      deckCards={table.pockets[deck]}
      activeCards={table.pockets[active]}
      onClickCard={onClickCard}
    />
  };

  const scenarioCards = getScenarioPocketView('scenario_deck', 'scenario_card');
  const wwsScenarioCards = getScenarioPocketView('wws_scenario_deck', 'wws_scenario_card');

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

  return (
    <GameTableContext.Provider value={table}>
      <TargetSelectorContext.Provider value={selector}>
        <div className="game-scene">
          <div className="main-deck-row">
            <div>
              { shopPockets }{ tableCubes }{ mainDeck }{ scenarioCards }{ wwsScenarioCards }
            </div>
            { trainPockets }
          </div>
          <div className="player-grid" num-players={table.alive_players.length}>
            { playerViews }
          </div>
          { selectionPocket }
          <PromptView prompt={selector.prompt} selectorDispatch={selectorDispatch} />
          <CardChoiceView getTracker={getTracker} onClickCard={onClickCard}/>
          <AnimationView getTracker={getTracker} />
          <GameLogView logs={gameLogs} />
          <StatusBar
            gameError={gameError}
            handleClearGameError={() => setGameError(undefined)}
            handleReturnLobby={handleReturnLobby}
            handleConfirm={handleConfirm}
            handleUndo={handleUndo}
            onClickCard={onClickCard}
          />
        </div>
      </TargetSelectorContext.Provider>
    </GameTableContext.Provider>
  );
}