import { Dispatch, useMemo, useRef } from "react";

export interface ChannelBase<T> {
    subscribe: (fn: Dispatch<T>) => () => void;
}

export interface Channel<T> extends ChannelBase<T> {
    update: (message: T) => void;
    clear: () => void;
}

export default function useChannel<T>(): Channel<T> {
    const messages = useRef<T[]>([]);
    const subscriber = useRef<Dispatch<T>>(undefined);

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
            return () => subscriber.current = undefined;
        };
    
        return { update, clear, subscribe } as const;
    }, []);

}