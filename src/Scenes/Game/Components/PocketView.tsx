import { MutableRefObject, forwardRef, useImperativeHandle, useRef } from "react";
import { CardId } from "../../../Messages/GameUpdate";
import { GameTable, getCard } from "../GameTable";
import CardView from "./CardView";
import { PocketPosition } from "./TableView";

export interface PocketProps {
    table: GameTable;
    cards: CardId[];
}

const PocketView = forwardRef<PocketPosition, PocketProps>(({ table, cards }, ref) => {
    const pocketRef = useRef() as MutableRefObject<HTMLDivElement>;

    useImperativeHandle(ref, () => ({
        getRect: () => pocketRef.current.getBoundingClientRect()
    }));

    return <div ref={pocketRef} style={{display:'inline-block'}}>{ cards.map(id => <CardView key={id} card={getCard(table, id)} /> )}</div>;
});

export default PocketView;