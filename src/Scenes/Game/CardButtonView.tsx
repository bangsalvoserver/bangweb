import { useContext } from "react";
import Button from "../../Components/Button";
import { TargetSelectorContext } from "./GameScene";
import { LocalizedCardName } from "./GameStringComponent";
import { Card } from "./Model/GameTable";
import { isCardCurrent, isResponse, selectorCanPlayCard } from "./Model/TargetSelector";

export interface CardButtonProps {
    card: Card;
    onClickCard: () => void;
}

export default function CardButtonView({ card, onClickCard }: CardButtonProps) {
    const selector = useContext(TargetSelectorContext);

    if (isCardCurrent(selector, card) || selectorCanPlayCard(selector, card)) {
        return <Button color={isResponse(selector) ? 'red' : 'green'} onClick={onClickCard}>
            <LocalizedCardName name={card.cardData.name} />
        </Button>
    } else {
        return null;
    }
}