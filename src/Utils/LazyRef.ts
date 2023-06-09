import { MutableRefObject, useRef } from "react";

export function useRefLazy<T>(init: () => T) {
    const ref = useRef() as MutableRefObject<T>;
    if (!ref.current) {
        ref.current = init();
    }
    return ref;
}

export function setMapRef<Key, Value>(mapRef: MutableRefObject<Map<Key, Value>>, key: Key) {
    return (ref: Value | null) => {
        if (ref) {
            mapRef.current.set(key, ref);
        } else {
            mapRef.current.delete(key);
        }
    }
}