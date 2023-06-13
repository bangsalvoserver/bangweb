import { useContext } from "react";
import { LocalizedCardName } from "./GameStringComponent";
import { Card } from "./Model/GameTable";
import { TargetSelectorContext } from "./GameScene";
import { getSelectorCurrentTree, isCardCurrent } from "./Model/TargetSelector";
import "./Style/CardButtonView.css";

export interface CardButtonProps {
    card: Card;
    onClickCard: () => void;
}

export default function CardButtonView({ card, onClickCard }: CardButtonProps) {
    const selector = useContext(TargetSelectorContext);

    if ('name' in card.cardData) {
        if (!('playing_card' in selector.selection) || selector.selection.playing_card === undefined || isCardCurrent(selector, card)) {
            if (getSelectorCurrentTree(selector).some(node => node.card == card.id)) {
                return <button className='card-button-view' onClick={onClickCard}><LocalizedCardName name={card.cardData.name} /></button>
            }
        }
    }
    return null;
}