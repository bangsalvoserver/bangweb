import { CSSProperties, useContext } from "react";
import { Milliseconds } from "../../../Model/ServerMessage";
import { getRectCenter } from "../../../Utils/Rect";
import useUpdateEveryFrame from "../../../Utils/UseUpdateEveryFrame";
import { getTokenSprite } from "../CardView";
import { GameStateContext } from "../GameScene";
import { TokenType } from "../Model/CardEnums";
import { CardTracker } from "../Model/CardTracker";
import { TokenPosition } from "../Model/GameUpdate";
import "./Style/MoveTokensAnimation.css";

export interface MoveTokensProps {
    tracker: CardTracker;
    token_type: TokenType;
    num_tokens: number;
    origin: TokenPosition;
    target: TokenPosition;
    duration: Milliseconds;
}

export default function MoveTokensAnimation ({ tracker, token_type, num_tokens, origin, target, duration }: MoveTokensProps) {
    const { table } = useContext(GameStateContext);

    const [startRect, endRect] = useUpdateEveryFrame(() => [
        tracker.getTokensRect(table, token_type, origin),
        tracker.getTokensRect(table, token_type, target)
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