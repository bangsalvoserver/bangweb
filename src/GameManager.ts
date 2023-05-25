class MessageHandler {
    type: string;
    handler: (message: any) => void;

    constructor(type: string, handler: (message: any) => void) {
        this.type = type;
        this.handler = handler;
    }
    
}

export class GameManager {
    private socket: WebSocket;
    private messageHandlers = new Map<number, MessageHandler>();
    private handlerCounter: number = 0;
    
    constructor() {
        this.socket = new WebSocket('ws://salvoserver.my.to:47654');

        let gameManager = this; 

        this.socket.onmessage = function (event) {
            const data = JSON.parse(event.data);
            const messageType = Object.keys(data)[0];
            gameManager.receiveMessage(messageType, data[messageType]);
        };
        this.socket.onopen = function () {
            console.log('WebSocket connection established. sending connect message');
            gameManager.receiveMessage('connect', {});
        };
        this.socket.onclose = function () {
            console.log('WebSocket connection closed');
            gameManager.receiveMessage('disconnect', {});
        };
    }

    receiveMessage(messageType: string, message: any) {
        for (let handler of Object.values(this.messageHandlers)) {
            if (handler.type === messageType) {
                handler.handler(message);
            }
        }
    }

    onMessage(messageType: string, handler: (message: any) => void) {
        let messageHandler = new MessageHandler(messageType,handler);
        this.messageHandlers.set(this.handlerCounter, messageHandler);
        return this.handlerCounter++;
    }

    removeHandler(handlerId: number) {
        this.messageHandlers.delete(handlerId);
        if (this.messageHandlers.size === 0) {
            this.handlerCounter = 0;
        }
    }

    sendMessage(messageType: string, message: any) {
        this.socket.send(JSON.stringify({[messageType]: message}));
    }
}


