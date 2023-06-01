import "./CardView.css";
import { Card } from "../GameTable";
import { CardSign } from "../../../Messages/CardData";
import CardSignView from "./CardSignView";
import { CSSProperties } from "react";

export interface CardProps {
    card: Card;
}

export default function CardView({ card }: CardProps) {
    let backfaceSrc = '/cards/backface/' + card.cardData.deck + '.png';

    let imageSrc = '/cards/';
    if ('image' in card.cardData) {
        if (card.cardData.image.includes('/')) {
            imageSrc += card.cardData.image;
        } else {
            imageSrc += card.cardData.deck + '/' + card.cardData.image;
        }
        imageSrc += '.png';
    } else {
        imageSrc = backfaceSrc;
    }

    let style: CSSProperties | undefined;
    let classes = ['card-view'];

    if (card.animation) {
        const [cardAnimation, duration] = card.animation;
        style = {
            '--duration': duration + 'ms'
        } as CSSProperties;

        classes.push('card-animation');

        switch (cardAnimation) {
        case 'flipping':
            classes.push('card-animation-flip');
            if (card.cardData) classes.push('card-animation-reverse');
            break;
        case 'turning':
            classes.push('card-animation-turn');
            if (!card.inactive) classes.push('card-animation-reverse');
            break;
        }
    } else if (card.inactive) {
        classes.push('card-horizontal');
    }

    return (
        <div style={style} className={classes.join(' ')}>
            <div className="card-front">
                <img className="card-view-img" src={imageSrc}/>
                {'sign' in card.cardData ? <div className="card-view-inner">
                    <CardSignView sign={card.cardData.sign} />
                </div> : null}
            </div>
            { card.animation && card.animation[0] == 'flipping' ?
            <div className="card-back">
                <img className="card-view-img" src={backfaceSrc} />
            </div> : null}
        </div>
    )
}