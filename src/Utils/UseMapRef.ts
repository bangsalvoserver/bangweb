import { useMemo, useRef } from "react";

export interface MapRef<Key, Value> {
    get: (key: Key) => Value | null,
    set: (key: Key, value: Value | null) => void
};

export function useMapRef<Key, Value>(): MapRef<Key, Value> {
    const ref = useRef<Map<Key, Value>>(undefined);

    return useMemo(() => ({
        get: key => ref.current?.get(key) ?? null,

        set: (key, value) => {
            if (value) {
                if (!ref.current) {
                    ref.current = new Map<Key, Value>();
                }
                ref.current.set(key, value);
            } else if (ref.current) {
                ref.current.delete(key);
                if (ref.current.size === 0) {
                    ref.current = undefined;
                }
            }
        }
    }) as const, []);
}

export interface SetRef<Value> {
    add: (value: Value) => void,
    delete: (value: Value) => void,
    forEach: (fn: (value: Value) => void) => void
}

export function useSetRef<Value>(): SetRef<Value> {
    const ref = useRef<Set<Value>>(undefined);

    return useMemo(() => ({
        add: value => {
            if (!ref.current) {
                ref.current = new Set<Value>();
            }
            ref.current.add(value);
        },

        delete: value => {
            if (ref.current) {
                ref.current.delete(value);
                if (ref.current.size === 0) {
                    ref.current = undefined;
                }
            }
        },

        forEach: fn => ref.current?.forEach(fn)
    }) as const, []);
}