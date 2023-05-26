type MessageHandler = {
    type: string,
    handler: (message: any) => void
};

export class GameManager {
    private socket: WebSocket | null = null;
    private messageHandlers = new Set<MessageHandler>();
    private sceneCallback?: (scene: JSX.Element) => void;
    private queuedMessages = [] as [string, any][];
    private isLoading = true;

    setSceneCallback(sceneCallback: (scene: JSX.Element) => void) {
        this.sceneCallback = sceneCallback;
    }

    changeScene(scene: JSX.Element) {
        this.isLoading = true;
        if (this.sceneCallback) {
            this.sceneCallback(scene);
        }
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

    processMessages() {
        this.queuedMessages.forEach(([messageType, message]) => {
            this.messageHandlers.forEach(({type, handler}: MessageHandler) => {
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

    addHandlers(handlers: [string, (message: any) => void][]) {
        let ret = handlers.map(([messageType, handler]) => {
            let messageHandler: MessageHandler = {type: messageType, handler};
            this.messageHandlers.add(messageHandler);
            return messageHandler;
        });
        this.isLoading = false;
        this.processMessages();
        
        return () => ret.forEach(hdl => this.messageHandlers.delete(hdl));
    }

    sendMessage(messageType: string, message: any = {}) {
        this.socket?.send(JSON.stringify({[messageType]: message}));
    }
}


