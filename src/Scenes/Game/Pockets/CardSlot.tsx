import { CSSProperties, forwardRef, useImperativeHandle, useRef } from "react";
import { getDivRect } from "../../../Utils/Rect";
import { CardRef } from "../CardView";
import { CardId, Milliseconds } from "../Model/GameUpdate";
import "./Style/CardSlot.css";

export const CARD_SLOT_ID_FROM: CardId = -1;
export const CARD_SLOT_ID_TO: CardId = -2;

export interface CardSlotProps {
    stretch: 'in' | 'out';
    duration: Milliseconds;
}

const CardSlot = forwardRef<CardRef, CardSlotProps>(({ stretch, duration }, ref) => {
    const slotRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        getRect: () => slotRef.current ? getDivRect(slotRef.current) : null
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