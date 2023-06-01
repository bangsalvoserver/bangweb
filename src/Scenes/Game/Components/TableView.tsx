import "./TableView.css";
import { GameTable, PocketRef, getCard, getPlayer } from "../GameTable";
import CardView from "./CardView";
import { GameString, PlayerId } from "../../../Messages/GameUpdate";
import { GameStringComponent } from "../../../Locale/Locale";
import { UserValue } from "../../Lobby/LobbyUser";
import PlayerView, { GetPlayerPocketPositions } from "./PlayerView";
import CardButtonView from "./CardButtonView";
import CountPocket, { CountPocketProps } from "./CountPocket";
import { MutableRefObject, createRef, useEffect, useRef } from "react";
import { PlayerPocketType, TablePocketType } from "../../../Messages/CardEnums";
import PocketView from "./PocketView";

export interface PocketPosition {
    getRect: () => DOMRect;
}

export interface TableProps {
    table: GameTable;
    users: UserValue[];
}

export type TablePocketPositions = {
  [T in Extract<TablePocketType, string>]?: MutableRefObject<PocketPosition>;
};

export default function TableView({ table, users }: TableProps) {
    const positions: TablePocketPositions = {
      main_deck: useRef() as MutableRefObject<PocketPosition>,
      discard_pile: useRef() as MutableRefObject<PocketPosition>
    };

    const playerPositions = useRef({} as Record<PlayerId, MutableRefObject<GetPlayerPocketPositions>>);

    const getPocketRect = (pocket: PocketRef): DOMRect | undefined => {
      if (pocket) {
        if ('player' in pocket) {
          if (pocket.player in playerPositions) {
            return playerPositions.current[pocket.player].current.positions[pocket.name]?.current.getRect();
          }
        } else {
          return positions[pocket.name]?.current.getRect();
        }
      }
      return undefined;
    };

    const newGameStringComponent = (message: GameString, key?: number) => {
      return <GameStringComponent key={key} table={table} users={users} message={message} />
    };

    const newPlayerView = (player_id: PlayerId) => {
      const player = getPlayer(table, player_id);
      const user = users.find(user => user.id === player.userid);

      const getPlayerRef = () => {
        if (player_id in playerPositions) {
          playerPositions.current[player_id] = createRef() as MutableRefObject<GetPlayerPocketPositions>;
        }
        return playerPositions.current[player_id];
      };
      
      return <PlayerView ref={getPlayerRef()} key={player_id} table={table} user={user} player={player} />;
    };

    return (
      <div className="table-view">
        <div className="align-center">
          <PocketView ref={positions.discard_pile} table={table} cards={table.pockets.discard_pile.slice(-1)} />
          <CountPocket ref={positions.main_deck} table={table} cards={table.pockets.main_deck} />
          <PocketView ref={positions.selection} table={table} cards={table.pockets.selection} />
        </div>
        <div className="align-center status-text">
          { 'status_text' in table.status.request ? newGameStringComponent(table.status.request.status_text) : null }
        </div>
        <div className="align-center">
          { table.alive_players.map(newPlayerView) }
        </div>
        <div className="align-center">
          { table.pockets.button_row.map(id => <CardButtonView key={id} card={getCard(table, id)} /> )}
        </div>
      </div>
  );
}