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
            <div>
            {player.pockets.player_hand.map(card_id => (
                <CardView key={card_id} table={table} card={getCard(table, card_id) as Card} />
            ))}
            </div>
        </div>
    )
}