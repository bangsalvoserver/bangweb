import { createContext, Dispatch, RefObject, SetStateAction, useContext, useEffect } from "react";
import { CardImage } from "./GameTable";
import { buildCardRef, CardRef } from "./CardTracker";

export interface OverlayState {
    cardImage: CardImage | string;
    cardName: string | undefined;
    cardRef: CardRef;
};

export const SetCardOverlayContext = createContext<Dispatch<SetStateAction<OverlayState | undefined>> | null>(null);

export default function useCardOverlay(cardImage: CardImage | string, cardName: string | undefined, divRef: RefObject<Element>) {
    const setCardOverlay = useContext(SetCardOverlayContext);

    useEffect(() => {
        if (!setCardOverlay) return;
        
        const div = divRef.current;
        if (!div) {
            console.error('useCardOverlay: divRef is not initialized'); 
            return;
        }

        const cardRef = buildCardRef(divRef);

        let timeout: number | undefined;
        let added = false;

        const addOverlay = () => {
            timeout = setTimeout(() => {
                added = true;
                setCardOverlay({ cardImage, cardName, cardRef });
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
            clearTimeout(timeout);
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
    }, [cardImage, cardName, divRef, setCardOverlay]);
}