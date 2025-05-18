import { CSSProperties, useContext } from "react";
import { Milliseconds } from "../../../Model/ServerMessage";
import { isMobileDevice } from "../../../Utils/MobileCheck";
import { getRectCenter } from "../../../Utils/Rect";
import useUpdateEveryFrame from "../../../Utils/UseUpdateEveryFrame";
import CardView from "../CardView";
import { GameStateContext } from "../GameScene";
import { TablePocketType } from "../Model/CardEnums";
import { CardTracker } from "../Model/CardTracker";
import { getCard, newPocketId } from "../Model/GameTable";
import { CardId, ShufflePocket } from "../Model/GameUpdate";
import "./Style/DeckShuffleAnimation.css";

export interface DeckShuffleProps {
    tracker: CardTracker;
    cards: CardId[];
    fromPocket: TablePocketType;
    pocket: ShufflePocket;
    duration: Milliseconds;
}

const MAX_CARDS = isMobileDevice() ? 10 : 30;

export default function DeckShuffleAnimation({ tracker, fromPocket, pocket, cards, duration }: DeckShuffleProps) {
    const { table } = useContext(GameStateContext);
    
    const [startRect, endRect] = useUpdateEveryFrame(() => [
        tracker.getTablePocket(newPocketId(fromPocket))?.getPocketRect(),
        tracker.getTablePocket(newPocketId(pocket))?.getPocketRect()
    ]);

    if (startRect && endRect) {
        cards = cards.slice(-MAX_CARDS);

        const startPoint = getRectCenter(startRect);
        const endPoint = getRectCenter(endRect);

        const style = {
            '--startX': startPoint.x + 'px',
            '--startY': startPoint.y + 'px',
            '--diffX': (endPoint.x - startPoint.x) + 'px',
            '--diffY': (endPoint.y - startPoint.y) + 'px',
            '--duration': duration + 'ms',
            '--num-cards': cards.length
        } as CSSProperties;

        const cardIndexStyle = (index: number) => {
            return {
                '--card-index': index
            } as CSSProperties;
        };

        return (
            <div className={`deck-shuffle-animation ${pocket === 'feats_deck' ? 'feats-cards' : ''}`} style={style}>
                {cards.map((id, index) => (
                    <div key={index} className="deck-shuffle-animation-inner card-anchor" style={cardIndexStyle(cards.length - index - 1)}>
                        <CardView card={getCard(table, id)} showBackface />
                    </div>
                ))}
            </div>
        )
    }

    return null;
}