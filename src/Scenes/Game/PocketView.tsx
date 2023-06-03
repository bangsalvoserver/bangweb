import { MutableRefObject, forwardRef, useImperativeHandle, useRef } from "react";
import { PocketType } from "../../Messages/CardEnums";
import { CardId } from "../../Messages/GameUpdate";
import CardView, { CardRef } from "./CardView";
import { GameTable, PocketRef, getCard } from "./Model/GameTable";
import "./Style/PocketView.css";
import { Rect, getDivRect } from "./Rect";

export interface PocketProps {
    table: GameTable;
    cards: CardId[];
}

export interface CardTracker {
    getPocketPosition: (pocket: PocketRef) => PocketPosition | undefined;
}

export interface PocketPosition {
    getPocketRect: () => Rect | undefined;
    getCardRect: (card: CardId) => Rect | undefined;
}

export type PocketPositionRef = MutableRefObject<PocketPosition>;

export type PocketPositionMap = Partial<Record<PocketType, PocketPositionRef>>;

const PocketView = forwardRef<PocketPosition, PocketProps>(({ table, cards }, ref) => {
    const pocketRef = useRef() as MutableRefObject<HTMLDivElement>;
    const cardRefs = useRef<Record<CardId, CardRef | null>>({});

    useImperativeHandle(ref, () => ({
        getPocketRect: () => getDivRect(pocketRef.current),
        getCardRect: (card: CardId) => {
            if (card in cardRefs.current) {
                return cardRefs.current[card]?.getRect();
            }
            return undefined;
        }
    }));

    return <div ref={pocketRef} className='pocket-view'>{
        cards.map(id => <CardView ref={ref => cardRefs.current[id] = ref} key={id} card={getCard(table, id)} /> )
    }</div>;
});

export default PocketView;