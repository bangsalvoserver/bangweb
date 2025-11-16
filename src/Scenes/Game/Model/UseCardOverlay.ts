import { Dispatch, RefObject, SetStateAction, createContext, useContext, useEffect } from "react";
import { CardImage } from "./GameTable";
import { CardRegistryEntry } from "../../../Locale/Registry";
import { buildCardRef, CardRef } from "./CardTracker";

export interface OverlayState {
    cardImage: CardImage | string;
    entry: CardRegistryEntry | undefined;
    cardRef: CardRef;
};

export const SetCardOverlayContext = createContext<Dispatch<SetStateAction<OverlayState | undefined>> | null>(null);

export default function useCardOverlay(cardImage: CardImage | string, entry: CardRegistryEntry | undefined, divRef: RefObject<HTMLDivElement>) {
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

        const addOverlay = () => {
            timeout = setTimeout(() => {
                added = true;
                setCardOverlay({ cardImage, entry, cardRef: buildCardRef(divRef) });
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
    }, [cardImage, entry, divRef, setCardOverlay]);
}