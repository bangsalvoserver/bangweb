import "./Style/MoveCardAnimation.css";
import { Card, PocketRef } from "./Model/GameTable";
import CardView from "./CardView";
import { CSSProperties, useEffect, useState } from "react";
import { getRectCenter } from "../../Utils/Rect";
import { CardTracker } from "./PocketView";

export interface MoveCardProps {
    tracker: CardTracker;
    card: Card;
    destPocket: PocketRef;
    duration: number;
}

export default function MoveCardAnimation({ tracker, card, destPocket, duration }: MoveCardProps) {
    const [rerender, setRerender] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setRerender(true), 0);
        return () => clearTimeout(timeout);
    }, []);

    const startRect = tracker.getPocketPosition(card.pocket)?.getCardRect(card.id);
    const endRect = tracker.getPocketPosition(destPocket)?.getCardRect(card.id) ?? startRect;

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
                    <CardView card={card} forceRender />
                </div>
            </div>
        );
    } else {
        return null;
    }
}