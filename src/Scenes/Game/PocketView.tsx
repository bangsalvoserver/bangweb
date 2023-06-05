import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { PocketType } from "../../Messages/CardEnums";
import { CardId } from "../../Messages/GameUpdate";
import { setMapRef, useMapRef } from "../../Utils/MapRef";
import { Rect, getDivRect } from "../../Utils/Rect";
import CardSlot from "./CardSlot";
import CardView, { CardRef } from "./CardView";
import { GameTable, PocketRef, getCard } from "./Model/GameTable";
import "./Style/PocketView.css";
import { GameTableContext } from "./GameScene";

export interface PocketProps {
    cards: CardId[];
}

export interface CardTracker {
    getPocketPosition: (pocket: PocketRef) => PocketPosition | undefined;
    getCubesPosition: () => Rect | undefined;
}

export interface PocketPosition {
    getPocketRect: () => Rect | undefined;
    getCardRect: (card: CardId) => Rect | undefined;
}

export type PocketPositionMap = Map<PocketType, PocketPosition>;

const PocketView = forwardRef<PocketPosition, PocketProps>(({ cards }, ref) => {
    const table = useContext(GameTableContext);
    const pocketRef = useRef<HTMLDivElement>(null);
    const cardRefs = useMapRef<CardId, CardRef>();

    useImperativeHandle(ref, () => ({
        getPocketRect: () => pocketRef.current ? getDivRect(pocketRef.current) : undefined,
        getCardRect: (card: CardId) => cardRefs.current.get(card)?.getRect()
    }));

    return <div ref={pocketRef} className='pocket-view'>{
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