import { forwardRef } from "react";
import { CardId } from "./Model/GameUpdate";
import PocketView, { PocketPosition } from "./PocketView";
import "./Style/CardView.css";
import { CARD_SLOT_ID } from "./CardSlot";
import { Card } from "./Model/GameTable";

export interface CountPocketProps {
    trackAllCards?: boolean;
    cards: CardId[];
    onClickCard: (card: Card) => void;
}

const CountPocket = forwardRef<PocketPosition, CountPocketProps>(({ trackAllCards, cards, onClickCard }, ref) => {
    let numCards = cards.length;
    if (cards.includes(CARD_SLOT_ID)) --numCards;

    if (!trackAllCards) cards = cards.slice(-2);

    return (<div className="count-pocket single-card-pocket">
        <PocketView ref={ref} cards={cards} onClickCard={onClickCard} />
        {numCards > 0 ? <div className="count-pocket-inner">{numCards}</div> : null}
    </div>);
});

export default CountPocket;