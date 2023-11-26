import { forwardRef, useImperativeHandle, useRef } from "react";
import { PlayerRef } from "./Model/CardTracker";
import { getDivRect } from "../../Utils/Rect";

const PlayerSlotView = forwardRef<PlayerRef>((_, ref) => {
    const playerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        getPocket: pocket => null,
        getPlayerRect: () => playerRef.current ? getDivRect(playerRef.current) : null
    }));

    return <div ref={playerRef} className="player-slot" />;
})

export default PlayerSlotView;