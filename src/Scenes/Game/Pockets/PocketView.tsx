import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { MapRef, useMapRef } from "../../../Utils/LazyRef";
import { getDivRect } from "../../../Utils/Rect";
import CardView, { CardRef } from "../CardView";
import { GameTableContext } from "../GameScene";
import { PocketType } from "../Model/CardEnums";
import { Card, getCard } from "../Model/GameTable";
import { CardId } from "../Model/GameUpdate";
import CardSlot, { CARD_SLOT_ID } from "./CardSlot";
import "./Style/PocketView.css";
import { PocketPosition } from "../Model/CardTracker";

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
            if (id == CARD_SLOT_ID) {
                if (table.animation && 'move_card' in table.animation) {
                    return <CardSlot ref={setPos(id)} key={id} stretch='in' duration={table.animation.move_card.duration} />
                } else {
                    return null;
                }
            } else {
                const card = getCard(table, id);
                if (card.animation && 'move_card' in card.animation) {
                    return <CardSlot ref={setPos(id)} key={id} stretch='out' duration={card.animation.move_card.duration} />
                } else {
                    return <CardView ref={setPos(id)} key={id} card={card} onClickCard={onClickCard} />
                }
            }
        }) }
    </div>;
});

export default PocketView;