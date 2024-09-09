import { useEffect, useRef, useCallback } from "react";
import useCloseOnLoseFocus from "../../Utils/UseCloseOnLoseFocus";
import usePrevious from "../../Utils/UsePrevious";
import GameStringComponent from "./GameStringComponent";
import { GameString } from "./Model/GameUpdate";
import "./Style/GameLogView.css";

export interface GameLogProps {
    logs: GameString[];
}

export default function GameLogView({ logs }: GameLogProps) {
    const messagesEnd = useRef<HTMLDivElement>(null);
    const logBoxRef = useRef<HTMLDivElement>(null);
    const isAtBottomRef = useRef(true);
    const prevLogsLength = usePrevious(logs.length);

    const [isLogOpen, setIsLogOpen, gameLogRef] = useCloseOnLoseFocus<HTMLDivElement>();

    const checkIfAtBottom = useCallback(() => {
        if (logBoxRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = logBoxRef.current;
            isAtBottomRef.current = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;
        }
    }, []);

    const scrollToBottom = useCallback(() => {
        messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (isLogOpen && prevLogsLength !== undefined && logs.length > prevLogsLength && isAtBottomRef.current) {
            scrollToBottom();
        }
    }, [isLogOpen, logs, prevLogsLength, scrollToBottom]);

    return <div ref={gameLogRef} className="game-log-outer">
        <button className='
                w-8 h-8 md:w-12 md:h-12 relative
                p-2 ml-1 text-sm rounded-full focus:outline-none focus:ring-2 text-gray-400 bg-gray-600 hover:bg-gray-700 focus:ring-gray-800
            ' onClick={() => setIsLogOpen(!isLogOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 108.12" fill="currentColor"><path d="M28.45,55.88c0,.11,0,.22,0,.32l4.44-4.46a6.68,6.68,0,1,1,9.48,9.42L27.14,76.51a6.69,6.69,0,0,1-9.32.15L2.28,63A6.68,6.68,0,0,1,11.08,53l4,3.54v0a54.33,54.33,0,0,1,8-31,52.56,52.56,0,0,1,24-20.73,60.17,60.17,0,0,1,11-3.51,52.58,52.58,0,0,1,60.1,31.09,58.07,58.07,0,0,1,3.47,11,52.47,52.47,0,0,1-1.31,26.95A53.16,53.16,0,0,1,105.8,93a57.11,57.11,0,0,1-22.56,13.1,48.52,48.52,0,0,1-40.51-5.89A6.68,6.68,0,0,1,50,89a35.12,35.12,0,0,0,5.53,3,34.21,34.21,0,0,0,5.7,1.86,35.43,35.43,0,0,0,18.23-.54A43.77,43.77,0,0,0,96.74,83.19a39.7,39.7,0,0,0,10.93-17.06,39,39,0,0,0,1-20.08,46.38,46.38,0,0,0-2.68-8.5,39.19,39.19,0,0,0-45-23.22,45,45,0,0,0-8.52,2.72A39,39,0,0,0,34.5,32.49a40.94,40.94,0,0,0-6.05,23.39ZM60.83,34a6.11,6.11,0,0,1,12.22,0V53l14.89,8.27A6.11,6.11,0,1,1,82,71.93L64.43,62.16a6.11,6.11,0,0,1-3.6-5.57V34Z" /></svg>
        </button>
        <div 
            ref={logBoxRef}
            className={'game-log-box ' + (!isLogOpen ? 'hidden' : '')}
            onScroll={checkIfAtBottom}
        >
            {logs.map((message, index) => (
                <p key={index}><GameStringComponent message={message} /></p>
            ))}
            <div ref={messagesEnd} />
        </div>
    </div>;
}