import { RefObject, createContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useEvent from "react-use-event-hook";
import { LobbyState } from "../../Model/SceneState";
import { UserId } from "../../Model/ServerMessage";
import { BangConnection, GameChannel } from "../../Model/UseBangConnection";
import { isMobileDevice } from "../../Utils/MobileCheck";
import { useMapRef } from "../../Utils/UseMapRef";
import { LobbyContext, getUser } from "../Lobby/Lobby";
import AnimationView from "./Animations/AnimationView";
import CardOverlayView from "./CardOverlayView";
import { SPRITE_CUBE } from "./CardView";
import GameLogView from "./GameLogView";
import GameUsersView from "./GameUsersView";
import { PocketType } from "./Model/CardEnums";
import { PlayerRef, PocketRef, useCardTracker } from "./Model/CardTracker";
import { getPlayer } from "./Model/GameTable";
import { PlayerId } from "./Model/GameUpdate";
import { OverlayState, SetCardOverlayContext } from "./Model/UseCardOverlay";
import useGameState, { newGameState } from "./Model/UseGameState";
import { SelectorConfirmContext, useSelectorConfirm, useSendGameAction } from "./Model/UseSelectorConfirm";
import PlayerSlotView from "./PlayerSlotView";
import PlayerView from "./PlayerView";
import CardChoiceView from "./Pockets/CardChoiceView";
import PocketView from "./Pockets/PocketView";
import StackPocket from "./Pockets/StackPocket";
import StationsView from "./Pockets/StationsView";
import TrainView from "./Pockets/TrainView";
import PromptView from "./PromptView";
import StatusBar from "./StatusBar";
import "./Style/GameScene.css";
import "./Style/PlayerGridDesktop.css";
import "./Style/PlayerGridMobile.css";

export interface GameProps {
  connection: BangConnection;
  lobbyState: LobbyState;
  gameChannel: GameChannel;
  overlayRef: RefObject<HTMLDivElement>;
  muteSounds?: boolean;
}

const EMPTY_GAME_STATE = newGameState(0);
export const GameStateContext = createContext(EMPTY_GAME_STATE);

export default function GameScene({ connection, lobbyState, gameChannel, overlayRef, muteSounds }: GameProps) {
  const { state, selectorDispatch, gameLogs, gameError, clearGameError } = useGameState(gameChannel, lobbyState.myUserId, muteSounds ?? false);
  const { table, selector } = state;

  const pocketRefs = useMapRef<PocketType, PocketRef>();
  const playerRefs = useMapRef<PlayerId, PlayerRef>();
  const cubesRef = useRef<HTMLDivElement>(null);

  const handleReturnLobby = useEvent(() => connection.sendMessage({ lobby_return: {} }));
  const setRef = (key: PocketType) => (value: PocketRef | null) => pocketRefs.set(key, value);

  const selectorConfirm = useSelectorConfirm(table, selector, selectorDispatch);
  useSendGameAction(selector, connection);

  const handleRejoin = (user_id: UserId) => () => connection.sendMessage({ game_rejoin: { user_id }});

  const tracker = useCardTracker(playerRefs, pocketRefs, cubesRef);
  const [overlayState, setCardOverlayState] = useState<OverlayState>();

  const shopPockets = (table.pockets.shop_deck.length !== 0 || table.pockets.shop_selection.length !== 0) && (
    <div className="pocket-group relative">
      <div className="absolute card-faded">
        <StackPocket pocketRef={setRef('shop_discard')} cards={table.pockets.shop_discard} />
      </div>
      <StackPocket showCount pocketRef={setRef('shop_deck')} cards={table.pockets.shop_deck} />
      <PocketView pocketRef={setRef('shop_selection')} cards={table.pockets.shop_selection.slice(0).reverse()} />
    </div>
  );

  const trainPockets = (table.pockets.stations.length !== 0 || table.pockets.train_deck.length !== 0) && (
    <div className="train-row">
      <div className="train-row-inner">
        <StackPocket showCount pocketRef={setRef('train_deck')} cards={table.pockets.train_deck} />
        <div className="train-stations-container">
          <StationsView cards={table.pockets.stations} />
          <TrainView pocketRef={setRef('train')} />
        </div>
      </div>
    </div>
  );

  const tableCubes = <div className='table-cubes' ref={cubesRef}>
    {table.status.num_cubes > 0 && <>
      <img src={SPRITE_CUBE} alt="" />
      <div>x{table.status.num_cubes}</div>
    </>}
  </div>;

  const mainDeck = (table.pockets.discard_pile.length !== 0 || table.pockets.main_deck.length !== 0 || table.animation.type === 'deck_shuffle') &&
    <div className="pocket-group">
      <StackPocket slice={10} pocketRef={setRef('discard_pile')} cards={table.pockets.discard_pile} />
      <StackPocket showCount pocketRef={setRef('main_deck')} cards={table.pockets.main_deck} />
    </div>;

  const scenarioCards =
    (table.pockets.scenario_deck.length !== 0 || table.pockets.scenario_card.length !== 0
      || table.pockets.wws_scenario_deck.length !== 0 || table.pockets.wws_scenario_card.length !== 0)
    && <div className="pocket-group">
      {(table.pockets.scenario_deck.length !== 0 || table.pockets.scenario_card.length !== 0) && <>
        <div className="inline-block card-faded">
          <StackPocket slice={2} showCount pocketRef={setRef('scenario_deck')} cards={table.pockets.scenario_deck} />
        </div>
        <StackPocket slice={2}
          pocketRef={setRef('scenario_card')}
          cards={table.pockets.scenario_card} />
      </>}
      {(table.pockets.wws_scenario_deck.length !== 0 || table.pockets.wws_scenario_card.length !== 0) && <>
        <StackPocket slice={2} showCount pocketRef={setRef('wws_scenario_deck')} cards={table.pockets.wws_scenario_deck} />
        <StackPocket slice={2} pocketRef={setRef('wws_scenario_card')} cards={table.pockets.wws_scenario_card} />
      </>}
    </div>;

  const selectionPocket = table.pockets.selection.length !== 0 && (
    <div className="selection-view whitespace-nowrap">
      <PocketView pocketRef={setRef('selection')} cards={table.pockets.selection} />
    </div>
  );

  const movingPlayers = table.animation.type === 'move_players' ? table.animation.players.map(p => p.from) : [];

  const playerViews = table.alive_players.map((player_id, index) => {
    const player = getPlayer(table, player_id);
    const user = getUser(lobbyState.users, player.user_id);

    return <div key={player_id} className="player-grid-item" player-index={index}>
      {movingPlayers.includes(player_id)
        ? <PlayerSlotView playerRef={value => playerRefs.set(player_id, value)} />
        : <PlayerView playerRef={value => playerRefs.set(player_id, value)} user={user} player={player} handleRejoin={handleRejoin(player.user_id)} />}
    </div>;
  });

  return (
    <LobbyContext.Provider value={lobbyState}>
      <GameStateContext.Provider value={state}>
        <div className="game-scene">
          <SelectorConfirmContext.Provider value={selectorConfirm}>
            <SetCardOverlayContext.Provider value={setCardOverlayState}>
              <div className="main-deck-row">
                <div>
                  {shopPockets}{tableCubes}{mainDeck}{scenarioCards}
                </div>
                {trainPockets}
              </div>
              <div className="player-grid" num-players={table.alive_players.length}>
                {playerViews}
              </div>
              {selectionPocket}
              <PromptView prompt={selector.prompt} selectorDispatch={selectorDispatch} />
              <CardChoiceView tracker={tracker} />
              <StatusBar
                gameError={gameError}
                handleClearGameError={clearGameError}
                handleReturnLobby={handleReturnLobby}
              />
            </SetCardOverlayContext.Provider>
          </SelectorConfirmContext.Provider>

          <AnimationView tracker={tracker} />
          { isMobileDevice() || <CardOverlayView overlayState={overlayState} /> }
        </div>
        
        { overlayRef.current && createPortal(
          <>
            <GameUsersView />
            <GameLogView logs={gameLogs} />
          </>, overlayRef.current) }
      </GameStateContext.Provider>
    </LobbyContext.Provider>
  );
}