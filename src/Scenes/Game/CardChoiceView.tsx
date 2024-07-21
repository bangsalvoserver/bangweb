import { CSSProperties, useContext } from "react";
import { getRectCenter } from "../../Utils/Rect";
import useUpdateEveryFrame from "../../Utils/UseUpdateEveryFrame";
import CardView from "./CardView";
import { GameTableContext } from "./GameScene";
import { CardTracker } from "./Model/CardTracker";
import { Card, getCard } from "./Model/GameTable";
import { getModifierContext, getPlayableCards, isCardCurrent } from "./Model/TargetSelector";
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
    const table = useContext(GameTableContext);

    const selector = table.selector;
    if (selector.selection.mode === 'start') return null;

    const cardId = getModifierContext(selector, 'card_choice');
    if (!cardId) return null;

    const anchor = getCard(table, cardId);
    if (!isCardCurrent(selector, anchor)) return null;

    const cards = getPlayableCards({ ...selector, selection: { ...selector.selection, playing_card: null }});

    return <CardChoiceInner cards={cards.map(id => getCard(table, id))} anchor={anchor} tracker={tracker} />
}