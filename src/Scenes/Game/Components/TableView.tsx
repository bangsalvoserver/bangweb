import "./TableView.css";
import { GameTable, getCard, getPlayer } from "../GameTable";
import CardView from "./CardView";
import { GameString, PlayerId } from "../../../Messages/GameUpdate";
import { GameStringComponent } from "../../../Locale/Locale";
import { UserValue } from "../../Lobby/LobbyUser";
import PlayerView from "./PlayerView";
import CardButtonView from "./CardButtonView";
import CountPocket from "./CountPocket";

export interface TableProps {
    table: GameTable;
    users: UserValue[];
}

export default function TableView({ table, users }: TableProps) {
    const newGameStringComponent = (message: GameString, key?: number) => {
      return <GameStringComponent key={key} table={table} users={users} message={message} />
    };

    const newPlayerView = (player_id: PlayerId) => {
      const player = getPlayer(table, player_id);
      const user = users.find(user => user.id === player.userid);
      
      return (
        <PlayerView key={player_id} table={table} user={user} player={player} />
      );
    };

    return (
      <div className="table-view">
        <div className="align-center">
          { table.pockets.discard_pile.slice(-1).map(id => <CardView key={id} card={getCard(table, id)} /> )}
          <CountPocket table={table} cards={table.pockets.main_deck} />
          { table.pockets.selection.map(id => <CardView key={id} card={getCard(table, id)} /> ) }
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