import { useEffect, useState } from "react";

export interface Converter<T> {
    fromString: (str: string) => T;
    toString: (value: T) => string;
}

export const stringConverter: Converter<string> = { fromString: str => str, toString : str => str };
export const intConverter: Converter<number> = { fromString: parseInt, toString: value => value.toString() };
export const jsonConverter: Converter<any> = { fromString: JSON.parse, toString: JSON.stringify };

export function useLocalStorage<T>(key: string, converter: Converter<T>) {
    const [value, setValue] = useState(() => {
        const stringValue = localStorage.getItem(key);
        if (stringValue) {
            return converter.fromString(stringValue);
        }
    });
    useEffect(() => {
        if (value) {
            localStorage.setItem(key, converter.toString(value));
        } else {
            localStorage.removeItem(key);
        }
    }, [value]);
    return [value, setValue] as const;
}