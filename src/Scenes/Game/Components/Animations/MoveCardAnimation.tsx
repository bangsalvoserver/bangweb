import "./MoveCardAnimation.css";
import { Card, PocketRef } from "../../GameTable";
import CardView from "../CardView";
import { GetPocketRectFunction } from "./AnimationView";
import { CSSProperties } from "react";

export interface MoveCardProps {
    getPocketRect: GetPocketRectFunction;
    card: Card;
    destPocket: PocketRef;
    duration: number;
}

export default function MoveCardAnimation({ getPocketRect, card, destPocket, duration }: MoveCardProps) {
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

    if (sourcePos && destPos) {
        const style = {
            '--startX': sourcePos.x + 'px',
            '--startY': sourcePos.y + 'px',
            '--diffX': (destPos.x - sourcePos.x) + 'px',
            '--diffY': (destPos.y - sourcePos.y) + 'px',
            '--duration': duration + 'ms'
        } as CSSProperties;

        return (
            <div style={style} className="move-card-animation">
                <div className="move-card-animation-inner">
                    <CardView card={card} />
                </div>
            </div>
        );
    } else {
        return null;
    }
}