import { useEffect, useState } from "react";

export interface Converter<T> {
    fromString: (str: string) => T;
    toString: (value: T) => string;
}

export const stringConverter: Converter<string> = { fromString: str => str, toString : str => str };
export const intConverter: Converter<number> = { fromString: parseInt, toString: value => value.toString() };
export const floatConverter: Converter<number> = { fromString: parseFloat, toString: value => value.toString() };
export const boolConverter: Converter<boolean> = { fromString: str => str === 'true', toString: value => value ? 'true' : 'false' }
export const jsonConverter: Converter<any> = { fromString: JSON.parse, toString: JSON.stringify };

function useStorage<T>(key: string, converter: Converter<T>, storage: Storage) {
    const [value, setValue] = useState(() => {
        try {
            const stringValue = storage.getItem(key);
            if (stringValue) {
                return converter.fromString(stringValue);
            }
        } catch (e) {
            console.error(`Cannot get value of ${key} in storage:`, e);
        }
    });
    useEffect(() => {
        try {
            if (value) {
                storage.setItem(key, converter.toString(value));
            } else {
                storage.removeItem(key);
            }
        } catch (e) {
            console.error(`Cannot set value of ${key} in storage:`, e);
        }
    }, [key, converter, storage, value]);
    return [value, setValue] as const;
}

export function useLocalStorage<T>(key: string, converter: Converter<T>) {
    return useStorage(key, converter, localStorage);
}

export function useSessionStorage<T>(key: string, converter: Converter<T>) {
    return useStorage(key, converter, sessionStorage);
}