import LobbyUser, { UserValue } from "../../Lobby/LobbyUser";
import { GameTable, Player, getCard } from "../GameTable";
import CardView from "./CardView";
import "./PlayerView.css";

export interface PlayerProps {
    user?: UserValue,
    table: GameTable,
    player: Player
}

export default function PlayerView({ user, table, player }: PlayerProps) {
    let className = '';
    if (player.id == table.status.current_turn) {
        className = 'current-turn';
    }

    return (
        <div className={className}>
            <LobbyUser user={user} />
            <div>{player.pockets.player_character.length > 0 ? <CardView card={getCard(table, player.pockets.player_character[0])} /> : null }</div>
            <div>{player.pockets.player_hand.length} cards in hand</div>
            <div>
                {player.pockets.player_table.map(card_id => 
                    <CardView key={card_id} card={getCard(table, card_id)} />
                )}
            </div>
        </div>
    )
}