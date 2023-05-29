import { Card, GameTable } from "../GameTable";

export interface CardProps {
    table: GameTable;
    card: Card;
}

export default function CardView({ table, card }: CardProps) {
    return (
        <div>
            {card.cardData ? card.cardData.name : card.deck }
        </div>
    )
}