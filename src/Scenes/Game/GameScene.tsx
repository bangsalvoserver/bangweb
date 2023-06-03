import { useEffect, useRef } from "react";
import { GameStringComponent } from "../../Locale/Locale";
import { Connection } from "../../Messages/Connection";
import { PlayerId } from "../../Messages/GameUpdate";
import { UserId } from "../../Messages/ServerMessage";
import { UserValue } from "../Lobby/LobbyUser";
import AnimationView from "./AnimationView";
import CardButtonView from "./CardButtonView";
import CountPocket from "./CountPocket";
import GameLogView from "./GameLogView";
import { GameTable, PocketRef, getCard, getPlayer } from "./Model/GameTable";
import { GameUpdateHandler } from "./Model/GameUpdateHandler";
import PlayerView, { PlayerRef } from "./PlayerView";
import PocketView, { CardTracker, PocketPositionMap, PocketPositionRef } from "./PocketView";
import "./Style/GameScene.css";
import { TablePocketType } from "../../Messages/CardEnums";

const FRAMERATE = 60;

export interface TableProps {
    connection: Connection;
    game: GameUpdateHandler;
    table: GameTable;
    users: UserValue[];
    lobbyOwner?: UserId;
}

export default function GameScene({ connection, game, table, users, lobbyOwner }: TableProps) {
    const positions: PocketPositionMap = {
        main_deck: useRef() as PocketPositionRef,
        discard_pile: useRef() as PocketPositionRef,
        selection: useRef() as PocketPositionRef,
        shop_discard: useRef() as PocketPositionRef,
        shop_deck: useRef() as PocketPositionRef,
        shop_selection: useRef() as PocketPositionRef
    };

    const playerRefs = useRef<Record<PlayerId, PlayerRef | null>>({});

    const tracker: CardTracker = {
      getPocketPosition: (pocket: PocketRef) => {
        if (!pocket) {
          return undefined;
        } else if (pocket.name == 'scenario_deck' || pocket.name == 'wws_scenario_deck') {
          const holder = pocket.name == 'scenario_deck' ? table.status.scenario_deck_holder : table.status.wws_scenario_deck_holder;
          return !holder ? undefined : playerRefs.current[holder]?.positions[pocket.name]?.current;
        } else if ('player' in pocket) {
          return playerRefs.current[pocket.player]?.positions[pocket.name]?.current;
        } else {
          return positions[pocket.name]?.current;
        }
      }
    };

    useEffect(() => {
      let startTime = Date.now();
      const interval = setInterval(() => {
        let endTime = Date.now();
        game.tick(endTime - startTime);
        startTime = endTime;
      }, 1000 / FRAMERATE);
      return () => clearInterval(interval);
    }, []);
  
    const showReturnButton = () => {
      return table.myUserId == lobbyOwner
        && table.status.flags.includes('game_over');
    };
  
    const handleReturnLobby = () => connection.sendMessage('lobby_return');

    return (
      <div className="game-scene-top">
        <div className="game-scene">
          <div className="m-auto align-middle">
            { table.pockets.shop_deck.length != 0 || table.pockets.shop_discard.length != 0 ? <>
              <div className="single-card-pocket">
                <PocketView ref={positions.shop_discard} table={table} cards={table.pockets.shop_discard.slice(-1)} />
                <CountPocket ref={positions.shop_deck} table={table} cards={table.pockets.shop_deck}/>
              </div>
              <PocketView ref={positions.shop_selection} table={table} cards={table.pockets.shop_selection.slice(0).reverse()} />
            </> : null }
            <div className="single-card-pocket">
              <PocketView ref={positions.discard_pile} table={table} cards={table.pockets.discard_pile.slice(-2)}/>
            </div>
            <CountPocket ref={positions.main_deck} table={table} cards={table.pockets.main_deck} />
            <PocketView ref={positions.selection} table={table} cards={table.pockets.selection} />
          </div>
          <div className="m-auto status-text">
            { 'status_text' in table.status.request
              ? <GameStringComponent table={table} users={users} message={table.status.request.status_text} />
              : null }
            { showReturnButton() ? <button onClick={handleReturnLobby}>Return to Lobby</button> : null }
          </div>
          <div className="m-auto">
            { table.alive_players.map(player_id => {
              const player = getPlayer(table, player_id);
              const user = users.find(user => user.id === player.userid);
              
              return <PlayerView ref={ref => playerRefs.current[player_id] = ref} key={player_id} table={table} user={user} player={player} />;
            }) }
          </div>
          <div className="m-auto">
            { table.pockets.button_row.map(id => <CardButtonView key={id} card={getCard(table, id)} /> )}
          </div>
          <AnimationView table={table} tracker={tracker} />
        </div>
        <GameLogView table={table} users={users} />
      </div>
  );
}