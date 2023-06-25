import { CSSProperties } from "react";
import { getRectCenter } from "../../../Utils/Rect";
import { useUpdateEveryFrame } from "../../../Utils/UseInterval";
import CardView from "../CardView";
import { ScenarioDeckPocket } from "../Model/CardEnums";
import { CardTracker } from "../Model/CardTracker";
import { Card } from "../Model/GameTable";
import { Milliseconds, PlayerId } from "../Model/GameUpdate";
import "./Style/MoveCardAnimation.css";

export interface MoveScenarioDeckProps {
    tracker: CardTracker;
    card: Card;
    pocket: ScenarioDeckPocket;
    startPlayer?: PlayerId;
    endPlayer?: PlayerId;
    duration: Milliseconds;
}

export default function MoveScenarioDeckAnimation({ tracker, card, pocket, startPlayer, endPlayer, duration }: MoveScenarioDeckProps) {
    const [startRect, endRect] = useUpdateEveryFrame(() => ([
        startPlayer ? tracker.getPlayerPockets(startPlayer)?.get(pocket)?.getPocketRect() : undefined,
        endPlayer ? tracker.getPlayerPockets(endPlayer)?.get(pocket)?.getPocketRect() : undefined
    ]));

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
    }
    return null;
}