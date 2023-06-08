import { CSSProperties, useContext, useEffect, useReducer } from "react";
import { getRectCenter } from "../../../Utils/Rect";
import { useInterval, useTimeout } from "../../../Utils/UseInterval";
import { CARD_SLOT_ID } from "../CardSlot";
import CardView from "../CardView";
import { Card, PocketRef } from "../Model/GameTable";
import { Milliseconds } from "../Model/GameUpdate";
import "./Style/MoveCardAnimation.css";
import { CardTracker } from "./CardTracker";

export interface MoveCardProps {
    tracker: CardTracker;
    card: Card;
    destPocket: PocketRef;
    duration: Milliseconds;
}

export default function MoveCardAnimation({ tracker, card, destPocket, duration }: MoveCardProps) {
    const [, forceUpdate] = useReducer(a => !a, false);
    useInterval(forceUpdate, 0, []);

    const startRect = tracker.getTablePocket(card.pocket)?.getCardRect(CARD_SLOT_ID);
    const endPocket = tracker.getTablePocket(destPocket);
    const endRect = endPocket?.getCardRect(card.id) ?? startRect;

    // useEffect(() => endPocket?.scrollToEnd());

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