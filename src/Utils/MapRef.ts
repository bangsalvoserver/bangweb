import { MutableRefObject } from "react";
import { useRefLazy } from "./LazyRef";

export function useMapRef<Key, Value>() {
    return useRefLazy(() => new Map<Key, Value>());
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