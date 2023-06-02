import { GameStringComponent } from "../../Locale/Locale";
import { UserValue } from "../Lobby/LobbyUser";
import { GameTable } from "./Model/GameTable";
import "./Style/GameLogView.css";

export interface GameLogProps {
    table: GameTable;
    users: UserValue[];
}

export default function GameLogView({table, users}: GameLogProps) {
    return (<div className="game-log-view">
        {table.logs.slice(0).reverse().map((message, index) => (
            <p key={index}><GameStringComponent message={message} table={table} users={users} /></p>
        ))}
    </div>);
}