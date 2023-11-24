import { useRef } from "react";

export interface MapRef<Key, Value> {
    get: (key: Key) => Value | null,
    set: (key: Key, value: Value | null) => void
};

export default function useMapRef<Key, Value>(): MapRef<Key, Value> {
    const mapRef = useRef(new Map<Key, Value>());

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