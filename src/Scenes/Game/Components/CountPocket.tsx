import "./CardView.css";
import { CardId } from "../../../Messages/GameUpdate";
import { GameTable, getCard } from "../GameTable";
import CardView from "./CardView";
import { MutableRefObject, forwardRef, useImperativeHandle, useRef } from "react";
import { PocketPosition } from "./TableView";
import PocketView from "./PocketView";

export interface CountPocketProps {
    table: GameTable;
    cards: CardId[];
}

const CountPocket = forwardRef<PocketPosition, CountPocketProps>(({ table, cards }, ref) => {
    return (<div className="count-pocket">
        <PocketView ref={ref} table={table} cards={cards.slice(-1)} />
        {cards.length > 0 ? <div className="count-pocket-inner">{cards.length}</div> : null}
    </div>);
});

export default CountPocket;