import { Dispatch, useMemo, useRef, useState } from "react";
import useObserver from "./UseObserver";

export interface Connection<ServerMessage, ClientMessage> {
    subscribe: (handler: Dispatch<ServerMessage>) => void;
    unsubscribe: () => void;
    isConnected: boolean;
    connect: () => void;
    disconnect: () => void;
    sendMessage: (message: ClientMessage) => void;
}

export default function useConnection<ServerMessage, ClientMessage>(url: string): Connection<ServerMessage, ClientMessage> {
    const observer = useObserver<ServerMessage>();
    const [isConnected, setIsConnected] = useState(false);
    const socket = useRef<WebSocket>();

    return useMemo(() => {
        const connect = () => {
            if (socket.current) return;
            
            observer.clear();
            socket.current = new WebSocket(url);
            socket.current.onmessage = (event) => {
                observer.update(JSON.parse(event.data));
            };
            socket.current.onopen = () => {
                console.log('WebSocket connection established');
                setIsConnected(true);
            };
            socket.current.onclose = () => {
                console.log('WebSocket connection closed');
                setIsConnected(false);
                socket.current = undefined;
            };
            socket.current.onerror = () => {
                console.log('WebSocket connection error');
                setIsConnected(false);
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
        
        return {
            subscribe: observer.subscribe,
            unsubscribe: observer.unsubscribe,
            isConnected, connect, disconnect, sendMessage
        } as const;
    }, [url, observer, isConnected]);
}


