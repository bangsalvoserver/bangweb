import "./PocketView.css"
import { MutableRefObject, forwardRef, useImperativeHandle, useRef } from "react";
import { CardId } from "../../../Messages/GameUpdate";
import { GameTable, getCard } from "../GameTable";
import CardView from "./CardView";
import { PocketPosition } from "./TableView";

export interface PocketProps {
    table: GameTable;
    cards: CardId[];
}

export type PocketPositionRef = MutableRefObject<PocketPosition>;

const PocketView = forwardRef<PocketPosition, PocketProps>(({ table, cards }, ref) => {
    const pocketRef = useRef() as MutableRefObject<HTMLDivElement>;

    useImperativeHandle(ref, () => ({
        getRect: () => {
            const rect = pocketRef.current.getBoundingClientRect();
            return {
                x: rect.left + window.scrollX,
                y: rect.top + window.scrollY,
                w: rect.width,
                h: rect.height
            };
        }
    }));

    return <div ref={pocketRef} className='pocket-view'>{ cards.map(id => <CardView key={id} card={getCard(table, id)} /> )}</div>;
});

export default PocketView;