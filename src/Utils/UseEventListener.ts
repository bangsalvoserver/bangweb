import { DependencyList, useEffect } from "react";

export function useEventListener<K extends keyof WindowEventMap>(key: K, ev: (this: Window, ev: WindowEventMap[K]) => any, deps?: DependencyList) {
    useEffect(() => {
        window.addEventListener(key, ev);
        return () => window.removeEventListener(key, ev);
    }, deps);
}