import { CSSProperties, MutableRefObject, forwardRef, useImperativeHandle, useRef } from "react";
import { CardRef } from "./CardView";
import { getDivRect } from "../../Utils/Rect";
import { Milliseconds } from "./Model/GameUpdate";
import "./Style/CardSlot.css"

export interface CardSlotProps {
    stretch: 'in' | 'out';
    duration: Milliseconds;
}

const CardSlot = forwardRef<CardRef, CardSlotProps>(({ stretch, duration }, ref) => {
    const slotRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        getRect: () => slotRef.current ? getDivRect(slotRef.current) : undefined
    }));

    const style = {
        '--duration': duration + 'ms'
    } as CSSProperties;

    let classes = ['card-slot', 'card-slot-stretch'];

    if (stretch == 'in') {
        classes.push('card-slot-stretch-in');
    }

    return <div className={classes.join(' ')} style={style} ref={slotRef} />
});

export default CardSlot;