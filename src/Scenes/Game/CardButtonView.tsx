import { useContext } from "react";
import { LocalizedCardName } from "./GameStringComponent";
import { Card } from "./Model/GameTable";
import { TargetSelectorContext } from "./GameScene";
import { CardNode } from "./Model/GameUpdate";
import { getSelectorCurrentTree } from "./Model/TargetSelector";

export interface CardButtonProps {
    card: Card;
    onClickCard: () => void;
}

export default function CardButtonView({ card, onClickCard }: CardButtonProps) {
    const selector = useContext(TargetSelectorContext);
    const playableCards: CardNode[] = getSelectorCurrentTree(selector);

    if (playableCards.some(node => node.card == card.id) && 'name' in card.cardData) {
        return <button className='card-button-view' onClick={onClickCard}><LocalizedCardName name={card.cardData.name} /></button>
    } else {
        return null;
    }
}