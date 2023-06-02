import "./CardView.css";
import "./Animations/CardAnimations.css";
import { Card, CardImage, getCardImage } from "../GameTable";
import { CardData, CardSign } from "../../../Messages/CardData";
import CardSignView from "./CardSignView";
import { CSSProperties } from "react";

export interface CardProps {
    card: Card;
}

export default function CardView({ card }: CardProps) {
    let backfaceSrc = '/cards/backface/' + card.cardData.deck + '.png';

    const getImageSrc = (cardImage: CardImage) => {
        let imageSrc = '/cards/';
        if (cardImage.image.includes('/')) {
            imageSrc += cardImage.image;
        } else {
            imageSrc += card.cardData.deck + '/' + cardImage.image;
        }
        imageSrc += '.png';
        return imageSrc;
    };

    let cardImage = getCardImage(card);

    let style: CSSProperties | undefined;
    let classes = ['card-view'];

    if (card.animation) {
        if ('flipping' in card.animation) {
            style = {
                '--duration': card.animation.flipping.duration + 'ms'
            } as CSSProperties;

            classes.push('card-animation', 'card-overlay', 'card-animation-flip');
            if (card.animation.flipping.cardImage) {
                cardImage = card.animation.flipping.cardImage;
            } else {
                classes.push('card-animation-reverse');
            }
        } else if ('turning' in card.animation) {
            style = {
                '--duration': card.animation.turning.duration + 'ms'
            } as CSSProperties;

            classes.push('card-animation', 'card-overlay', 'card-animation-turn');
            if (!card.inactive) classes.push('card-animation-reverse');
        } else if ('flash' in card.animation) {
            style = {
                '--duration': card.animation.flash.duration + 'ms'
            } as CSSProperties;

            classes.push('card-overlay', 'card-animation-flash');
        } else if ('short-pause' in card.animation) {
            classes.push('card-overlay')
        }
    } else if (card.inactive) {
        classes.push('card-horizontal');
    }

    return (
        <div style={style} className={classes.join(' ')}>
            <div className="card-front">
                <img className="card-view-img" src={cardImage ? getImageSrc(cardImage) : backfaceSrc}/>
                {cardImage?.sign ? <div className="card-view-inner">
                    <CardSignView sign={cardImage.sign} />
                </div> : null}
            </div>
            { classes.includes('card-animation-flip') ?
            <div className="card-back">
                <img className="card-view-img" src={backfaceSrc} />
            </div> : null}
        </div>
    )
}