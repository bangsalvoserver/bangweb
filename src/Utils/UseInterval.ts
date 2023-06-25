import { DependencyList, useEffect, useState } from "react";

export function useInterval(fn: (timeElapsed: number) => void, ms?: number, deps?: DependencyList) {
    useEffect(() => {
        let startTime = Date.now();
        const interval = setInterval(() => {
            let endTime = Date.now();
            fn(endTime - startTime);
            startTime = endTime;
        }, ms);
        return () => clearInterval(interval);
    }, deps);
}

export function useTimeout(fn: () => void, ms?: number, deps?: DependencyList) {
    useEffect(() => {
        const timeout = setTimeout(fn, ms);
        return () => clearTimeout(timeout);
    }, deps);
}

export const FRAMERATE = 60;

export function useUpdateEveryFrame<T>(fn: () => T): T {
    const [value, setValue] = useState(fn);
    useInterval(() => setValue(fn()), 1000 / FRAMERATE, []);
    return value;
}