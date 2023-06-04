import { useEffect, useRef } from "react";
import { GameStringComponent } from "../../Locale/Locale";
import { UserValue } from "../Lobby/LobbyUser";
import { GameTable } from "./Model/GameTable";
import "./Style/GameLogView.css";

export interface GameLogProps {
    table: GameTable;
    users: UserValue[];
}

export default function GameLogView({table, users}: GameLogProps) {
    const messagesEnd = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEnd.current?.scrollIntoView({ block: 'nearest', behavior:'smooth' });
    }, [table.logs]);

    return (<div className="game-log-view">
        {table.logs.map((message, index) => (
            <p key={index}><GameStringComponent message={message} table={table} users={users} /></p>
        ))}
        <div ref={messagesEnd} />
    </div>);
}