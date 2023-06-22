import { CSSProperties, useReducer } from "react";
import { Point, Rect, getRectCenter } from "../../../Utils/Rect";
import { useInterval } from "../../../Utils/UseInterval";
import CardView from "../CardView";
import { Card, PocketRef } from "../Model/GameTable";
import { Milliseconds } from "../Model/GameUpdate";
import { CARD_SLOT_ID } from "../Pockets/CardSlot";
import { PocketPosition } from "../Pockets/PocketView";
import { CardTracker } from "./CardTracker";
import "./Style/MoveCardAnimation.css";

export interface MoveCardProps {
    tracker: CardTracker;
    card: Card;
    destPocket: PocketRef;
    duration: Milliseconds;
}

function clampCard(cardRect: Rect, pocket: PocketPosition | undefined, margin: number): Point {
    const cardCenter = getRectCenter(cardRect);
    const pocketRect = pocket?.getPocketRect();
    if (pocketRect) {
        const pocketLeft = pocketRect.x + margin;
        const pocketRight = pocketRect.x + pocketRect.w - margin;
        if (pocketLeft < pocketRight) {
            cardCenter.x = Math.max(pocketLeft, Math.min(pocketRight, cardCenter.x));
        }
    }
    return cardCenter;
}

export default function MoveCardAnimation({ tracker, card, destPocket, duration }: MoveCardProps) {
    const [, forceUpdate] = useReducer(a => !a, false);
    useInterval(forceUpdate, 0, []);

    const startPocket = tracker.getTablePocket(card.pocket);
    const startRect = startPocket?.getCardRect(CARD_SLOT_ID);

    const endPocket = tracker.getTablePocket(destPocket);
    const endRect = endPocket?.getCardRect(card.id) ?? startRect;

    // useEffect(() => endPocket?.scrollToEnd());

    if (startRect && endRect) {
        const startPoint = clampCard(startRect, startPocket, 0);
        const endPoint = clampCard(endRect, endPocket, 10);

        const style = {
            '--startX': startPoint.x + 'px',
            '--startY': startPoint.y + 'px',
            '--diffX': (endPoint.x - startPoint.x) + 'px',
            '--diffY': (endPoint.y - startPoint.y) + 'px',
            '--duration': duration + 'ms'
        } as CSSProperties;

        return (
            <div style={style} className="move-card-animation card-anchor">
                <CardView card={card} />
            </div>
        );
    } else {
        return null;
    }
}