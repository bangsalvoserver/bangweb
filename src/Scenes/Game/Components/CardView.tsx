import "./CardView.css";
import { Card } from "../GameTable";
import { CardData, CardSign } from "../../../Messages/CardData";
import CardSignView from "./CardSignView";
import { CSSProperties } from "react";

export interface CardProps {
    card: Card;
}

export default function CardView({ card }: CardProps) {
    let backfaceSrc = '/cards/backface/' + card.cardData.deck + '.png';

    const getCardDataImage = (cardData: CardData) => {
        let imageSrc = '/cards/';
        if (cardData.image.includes('/')) {
            imageSrc += cardData.image;
        } else {
            imageSrc += cardData.deck + '/' + cardData.image;
        }
        imageSrc += '.png';
        return imageSrc;
    };

    let cardData: CardData | undefined;
    if ('image' in card.cardData) {
        cardData = card.cardData;
    }

    let style: CSSProperties | undefined;
    let classes = ['card-view'];

    if (card.animation) {
        const [cardAnimation, duration] = card.animation;
        style = {
            '--duration': duration + 'ms'
        } as CSSProperties;

        classes.push('card-animation');

        if ('flipping' in cardAnimation) {
            classes.push('card-animation-flip');
            if (cardAnimation.flipping.cardData) {
                cardData = cardAnimation.flipping.cardData;
            } else {
                classes.push('card-animation-reverse');
            }
        } else if ('turning' in cardAnimation) {
            classes.push('card-animation-turn');
            if (!card.inactive) classes.push('card-animation-reverse');
        }
    } else if (card.inactive) {
        classes.push('card-horizontal');
    }

    return (
        <div style={style} className={classes.join(' ')}>
            <div className="card-front">
                <img className="card-view-img" src={cardData ? getCardDataImage(cardData) : backfaceSrc}/>
                {cardData ? <div className="card-view-inner">
                    <CardSignView sign={cardData.sign} />
                </div> : null}
            </div>
            { classes.includes('card-animation-flip') ?
            <div className="card-back">
                <img className="card-view-img" src={backfaceSrc} />
            </div> : null}
        </div>
    )
}