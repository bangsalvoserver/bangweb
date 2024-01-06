import { Ref, useContext, useImperativeHandle, useRef } from "react";
import { countIf } from "../../../Utils/ArrayUtils";
import { GameTableContext } from "../GameScene";
import { PocketRef } from "../Model/CardTracker";
import { getCard } from "../Model/GameTable";
import { CardId } from "../Model/GameUpdate";
import { SelectorConfirmContext } from "../Model/TargetSelectorManager";
import { CARD_SLOT_ID_FROM, CARD_SLOT_ID_TO } from "./CardSlot";
import PocketView from "./PocketView";
import "./Style/StackPocket.css";

export interface StackPocketProps {
    pocketRef?: Ref<PocketRef>;
    cards: CardId[];
    slice?: number;
    showCount?: boolean;
}

export default function StackPocket({ pocketRef, cards, slice, showCount }: StackPocketProps) {
    const table = useContext(GameTableContext);
    const { handleClickCard } = useContext(SelectorConfirmContext);

    const position = useRef<PocketRef>(null);

    useImperativeHandle(pocketRef, () => ({
        getPocketRect: () => position.current?.getPocketRect() ?? null,
        getCardRect: () => position.current?.getPocketRect() ?? null
    }));

    const numCards = countIf(cards, id => id !== CARD_SLOT_ID_FROM && id !== CARD_SLOT_ID_TO);

    const lastCard = cards.at(-1);
    const handleClickLastCard = lastCard && lastCard > 0 ? handleClickCard(getCard(table, lastCard)) : undefined;

    return <div className='stack-pocket' onClick={handleClickLastCard}>
        <PocketView pocketRef={position} cards={ cards.slice(-(slice ?? 2))} />
        {showCount && numCards > 0 ? <div className="pocket-count">{numCards}</div> : null}
    </div>;
}