import { useMemo, useRef, useState } from "react";
import useChannel, { ChannelBase } from "./UseChannel";

export type ConnectionState =
    { state: 'initial' } |
    { state: 'connected' } |
    { state: 'disconnected', code: number | null, reason: string | null };

export interface WebSocketConnection<ServerMessage, ClientMessage> extends ChannelBase<ServerMessage> {
    connectionState: ConnectionState;
    connect: () => void;
    disconnect: () => void;
    sendMessage: (message: ClientMessage) => void;
}

export default function useWebSocket<ServerMessage, ClientMessage>(url: string): WebSocketConnection<ServerMessage, ClientMessage> {
    const channel = useChannel<ServerMessage>();
    const socket = useRef<WebSocket>();
    const [connectionState, setConnectionState] = useState<ConnectionState>({ state: 'initial' });

    return useMemo(() => ({
        subscribe: channel.subscribe,
        connectionState,

        connect: () => {
            if (socket.current) return;
            
            channel.clear();
            socket.current = new WebSocket(url);
            socket.current.onmessage = (event) => {
                channel.update(JSON.parse(event.data));
            };
            socket.current.onopen = () => {
                console.log('WebSocket connection established');
                setConnectionState({ state: 'connected' });
            };
            socket.current.onclose = (e) => {
                const reason = e.reason.trim();
                console.log(`WebSocket connection closed (reason = ${reason})`);
                setConnectionState({ state: 'disconnected', code: e.code, reason: reason.length === 0 ? null : reason });
                socket.current = undefined;
            };
            socket.current.onerror = () => {
                console.log('WebSocket connection error');
                setConnectionState({ state: 'disconnected', code: null, reason: 'CONNECTION_FAILURE' });
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

    } as const), [url, channel, connectionState]);
}


