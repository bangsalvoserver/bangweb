import { DependencyList, useEffect } from "react";
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

export class SocketConnection implements Connection {
    private socket?: WebSocket;
    private messageHandlers = new Set<MessageHandler>();
    private queuedMessages: ServerMessage[] = [];

    private locked = false;

    isConnected(): boolean {
        return this.socket != undefined;
    }

    isLocked(): boolean {
        return this.locked;
    }

    setLocked(locked: boolean) {
        this.locked = locked;
        if (!locked) {
            this.processMessages();
        }
    }

    connect() {
        this.socket = new WebSocket(Env.bangServerUrl);
        this.socket.onmessage = (event) => {
            this.receiveMessage(JSON.parse(event.data));
        };
        this.socket.onopen = () => {
            console.log('WebSocket connection established');
            this.receiveMessage({ connected: {}});
        };
        this.socket.onclose = () => {
            console.log('WebSocket connection closed');
            this.receiveMessage({ disconnected: {}});
            delete this.socket;
        };
        this.socket.onerror = () => {
            console.log('WebSocket connection error');
            this.receiveMessage({ disconnected: {}});
            delete this.socket;
        };
    }

    disconnect() {
        this.socket?.close();
    }

    addHandler(handler: MessageHandler) {
        this.messageHandlers.add(handler);
    }
    
    removeHandler(handler: MessageHandler) {
        this.messageHandlers.delete(handler);
    }

    sendMessage(message: ClientMessage) {
        if (this.socket?.readyState == WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        }
    }

    private receiveMessage(message: ServerMessage) {
        this.queuedMessages.push(message);
        if (!this.locked) {
            this.processMessages();
        }
    }

    private processMessage(message: ServerMessage) {
        const [messageType, messageValue] = Object.entries(message)[0];
        this.messageHandlers.forEach(handler => {
            if (messageType in handler) {
                const fn = handler[messageType as keyof typeof handler];
                (fn as (message: unknown) => void)(messageValue);
            }
        });
    }

    private processMessages() {
        this.locked = false;
        this.queuedMessages.forEach(message => {
            this.processMessage(message);
        });
        this.queuedMessages = [];
    }
}

export function useHandler(connection: Connection, handler: MessageHandler, deps?: DependencyList) {
    useEffect(() => {
        connection.addHandler(handler);
        connection.setLocked(false);
        return () => connection.removeHandler(handler);
    }, deps);
}


