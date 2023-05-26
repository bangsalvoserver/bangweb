type MessageHandler = {
    type: string,
    handler: (message: any) => void
};

export class GameManager {
    private socket: WebSocket | null = null;
    private messageHandlers = new Map<number, MessageHandler>();
    private handlerCounter = 0;

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
            console.log('WebSocket connection established. sending connect message');
            self.receiveMessage('connect', {});
        };
        this.socket.onclose = function () {
            console.log('WebSocket connection closed');
            self.receiveMessage('disconnect', {});
            self.socket = null;
        };
    }

    receiveMessage(messageType: string, message: any) {
        this.messageHandlers.forEach(({type, handler}: MessageHandler, id: number) => {
            if (type === messageType) {
                handler(message);
            }
        });
    }

    onMessage(messageType: string, handler: (message: any) => void) {
        this.messageHandlers.set(this.handlerCounter, {type: messageType, handler: handler});
        return this.handlerCounter++;
    }

    removeHandlers(handlerIds: Array<number>) {
        handlerIds.forEach(id => this.messageHandlers.delete(id));
        if (this.messageHandlers.size === 0) {
            this.handlerCounter = 0;
        }
    }

    sendMessage(messageType: string, message: any) {
        this.socket?.send(JSON.stringify({[messageType]: message}));
    }
}


