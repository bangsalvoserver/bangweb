import { LocalizedCardName } from "./GameStringComponent";
import { Card } from "./Model/GameTable";

export interface CardButtonProps {
    card: Card;
}

export default function CardButtonView({ card }: CardButtonProps) {
    if ('name' in card.cardData) {
        return <button><LocalizedCardName name={card.cardData.name} /></button>
    } else {
        return null;
    }
}