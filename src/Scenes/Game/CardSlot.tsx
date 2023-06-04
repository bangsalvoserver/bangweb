import { CSSProperties, MutableRefObject, forwardRef, useImperativeHandle, useRef } from "react";
import { CardRef } from "./CardView";
import { getDivRect } from "../../Utils/Rect";
import { Milliseconds } from "../../Messages/GameUpdate";
import "./Style/CardSlot.css"

export interface CardSlotProps {
    stretch: 'in' | 'out';
    duration: Milliseconds;
}

const CardSlot = forwardRef<CardRef, CardSlotProps>(({ stretch, duration }, ref) => {
    const slotRef = useRef() as MutableRefObject<HTMLDivElement>;

    useImperativeHandle(ref, () => ({
        getRect: () => getDivRect(slotRef.current)
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