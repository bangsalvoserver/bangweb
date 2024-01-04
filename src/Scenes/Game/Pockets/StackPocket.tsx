import { Ref, useContext, useImperativeHandle, useRef } from "react";
import { countIf } from "../../../Utils/ArrayUtils";
import { GameTableContext } from "../GameScene";
import { CardOverlayTracker } from "../Model/CardOverlayTracker";
import { PocketRef } from "../Model/CardTracker";
import { Card, getCard } from "../Model/GameTable";
import { CardId } from "../Model/GameUpdate";
import { CARD_SLOT_ID_FROM, CARD_SLOT_ID_TO } from "./CardSlot";
import PocketView from "./PocketView";
import "./Style/StackPocket.css";

export interface StackPocketProps {
    pocketRef?: Ref<PocketRef>;
    cards: CardId[];
    onClickCard?: (card: Card) => void;
    slice?: number;
    showCount?: boolean;
    cardOverlayTracker?: CardOverlayTracker;
}

export default function StackPocket({ pocketRef, cards, onClickCard, slice, showCount, cardOverlayTracker }: StackPocketProps) {
    const table = useContext(GameTableContext);

    const position = useRef<PocketRef>(null);

    useImperativeHandle(pocketRef, () => ({
        getPocketRect: () => position.current?.getPocketRect() ?? null,
        getCardRect: () => position.current?.getPocketRect() ?? null
    }));

    const numCards = countIf(cards, id => id !== CARD_SLOT_ID_FROM && id !== CARD_SLOT_ID_TO);

    const handleClickLastCard = onClickCard && numCards > 0 ? () => {
        onClickCard(getCard(table, cards.at(-1)!));
    } : undefined;

    return <div className='stack-pocket' onClick={handleClickLastCard}>
        <PocketView pocketRef={position} cards={ cards.slice(-(slice ?? 2))} cardOverlayTracker={cardOverlayTracker} />
        {showCount && numCards > 0 ? <div className="pocket-count">{numCards}</div> : null}
    </div>;
}