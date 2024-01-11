import { RefObject, useEffect, useState } from "react";

export default function useCloseOnLoseFocus<T extends Element>(ref: RefObject<T>) {
    const [isOpen, setIsOpen] = useState(false);
  
    useEffect(() => {
      const callback = (ev: MouseEvent) => {
        if (!ref.current?.contains(ev.target as Node)) {
          setIsOpen(false);
        }
      };

      window.addEventListener('click', callback);
      return () => window.removeEventListener('click', callback);
    }, [ref]);
  
    return [isOpen, setIsOpen] as const;
}