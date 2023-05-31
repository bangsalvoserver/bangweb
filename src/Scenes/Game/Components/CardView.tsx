import { Card, GameTable } from "../GameTable";
import { LocalizedCardName } from "../Locale";

export interface CardProps {
    table: GameTable;
    card: Card;
}

export default function CardView({ table, card }: CardProps) {
    return (
        <div>
            {'name' in card.cardData ? <LocalizedCardName name={card.cardData.name} sign={card.cardData.sign} /> : card.cardData.deck }
        </div>
    )
}