import { SyntheticEvent, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { getLabel, useLanguage } from "../Locale/Registry";
import { LobbyState } from "../Model/SceneState";
import { ChatMessage, LobbyChatArg } from "../Model/ServerMessage";
import { BangConnection } from "../Model/UseBangConnection";
import { getUser } from "../Scenes/Lobby/Lobby";
import { clipUsername } from "../Scenes/Lobby/LobbyUser";
import { countIf } from "../Utils/ArrayUtils";
import { isMobileDevice } from "../Utils/MobileCheck";
import { createUnionDispatch } from "../Utils/UnionUtils";
import useCloseOnLoseFocus from "../Utils/UseCloseOnLoseFocus";
import usePrevious from "../Utils/UsePrevious";
import "./Style/LobbyChat.css";
import { CHAT_ICON } from "./Icons/ChatIcon";

export interface ChatProps {
    connection: BangConnection;
    lobbyState: LobbyState;
}

export default function LobbyChat({ connection, lobbyState: { myUserId, users, chatMessages: messages } }: ChatProps) {
    const messagesEnd = useRef<HTMLDivElement>(null);
    const inputMessage = useRef<HTMLInputElement>(null);
    
    const language = useLanguage();
    
    const [isChatOpen, setIsChatOpen, chatRef] = useCloseOnLoseFocus<HTMLDivElement>();
    
    const countMessages = useMemo(() => countIf(messages, m => !m.flags.has('is_read')), [messages]);
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
        if (isChatOpen && !isMobileDevice()) {
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
        user: user_id => clipUsername(language, getUser(users, user_id).username),
        integer: value => value.toString(),
        string: value => value
    }), [language, users]);

    const MessageTag = useCallback((props: ChatMessage) => {
        if (props.user_id === 0) {
            if (props.flags.has('translated')) {
                return <p className='server-message'>{getLabel(language, 'chat', props.message, ...props.args.map(transformChatArg))}</p>;
            } else {
                return props.message.split('\n').map((line, index) => <p key={index} className='server-message'>{line}</p>);
            }
        } else {
            const pClass = props.user_id === myUserId ? 'text-right' : '';
            return <p className={pClass}><span className='username'>{clipUsername(language, getUser(users, props.user_id).username)}</span> : {props.message}</p>;
        }
    }, [language, users, myUserId, transformChatArg]);

    return <div ref={chatRef} className="lobby-chat-outer">
        <button className='
                w-8 h-8 md:w-12 md:h-12 relative
                p-2 ml-1 text-sm rounded-full focus:outline-none focus:ring-2 text-gray-400 bg-gray-600 hover:bg-gray-700 focus:ring-gray-800
            ' onClick={() => setIsChatOpen(value => !value)}>
            { CHAT_ICON }
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
                >{getLabel(language, 'ui', 'BUTTON_CHAT_SEND')}</button>
            </form>
        </div>
    </div>;
}