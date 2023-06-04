import { forwardRef, useImperativeHandle } from "react";
import { PocketType } from "../../Messages/CardEnums";
import { CardId } from "../../Messages/GameUpdate";
import { setMapRef, useMapRef } from "../../Utils/MapRef";
import { Rect } from "../../Utils/Rect";
import CardSlot from "./CardSlot";
import CardView, { CardRef } from "./CardView";
import { GameTable, PocketRef, getCard } from "./Model/GameTable";
import "./Style/PocketView.css";

export interface PocketProps {
    table: GameTable;
    cards: CardId[];
}

export interface CardTracker {
    getPocketPosition: (pocket: PocketRef) => PocketPosition | undefined;
}

export interface PocketPosition {
    getCardRect: (card: CardId) => Rect | undefined;
}

export type PocketPositionMap = Map<PocketType, PocketPosition>;

const PocketView = forwardRef<PocketPosition, PocketProps>(({ table, cards }, ref) => {
    const cardRefs = useMapRef<CardId, CardRef>();

    useImperativeHandle(ref, () => ({
        getCardRect: (card: CardId) => cardRefs.current.get(card)?.getRect()
    }));

    return <div className='pocket-view'>{
        cards.map(id => {
            if (id == -1) {
                if (table.animation && 'move_card' in table.animation) {
                    return <CardSlot ref={setMapRef(cardRefs, id)} key={id} stretch='in' duration={table.animation.move_card.duration} />
                } else {
                    return null;
                }
            } else {
                const card = getCard(table, id);
                if (card.animation && 'move_card' in card.animation) {
                    return <CardSlot ref={setMapRef(cardRefs, id)} key={id} stretch='out' duration={card.animation.move_card.duration} />
                } else {
                    return <CardView ref={setMapRef(cardRefs, id)} key={id} card={card} />
                }
            }
        })
    }</div>;
});

export default PocketView;