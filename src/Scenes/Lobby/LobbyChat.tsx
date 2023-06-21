import { SyntheticEvent, useContext, useEffect, useRef } from "react";
import getLabel from "../../Locale/GetLabel";
import { ChatMessage, UserId } from "../../Messages/ServerMessage";
import { LobbyContext } from "./Lobby";
import { getUsername } from "./LobbyUser";
import "./Style/LobbyChat.css";
import { ConnectionContext } from "../../App";

export interface ChatProps {
    messages: ChatMessage[];
    myUserId?: UserId;
}

export default function LobbyChat({ messages, myUserId }: ChatProps) {
    const { users } = useContext(LobbyContext);
    const connection = useContext(ConnectionContext);
    
    const messagesEnd = useRef<HTMLDivElement>(null);
    const inputMessage = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEnd.current?.scrollIntoView({ block: 'nearest', behavior:'smooth' });
    }, [messages]);

    const handleFormSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (inputMessage.current?.value) {
            connection.sendMessage({ lobby_chat: { message: inputMessage.current.value }});
            inputMessage.current.value = '';
        }
    };

    const newMessageTag = (user_id: UserId, message: string, index: number) => {
        if (user_id) {
            const user = users.find(user => user.id == user_id);
            const pClass = user_id == myUserId ? 'self-message' : '';
            return (<p key={index} className={pClass}><span className='username'>{getUsername(user)}</span> : {message}</p>);
        } else {
            return (<p key={index} className='server-message'>{message}</p>);
        }
    };

    return (
        <div className="lobby-chat">
            {messages.length != 0 ? 
            <div className="lobby-chat-box">
                {messages.map(({ user_id, message}, index) => newMessageTag(user_id, message, index))}
                <div ref={messagesEnd} />
            </div> : null}
            <form className="lobby-chat-form" onSubmit={handleFormSubmit}>
                <input type="text" ref={inputMessage} className="
                    border-2
                    border-gray-300
                    rounded-md
                    p-2
                    w-64
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    " />
                <button type="submit" className="
                    bg-green-800
                    hover:bg-green-900
                    text-white
                    font-bold
                    py-2
                    px-4
                    rounded-md
                    focus:outline-none
                    focus:ring-2
                    focus:ring-green-800
                    "
                >{getLabel('ui', 'BUTTON_CHAT_SEND')}</button>
            </form>
        </div>
    );
}