import { useCallback, useEffect, useRef, useState } from "react";
import { GAME_LOG_ICON, SCROLL_DOWN_ICON } from "../../Components/Icons/GameLogIcon";
import useCloseOnLoseFocus from "../../Utils/UseCloseOnLoseFocus";
import GameStringComponent from "./GameStringComponent";
import { GameString } from "./Model/GameUpdate";
import "./Style/GameLogView.css";

export interface GameLogProps {
    logs: GameString[];
}

export default function GameLogView({ logs }: GameLogProps) {
    const messagesEnd = useRef<HTMLDivElement>(null);
    const logBoxRef = useRef<HTMLDivElement>(null);
    const [atBottom, setAtBottom] = useState(true);

    const [isLogOpen, setIsLogOpen, gameLogRef] = useCloseOnLoseFocus<HTMLDivElement>();

    const checkIfAtBottom = useCallback(() => {
        if (logBoxRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = logBoxRef.current;
            const BOTTOM_DELTA = 50;
            setAtBottom(Math.abs(scrollHeight - clientHeight - scrollTop) < BOTTOM_DELTA);
        }
    }, []);

    const scrollToBottom = useCallback((behavior: ScrollBehavior) => {
        messagesEnd.current?.scrollIntoView({ behavior });
    }, []);

    useEffect(() => {
        if (isLogOpen && atBottom) {
            scrollToBottom('smooth');
        }
    }, [isLogOpen, logs.length, atBottom, scrollToBottom]);

    return <div ref={gameLogRef} className="game-log-outer">
        <button className='
                w-8 h-8 md:w-12 md:h-12 relative
                p-2 ml-1 text-sm rounded-full focus:outline-none focus:ring-2 text-gray-400 bg-gray-600 hover:bg-gray-700 focus:ring-gray-800
            ' onClick={() => setIsLogOpen(!isLogOpen)}>
            { GAME_LOG_ICON }
        </button>
        <div className={'game-log-box' + (isLogOpen ? '' : ' invisible')}>
            <div className='game-log-box-inner' ref={logBoxRef} onScroll={checkIfAtBottom}>
                {logs.map((message, index) => (
                    <div className='game-log-row' key={index}><GameStringComponent message={message} /></div>
                ))}
                <div ref={messagesEnd} />
            </div>
            <button 
                className={`
                    scroll-bottom-button ${atBottom ? 'invisible ' : ''}
                    p-2 ml-1 text-sm rounded-full focus:outline-none focus:ring-2 text-gray-400 bg-gray-600 hover:bg-gray-700 focus:ring-gray-800
                `}
                onClick={() => scrollToBottom('auto')}>
                { SCROLL_DOWN_ICON }
            </button>
        </div>
    </div>;
}