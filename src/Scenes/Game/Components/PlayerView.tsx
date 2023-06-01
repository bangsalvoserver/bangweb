import { getLocalizedLabel } from "../../../Locale/Locale";
import LobbyUser, { UserValue } from "../../Lobby/LobbyUser";
import { GameTable, Player, getCard } from "../GameTable";
import CardView from "./CardView";
import "./PlayerView.css";
import RoleView from "./RoleView";

export interface PlayerProps {
    user?: UserValue,
    table: GameTable,
    player: Player
}

export default function PlayerView({ user, table, player }: PlayerProps) {
    let className = 'player-view';
    if (player.id == table.status.current_turn) {
        className += ' current-turn';
    }

    const isAlive = !player.status.flags.includes('dead');
    const isOrigin = table.status.request && 'origin' in table.status.request && table.status.request.origin == player.id;
    const isTarget = table.status.request && 'target' in table.status.request && table.status.request.target == player.id;
    const isWinner = player.status.flags.includes('winner');

    return (
        <div className={className}>
            <LobbyUser user={user} />
            <div className="player-character">
                { player.pockets.player_character.map(id => <CardView key={id} card={getCard(table, id)} />) }
                <RoleView role={player.status.role} />
                <div>
                    { isAlive ? <div>{ player.status.hp } HP</div> : null }
                    { player.status.gold > 0 ? <div>{ player.status.gold } gold</div> : null }
                    { isOrigin ? <div style={{color: 'cyan'}}>Origin</div> : null }
                    { isTarget ? <div style={{color: 'red'}}>Target</div> : null }
                    { isWinner ? <div style={{color: 'yellow'}}>Winner</div> : null }
                </div>
            </div>
            <div className="card-pocket">
                {player.pockets.player_hand.map(card_id => 
                    <CardView key={card_id} card={getCard(table, card_id)} />
                )}
            </div>
            <div className="card-pocket">
                {player.pockets.player_table.map(card_id => 
                    <CardView key={card_id} card={getCard(table, card_id)} />
                )}
            </div>
        </div>
    )
}