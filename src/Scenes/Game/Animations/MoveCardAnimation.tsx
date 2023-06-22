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

export default function MoveCardAnimation({ tracker, card, destPocket, duration }: MoveCardProps) {
    const [, forceUpdate] = useReducer(a => !a, false);
    useInterval(forceUpdate, 0, []);

    const startRect = tracker.getTablePocket(card.pocket)?.getCardRect(CARD_SLOT_ID);
    const endRect = tracker.getTablePocket(destPocket)?.getCardRect(card.id) ?? startRect;

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
            <div style={style} className="move-card-animation card-anchor">
                <CardView card={card} />
            </div>
        );
    } else {
        return null;
    }
}