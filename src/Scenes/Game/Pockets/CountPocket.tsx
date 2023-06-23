import { forwardRef, useContext, useRef, useImperativeHandle } from "react";
import { CARD_SLOT_ID } from "./CardSlot";
import { GameTableContext } from "../GameScene";
import { Card, getCard } from "../Model/GameTable";
import { CardId } from "../Model/GameUpdate";
import PocketView, { PocketPosition } from "./PocketView";
import "./Style/CountPocket.css";

export interface CountPocketProps {
    cards: CardId[];
    onClickCard?: (card: Card) => void;
    slice?: number;
    noCount?: boolean;
}

const CountPocket = forwardRef<PocketPosition, CountPocketProps>(({ cards, onClickCard, slice, noCount }, ref) => {
    const table = useContext(GameTableContext);

    const position = useRef<PocketPosition>(null);

    useImperativeHandle(ref, () => ({
        getPocketRect: () => position.current?.getPocketRect(),
        getCardRect: () => position.current?.getPocketRect(),
        scrollToEnd: () => position.current?.scrollToEnd()
    }));

    let numCards = cards.length;
    if (cards.includes(CARD_SLOT_ID)) --numCards;

    const handleClickLastCard = onClickCard && numCards > 0 ? () => {
        onClickCard(getCard(table, cards.at(-1)!));
    } : undefined;

    return (<div className='count-pocket' onClick={handleClickLastCard}>
        <PocketView ref={position} cards={ cards.slice(-(slice ?? 2))} />
        {!noCount && numCards > 0 ? <div className="count-pocket-inner">{numCards}</div> : null}
    </div>);
});

export default CountPocket;