import { createContext, useContext, useReducer, useRef } from "react";
import { PocketType } from "./Model/CardEnums";
import { PlayerId } from "./Model/GameUpdate";
import { setMapRef, useMapRef } from "../../Utils/MapRef";
import { getDivRect } from "../../Utils/Rect";
import { useInterval } from "../../Utils/UseInterval";
import { LobbyContext } from "../Lobby/Lobby";
import AnimationView from "./AnimationView";
import CardButtonView from "./CardButtonView";
import CountPocket from "./CountPocket";
import GameLogView from "./GameLogView";
import GameStringComponent from "./GameStringComponent";
import { PocketRef, getCard, getPlayer, newGameTable } from "./Model/GameTable";
import { gameTableDispatch } from "./Model/GameTableDispatch";
import { GameChannel, GameUpdateHandler } from "./Model/GameUpdateHandler";
import PlayerView, { PlayerRef } from "./PlayerView";
import PocketView, { CardTracker, PocketPosition } from "./PocketView";
import "./Style/GameScene.css";

const FRAMERATE = 60;

export interface TableProps {
  channel: GameChannel;
}

export const GameTableContext = createContext(newGameTable());

export default function GameScene({ channel }: TableProps) {
  const { users, myUserId, lobbyOwner } = useContext(LobbyContext);
  
  const [table, tableDispatch] = useReducer(gameTableDispatch, myUserId, newGameTable);
  const game = useRef<GameUpdateHandler>();
  if (!game.current) {
    game.current = new GameUpdateHandler(channel, tableDispatch);
  }

  useInterval((timeElapsed: number) => game.current?.tick(timeElapsed), 1000 / FRAMERATE, []);

  const pocketRefs = useMapRef<PocketType, PocketPosition>();
  const playerRefs = useMapRef<PlayerId, PlayerRef>();
  const cubesRef = useRef<HTMLDivElement>(null);

  const tracker: CardTracker = {
    getPlayerPosition: (player: PlayerId) => {
      return playerRefs.current?.get(player);
    },
    getPocketPosition: (pocket: PocketRef) => {
      if (!pocket) {
        return undefined;
      } else if (pocket.name == 'scenario_deck' || pocket.name == 'wws_scenario_deck') {
        const holder = table.status.scenario_holders[pocket.name];
        return holder ? playerRefs.current?.get(holder)?.positions.get(pocket.name) : undefined;
      } else if ('player' in pocket) {
        return playerRefs.current?.get(pocket.player)?.positions.get(pocket.name);
      } else {
        return pocketRefs.current?.get(pocket.name);
      }
    },
    getCubesPosition: () => {
      return cubesRef.current ? getDivRect(cubesRef.current) : undefined;
    }
  };

  return (
    <GameTableContext.Provider value={table}><div className="game-scene-top">
      <div className="game-scene">
        <div className="m-auto align-middle">
          {table.pockets.shop_deck.length != 0 || table.pockets.shop_discard.length != 0 ? <>
            <div className="stack-pockets">
              <div className="stack-pockets-inner single-card-pocket">
                <PocketView ref={setMapRef(pocketRefs, 'shop_discard')} cards={table.pockets.shop_discard.slice(-1)} />
              </div>
              <CountPocket ref={setMapRef(pocketRefs, 'shop_deck')} cards={table.pockets.shop_deck} />
            </div>
            <PocketView ref={setMapRef(pocketRefs, 'shop_selection')} cards={table.pockets.shop_selection.slice(0).reverse()} />
          </> : null}
          <div className='table-cubes' ref={cubesRef}>
            {table.status.num_cubes > 0 ?
              <><img src='/media/sprite_cube.png' />x{table.status.num_cubes}</> : null}
          </div>
          <div className="single-card-pocket">
            <PocketView ref={setMapRef(pocketRefs, 'discard_pile')} cards={table.pockets.discard_pile.slice(-2)} />
          </div>
          <CountPocket ref={setMapRef(pocketRefs, 'main_deck')} cards={table.pockets.main_deck} />
          { table.pockets.scenario_card.length != 0 ?
            <div className="single-card-pocket">
              <PocketView ref={setMapRef(pocketRefs, 'scenario_card')} cards={table.pockets.scenario_card.slice(-2)} />
            </div> : null }
          { table.pockets.wws_scenario_card.length != 0 ?
            <div className="single-card-pocket">
              <PocketView ref={setMapRef(pocketRefs, 'wws_scenario_card')} cards={table.pockets.wws_scenario_card.slice(-2)} />
            </div> : null }
          <PocketView ref={setMapRef(pocketRefs, 'selection')} cards={table.pockets.selection} />
        </div>
        <div className="m-auto status-text">
          {'status_text' in table.status.request
            ? <GameStringComponent message={table.status.request.status_text} />
            : null}
          {myUserId == lobbyOwner && table.status.flags.includes('game_over') ?
            <button className="bg-green-500 hover:bg-green-600 font-bold py-1 px-4 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={channel.handleReturnLobby}>Return to Lobby</button>
          : null}
        </div>
        <div className="m-auto">
          {table.alive_players.map(player_id => {
            const player = getPlayer(table, player_id);
            const user = users.find(user => user.id === player.userid);

            return <PlayerView ref={setMapRef(playerRefs, player_id)} key={player_id} user={user} player={player} />;
          })}
        </div>
        <div className="m-auto">
          {table.pockets.button_row.map(id => <CardButtonView key={id} card={getCard(table, id)} />)}
        </div>
        <AnimationView tracker={tracker} />
      </div>
      <GameLogView />
    </div></GameTableContext.Provider>
  );
}