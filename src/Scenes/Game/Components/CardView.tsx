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

    let imageClass = 'card-view';
    if (card.inactive) {
        imageClass += ' card-horizontal';
    }
    let style: CSSProperties | undefined;

    if (card.flipping) {
        if (card.cardData) {
            imageClass += ' card-unflip-animation';
        } else {
            imageClass += ' card-flip-animation';
        }
        style = {
            '--duration': card.flipping + 'ms'
        } as CSSProperties;
    }

    return (
        <div style={style} className={imageClass}>
            <div className="card-front">
                <img className="card-view-img" src={imageSrc}/>
                {'sign' in card.cardData ? <div className="card-view-inner">
                    <CardSignView sign={card.cardData.sign} />
                </div> : null}
            </div>
            { card.flipping ?
            <div className="card-back">
                <img className="card-view-img" src={backfaceSrc} />
            </div> : null}
        </div>
    )
}