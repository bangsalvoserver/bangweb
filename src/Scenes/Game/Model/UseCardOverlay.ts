import { createContext, Dispatch, RefObject, SetStateAction, useContext, useEffect } from "react";
import { buildCardRef, CardRef } from "./CardTracker";
import { CardImage } from "./GameTable";

export interface OverlayState {
    cardImage: CardImage;
    cardRef: CardRef;
};

export const SetCardOverlayContext = createContext<Dispatch<SetStateAction<OverlayState | undefined>> | null>(null);

export default function useCardOverlay(cardImage: CardImage, divRef: RefObject<HTMLDivElement>) {
    const setCardOverlay = useContext(SetCardOverlayContext);

    useEffect(() => {
        if (!setCardOverlay) return;
        
        const div = divRef.current;
        if (!div) {
            console.error('useCardOverlay: divRef is not initialized'); 
            return;
        }

        let timeout: number | undefined;
        let added = false;

        const cardRef = buildCardRef(divRef);

        const addOverlay = () => {
            timeout = setTimeout(() => {
                added = true;
                setCardOverlay({ cardImage, cardRef });
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
    }, [cardImage, divRef, setCardOverlay]);
}