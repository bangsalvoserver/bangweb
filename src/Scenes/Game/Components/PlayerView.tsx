import LobbyUser, { UserValue } from "../../Lobby/LobbyUser";
import { Card, GameTable, Player, getCard } from "../GameTable";
import CardView from "./CardView";

export interface PlayerProps {
    user?: UserValue,
    table: GameTable,
    player: Player
}

export default function PlayerView({ user, table, player }: PlayerProps) {
    return (
        <div>
            <LobbyUser user={user} />
            <div>{player.pockets.player_character.length > 0 ? <CardView table={table} card={player.pockets.player_character[0]} /> : null }</div>
            <div>{player.pockets.player_hand.length} cards in hand</div>
            <div>
                {player.pockets.player_table.map(card_id => 
                    <CardView key={card_id} table={table} card={card_id} />
                )}
            </div>
        </div>
    )
}