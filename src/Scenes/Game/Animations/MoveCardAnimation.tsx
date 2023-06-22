import { CSSProperties, useReducer } from "react";
import { Point, Rect, getRectCenter } from "../../../Utils/Rect";
import { useInterval } from "../../../Utils/UseInterval";
import CardView from "../CardView";
import { Card, PocketRef } from "../Model/GameTable";
import { Milliseconds } from "../Model/GameUpdate";
import { CARD_SLOT_ID } from "../Pockets/CardSlot";
import { CardTracker } from "./CardTracker";
import "./Style/MoveCardAnimation.css";

export interface MoveCardProps {
    tracker: CardTracker;
    card: Card;
    destPocket: PocketRef;
    duration: Milliseconds;
}

const CARD_HALF_W = 10;
const POCKET_MIN_W = 50;

function clampCardRect(cardRect: Rect, pocketRect: Rect | undefined): Point {
    if (pocketRect && pocketRect.w > POCKET_MIN_W) {
        if (cardRect.x < pocketRect.x) {
            return {
                x: pocketRect.x + CARD_HALF_W,
                y: pocketRect.y + pocketRect.h / 2
            };
        } else if (cardRect.x + cardRect.w > pocketRect.x + pocketRect.w) {
            return {
                x: pocketRect.x + pocketRect.w - CARD_HALF_W,
                y: pocketRect.y + pocketRect.h / 2
            };
        }
    }
    return getRectCenter(cardRect);
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
        const startPoint = clampCardRect(startRect, startPocket?.getPocketRect());
        const endPoint = clampCardRect(endRect, endPocket?.getPocketRect());

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