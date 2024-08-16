import { CSSProperties, useContext } from "react";
import { getRectCenter } from "../../Utils/Rect";
import useUpdateEveryFrame from "../../Utils/UseUpdateEveryFrame";
import CardView from "./CardView";
import { GameStateContext } from "./GameScene";
import { CardTracker } from "./Model/CardTracker";
import { Card, getCard } from "./Model/GameTable";
import { CardId } from "./Model/GameUpdate";
import { getModifierContext, getAllPlayableCards, isCardCurrent } from "./Model/TargetSelector";
import "./Style/CardChoiceView.css";
import { getCardPocket } from "./Model/Filters";

export interface CardChoiceProps {
    tracker: CardTracker;
}

interface CardChoiceInnerProps {
    cards: Card[];
    anchor: Card;
    tracker: CardTracker;
}

function CardChoiceInner({ cards, anchor, tracker }: CardChoiceInnerProps) {
    const anchorRect = useUpdateEveryFrame(() => tracker.getTablePocket(anchor.pocket)?.getCardRect(anchor.id));
    
    if (!anchorRect) return null;
    const anchorCenter = getRectCenter(anchorRect);

    const cardChoiceStyle = {
        '--card-anchor-x': anchorCenter.x + 'px',
        '--card-anchor-y': anchorCenter.y + 'px'
    } as CSSProperties;

    return (
        <div className="card-choice" style={cardChoiceStyle}>
            <div className="card-choice-inner">
                { cards.map(card => <CardView key={card.id} card={card} />) }
            </div>
        </div>
    );
}

export default function CardChoiceView({ tracker }: CardChoiceProps) {
    const { table, selector } = useContext(GameStateContext);

    if (selector.mode === 'start') return null;

    const cardId = getModifierContext(selector, 'card_choice');
    if (!cardId) return null;

    let anchor = getCard(table, cardId);
    if (!isCardCurrent(selector, anchor)) return null;

    if (getCardPocket(anchor) === 'hidden_deck') {
        let lastTarget: CardId | undefined;
        for (const { targets } of selector.modifiers) {
            for (const target of targets) {
                if ('card' in target) {
                    lastTarget = target.card;
                }
            }
        }
        if (lastTarget) {
            anchor = getCard(table, lastTarget);
        }
    }

    let cards: Card[] = [];
    for (const [card, ] of getAllPlayableCards(selector)) {
        cards.push(getCard(table, card));
    }

    return <CardChoiceInner cards={cards} anchor={anchor} tracker={tracker} />
}