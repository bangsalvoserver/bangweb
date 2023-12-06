import { Ref, useImperativeHandle, useRef } from "react";
import { getDivRect } from "../../Utils/Rect";
import { PlayerRef } from "./Model/CardTracker";

export interface PlayerSlotProps {
    playerRef?: Ref<PlayerRef>;
}

export default function PlayerSlotView({ playerRef }: PlayerSlotProps) {
    const divRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(playerRef, () => ({
        getPocket: pocket => null,
        getPlayerRect: () => divRef.current ? getDivRect(divRef.current) : null
    }));

    return <div ref={divRef} className="player-slot" />;
}