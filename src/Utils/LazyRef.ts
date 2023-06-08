import { MutableRefObject, useRef } from "react";

export function useRefLazy<T>(init: () => T) {
    const ref = useRef() as MutableRefObject<T>;
    if (!ref.current) {
        ref.current = init();
    }
    return ref;
}