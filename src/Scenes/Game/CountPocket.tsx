import { forwardRef, useContext } from "react";
import { CardId } from "./Model/GameUpdate";
import PocketView, { PocketPosition } from "./PocketView";
import "./Style/CardView.css";
import { CARD_SLOT_ID } from "./CardSlot";
import { Card, getCard } from "./Model/GameTable";
import { GameTableContext } from "./GameScene";

export interface CountPocketProps {
    trackAllCards?: boolean;
    cards: CardId[];
    onClickCard?: (card: Card) => void;
}

const CountPocket = forwardRef<PocketPosition, CountPocketProps>(({ trackAllCards, cards, onClickCard }, ref) => {
    const table = useContext(GameTableContext);

    let numCards = cards.length;
    if (cards.includes(CARD_SLOT_ID)) --numCards;

    if (!trackAllCards) cards = cards.slice(-2);

    const handleClickLastCard = onClickCard && numCards > 0 ? () => {
        onClickCard(getCard(table, cards[cards.length - 1]));
    } : undefined;

    return (<div className="count-pocket single-card-pocket" onClick={handleClickLastCard}>
        <PocketView ref={ref} cards={cards} />
        {numCards > 0 ? <div className="count-pocket-inner">{numCards}</div> : null}
    </div>);
});

export default CountPocket;