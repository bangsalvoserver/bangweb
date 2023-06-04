import { MutableRefObject, SyntheticEvent, useEffect, useRef } from "react";
import { Connection } from "../../Messages/Connection";
import { ChatMessage, UserId } from "../../Messages/ServerMessage";
import { UserValue, getUsername } from "./LobbyUser";
import "./Style/LobbyChat.css"
import { getLocalizedLabel } from "../../Locale/Locale";

export interface ChatProps {
    connection: Connection;
    myUserId: UserId;
    users: UserValue[];
    messages: ChatMessage[]
}

export default function LobbyChat({ connection, myUserId, users, messages }: ChatProps) {
    const messagesEnd = useRef<HTMLDivElement>(null);
    const inputMessage = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEnd.current?.scrollIntoView({ block: 'nearest', behavior:'smooth' });
    }, [messages]);

    const handleSendMessage = (event: SyntheticEvent) => {
        event.preventDefault();
        if (inputMessage.current?.value) {
            connection.sendMessage('lobby_chat', { message: inputMessage.current.value });
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
            <form className="lobby-chat-form" onSubmit={handleSendMessage}>
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
                    bg-blue-500
                    hover:bg-blue-600
                    text-white
                    py-2
                    px-4
                    rounded-md
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    "
                >{getLocalizedLabel('ui', 'LOBBY_CHAT_SEND')}</button>
            </form>
        </div>
    );
}