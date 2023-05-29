import { UserValue } from "../../Lobby/LobbyUser";
import { Card, GameTable, Player, getCard } from "../GameTable";
import CardView from "./CardView";

export interface PlayerProps {
    users: UserValue[],
    table: GameTable,
    player: Player
}

export default function PlayerView({ users, table, player }: PlayerProps) {
    const user = users.find(user => user.id == player.userid);
    return (
        <div>
        {user?.propic ? <img src={user.propic} /> : null}
        {user?.name || "Disconnected"}
        {player.pockets.player_hand.map(card_id => (
            <CardView key={card_id} table={table} card={getCard(table, card_id) as Card} />
        ))}
        </div>
    )
}