import { Ref, useImperativeHandle, useRef } from "react";
import { getDivRect } from "../../Utils/Rect";
import { PlayerRef } from "./Model/CardTracker";

export interface PlayerSlotProps {
    playerRef?: Ref<PlayerRef>;
}

export default function PlayerSlotView({ playerRef }: PlayerSlotProps) {
    const divRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(playerRef, () => ({
        getPlayerRect: () => divRef.current ? getDivRect(divRef.current) : null,
        getPocket: () => null,
        getTokensRect: () => null
    }), []);

    return <div ref={divRef} className="player-slot" />;
}