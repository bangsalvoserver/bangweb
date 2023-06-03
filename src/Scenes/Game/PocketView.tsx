import { MutableRefObject, forwardRef, useImperativeHandle, useRef } from "react";
import { PocketType } from "../../Messages/CardEnums";
import { CardId } from "../../Messages/GameUpdate";
import CardView, { CardRef } from "./CardView";
import { GameTable, PocketRef, getCard } from "./Model/GameTable";
import "./Style/PocketView.css";
import { Rect, getDivRect } from "../../Utils/Rect";

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

export type PocketPositionRef = MutableRefObject<PocketPosition>;

export type PocketPositionMap = Partial<Record<PocketType, PocketPositionRef>>;

const PocketView = forwardRef<PocketPosition, PocketProps>(({ table, cards }, ref) => {
    const cardRefs = useRef<Record<CardId, CardRef | null>>({});

    useImperativeHandle(ref, () => ({
        getCardRect: (card: CardId) => cardRefs.current[card]?.getRect()
    }));

    return <div className='pocket-view'>{
        cards.map(id => <CardView ref={ref => cardRefs.current[id] = ref} key={id} card={getCard(table, id)} /> )
    }</div>;
});

export default PocketView;