import { useEffect } from "react";

export type MessageHandler = [string, (message: any) => void];

export class Connection {
    private socket?: WebSocket;
    private messageHandlers = new Set<MessageHandler>();
    private queuedMessages = [] as [string, any][];

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
        this.socket = new WebSocket(process.env.REACT_APP_BANG_SERVER_URL || '');
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const messageType = Object.keys(data)[0];
            this.receiveMessage(messageType, data[messageType]);
        };
        this.socket.onopen = () => {
            console.log('WebSocket connection established');
            this.receiveMessage('connect', {});
        };
        this.socket.onclose = () => {
            console.log('WebSocket connection closed');
            this.receiveMessage('disconnect', {});
            delete this.socket;
        };
        this.socket.onerror = () => {
            console.log('WebSocket connection error');
            this.receiveMessage('disconnect', {});
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

    sendMessage(messageType: string, message: any = {}) {
        if (this.socket?.readyState == WebSocket.OPEN) {
            this.socket.send(JSON.stringify({[messageType]: message}));
        }
    }

    private receiveMessage(messageType: string, message: any) {
        this.queuedMessages.push([messageType, message]);
        if (!this.locked) {
            this.processMessages();
        }
    }

    private processMessage(messageType: string, message: any) {
        this.messageHandlers.forEach(([type, handler]) => {
            if (type === messageType) {
                handler(message);
            }
        });
    }

    private processMessages() {
        this.locked = false;
        this.queuedMessages.forEach(([messageType, message]) => {
            this.processMessage(messageType, message);
        });
        this.queuedMessages = [];
    }
}

export function useHandlers(connection: Connection, ...handlers: MessageHandler[]) {
    useEffect(() => {
        handlers.forEach(handler => connection.addHandler(handler));
        connection.setLocked(false);
        return () => handlers.forEach(handler => connection.removeHandler(handler));
    }, []);
}


