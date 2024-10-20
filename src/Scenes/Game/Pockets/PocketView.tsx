import { Ref, useContext, useImperativeHandle, useRef } from "react";
import { getDivRect } from "../../../Utils/Rect";
import { useMapRef } from "../../../Utils/UseMapRef";
import CardView from "../CardView";
import { GameStateContext } from "../GameScene";
import { CardRef, PocketRef } from "../Model/CardTracker";
import { getCard } from "../Model/GameTable";
import { CardId } from "../Model/GameUpdate";
import CardSlot, { CARD_SLOT_ID_FROM, CARD_SLOT_ID_TO } from "./CardSlot";
import "./Style/PocketView.css";

export interface PocketProps {
    pocketRef?: Ref<PocketRef>;
    cards: CardId[];
}

export default function PocketView({ pocketRef, cards }: PocketProps) {
    const { table } = useContext(GameStateContext);
    const divRef = useRef<HTMLDivElement>(null);
    const cardRefs = useMapRef<CardId, CardRef>();
    const setPos = (key: CardId) => (value: CardRef | null) => cardRefs.set(key, value);

    useImperativeHandle(pocketRef, () => ({
        getPocketRect: () => divRef.current ? getDivRect(divRef.current) : null,
        getCardRect: (card: CardId) => cardRefs.get(card)?.getRect() ?? null
    }));

    return <div ref={divRef} className='pocket-view'>
        { cards.map(id => {
            if (id === CARD_SLOT_ID_FROM || id === CARD_SLOT_ID_TO) {
                if (table.animation.type === 'move_card') {
                    const key = `${id} ${table.animation.key}`;
                    return <CardSlot cardRef={setPos(id)} key={key} stretch={id === CARD_SLOT_ID_FROM ? 'in' : 'out'} duration={table.animation.duration} />
                } else {
                    return null;
                }
            } else {
                const card = getCard(table, id);
                const key = `${id} ${card.animation.key}`;
                return <CardView cardRef={setPos(id)} key={key} card={card} />
            }
        }) }
    </div>;
}