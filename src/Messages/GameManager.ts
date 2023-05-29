import { Dispatch, SetStateAction, useEffect } from "react";

export type MessageHandler = [string, (message: any) => void];

export class GameManager {
    private socket?: WebSocket;
    private messageHandlers = new Set<MessageHandler>();
    private sceneCallback?: Dispatch<SetStateAction<JSX.Element>>;
    private queuedMessages = [] as [string, any][];
    private isLoading = true;

    setSceneCallback(sceneCallback: Dispatch<SetStateAction<JSX.Element>>) {
        this.sceneCallback = sceneCallback;
    }

    changeScene(scene: JSX.Element) {
        this.isLoading = true;
        if (this.sceneCallback) {
            this.sceneCallback(scene);
        }
    }

    isConnected(): boolean {
        return this.socket != undefined;
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

    processMessages() {
        this.isLoading = false;
        this.queuedMessages.forEach(([messageType, message]) => {
            this.messageHandlers.forEach(([type, handler]) => {
                if (type === messageType) {
                    handler(message);
                }
            });
        });
        this.queuedMessages = [];
    }

    receiveMessage(messageType: string, message: any) {
        this.queuedMessages.push([messageType, message]);
        if (!this.isLoading) {
            this.processMessages();
        }
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
}

export function useHandlers(gameManager: GameManager, deps: any[], ...handlers: MessageHandler[]) {
    useEffect(() => {
        handlers.forEach(handler => gameManager.addHandler(handler));
        gameManager.processMessages();
        return () => handlers.forEach(handler => gameManager.removeHandler(handler));
    }, deps);
}


