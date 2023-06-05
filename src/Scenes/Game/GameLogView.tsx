import { useContext, useEffect, useRef } from "react";
import { GameStringComponent } from "../../Locale/Locale";
import { GameTableContext } from "./GameScene";
import "./Style/GameLogView.css";

export default function GameLogView() {
    const { logs } = useContext(GameTableContext);
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