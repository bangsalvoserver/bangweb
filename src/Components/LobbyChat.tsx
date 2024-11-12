import { SyntheticEvent, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import getLabel from "../Locale/GetLabel";
import { LobbyState } from "../Model/SceneState";
import { ChatMessage, LobbyChatArg } from "../Model/ServerMessage";
import { BangConnection } from "../Model/UseBangConnection";
import { getUser } from "../Scenes/Lobby/Lobby";
import { clipUsername } from "../Scenes/Lobby/LobbyUser";
import { countIf } from "../Utils/ArrayUtils";
import { createUnionDispatch } from "../Utils/UnionUtils";
import useCloseOnLoseFocus from "../Utils/UseCloseOnLoseFocus";
import usePrevious from "../Utils/UsePrevious";
import "./Style/LobbyChat.css";

export interface ChatProps {
    connection: BangConnection;
    lobbyState: LobbyState;
}

export default function LobbyChat({ connection, lobbyState: { myUserId, users, chatMessages: messages } }: ChatProps) {
    const messagesEnd = useRef<HTMLDivElement>(null);
    const inputMessage = useRef<HTMLInputElement>(null);
    
    const [isChatOpen, setIsChatOpen, chatRef] = useCloseOnLoseFocus<HTMLDivElement>();
    
    const countMessages = useMemo(() => countIf(messages, m => !m.flags.includes('is_read')), [messages]);
    const prevCountMessages = usePrevious(countMessages) ?? 0;

    const [numReadMessages, setNumReadMessages] = useState(0);
    const [numFinishedBubbles, setNumFinishedBubbles] = useState(0);

    const numUnreadMessages = isChatOpen ? 0 : (countMessages - numReadMessages);
    const numBubbles = isChatOpen ? 0 : (countMessages - numFinishedBubbles);

    const bubbleTimeouts = useRef<number[]>([]);
    
    useEffect(() => {
        const CHAT_BUBBLE_DURATION = 20000;
        if (isChatOpen) {
            setNumReadMessages(countMessages);
            setNumFinishedBubbles(countMessages);
            bubbleTimeouts.current.forEach(clearTimeout);
            bubbleTimeouts.current = [];
        } else {
            const diff = countMessages - prevCountMessages;
            if (diff > 0) {
                bubbleTimeouts.current.push(setTimeout(() => {
                    setNumFinishedBubbles(value => value + diff);
                    bubbleTimeouts.current.shift();
                }, CHAT_BUBBLE_DURATION));
            }
        }
    }, [isChatOpen, countMessages, prevCountMessages]);

    useLayoutEffect(() => {
        if (isChatOpen) {
            inputMessage.current?.focus();
        }
    }, [isChatOpen]);

    useLayoutEffect(() => {
        if (numReadMessages) {
            messagesEnd.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [numReadMessages]);

    const handleFormSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (inputMessage.current?.value) {
            connection.sendMessage({ lobby_chat: { message: inputMessage.current.value } });
            inputMessage.current.value = '';
            inputMessage.current.focus();
        }
    };

    const transformChatArg = useMemo(() => createUnionDispatch<LobbyChatArg, string>({
        user: user_id => clipUsername(getUser(users, user_id).username),
        integer: value => value.toString(),
        string: value => value
    }), [users]);

    const MessageTag = useCallback((props: ChatMessage) => {
        if (props.user_id === 0) {
            if (props.flags.includes('translated')) {
                return <p className='server-message'>{getLabel('chat', props.message, ...props.args.map(transformChatArg))}</p>;
            } else {
                return props.message.split('\n').map((line, index) => <p key={index} className='server-message'>{line}</p>);
            }
        } else {
            const pClass = props.user_id === myUserId ? 'text-right' : '';
            return <p className={pClass}><span className='username'>{clipUsername(getUser(users, props.user_id).username)}</span> : {props.message}</p>;
        }
    }, [users, myUserId, transformChatArg]);

    return <div ref={chatRef} className="lobby-chat-outer">
        <button className='
                w-8 h-8 md:w-12 md:h-12 relative
                p-2 ml-1 text-sm rounded-full focus:outline-none focus:ring-2 text-gray-400 bg-gray-600 hover:bg-gray-700 focus:ring-gray-800
            ' onClick={() => setIsChatOpen(value => !value)}>
            <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 60" xmlSpace="preserve">
                <g>
                    <path d="M26,9.586C11.664,9.586,0,20.09,0,33c0,4.499,1.418,8.856,4.106,12.627c-0.51,5.578-1.86,9.712-3.813,11.666
                        c-0.304,0.304-0.38,0.768-0.188,1.153C0.276,58.789,0.625,59,1,59c0.046,0,0.093-0.003,0.14-0.01
                        c0.349-0.049,8.432-1.213,14.317-4.585c3.33,1.333,6.874,2.009,10.544,2.009c14.336,0,26-10.503,26-23.414S40.337,9.586,26,9.586z"
                    />
                    <path d="M55.894,37.042C58.582,33.27,60,28.912,60,24.414C60,11.503,48.337,1,34,1c-8.246,0-15.968,3.592-20.824,9.42
                        C17.021,8.614,21.38,7.586,26,7.586c15.439,0,28,11.4,28,25.414c0,5.506-1.945,10.604-5.236,14.77
                        c4.946,1.887,9.853,2.6,10.096,2.634c0.047,0.006,0.094,0.01,0.14,0.01c0.375,0,0.724-0.211,0.895-0.554
                        c0.192-0.385,0.116-0.849-0.188-1.153C57.753,46.753,56.403,42.619,55.894,37.042z"/>
                </g>
            </svg>
            {numUnreadMessages > 0 && <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 text-white font-bold bg-red-600 rounded-full w-5 h-5">
                {numUnreadMessages}
            </div>}
        </button>
        {numBubbles > 0 && <div className="lobby-chat-bubble-outer"><div className="lobby-chat-bubble">
            {[...Array(numBubbles)].map((item, i) => {
                const index = messages.length - numBubbles + i;
                return <MessageTag key={index} {...messages[index]}/>;
            })}
        </div></div>}
        <div className={'lobby-chat-box ' + (!isChatOpen ? 'invisible' : '')}>
            {messages.length !== 0 && <div className="lobby-chat-messages">
                {messages.map((message, index) => <MessageTag key={index} {...message} />)}
                <div ref={messagesEnd} />
            </div>}
            <form className="lobby-chat-form" onSubmit={handleFormSubmit}>
                <input type="text" ref={inputMessage} className="
                border-2
                border-gray-300
                rounded-md
                p-1
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                " />
                <button type="submit" className="
                bg-blue-800
                hover:bg-blue-900
                text-white
                font-bold
                py-2
                px-4
                rounded-md
                focus:outline-none
                focus:ring-2
                focus:ring-blue-800
                "
                >{getLabel('ui', 'BUTTON_CHAT_SEND')}</button>
            </form>
        </div>
    </div>;
}