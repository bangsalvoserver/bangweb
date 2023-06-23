import { MutableRefObject, useRef } from "react";

export function useRefLazy<T>(init: () => T) {
    const ref = useRef() as MutableRefObject<T>;
    if (!ref.current) {
        ref.current = init();
    }
    return ref;
}

export function useMapRef<Key, Value>() {
    const mapRef = useRefLazy(() => new Map<Key, Value>());

    return {
        get: (key: Key) => mapRef.current.get(key),

        set: (key: Key) => (value: Value | null) => {
            if (value) {
                mapRef.current.set(key, value);
            } else {
                mapRef.current.delete(key);
            }
        }
    }
}

export type MapRef<Key, Value> = ReturnType<typeof useMapRef<Key,Value>>;