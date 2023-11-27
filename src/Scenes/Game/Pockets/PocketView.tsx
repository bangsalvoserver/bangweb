import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { useMapRef } from "../../../Utils/UseMapRef";
import { getDivRect } from "../../../Utils/Rect";
import CardView, { CardRef } from "../CardView";
import { GameTableContext } from "../GameScene";
import { PocketPosition } from "../Model/CardTracker";
import { Card, getCard } from "../Model/GameTable";
import { CardId } from "../Model/GameUpdate";
import CardSlot, { CARD_SLOT_ID_FROM, CARD_SLOT_ID_TO } from "./CardSlot";
import "./Style/PocketView.css";

export interface PocketProps {
    cards: CardId[];
    onClickCard?: (card: Card) => void;
}

const PocketView = forwardRef<PocketPosition, PocketProps>(({ cards, onClickCard }, ref) => {
    const table = useContext(GameTableContext);
    const pocketRef = useRef<HTMLDivElement>(null);
    const cardRefs = useMapRef<CardId, CardRef>();

    const setPos = (id: CardId) => {
        return (value: CardRef | null) => {
            cardRefs.set(id, value);
        };
    };

    useImperativeHandle(ref, () => ({
        getPocketRect: () => pocketRef.current ? getDivRect(pocketRef.current) : null,
        getCardRect: (card: CardId) => cardRefs.get(card)?.getRect() ?? null
    }));

    return <div ref={pocketRef} className='pocket-view'>
        { cards.map(id => {
            if (id == CARD_SLOT_ID_FROM || id == CARD_SLOT_ID_TO) {
                if (table.animation && 'move_card' in table.animation) {
                    const key = `${id} ${table.animationKey}`;
                    return <CardSlot ref={setPos(id)} key={key} stretch={id == CARD_SLOT_ID_FROM ? 'in' : 'out'} duration={table.animation.move_card.duration} />
                } else {
                    return null;
                }
            } else {
                const card = getCard(table, id);
                const key = card.animation ? `${id} ${card.animationKey}` : `${id}`;
                return <CardView ref={setPos(id)} key={key} card={card} onClickCard={onClickCard} />
            }
        }) }
    </div>;
});

export default PocketView;