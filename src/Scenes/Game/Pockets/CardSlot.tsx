import { CSSProperties, Ref, useImperativeHandle, useRef } from "react";
import { getDivRect } from "../../../Utils/Rect";
import { CardRef } from "../Model/CardTracker";
import { CardId, Milliseconds } from "../Model/GameUpdate";
import "./Style/CardSlot.css";

export const CARD_SLOT_ID_FROM: CardId = -1;
export const CARD_SLOT_ID_TO: CardId = -2;

export interface CardSlotProps {
    cardRef?: Ref<CardRef>;
    stretch: 'in' | 'out';
    duration: Milliseconds;
}

export default function CardSlot({ cardRef, stretch, duration }: CardSlotProps) {
    const slotRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(cardRef, () => ({
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
}