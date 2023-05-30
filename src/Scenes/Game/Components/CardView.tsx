import { Card, GameTable } from "../GameTable";
import { localizeCardName } from "../Locale";

export interface CardProps {
    table: GameTable;
    card: Card;
}

export default function CardView({ table, card }: CardProps) {
    return (
        <div>
            {card.cardData ? localizeCardName(card.cardData.name, card.cardData.sign) : card.deck }
        </div>
    )
}