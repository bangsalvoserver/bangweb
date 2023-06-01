import { CSSProperties } from "react";
import { Card, PocketRef } from "../../GameTable";
import CardView from "../CardView";
import { GetPocketRectFunction } from "./AnimationView";

export interface MoveCardProps {
    getPocketRect: GetPocketRectFunction;
    card: Card;
    destPocket: PocketRef;
    amount: number;
}

export default function MoveCardAnimation({ getPocketRect, card, destPocket, amount }: MoveCardProps) {
    const rectCenter = (rect?: DOMRect) => {
        if (rect) {
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            }
        } else {
            return undefined;
        }
    };

    const sourcePos = rectCenter(getPocketRect(card.pocket));
    const destPos = rectCenter(getPocketRect(destPocket));

    const lerp = (from: number, to: number) => {
        return (to - from) * amount + from;
    };

    if (sourcePos && destPos) {
        const style: CSSProperties = {
            position: 'absolute',
            left: lerp(sourcePos.x, destPos.x),
            top: lerp(sourcePos.y, destPos.y),
            transform: 'translate(-50%, -50%)'
        };

        return <div style={style}><CardView card={card} /></div>
    } else {
        return null;
    }
}