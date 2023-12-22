import { useMemo, useRef } from "react";
import Env from "../Model/Env";
import { ClientMessage } from "./ClientMessage";
import { ServerMessage } from "./ServerMessage";

export type MessageHandler = {
    [K in ServerMessage as keyof K]: (message: K[keyof K]) => void;
};

export interface Connection {
    setHandler: (handler: MessageHandler | undefined) => void;
    isConnected: () => boolean;
    connect: () => void;
    disconnect: () => void;
    sendMessage: (message: ClientMessage) => void;
}

function getServerUrl(): string {
    return Env.bangServerUrl ?? `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/server`;
}

interface SocketConnectionState {
    socket: WebSocket;
    queuedMessages: ServerMessage[];
}

export function useSocketConnection(): Connection {
    const state = useRef<SocketConnectionState>();
    const messageHandler = useRef<MessageHandler>();

    return useMemo(() => {
        const processMessages = () => {
            if (!messageHandler.current) {
                throw new Error("No message handler");
            }
            if (state.current) {
                for (const message of state.current.queuedMessages) {
                    const [messageType, messageValue] = Object.entries(message)[0];
                    if (messageType in messageHandler.current) {
                        const fn = messageHandler.current[messageType as keyof MessageHandler];
                        (fn as (message: unknown) => void)(messageValue);
                    } else {
                        throw new Error(`No message handler for messageType ${messageType}`);
                    }
                }
                state.current.queuedMessages = [];
            }
        };

        const setHandler = (handler: MessageHandler | undefined) => {
            messageHandler.current = handler;
            if (messageHandler.current) {
                processMessages();
            }
        };

        const receiveMessage = (message: ServerMessage) => {
            if (state.current) {
                state.current.queuedMessages.push(message);
                if (messageHandler.current) {
                    processMessages();
                }
            }
        };

        const isConnected = () => state.current !== undefined;

        const connect = () => {
            const socket = new WebSocket(getServerUrl());
            socket.onmessage = (event) => {
                receiveMessage(JSON.parse(event.data));
            };
            socket.onopen = () => {
                console.log('WebSocket connection established');
                receiveMessage({ connected: {}});
            };
            socket.onclose = () => {
                console.log('WebSocket connection closed');
                receiveMessage({ disconnected: {}});
                state.current = undefined;
            };
            socket.onerror = () => {
                console.log('WebSocket connection error');
                receiveMessage({ disconnected: {}});
                state.current = undefined;
            };
            state.current = {
                socket,
                queuedMessages: []
            };
        };

        const disconnect = () => state.current?.socket.close();

        const sendMessage = (message: ClientMessage) => {
            if (state.current?.socket.readyState === WebSocket.OPEN) {
                state.current.socket.send(JSON.stringify(message));
            }
        };
    
        return { setHandler, isConnected, connect, disconnect, sendMessage } as const;
    }, []);
}


