import "./MoveCardAnimation.css";
import { Card, PocketRef } from "../Model/GameTable";
import CardView from "../CardView";
import { GetPocketRectFunction } from "./AnimationView";
import { CSSProperties } from "react";
import { getRectCenter } from "../PocketView";

export interface MoveCardProps {
    getPocketRect: GetPocketRectFunction;
    card: Card;
    destPocket: PocketRef;
    duration: number;
}

export default function MoveCardAnimation({ getPocketRect, card, destPocket, duration }: MoveCardProps) {
    const startRect = getPocketRect(card.pocket);
    const endRect = getPocketRect(destPocket);

    if (startRect && endRect) {
        const startPoint = getRectCenter(startRect);
        const endPoint = getRectCenter(endRect);

        const style = {
            '--startX': startPoint.x + 'px',
            '--startY': startPoint.y + 'px',
            '--diffX': (endPoint.x - startPoint.x) + 'px',
            '--diffY': (endPoint.y - startPoint.y) + 'px',
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