import { Dispatch, MutableRefObject, Reducer, useCallback, useRef, useState } from "react";

export function useRefLazy<T>(init: () => T) {
    const ref = useRef() as MutableRefObject<T>;
    if (!ref.current) {
        ref.current = init();
    }
    return ref;
}

export interface MapRef<Key, Value> {
    get: (key: Key) => Value | null,
    set: (key: Key, value: Value | null) => void
};

export function useMapRef<Key, Value>(): MapRef<Key, Value> {
    const mapRef = useRefLazy(() => new Map<Key, Value>());

    return {
        get: key => mapRef.current.get(key) ?? null,

        set: (key, value) => {
            if (value) {
                mapRef.current.set(key, value);
            } else {
                mapRef.current.delete(key);
            }
        }
    }
}