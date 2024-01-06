import { Ref, useContext, useImperativeHandle, useRef } from "react";
import { getDivRect } from "../../../Utils/Rect";
import { useMapRef } from "../../../Utils/UseMapRef";
import CardView from "../CardView";
import { GameTableContext } from "../GameScene";
import { CardRef, PocketRef } from "../Model/CardTracker";
import { getCard } from "../Model/GameTable";
import { CardId } from "../Model/GameUpdate";
import CardSlot, { CARD_SLOT_ID_FROM, CARD_SLOT_ID_TO } from "./CardSlot";
import "./Style/PocketView.css";
import { curry2 } from "ts-curry";

export interface PocketProps {
    pocketRef?: Ref<PocketRef>;
    cards: CardId[];
}

export default function PocketView({ pocketRef, cards }: PocketProps) {
    const table = useContext(GameTableContext);
    const divRef = useRef<HTMLDivElement>(null);
    const cardRefs = useMapRef<CardId, CardRef>();
    const setPos = curry2(cardRefs.set);

    useImperativeHandle(pocketRef, () => ({
        getPocketRect: () => divRef.current ? getDivRect(divRef.current) : null,
        getCardRect: (card: CardId) => cardRefs.get(card)?.getRect() ?? null
    }));

    return <div ref={divRef} className='pocket-view'>
        { cards.map(id => {
            if (id === CARD_SLOT_ID_FROM || id === CARD_SLOT_ID_TO) {
                if (table.animation && 'move_card' in table.animation) {
                    const key = `${id} ${table.animationKey}`;
                    return <CardSlot cardRef={setPos(id)} key={key} stretch={id === CARD_SLOT_ID_FROM ? 'in' : 'out'} duration={table.animation.move_card.duration} />
                } else {
                    return null;
                }
            } else {
                const card = getCard(table, id);
                const key = card.animation ? `${id} ${card.animationKey}` : `${id}`;
                return <CardView cardRef={setPos(id)} key={key} card={card} />
            }
        }) }
    </div>;
}