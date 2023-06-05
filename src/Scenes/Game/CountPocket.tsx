import { forwardRef } from "react";
import { CardId } from "./Model/GameUpdate";
import PocketView, { PocketPosition } from "./PocketView";
import "./Style/CardView.css";

export interface CountPocketProps {
    trackAllCards?: boolean;
    cards: CardId[];
}

const CountPocket = forwardRef<PocketPosition, CountPocketProps>(({ trackAllCards, cards }, ref) => {
    let maxCards = trackAllCards ? 0 : 2;
    return (<div className="count-pocket single-card-pocket">
        <PocketView ref={ref} cards={cards.slice(-maxCards)} />
        {cards.length > 0 ? <div className="count-pocket-inner">{cards.length}</div> : null}
    </div>);
});

export default CountPocket;