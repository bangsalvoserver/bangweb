import { forwardRef, useContext, useRef, useImperativeHandle } from "react";
import { CARD_SLOT_ID } from "./CardSlot";
import { GameTableContext } from "../GameScene";
import { Card, getCard } from "../Model/GameTable";
import { CardId } from "../Model/GameUpdate";
import PocketView, { PocketPosition } from "./PocketView";
import "./Style/StackPocket.css";

export interface StackPocketProps {
    cards: CardId[];
    onClickCard?: (card: Card) => void;
    slice?: number;
    showCount?: boolean;
}

const StackPocket = forwardRef<PocketPosition, StackPocketProps>(({ cards, onClickCard, slice, showCount }, ref) => {
    const table = useContext(GameTableContext);

    const position = useRef<PocketPosition>(null);

    useImperativeHandle(ref, () => ({
        getPocketRect: () => position.current?.getPocketRect(),
        getCardRect: () => position.current?.getPocketRect()
    }));

    let numCards = cards.length;
    if (cards.includes(CARD_SLOT_ID)) --numCards;

    const handleClickLastCard = onClickCard && numCards > 0 ? () => {
        onClickCard(getCard(table, cards.at(-1)!));
    } : undefined;

    return (<div className='stack-pocket' onClick={handleClickLastCard}>
        <PocketView ref={position} cards={ cards.slice(-(slice ?? 2))} />
        {showCount && numCards > 0 ? <div className="pocket-count">{numCards}</div> : null}
    </div>);
});

export default StackPocket;