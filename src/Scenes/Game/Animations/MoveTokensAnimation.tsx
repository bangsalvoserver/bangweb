import { CSSProperties } from "react";
import { Milliseconds } from "../../../Model/ServerMessage";
import { getRectCenter } from "../../../Utils/Rect";
import useUpdateEveryFrame from "../../../Utils/UseUpdateEveryFrame";
import { SPRITE_CUBE } from "../CardView";
import { SPRITE_FAME } from "../CardView";
import { CardTracker } from "../Model/CardTracker";
import { Card } from "../Model/GameTable";
import "./Style/MoveCubeAnimation.css";
import { TokenType } from "../Model/CardEnums";

export interface MoveCubeProps {
    tracker: CardTracker;
    token_type: TokenType;
    num_tokens: number;
    origin_card: Card | null;
    target_card: Card | null;
    duration: Milliseconds;
}

export default function MoveTokensAnimation ({ tracker, token_type, num_tokens, origin_card, target_card, duration }: MoveCubeProps) {
    const [startRect, endRect] = useUpdateEveryFrame(() => [
        tracker.getCubesRect(origin_card),
        tracker.getCubesRect(target_card)
    ]);
    
    if (startRect && endRect) {
        const startPoint = getRectCenter(startRect);
        const endPoint = getRectCenter(endRect);
        
        const style = {
            '--startX': startPoint.x + 'px',
            '--startY': startPoint.y + 'px',
            '--diffX': (endPoint.x - startPoint.x) + 'px',
            '--diffY': (endPoint.y - startPoint.y) + 'px',
            '--duration': duration + 'ms',
            '--num-cubes': num_tokens
        } as CSSProperties;

        const moveCubeIndexStyle = (i: number) => {
            return {
                '--move-cube-index': i
            } as CSSProperties;
        };

        let tokenSprite: string;

        switch (token_type) {
        case 'cube': tokenSprite = SPRITE_CUBE; break;
        case 'fame': tokenSprite = SPRITE_FAME; break;
        default: throw new Error('invalid token_type');
        }

        return (
            <div style={style} className='move-cubes-animation'>
                {[...Array(num_tokens)].map((item, i) => (
                    <div key={i} style={moveCubeIndexStyle(i)}
                        className={`${num_tokens <= 1 ? 'total-delay-0' : ''} move-cubes-animation-inner`} >
                        <img src={tokenSprite} alt="" />
                    </div>
                ))}
            </div>
        );
    } else {
        return null;
    }
}