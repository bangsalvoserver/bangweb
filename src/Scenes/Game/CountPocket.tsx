import { forwardRef } from "react";
import "./Style/CardView.css";
import PocketView, { PocketPosition } from "./PocketView";
import { GameTable } from "./Model/GameTable";
import { CardId } from "../../Messages/GameUpdate";

export interface CountPocketProps {
    table: GameTable;
    cards: CardId[];
}

const CountPocket = forwardRef<PocketPosition, CountPocketProps>(({ table, cards }, ref) => {
    return (<div className="count-pocket">
        <PocketView ref={ref} table={table} cards={cards.slice(-2)} className='single-card-pocket' />
        {cards.length > 0 ? <div className="count-pocket-inner">{cards.length}</div> : null}
    </div>);
});

export default CountPocket;