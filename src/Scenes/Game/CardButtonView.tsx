import { useContext } from "react";
import { TargetSelectorContext } from "./GameScene";
import { LocalizedCardName } from "./GameStringComponent";
import { Card, isCardKnown } from "./Model/GameTable";
import { isCardCurrent, selectorCanPlayCard } from "./Model/TargetSelector";
import "./Style/CardButtonView.css";

export interface CardButtonProps {
    card: Card;
    onClickCard: () => void;
}

export default function CardButtonView({ card, onClickCard }: CardButtonProps) {
    const selector = useContext(TargetSelectorContext);

    if (isCardCurrent(selector, card) || selectorCanPlayCard(selector, card)) {
        return <button className='card-button-view' onClick={onClickCard}><LocalizedCardName name={card.cardData.name} /></button>
    } else {
        return null;
    }
}