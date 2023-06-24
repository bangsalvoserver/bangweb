import { CSSProperties, useContext, useReducer } from "react";
import { Rect, getRectCenter } from "../../../Utils/Rect";
import { useInterval } from "../../../Utils/UseInterval";
import { Card } from "../Model/GameTable";
import { Milliseconds } from "../Model/GameUpdate";
import "./Style/MoveCubeAnimation.css";
import { CardTracker } from "./CardTracker";

export interface MoveCubeProps {
    tracker: CardTracker;
    num_cubes: number;
    origin_card: Card | null;
    target_card: Card | null;
    duration: Milliseconds;
}

export default function MoveCubeAnimation ({ tracker, num_cubes, origin_card, target_card, duration }: MoveCubeProps) {
    const [, forceUpdate] = useReducer(a => !a, false);
    useInterval(forceUpdate, 0, []);

    const startRect = tracker.getCubesRect(origin_card);
    const endRect = tracker.getCubesRect(target_card);
    
    if (startRect && endRect) {
        const startPoint = getRectCenter(startRect);
        const endPoint = getRectCenter(endRect);
        
        const style = {
            '--startX': startPoint.x + 'px',
            '--startY': startPoint.y + 'px',
            '--diffX': (endPoint.x - startPoint.x) + 'px',
            '--diffY': (endPoint.y - startPoint.y) + 'px',
            '--duration': duration + 'ms',
            '--num-cubes': num_cubes
        } as CSSProperties;

        const moveCubeIndexStyle = (i: number) => {
            return {
                '--move-cube-index': i
            } as CSSProperties;
        };

        return (
            <div style={style} className='move-cubes-animation'>
                {[...Array(num_cubes)].map((item, i) => (
                    <div key={i} style={moveCubeIndexStyle(i)}
                        className={`${num_cubes <= 1 ? 'total-delay-0' : ''} move-cubes-animation-inner`} >
                        <img src='/media/sprite_cube.png' />
                    </div>
                ))}
            </div>
        );
    } else {
        return null;
    }
}