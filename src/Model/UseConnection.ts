import { Dispatch, useMemo, useRef } from "react";
import { ClientMessage } from "./ClientMessage";
import { ServerMessage } from "./ServerMessage";
import useObserver from "./UseObserver";

export interface Connection {
    subscribe: (handler: Dispatch<ServerMessage>) => void;
    unsubscribe: () => void;
    isConnected: () => boolean;
    connect: () => void;
    disconnect: () => void;
    sendMessage: (message: ClientMessage) => void;
}

export default function useConnection(url: string): Connection {
    const observer = useObserver<ServerMessage>();
    const socket = useRef<WebSocket>();

    return useMemo(() => {
        const isConnected = () => {
            return socket.current !== undefined;
        };
    
        const connect = () => {
            observer.clear();
            socket.current = new WebSocket(url);
            socket.current.onmessage = (event) => {
                observer.update(JSON.parse(event.data));
            };
            socket.current.onopen = () => {
                console.log('WebSocket connection established');
                observer.update({ connected: {}});
            };
            socket.current.onclose = () => {
                console.log('WebSocket connection closed');
                observer.update({ disconnected: {}});
                socket.current = undefined;
            };
            socket.current.onerror = () => {
                console.log('WebSocket connection error');
                observer.update({ disconnected: {}});
                socket.current = undefined;
            };
        };
    
        const disconnect = () => {
            socket.current?.close();
        };
    
        const sendMessage = (message: ClientMessage) => {
            if (socket.current?.readyState === WebSocket.OPEN) {
                socket.current.send(JSON.stringify(message));
            }
        };
        
        return { subscribe: observer.subscribe, unsubscribe: observer.unsubscribe, isConnected, connect, disconnect, sendMessage } as const;
    }, [url, observer]);
}


