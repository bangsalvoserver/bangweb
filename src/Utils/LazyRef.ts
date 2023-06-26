import { Dispatch, MutableRefObject, Reducer, useRef, useState } from "react";

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

export function useReducerRef<T, U>(reducer: Reducer<T, U>, init: () => T): readonly [T, MutableRefObject<T>, Dispatch<U>] {
    const [state, setState] = useState(init);
    const ref = useRef(state);
    const dispatch = (update: U) => {
        ref.current = reducer(ref.current, update);
        setState(ref.current);
    };
    return [state, ref, dispatch] as const;
}