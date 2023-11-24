import { DependencyList, useEffect, useRef } from "react";
import { ClientMessage } from "./ClientMessage";
import { ServerMessage } from "./ServerMessage";
import Env from "../Model/Env";

export type MessageHandler = {
    [K in ServerMessage as keyof K]?: (message: K[keyof K]) => void;
};

export interface Connection {
    isConnected: () => boolean;
    isLocked: () => boolean;
    setLocked: (locked: boolean) => void;
    connect: () => void;
    disconnect: () => void;
    addHandler: (handler: MessageHandler) => void;
    removeHandler: (handler: MessageHandler) => void;
    sendMessage: (message: ClientMessage) => void;
}

interface SocketConnectionState {
    socket: WebSocket;
    queuedMessages: ServerMessage[];
    locked: boolean;
}

function getServerUrl(): string {
    return Env.bangServerUrl ?? `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/server`;
}

export function useSocketConnection(): Connection {
    const state = useRef<SocketConnectionState>();
    const messageHandlers = useRef(new Set<MessageHandler>());

    const isConnected = () => state.current !== undefined;

    const isLocked = () => state.current?.locked ?? false;

    const setLocked = (locked: boolean) => {
        if (state.current) {
            state.current.locked = locked;
            if (!locked) {
                processMessages();
            }
        }
    };

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
            queuedMessages: [],
            locked: false
        };
    };

    const disconnect = () => state.current?.socket.close();

    const addHandler = (handler: MessageHandler) => messageHandlers.current.add(handler);

    const removeHandler = (handler: MessageHandler) => messageHandlers.current.delete(handler);

    const sendMessage = (message: ClientMessage) => {
        if (state.current?.socket.readyState == WebSocket.OPEN) {
            state.current.socket.send(JSON.stringify(message));
        }
    };

    const receiveMessage = (message: ServerMessage) => {
        if (state.current) {
            state.current.queuedMessages.push(message);
            if (!state.current.locked) {
                processMessages();
            }
        }
    };

    const processMessages = () => {
        if (state.current) {
            state.current.locked = false;
            for (const message of state.current.queuedMessages) {
                const [messageType, messageValue] = Object.entries(message)[0];
                for (const handler of messageHandlers.current) {
                    if (messageType in handler) {
                        const fn = handler[messageType as keyof typeof handler];
                        (fn as (message: unknown) => void)(messageValue);
                    }
                }
            }
            state.current.queuedMessages = [];
        }
    };

    return { isConnected, isLocked, setLocked, connect, disconnect, addHandler, removeHandler, sendMessage };
}

export function useHandler(connection: Connection, handler: MessageHandler, deps?: DependencyList) {
    useEffect(() => {
        connection.addHandler(handler);
        connection.setLocked(false);
        return () => connection.removeHandler(handler);
    }, deps);
}


