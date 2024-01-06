import { Dispatch, RefObject, SetStateAction, createContext, useContext, useEffect } from "react";
import { PlayerRole } from "./CardEnums";
import { Card } from "./GameTable";

interface OverlayIdType {
    'card': Card,
    'role': PlayerRole
};

type Distribute<K extends keyof OverlayIdType> = K extends any ? { type: K, value: OverlayIdType[K], divRef: RefObject<HTMLDivElement> } : never;
export type OverlayId = Distribute<keyof OverlayIdType>;

export const SetCardOverlayContext = createContext<Dispatch<SetStateAction<OverlayId | undefined>> | null>(null);

export default function useCardOverlay<K extends keyof OverlayIdType>(type: K, value: OverlayIdType[K], divRef: RefObject<HTMLElement>) {
    const setCardOverlay = useContext(SetCardOverlayContext);

    useEffect(() => {
        if (!setCardOverlay) return;
        
        const div = divRef.current;
        if (!div) throw new Error('useCardOverlay: divRef is not initialized'); 

        let timeout: number | undefined;
        let added = false;

        const addOverlay = () => {
            timeout = setTimeout(() => {
                added = true;
                setCardOverlay({ type, value, divRef } as OverlayId);
            }, 500);
        };

        const removeOverlay = () => {
            clearTimeout(timeout);
            if (added) {
                added = false;
                setCardOverlay(undefined);
            }
        };

        const resetTimeout = () => {
            removeOverlay();
            addOverlay();
        };

        div.addEventListener('mouseenter', addOverlay);
        div.addEventListener('mouseleave', removeOverlay);
        div.addEventListener('mousemove', resetTimeout);

        return () => {
            div.removeEventListener('mouseenter', addOverlay);
            div.removeEventListener('mouseleave', removeOverlay);
            div.removeEventListener('mousemove', resetTimeout);
            removeOverlay();
        }
    }, [type, value, divRef, setCardOverlay]);
}