import { SceneType } from "../Scenes/SceneProps";

export type MessageHandler = {
    type: string,
    handler: (message: any) => void
};

export class GameManager {
    private socket: WebSocket | null = null;
    private messageHandlers = new Set<MessageHandler>();
    private setSceneFun: (scene: SceneType) => void;

    constructor(setSceneFun: (scene: SceneType) => void) {
        this.setSceneFun = setSceneFun;
    }

    changeScene(scene: SceneType) {
        this.setSceneFun(scene);
    }

    isConnected(): boolean {
        return this.socket != null;
    }

    connect(url: string) {
        this.socket = new WebSocket(url);
        let self = this; 

        this.socket.onmessage = function (event) {
            const data = JSON.parse(event.data);
            const messageType = Object.keys(data)[0];
            self.receiveMessage(messageType, data[messageType]);
        };
        this.socket.onopen = function () {
            console.log('WebSocket connection established');
            self.receiveMessage('connect', {});
        };
        this.socket.onclose = function () {
            console.log('WebSocket connection closed');
            self.receiveMessage('disconnect', {});
            self.socket = null;
        };
    }

    disconnect() {
        this.socket?.close();
    }

    receiveMessage(messageType: string, message: any) {
        this.messageHandlers.forEach(({type, handler}: MessageHandler) => {
            if (type === messageType) {
                handler(message);
            }
        });
    }

    onMessage(messageType: string, handler: (message: any) => void) {
        let messageHandler: MessageHandler = {type: messageType, handler: handler};
        this.messageHandlers.add(messageHandler);
        return messageHandler;
    }

    removeHandlers(handlers: MessageHandler[]) {
        handlers.forEach(hdl => this.messageHandlers.delete(hdl));
    }

    sendMessage(messageType: string, message: any) {
        this.socket?.send(JSON.stringify({[messageType]: message}));
    }
}


