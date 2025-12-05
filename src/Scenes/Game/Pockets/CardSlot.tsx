import { CSSProperties, Ref, useImperativeHandle, useRef } from "react";
import { Milliseconds } from "../../../Model/ServerMessage";
import { getDivRect } from "../../../Utils/Rect";
import { CardRef } from "../Model/CardTracker";
import { CardId } from "../Model/GameUpdate";
import "./Style/CardSlot.css";

export const CARD_SLOT_ID_FROM: CardId = -1;
export const CARD_SLOT_ID_TO: CardId = -2;

export type StretchDirection = 'in' | 'out';

export interface CardSlotProps {
    cardRef?: Ref<CardRef>;
    stretch?: StretchDirection;
    duration?: Milliseconds;
}

export default function CardSlot({ cardRef, stretch, duration }: CardSlotProps) {
    const slotRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(cardRef, () => ({
        getRect: () => getDivRect(slotRef.current),
    }), []);

    let style: CSSProperties | undefined;
    let classes = ['card-slot'];

    if (duration !== undefined) {
        style = {
            '--duration': duration + 'ms'
        } as CSSProperties;

        classes.push('card-slot-stretch');
        if (stretch === 'in') {
            classes.push('card-slot-stretch-in');
        }
    }

    return <div className={classes.join(' ')} style={style} ref={slotRef} />
}