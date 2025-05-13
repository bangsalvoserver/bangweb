import { Ref, useContext, useImperativeHandle, useRef } from "react";
import { countIf } from "../../../Utils/ArrayUtils";
import { GameStateContext } from "../GameScene";
import { PocketRef } from "../Model/CardTracker";
import { getCard, isCardKnown } from "../Model/GameTable";
import { CardId } from "../Model/GameUpdate";
import { SelectorConfirmProvider, useSelectorConfirm } from "../Model/SelectorConfirm";
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
    const { table } = useContext(GameStateContext);
    const { handleClickCard } = useSelectorConfirm();

    const position = useRef<PocketRef>(null);

    useImperativeHandle(pocketRef, () => ({
        getPocketRect: () => position.current?.getPocketRect() ?? null,
        getCardRect: () => position.current?.getPocketRect() ?? null
    }), []);

    const numCards = countIf(cards, id => 
        id !== CARD_SLOT_ID_FROM && id !== CARD_SLOT_ID_TO
        && !isCardKnown(getCard(table, id))
    );

    const lastCard = cards.at(-1);
    const handleClickLastCard = lastCard && lastCard > 0 ? handleClickCard(getCard(table, lastCard)) : undefined;

    return <div className='stack-pocket' onClick={handleClickLastCard}>
        <SelectorConfirmProvider selectorDispatch={null}>
            <PocketView pocketRef={position} cards={ slice ? cards.slice(-slice) : cards} />
        </SelectorConfirmProvider>
        {showCount && numCards > 0 ? <div className="pocket-count">{numCards}</div> : null}
    </div>;
}