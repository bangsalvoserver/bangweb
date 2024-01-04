import { RefObject, useEffect, useMemo, useState } from "react";

export type OverlayIdType = 'card' | 'player_role';
export type OverlayId = { type: OverlayIdType, id: number };

export interface CardOverlayTracker {
  add: (card: OverlayId) => void;
  remove: (card: OverlayId) => void;
}

export function useCardOverlayState() {
    const [overlays, setOverlays] = useState<OverlayId[]>([]);
  
    const overlayId = useMemo(() => overlays.at(-1), [overlays]);
    const cardOverlayTracker: CardOverlayTracker = useMemo(() => ({
        add: id => setOverlays(ids => ids.concat(id)),
        remove: id => setOverlays(ids => {
            const index = ids.indexOf(id);
            if (index < 0) return ids;
            return ids.slice(0, index).concat(ids.slice(index + 1));
        })
    }), []);
  
    return { overlayId, cardOverlayTracker } as const;
  }

export function useCardOverlay(type: OverlayIdType, id: number, divRef?: RefObject<HTMLElement>, tracker?: CardOverlayTracker) {
    useEffect(() => {
        const div = divRef?.current;
        if (!div || !tracker) return;

        let timeout: number | undefined;
        let added = false;

        const overlayId = { type, id };

        const addOverlay = () => {
            timeout = setTimeout(() => {
                added = true;
                tracker.add(overlayId);
            }, 500);
        };

        const removeOverlay = () => {
            clearTimeout(timeout);
            if (added) {
                added = false;
                tracker.remove(overlayId);
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
    }, [type, id, divRef, tracker]);
}