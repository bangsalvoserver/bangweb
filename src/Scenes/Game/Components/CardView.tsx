import { Card } from "../GameTable";
import { LocalizedCardName } from "../../../Locale/Locale";

export interface CardProps {
    card: Card;
}

export default function CardView({ card }: CardProps) {
    return (
        <div>
            {'name' in card.cardData ? <LocalizedCardName name={card.cardData.name} sign={card.cardData.sign} /> : card.cardData.deck }
        </div>
    )
}