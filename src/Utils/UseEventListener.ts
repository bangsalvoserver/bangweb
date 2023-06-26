import { DependencyList, RefObject, useEffect, useState } from "react";

export function useEventListener<K extends keyof WindowEventMap>(key: K, ev: (this: Window, ev: WindowEventMap[K]) => any, deps?: DependencyList) {
    useEffect(() => {
        window.addEventListener(key, ev);
        return () => window.removeEventListener(key, ev);
    }, deps);
}

export function useFocusRefState<T extends Element>(ref: RefObject<T>) {
    const [isOpen, setIsOpen] = useState(false);
  
    useEventListener('click', ev => {
      if (!ref.current?.contains(ev.target as Node)) {
        setIsOpen(false);
      }
    }, []);
  
    return [isOpen, setIsOpen] as const;
}