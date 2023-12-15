import { useEffect, useLayoutEffect, useState } from "react";
import { isMobileDevice } from "./MobileCheck";

export function useInterval(fn: (timeElapsed: number) => void, ms?: number) {
    useEffect(() => {
        let startTime = Date.now();
        const interval = setInterval(() => {
            let endTime = Date.now();
            fn(endTime - startTime);
            startTime = endTime;
        }, ms);
        return () => clearInterval(interval);
    }, [fn, ms]);
}

export function useTimeout(fn: () => void, ms?: number) {
    useEffect(() => {
        const timeout = setTimeout(fn, ms);
        return () => clearTimeout(timeout);
    }, [fn, ms]);
}

export const FRAMERATE = isMobileDevice() ? 30 : 60;

export function useUpdateEveryFrame<T>(fn: () => T): T {
    const [value, setValue] = useState(fn);
    useLayoutEffect(() => {
        setValue(fn());
        const interval = setInterval(() => setValue(fn()), 1000 / FRAMERATE);
        return () => clearInterval(interval);
    }, [fn]);
    return value;
}