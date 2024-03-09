import { useEffect, useRef, useState } from "react";

export default function useCloseOnLoseFocus<T extends Element>() {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<T>(null);
  
    useEffect(() => {
      const callback = (ev: MouseEvent) => {
        if (ref.current && !ref.current.contains(ev.target as Node)) {
          setIsOpen(false);
        }
      };

      window.addEventListener('mousedown', callback);
      return () => window.removeEventListener('mousedown', callback);
    }, []);
  
    return [ isOpen, setIsOpen, ref ] as const;
}