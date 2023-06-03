import { MutableRefObject, useRef } from "react";

export function useMapRef<Key, Value>() {
    const ref = useRef() as MutableRefObject<Map<Key, Value>>;
    if (!ref.current) {
        ref.current = new Map<Key, Value>();
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