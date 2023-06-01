import "./TableView.css";
import { GameTable, getCard, getPlayer } from "../GameTable";
import CardView from "./CardView";
import { GameString, PlayerId } from "../../../Messages/GameUpdate";
import { GameStringComponent } from "../../../Locale/Locale";
import { UserValue } from "../../Lobby/LobbyUser";
import PlayerView from "./PlayerView";

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

    return (<>
        <div className="table-view">
            <div className="table-view-inner">
                { table.pockets.discard_pile.slice(-1).map(id => <CardView key={id} card={getCard(table, id)} /> )}
                { table.pockets.main_deck.slice(-1).map(id => <CardView key={id} card={getCard(table, id)} /> ) }
                { table.pockets.selection.map(id => <CardView key={id} card={getCard(table, id)} /> ) }
            </div>
        </div>
        <div className="table-view">
            <div className="table-view-inner status-text">
                { table.status.request && 'status_text' in table.status.request
                    ? newGameStringComponent(table.status.request.status_text) : null }
            </div>
        </div>
        { table.alive_players.map(newPlayerView) }
    </>);
}