import { CSSProperties, useContext, useMemo } from "react";
import { getRectCenter } from "../../Utils/Rect";
import { useUpdateEveryFrame } from "../../Utils/UseInterval";
import CardView from "./CardView";
import { GameTableContext, TargetSelectorContext } from "./GameScene";
import { CardTracker } from "./Model/CardTracker";
import { Card, getCard } from "./Model/GameTable";
import { CardId } from "./Model/GameUpdate";
import { getPlayableCards, isSelectionPlaying } from "./Model/TargetSelector";
import "./Style/CardChoiceView.css";

export interface CardChoiceProps {
    getTracker: () => CardTracker;
    onClickCard?: (card: Card) => void;
}

interface CardChoiceInnerProps {
    cards: Card[];
    anchor: Card;
    tracker: CardTracker;
    onClickCard?: (card: Card) => void;
}

function CardChoiceInner({ cards, anchor, tracker, onClickCard }: CardChoiceInnerProps) {
    const anchorRect = useUpdateEveryFrame(() => tracker.getTablePocket(anchor.pocket)?.getCardRect(anchor.id));

    if (anchorRect) {
        const anchorCenter = getRectCenter(anchorRect);

        const cardChoiceStyle = {
            '--card-anchor-x': anchorCenter.x + 'px',
            '--card-anchor-y': anchorCenter.y + 'px'
        } as CSSProperties;

        return (
            <div className="card-choice" style={cardChoiceStyle}>
                <div className="card-choice-inner">
                    {cards.map(card => <CardView key={card.id} card={card} onClickCard={onClickCard} />)}
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default function CardChoiceView({ getTracker, onClickCard }: CardChoiceProps) {
    const table = useContext(GameTableContext);
    const selector = useContext(TargetSelectorContext);

    const choiceCards = useMemo((): [CardId, CardId[]] | undefined => {
        if (isSelectionPlaying(selector)) {
            const anchor = selector.selection.context.card_choice;
            if (anchor) {
                return [anchor, getPlayableCards({
                    ...selector,
                    selection: {
                        ...selector.selection,
                        playing_card: null
                    }
                })];
            }
        }
    }, [selector]);

    if (choiceCards) {
        const [anchor, cards] = choiceCards;
        return <CardChoiceInner
            cards={cards.map(id => getCard(table, id))}
            anchor={getCard(table, anchor)}
            tracker={getTracker()}
            onClickCard={onClickCard}
        />
    } else {
        return null;
    }
}