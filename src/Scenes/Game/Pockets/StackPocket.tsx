import { forwardRef, useContext, useRef, useImperativeHandle } from "react";
import { CARD_SLOT_ID_FROM, CARD_SLOT_ID_TO } from "./CardSlot";
import { GameTableContext } from "../GameScene";
import { Card, getCard } from "../Model/GameTable";
import { CardId } from "../Model/GameUpdate";
import PocketView from "./PocketView";
import "./Style/StackPocket.css";
import { PocketPosition } from "../Model/CardTracker";
import { count } from "../../../Utils/ArrayUtils";

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
        getPocketRect: () => position.current?.getPocketRect() ?? null,
        getCardRect: () => position.current?.getPocketRect() ?? null
    }));

    const numCards = count(cards, id => id !== CARD_SLOT_ID_FROM && id !== CARD_SLOT_ID_TO);

    const handleClickLastCard = onClickCard && numCards > 0 ? () => {
        onClickCard(getCard(table, cards.at(-1)!));
    } : undefined;

    return (<div className='stack-pocket' onClick={handleClickLastCard}>
        <PocketView ref={position} cards={ cards.slice(-(slice ?? 2))} />
        {showCount && numCards > 0 ? <div className="pocket-count">{numCards}</div> : null}
    </div>);
});

export default StackPocket;