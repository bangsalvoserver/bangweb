import "./CardView.css";
import { CardId } from "../../../Messages/GameUpdate";
import { GameTable, getCard } from "../GameTable";
import CardView from "./CardView";

export interface CountPocketProps {
    table: GameTable;
    cards: CardId[];
}

export default function CountPocket({ table, cards}: CountPocketProps) {
    return (<div className="count-pocket">
        {cards.slice(-1).map(id => <CardView key={id} card={getCard(table, id)} /> )}
        {cards.length > 0 ? <div className="count-pocket-inner">{cards.length}</div> : null}
    </div>);
}