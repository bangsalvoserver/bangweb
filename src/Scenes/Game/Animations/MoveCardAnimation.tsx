import { CSSProperties, useCallback } from "react";
import { getRectCenter } from "../../../Utils/Rect";
import { useUpdateEveryFrame } from "../../../Utils/UseUpdateEveryFrame";
import CardView from "../CardView";
import { CardTracker } from "../Model/CardTracker";
import { Card, PocketId } from "../Model/GameTable";
import { Milliseconds } from "../Model/GameUpdate";
import { CARD_SLOT_ID_FROM, CARD_SLOT_ID_TO } from "../Pockets/CardSlot";
import "./Style/MoveCardAnimation.css";

export interface MoveCardProps {
    tracker: CardTracker;
    card: Card;
    destPocket: PocketId;
    duration: Milliseconds;
}

export default function MoveCardAnimation({ tracker, card, destPocket, duration }: MoveCardProps) {
    const [startRect, endRect] = useUpdateEveryFrame(useCallback(() => ([
        tracker.getTablePocket(card.pocket)?.getCardRect(CARD_SLOT_ID_FROM),
        tracker.getTablePocket(destPocket)?.getCardRect(CARD_SLOT_ID_TO)
    ]), [tracker, card, destPocket]));

    if (startRect) {
        const startPoint = getRectCenter(startRect);
        const endPoint = getRectCenter(endRect ?? startRect);

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