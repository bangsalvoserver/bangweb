import { MutableRefObject, SyntheticEvent, useRef } from "react";
import { Connection } from "../../Messages/Connection";
import { ChatMessage, UserId } from "../../Messages/ServerMessage";
import { UserValue, getUsername } from "./LobbyUser";
import { getLocalizedLabel } from "../../Locale/Locale";

export interface ChatProps {
    connection: Connection;
    myUserId: UserId;
    users: UserValue[];
    messages: ChatMessage[]
}

export default function LobbyChat({ connection, myUserId, users, messages }: ChatProps) {
    const inputMessage = useRef() as MutableRefObject<HTMLInputElement>;

    const handleSendMessage = (event: SyntheticEvent) => {
        event.preventDefault();
        if (inputMessage.current.value) {
            connection.sendMessage('lobby_chat', { message: inputMessage.current.value });
            inputMessage.current.value = '';
        }
    };

    const newMessageTag = (user_id: UserId, message: string, index: number) => {
        if (user_id) {
            const user = users.find(user => user.id == user_id);
            return (<li key={index}>{getUsername(user)} : {message}</li>);
        } else {
            return (<li key={index}>{message}</li>);
        }
    };

    return (
        <div>
            <ul>
            {messages.map(({ user_id, message}, index) => newMessageTag(user_id, message, index))}
            </ul>
            <form onSubmit={handleSendMessage}>
                <input type="text" ref={inputMessage} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}