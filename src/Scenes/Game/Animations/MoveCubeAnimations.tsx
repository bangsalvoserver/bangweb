import { CSSProperties, useCallback } from "react";
import { getRectCenter } from "../../../Utils/Rect";
import { useUpdateEveryFrame } from "../../../Utils/UseInterval";
import { CardTracker } from "../Model/CardTracker";
import { Card } from "../Model/GameTable";
import { Milliseconds } from "../Model/GameUpdate";
import "./Style/MoveCubeAnimation.css";
import { SPRITE_CUBE } from "../CardView";

export interface MoveCubeProps {
    tracker: CardTracker;
    num_cubes: number;
    origin_card: Card | null;
    target_card: Card | null;
    duration: Milliseconds;
}

export default function MoveCubeAnimation ({ tracker, num_cubes, origin_card, target_card, duration }: MoveCubeProps) {
    const [startRect, endRect] = useUpdateEveryFrame(useCallback(() => ([
        tracker.getCubesRect(origin_card),
        tracker.getCubesRect(target_card)
    ]), [tracker, origin_card, target_card]));
    
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
                        <img src={SPRITE_CUBE} alt="" />
                    </div>
                ))}
            </div>
        );
    } else {
        return null;
    }
}