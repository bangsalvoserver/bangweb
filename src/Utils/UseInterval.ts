import { DependencyList } from "react";
import { useEffect } from "react";

export function useInterval(fn: (timeElapsed: number) => void, ms?: number, deps?: DependencyList) {
    let startTime = Date.now();
    useEffect(() => {
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