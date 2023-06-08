import { useContext, useEffect, useRef } from "react";
import { GameTableContext } from "./GameScene";
import GameStringComponent from "./GameStringComponent";
import "./Style/GameLogView.css";
import { GameString } from "./Model/GameUpdate";

export interface GameLogProps {
    logs: GameString[];
}

export default function GameLogView({ logs }: GameLogProps) {
    const messagesEnd = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEnd.current?.scrollIntoView({ block: 'nearest', behavior:'smooth' });
    }, [logs]);

    return (<div className="game-log-view">
        {logs.map((message, index) => (
            <p key={index}><GameStringComponent message={message} /></p>
        ))}
        <div ref={messagesEnd} />
    </div>);
}