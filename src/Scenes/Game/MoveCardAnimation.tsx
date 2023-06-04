import { CSSProperties, useReducer } from "react";
import { getRectCenter } from "../../Utils/Rect";
import { useInterval } from "../../Utils/UseInterval";
import CardView from "./CardView";
import { Card, PocketRef } from "./Model/GameTable";
import { CardTracker } from "./PocketView";
import "./Style/MoveCardAnimation.css";
import { Milliseconds } from "../../Messages/GameUpdate";

export interface MoveCardProps {
    tracker: CardTracker;
    card: Card;
    destPocket: PocketRef;
    duration: Milliseconds;
}

export default function MoveCardAnimation({ tracker, card, destPocket, duration }: MoveCardProps) {
    const [, forceUpdate] = useReducer(a => !a, false);
    useInterval(forceUpdate, 0, []);

    const startRect = tracker.getPocketPosition(card.pocket)?.getCardRect(-1);
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
                <div className="move-top-left-half">
                    <CardView card={card} />
                </div>
            </div>
        );
    } else {
        return null;
    }
}