import { useLayoutEffect, useState } from "react";
import { isMobileDevice } from "./MobileCheck";
import useEvent from "react-use-event-hook";

export const FRAMERATE = isMobileDevice() ? 30 : 60;

export default function useUpdateEveryFrame<T>(fn: () => T): T {
    const [value, setValue] = useState(fn);
    const fnMemo = useEvent(fn);

    useLayoutEffect(() => {
        setValue(fnMemo());
        const interval = setInterval(() => setValue(fnMemo()), 1000 / FRAMERATE);
        return () => clearInterval(interval);
    }, [fnMemo]);
    return value;
}