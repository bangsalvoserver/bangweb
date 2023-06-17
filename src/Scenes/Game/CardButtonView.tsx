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

    const isCurrent = isCardCurrent(selector, card);
    const isPlayable = selectorCanPlayCard(selector, card);

    if (isCurrent || isPlayable) {
        return <Button color={isResponse(selector) ? 'red' : isCurrent ? 'blue' : 'green'} onClick={onClickCard}>
            <LocalizedCardName name={card.cardData.name} />
        </Button>
    } else {
        return null;
    }
}