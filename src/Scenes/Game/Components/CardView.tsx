import { CardId } from "../../../Messages/GameUpdate";
import { Card, GameTable, getCard } from "../GameTable";
import { LocalizedCardName } from "../Locale";

export interface CardProps {
    table: GameTable;
    card: CardId;
}

export default function CardView({ table, card }: CardProps) {
    const cardObj = getCard(table, card) as Card;
    return (
        <div>
            {'name' in cardObj.cardData ? <LocalizedCardName name={cardObj.cardData.name} sign={cardObj.cardData.sign} /> : cardObj.cardData.deck }
        </div>
    )
}