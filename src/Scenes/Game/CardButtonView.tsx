import { useContext } from "react";
import { LocalizedCardName } from "./GameStringComponent";
import { Card } from "./Model/GameTable";
import { TargetSelectorContext } from "./GameScene";
import { anyOf } from "../../Utils/ArrayUtils";
import { CardNode } from "./Model/GameUpdate";

export interface CardButtonProps {
    card: Card;
}

export default function CardButtonView({ card }: CardButtonProps) {
    const { request } = useContext(TargetSelectorContext);

    let playableCards: CardNode[] = [];
    let classes = ['card-button-view'];

    if ('play_cards' in request) {
        playableCards = request.play_cards;
        classes.push('card-button-play');
    } else if ('respond_cards' in request) {
        playableCards = request.respond_cards;
        classes.push('card-button-respond');
    }

    if (anyOf(playableCards, node => node.card == card.id) && 'name' in card.cardData) {
        return <button className={classes.join(' ')}><LocalizedCardName name={card.cardData.name} /></button>
    } else {
        return null;
    }
}