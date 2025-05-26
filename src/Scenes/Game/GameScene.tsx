import { RefObject, createContext, useState } from "react";
import { createPortal } from "react-dom";
import useEvent from "react-use-event-hook";
import { LobbyState } from "../../Model/SceneState";
import { UserId } from "../../Model/ServerMessage";
import { BangConnection, GameChannel } from "../../Model/UseBangConnection";
import { isMobileDevice } from "../../Utils/MobileCheck";
import { useMapRef } from "../../Utils/UseMapRef";
import LoadingScene from "../Loading/Loading";
import { LobbyContext, getUser } from "../Lobby/Lobby";
import AnimationView from "./Animations/AnimationView";
import CardOverlayView from "./CardOverlayView";
import { getTokenSprite } from "./CardView";
import GameLogView from "./GameLogView";
import GameUsersView from "./GameUsersView";
import { PocketType, TokenType } from "./Model/CardEnums";
import { PlayerRef, PocketRef, useCardTracker } from "./Model/CardTracker";
import { getPlayer } from "./Model/GameTable";
import { GameOptions, PlayerId } from "./Model/GameUpdate";
import { SelectorConfirmProvider, useSendGameAction } from "./Model/SelectorConfirm";
import { OverlayState, SetCardOverlayContext } from "./Model/UseCardOverlay";
import useGameState, { newGameState } from "./Model/UseGameState";
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
  gameOptions: GameOptions;
  gameChannel: GameChannel;
  overlayRef: RefObject<HTMLDivElement>;
  muteSounds?: boolean;
}

const EMPTY_GAME_STATE = newGameState(0);
export const GameStateContext = createContext(EMPTY_GAME_STATE);

export default function GameScene({ connection, lobbyState, gameOptions, gameChannel, overlayRef, muteSounds }: GameProps) {
  const { loaded, state, selectorDispatch, gameLogs, gameError, clearGameError } = useGameState(gameChannel, lobbyState.myUserId, muteSounds ?? false);
  const { table, selector } = state;

  const pocketRefs = useMapRef<PocketType, PocketRef>();
  const playerRefs = useMapRef<PlayerId, PlayerRef>();
  const tokensRef = useMapRef<TokenType, HTMLDivElement>();

  const handleReturnLobby = useEvent(() => connection.sendMessage({ lobby_return: {} }));
  const setRef = (key: PocketType) => (value: PocketRef | null) => pocketRefs.set(key, value);

  useSendGameAction(selector, connection);

  const handleRejoin = (user_id: UserId) => () => connection.sendMessage({ game_rejoin: { user_id }});

  const tracker = useCardTracker(playerRefs, pocketRefs, tokensRef);
  const [overlayState, setCardOverlayState] = useState<OverlayState>();

  const shopPockets = (table.pockets.shop_deck.length !== 0 || table.pockets.shop_selection.length !== 0
    || (table.animation.type === 'deck_shuffle' && table.animation.pocket === 'shop_deck')
  ) && (
    <div className="pocket-group">
      <StackPocket showCount pocketRef={setRef('shop_deck')} cards={table.pockets.shop_deck} />
      <PocketView pocketRef={setRef('shop_selection')} cards={table.pockets.shop_selection.slice(0).reverse()} />
    </div>
  );

  const trainPockets = (table.pockets.stations.length !== 0 || table.pockets.train_deck.length !== 0
    || (table.animation.type === 'deck_shuffle' && table.animation.pocket === 'train_deck')
  ) && (
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

  const featsPockets = (table.pockets.feats_deck.length !== 0 || table.pockets.feats.length !== 0
    || (table.animation.type === 'deck_shuffle' && table.animation.pocket === 'feats_deck')
  ) && (
    <div className="pocket-group feats-cards">
      <div className="feats-row">
        <div className="feats-col">
          <StackPocket slice={2} showCount pocketRef={setRef('feats_deck')} cards={table.pockets.feats_deck} />
          <div className="card-faded">
            <StackPocket slice={10} pocketRef={setRef('feats_discard')} cards={table.pockets.feats_discard} />
          </div>
        </div>
        <div className="feats-pocket">
          <PocketView pocketRef={setRef('feats')} cards={table.pockets.feats} />
        </div>
      </div>
    </div>
  );

  const tokens = (Object.entries(table.status.tokens) as [TokenType,number][])
    .map(([token, count]) => (
      <div key={token} ref={ref => tokensRef.set(token, ref)}>
        <img src={getTokenSprite(token)} alt="" />
        {count > 0 && <div>x{count}</div>}
      </div>
    ));

  const mainDeck = ( table.pockets.discard_pile.length !== 0 || table.pockets.main_deck.length !== 0
    || (table.animation.type === 'deck_shuffle' && table.animation.pocket === 'main_deck')
  ) && (
    <div className="pocket-group">
      <StackPocket slice={10} pocketRef={setRef('discard_pile')} cards={table.pockets.discard_pile} />
      <StackPocket slice={2} showCount pocketRef={setRef('main_deck')} cards={table.pockets.main_deck} />
    </div>
  );

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
        : <PlayerView playerRef={value => playerRefs.set(player_id, value)} gameOptions={gameOptions} user={user} player={player} handleRejoin={handleRejoin(player.user_id)} />}
    </div>;
  });
  
  return (
    <LobbyContext.Provider value={lobbyState}>
      <GameStateContext.Provider value={state}>
        { loaded ? <div className="game-scene">
          <SelectorConfirmProvider selectorDispatch={selectorDispatch}>
            <SetCardOverlayContext.Provider value={setCardOverlayState}>
              <div className="main-deck-row">
                <div>
                  {shopPockets}
                  {tokens.length !== 0 && <div className='table-tokens'>{tokens}</div>}
                  {mainDeck}
                  {scenarioCards}
                  {featsPockets}
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
          </SelectorConfirmProvider>

          <AnimationView tracker={tracker} />
          { isMobileDevice() || <CardOverlayView overlayState={overlayState} /> }
        </div>
        : <LoadingScene message="LOADING_CARDS" /> }
        
        { overlayRef.current && createPortal(
          <>
            <GameUsersView />
            <GameLogView logs={gameLogs} />
          </>, overlayRef.current) }
      </GameStateContext.Provider>
    </LobbyContext.Provider>
  );
}