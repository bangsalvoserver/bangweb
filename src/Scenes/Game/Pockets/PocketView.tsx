import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { MapRef, useMapRef } from "../../../Utils/LazyRef";
import { getDivRect } from "../../../Utils/Rect";
import CardView, { CardRef } from "../CardView";
import { GameTableContext } from "../GameScene";
import { PocketType } from "../Model/CardEnums";
import { Card, getCard } from "../Model/GameTable";
import { CardId } from "../Model/GameUpdate";
import CardSlot, { CARD_SLOT_ID_FROM, CARD_SLOT_ID_TO } from "./CardSlot";
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
        getCardRect: (card: CardId) => cardRefs.get(card)?.getRect() ?? null,
        getCardDiv: (card: CardId) => cardRefs.get(card)?.getDiv() ?? null
    }));

    return <div ref={pocketRef} className='pocket-view'>
        { cards.map(id => {
            if (id == CARD_SLOT_ID_FROM || id == CARD_SLOT_ID_TO) {
                if (table.animation && 'move_card' in table.animation) {
                    return <CardSlot ref={setPos(id)} key={id} stretch={id == CARD_SLOT_ID_FROM ? 'in' : 'out'} duration={table.animation.move_card.duration} />
                } else {
                    return null;
                }
            } else {
                return <CardView ref={setPos(id)} key={id} card={getCard(table, id)} onClickCard={onClickCard} />
            }
        }) }
    </div>;
});

export default PocketView;