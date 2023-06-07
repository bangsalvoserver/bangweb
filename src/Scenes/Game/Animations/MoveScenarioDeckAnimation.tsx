import { CSSProperties, useContext, useReducer } from "react";
import { getRectCenter } from "../../../Utils/Rect";
import { useInterval } from "../../../Utils/UseInterval";
import CardView from "../CardView";
import { ScenarioDeckPocket } from "../Model/CardEnums";
import { Card } from "../Model/GameTable";
import { Milliseconds, PlayerId } from "../Model/GameUpdate";
import "./Style/MoveCardAnimation.css";
import { CardTrackerContext } from "./CardTracker";

export interface MoveScenarioDeckProps {
    card: Card;
    pocket: ScenarioDeckPocket;
    startPlayer?: PlayerId;
    endPlayer?: PlayerId;
    duration: Milliseconds;
}

export default function MoveScenarioDeckAnimation({ card, pocket, startPlayer, endPlayer, duration }: MoveScenarioDeckProps) {
    const tracker = useContext(CardTrackerContext);
    
    const [, forceUpdate] = useReducer(a => !a, false);
    useInterval(forceUpdate, 0, []);

    const startRect = startPlayer ? tracker.getPlayerPockets(startPlayer)?.get(pocket)?.getPocketRect() : undefined;
    const endRect = endPlayer ? tracker.getPlayerPockets(endPlayer)?.get(pocket)?.getPocketRect() : undefined;

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
    }
    return null;
}