import { Dispatch, useMemo, useRef, useState } from "react";
import useChannel from "./UseChannel";

export interface WebSocketConnection<ServerMessage, ClientMessage> {
    subscribe: (handler: Dispatch<ServerMessage>) => void;
    unsubscribe: () => void;
    isConnected: boolean;
    connect: () => void;
    disconnect: () => void;
    sendMessage: (message: ClientMessage) => void;
}

export default function useWebSocket<ServerMessage, ClientMessage>(url: string): WebSocketConnection<ServerMessage, ClientMessage> {
    const channel = useChannel<ServerMessage>();
    const socket = useRef<WebSocket>();
    const [isConnected, setIsConnected] = useState(false);

    return useMemo(() => ({
        subscribe: channel.subscribe,
        unsubscribe: channel.unsubscribe,
        isConnected,

        connect: () => {
            if (socket.current) return;
            
            channel.clear();
            socket.current = new WebSocket(url);
            socket.current.onmessage = (event) => {
                channel.update(JSON.parse(event.data));
            };
            socket.current.onopen = () => {
                console.log('WebSocket connection established');
                setIsConnected(true);
            };
            socket.current.onclose = () => {
                console.log('WebSocket connection closed');
                setIsConnected(false);
                socket.current = undefined;
            };
            socket.current.onerror = () => {
                console.log('WebSocket connection error');
                setIsConnected(false);
                socket.current = undefined;
            };
        },

        disconnect: () => {
            socket.current?.close();
        },

        sendMessage: (message: ClientMessage) => {
            if (socket.current?.readyState === WebSocket.OPEN) {
                socket.current.send(JSON.stringify(message));
            }
        }

    } as const), [url, channel, isConnected]);
}


