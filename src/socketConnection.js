

function GameManager(socket) {
    this.socket = socket;
    this.messageHandlers = {}; // {handlerId: {type: messageType, handler: handler}}
    this.handlerCounter = 0;
    


    this.receiveMessage = (messageType, message) => {
      for (let handler of Object.values(this.messageHandlers)) {
          if (handler.type === messageType) {
              handler.handler(message);
          }
      }
    };
    this.onMessage = (messageType, handler) => {
        let messageHandler = {type: messageType, handler: handler};
        this.messageHandlers[this.handlerCounter] = messageHandler;
        return this.handlerCounter++;
    };
    this.removeHandler = (handlerId) => {
        delete this.messageHandlers[handlerId];
        if (Object.keys(this.messageHandlers).length === 0) {
            this.handlerCounter = 0;
        }
    };
    this.sendMessage = (messageType, message) => {
        this.socket.send(JSON.stringify({ [messageType]: message }));
    };

}


export const createGameManager = () => {
    const socket = new WebSocket('ws://salvoserver.my.to:47654');
 
    let gameManager = new GameManager(socket);
    socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        const messageType = Object.keys(data)[0];
        gameManager.receiveMessage(messageType, data[messageType]);
    };
    socket.onopen = function () {
        console.log('WebSocket connection established. sending connect message');
        gameManager.receiveMessage('connect', {});
    };
    socket.onclose = function () {
        console.log('WebSocket connection closed');
        gameManager.receiveMessage('disconnect', {});
    };
    return gameManager;
};
