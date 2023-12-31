import { Dispatch, useMemo, useRef } from "react";

export interface Channel<T> {
    update: (message: T) => void;
    clear: () => void;
    subscribe: (fn: Dispatch<T>) => void;
    unsubscribe: () => void;
};

export default function useChannel<T>(): Channel<T> {
    const messages = useRef<T[]>([]);
    const subscriber = useRef<Dispatch<T>>();

    return useMemo(() => {
        const flushMessages = () => {
            if (subscriber.current) {
                messages.current.forEach(subscriber.current);
                messages.current = [];
            }
        };
    
        const update = (message: T) => {
            messages.current.push(message);
            flushMessages();
        };
    
        const clear = () => {
            messages.current = [];
        };
    
        const subscribe = (fn: Dispatch<T>) => {
            subscriber.current = fn;
            flushMessages();
        };
    
        const unsubscribe = () => {
            subscriber.current = undefined;
        };
    
        return { update, clear, subscribe, unsubscribe } as const;
    }, []);

}