import { useLayoutEffect, useState } from "react";
import { isMobileDevice } from "./MobileCheck";

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