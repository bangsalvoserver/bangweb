import { Dispatch, RefObject, SetStateAction, createContext, useContext, useEffect } from "react";

export type OverlayIdType = 'card' | 'player_role';
export type OverlayId = { type: OverlayIdType, id: number };

export const SetCardOverlayContext = createContext<Dispatch<SetStateAction<OverlayId | undefined>> | null>(null);

export default function useCardOverlay(type: OverlayIdType, id: number, divRef?: RefObject<HTMLElement>) {
    const setCardOverlay = useContext(SetCardOverlayContext);

    useEffect(() => {
        if (!setCardOverlay || !divRef) return;
        
        const div = divRef.current;
        if (!div) throw new Error('useCardOverlay: divRef is not initialized'); 

        let timeout: number | undefined;
        let added = false;

        const overlayId = { type, id };

        const addOverlay = () => {
            timeout = setTimeout(() => {
                added = true;
                setCardOverlay(overlayId);
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
    }, [type, id, divRef, setCardOverlay]);
}