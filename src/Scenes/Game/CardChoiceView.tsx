import { useContext, useMemo } from "react";
import { createPortal } from "react-dom";
import CardView from "./CardView";
import { GameTableContext, TargetSelectorContext } from "./GameScene";
import { CardTracker } from "./Model/CardTracker";
import { Card, getCard } from "./Model/GameTable";
import { getPlayableCards, isSelectionPlaying } from "./Model/TargetSelector";
import "./Style/CardChoiceView.css";

export interface CardChoiceProps {
    getTracker: () => CardTracker;
    onClickCard?: (card: Card) => void;
}

export default function CardChoiceView({ getTracker, onClickCard }: CardChoiceProps) {
    const table = useContext(GameTableContext);
    const selector = useContext(TargetSelectorContext);

    const choiceCards = useMemo((): [Card, Card[]] | undefined => {
        if (isSelectionPlaying(selector)) {
            const anchor = selector.selection.context.card_choice;
            if (anchor) {
                return [getCard(table, anchor), getPlayableCards({
                    ...selector,
                    selection: {
                        ...selector.selection,
                        playing_card: null
                    }
                }).map(card => getCard(table, card))];
            }
        }
    }, [selector]);

    if (choiceCards) {
        const [anchor, cards] = choiceCards;
        const anchorDiv = getTracker().getTablePocket(anchor.pocket)?.getCardDiv(anchor.id) ?? null;
        if (anchorDiv) {
            return createPortal(
                <div className="card-choice">
                    <div className="card-choice-inner">
                        {cards.map(card => <CardView key={card.id} card={card} onClickCard={onClickCard} />)}
                    </div>
                </div>,
                anchorDiv
            );
        }
    }
    return null;
}