import "./CardView.css";
import { Card } from "../GameTable";
import { CardSign } from "../../../Messages/CardData";

export interface CardProps {
    card: Card;
}

export default function CardView({ card }: CardProps) {
    let imageSrc = '/cards/';
    if ('image' in card.cardData) {
        if (card.cardData.image.includes('/')) {
            imageSrc += card.cardData.image;
        } else {
            imageSrc += card.cardData.deck + '/' + card.cardData.image;
        }
    } else {
        imageSrc += 'backface/' + card.cardData.deck;
    }
    imageSrc += '.png';

    let cardSign: CardSign | undefined;
    if ('sign' in card.cardData && card.cardData.sign.rank != 'none' && card.cardData.sign.suit != 'none') {
        cardSign = card.cardData.sign;
    }

    let imageClass = 'card-view';

    if (card.inactive) {
        imageClass += ' card-horizontal';
    }

    return (
        <div className={imageClass}>
            <img className="card-view-img" src={imageSrc}/>
            {cardSign ? <div className="card-view-inner">
                <img src={`/cards/misc/${cardSign.rank}.png`}/>
                <img src={`/cards/misc/suit_${cardSign.suit}.png`}/>
            </div> : null}
        </div>
    )
}