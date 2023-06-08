import { createContext, useContext, useReducer, useRef } from "react";
import { setMapRef, useMapRef } from "../../Utils/MapRef";
import { useInterval } from "../../Utils/UseInterval";
import { LobbyContext } from "../Lobby/Lobby";
import AnimationView from "./Animations/AnimationView";
import CardButtonView from "./CardButtonView";
import CountPocket from "./CountPocket";
import GameLogView from "./GameLogView";
import GameStringComponent from "./GameStringComponent";
import { PocketType } from "./Model/CardEnums";
import { CardTrackerImpl } from "./Animations/CardTracker";
import { getCard, getPlayer, newGameTable } from "./Model/GameTable";
import { gameTableDispatch } from "./Model/GameTableDispatch";
import { PlayerId } from "./Model/GameUpdate";
import { GameChannel, GameUpdateHandler } from "./Model/GameUpdateHandler";
import PlayerView from "./PlayerView";
import PocketView, { PocketPosition, PocketPositionMap } from "./PocketView";
import "./Style/GameScene.css";
import { useRefLazy } from "../../Utils/LazyRef";

const FRAMERATE = 60;

export interface GameProps {
  channel: GameChannel;
}

export const GameTableContext = createContext(newGameTable());

export default function GameScene({ channel }: GameProps) {
  const { users, myUserId, lobbyOwner } = useContext(LobbyContext);
  
  const [table, tableDispatch] = useReducer(gameTableDispatch, myUserId, newGameTable);

  const game = useRefLazy(() => new GameUpdateHandler(channel, tableDispatch));
  useInterval((timeElapsed: number) => game.current.tick(timeElapsed), 1000 / FRAMERATE, []);

  const pocketPositions = useMapRef<PocketType, PocketPosition>();
  const playerPositions = useMapRef<PlayerId, PocketPositionMap>();
  const cubesRef = useRef<HTMLDivElement>(null);
  
  const getTracker = () => new CardTrackerImpl(table.status.scenario_holders, pocketPositions.current, playerPositions.current, cubesRef.current);

  const shopPockets = table.pockets.shop_deck.length != 0 || table.pockets.shop_discard.length != 0 ? <>
    <div className="stack-pockets">
      <div className="stack-pockets-inner single-card-pocket">
        <PocketView ref={setMapRef(pocketPositions, 'shop_discard')} cards={table.pockets.shop_discard.slice(-1)} />
      </div>
      <CountPocket ref={setMapRef(pocketPositions, 'shop_deck')} cards={table.pockets.shop_deck} />
    </div>
    <PocketView ref={setMapRef(pocketPositions, 'shop_selection')} cards={table.pockets.shop_selection.slice(0).reverse()} />
  </> : null;

  const tableCubes = <div className='inline-block' ref={cubesRef}>
    {table.status.num_cubes > 0 ?
      <div className='table-cubes'><img src='/media/sprite_cube.png' />x{table.status.num_cubes}</div> : null}
  </div>;

  const mainDeck = <>
    <div className="single-card-pocket">
      <PocketView ref={setMapRef(pocketPositions, 'discard_pile')} cards={table.pockets.discard_pile.slice(-2)} />
    </div>
    <CountPocket ref={setMapRef(pocketPositions, 'main_deck')} cards={table.pockets.main_deck} />
  </>;

  const scenarioCards = <>
    { table.pockets.scenario_card.length != 0 ?
      <div className="single-card-pocket">
        <PocketView ref={setMapRef(pocketPositions, 'scenario_card')} cards={table.pockets.scenario_card.slice(-2)} />
      </div> : null }
    { table.pockets.wws_scenario_card.length != 0 ?
      <div className="single-card-pocket">
        <PocketView ref={setMapRef(pocketPositions, 'wws_scenario_card')} cards={table.pockets.wws_scenario_card.slice(-2)} />
      </div> : null }
  </>;

  const selection = <PocketView ref={setMapRef(pocketPositions, 'selection')} cards={table.pockets.selection} />;

  const requestStatus = 'status_text' in table.status.request ?
    <GameStringComponent message={table.status.request.status_text} />
  : null;
  
  const returnLobbyButton = myUserId == lobbyOwner && table.status.flags.includes('game_over') ?
    <button className="bg-green-500 hover:bg-green-600 font-bold py-1 px-4 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      onClick={channel.handleReturnLobby}>Return to Lobby</button>
  : null;

  const playerViews = table.alive_players.map(player_id => {
    const player = getPlayer(table, player_id);
    const user = users.find(user => user.id === player.userid);

    return <PlayerView ref={setMapRef(playerPositions, player_id)} key={player_id} user={user} player={player} />;
  });

  const buttonRow = table.pockets.button_row.map(id => <CardButtonView key={id} card={getCard(table, id)} />);

  return (
    <GameTableContext.Provider value={table}>
      <div className="game-scene-top">
        <div className="game-scene">
          <div className="m-auto align-middle">
            { shopPockets } { tableCubes } { mainDeck } { scenarioCards } { selection }
          </div>
          <div className="m-auto status-text">
            { requestStatus } { returnLobbyButton }
          </div>
          <div className="m-auto">
            { playerViews }
          </div>
          <div className="m-auto">
            { buttonRow }
          </div>
        </div>
        <GameLogView />
        <AnimationView getTracker={getTracker} />
      </div>
    </GameTableContext.Provider>
  );
}