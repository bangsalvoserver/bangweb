import "./CardView.css";
import { Card } from "../GameTable";
import { CardSign } from "../../../Messages/CardData";
import CardSignView from "./CardSignView";

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

    let imageClass = 'card-view';
    if (card.inactive) {
        imageClass += ' card-horizontal';
    }

    return (
        <div className={imageClass}>
            <img className="card-view-img" src={imageSrc}/>
            {'sign' in card.cardData ? <div className="card-view-inner">
                <CardSignView sign={card.cardData.sign} />
            </div> : null}
        </div>
    )
}