import { RefObject, useCallback, useEffect, useState } from "react";

export function useEventListener<K extends keyof WindowEventMap>(key: K, ev: (this: Window, ev: WindowEventMap[K]) => any) {
    useEffect(() => {
        window.addEventListener(key, ev);
        return () => window.removeEventListener(key, ev);
    }, [key, ev]);
}

export function useFocusRefState<T extends Element>(ref: RefObject<T>) {
    const [isOpen, setIsOpen] = useState(false);
  
    useEventListener('click', useCallback(ev => {
      if (!ref.current?.contains(ev.target as Node)) {
        setIsOpen(false);
      }
    }, [ref]));
  
    return [isOpen, setIsOpen] as const;
}