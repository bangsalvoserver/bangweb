import { RefObject, createContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useEvent from "react-use-event-hook";
import { curry2 } from "ts-curry";
import { LobbyState } from "../../Model/SceneState";
import { UserId } from "../../Model/ServerMessage";
import { BangConnection, GameChannel } from "../../Model/UseBangConnection";
import { isMobileDevice } from "../../Utils/MobileCheck";
import { useMapRef } from "../../Utils/UseMapRef";
import { LobbyContext, getUser } from "../Lobby/Lobby";
import AnimationView from "./Animations/AnimationView";
import CardChoiceView from "./CardChoiceView";
import CardOverlayView from "./CardOverlayView";
import { SPRITE_CUBE } from "./CardView";
import GameLogView from "./GameLogView";
import { PocketType } from "./Model/CardEnums";
import { PlayerRef, PocketRef, useCardTracker } from "./Model/CardTracker";
import { getPlayer, newGameTable } from "./Model/GameTable";
import { PlayerId } from "./Model/GameUpdate";
import { SelectorConfirmContext, useSelectorConfirm, useSendGameAction } from "./Model/TargetSelectorManager";
import { OverlayState, SetCardOverlayContext } from "./Model/UseCardOverlay";
import useGameState from "./Model/UseGameState";
import PlayerSlotView from "./PlayerSlotView";
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

export interface GameProps {
  myUserId?: UserId;
  connection: BangConnection;
  lobbyState: LobbyState;
  gameChannel: GameChannel;
  overlayRef: RefObject<HTMLDivElement>;
}

const EMPTY_TABLE = newGameTable();
export const GameTableContext = createContext(EMPTY_TABLE);

export default function GameScene({ myUserId, connection, lobbyState, gameChannel, overlayRef }: GameProps) {
  const { table, selectorDispatch, gameLogs, gameError, clearGameError } = useGameState(gameChannel, myUserId);

  const pocketRefs = useMapRef<PocketType, PocketRef>();
  const playerRefs = useMapRef<PlayerId, PlayerRef>();
  const cubesRef = useRef<HTMLDivElement>(null);

  const handleReturnLobby = useEvent(() => connection.sendMessage({ lobby_return: {} }));
  const setRef = curry2(pocketRefs.set);

  const selectorConfirm = useSelectorConfirm(table, selectorDispatch);
  useSendGameAction(table, connection);

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

  const mainDeck = (table.pockets.discard_pile.length !== 0 || table.pockets.main_deck.length !== 0 || table.animation) &&
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

  const movingPlayers = (table.animation && 'move_players' in table.animation) ?
    table.animation.move_players.players.map(p => p.from) : [];

  const playerViews = table.alive_players.map((player_id, index) => {
    const player = getPlayer(table, player_id);
    const user = getUser(lobbyState.users, player.userid);

    return <div key={player_id} className="player-grid-item" player-index={index}>
      {movingPlayers.includes(player_id)
        ? <PlayerSlotView playerRef={value => playerRefs.set(player_id, value)} />
        : <PlayerView playerRef={value => playerRefs.set(player_id, value)} user={user} player={player} />}
    </div>;
  });

  return (
    <LobbyContext.Provider value={lobbyState}>
      <GameTableContext.Provider value={table}>
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
              <PromptView prompt={table.selector.prompt} selectorDispatch={selectorDispatch} />
              <CardChoiceView tracker={tracker} />
              <StatusBar
                myUserId={myUserId}
                gameError={gameError}
                handleClearGameError={clearGameError}
                handleReturnLobby={handleReturnLobby}
              />
            </SetCardOverlayContext.Provider>
          </SelectorConfirmContext.Provider>

          <AnimationView tracker={tracker} />
          { isMobileDevice() || <CardOverlayView overlayState={overlayState} /> }
        </div>
        
        { overlayRef.current && createPortal(<GameLogView logs={gameLogs} />, overlayRef.current) }
      </GameTableContext.Provider>
    </LobbyContext.Provider>
  );
}