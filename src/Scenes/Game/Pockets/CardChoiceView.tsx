import { CSSProperties, useContext } from "react";
import { getRectCenter, relativeToWindow } from "../../../Utils/Rect";
import useUpdateEveryFrame from "../../../Utils/UseUpdateEveryFrame";
import CardView from "../CardView";
import { GameStateContext } from "../GameScene";
import { CardTracker } from "../Model/CardTracker";
import { getCardPocket } from "../Model/Filters";
import { Card, getCard } from "../Model/GameTable";
import { getAllPlayableCards, getModifierContext, isCardCurrent } from "../Model/TargetSelector";
import "./Style/CardChoiceView.css";

export interface CardChoiceProps {
    tracker: CardTracker;
}

interface CardChoiceInnerProps {
    cards: Card[];
    anchor: Card;
    tracker: CardTracker;
}

function CardChoiceInner({ cards, anchor, tracker }: CardChoiceInnerProps) {
    const anchorRect = useUpdateEveryFrame(() => tracker.getCardRect(anchor));
    
    if (!anchorRect) return null;
    const anchorCenter = relativeToWindow(getRectCenter(anchorRect));

    let ncards = cards.length;
    if (ncards > 4) {
        ncards = Math.floor(ncards / 2);
    }

    const cardChoiceStyle = {
        '--card-choice-num-cards': ncards,
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
        let lastTarget: Card | undefined;
        for (const { targets } of selector.modifiers) {
            for (const target of targets) {
                if (target.type === 'card') {
                    lastTarget = target.value;
                }
            }
        }
        if (lastTarget) {
            anchor = lastTarget;
        }
    }

    let cards: Card[] = [];
    for (const [card, ] of getAllPlayableCards(selector)) {
        cards.push(getCard(table, card));
    }

    return <CardChoiceInner cards={cards} anchor={anchor} tracker={tracker} />
}