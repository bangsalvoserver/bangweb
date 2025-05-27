import { CSSProperties } from "react";
import { Milliseconds } from "../../../Model/ServerMessage";
import { getRectCenter } from "../../../Utils/Rect";
import useUpdateEveryFrame from "../../../Utils/UseUpdateEveryFrame";
import { getTokenSprite } from "../CardView";
import { TokenType } from "../Model/CardEnums";
import { CardTracker, TokenPositionValue } from "../Model/CardTracker";
import "./Style/MoveTokensAnimation.css";

export interface MoveTokensProps {
    tracker: CardTracker;
    token_type: TokenType;
    num_tokens: number;
    origin: TokenPositionValue;
    target: TokenPositionValue;
    duration: Milliseconds;
}

export default function MoveTokensAnimation ({ tracker, token_type, num_tokens, origin, target, duration }: MoveTokensProps) {
    const [startRect, endRect] = useUpdateEveryFrame(() => [
        tracker.getTokensRect(token_type, origin),
        tracker.getTokensRect(token_type, target)
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
            '--num-tokens': num_tokens
        } as CSSProperties;

        const moveTokenIndexStyle = (i: number) => {
            return {
                '--move-token-index': i
            } as CSSProperties;
        };

        const tokenSprite = getTokenSprite(token_type);
        return (
            <div style={style} className='move-tokens-animation'>
                {[...Array(num_tokens)].map((item, i) => (
                    <div key={i} style={moveTokenIndexStyle(i)}
                        className={`${num_tokens <= 1 ? 'total-delay-0' : ''} card-token move-tokens-animation-inner`} >
                        <img className='card-token' src={tokenSprite} alt="" />
                    </div>
                ))}
            </div>
        );
    } else {
        return null;
    }
}