import "./Style/CardView.css";
import "./Style/CardAnimations.css";
import CardSignView from "./CardSignView";
import { CSSProperties, MutableRefObject, forwardRef, useImperativeHandle, useRef } from "react";
import { Card, CardImage, getCardImage } from "./Model/GameTable";
import { Rect, getDivRect } from "../../Utils/Rect";

export interface CardProps {
    card: Card;
    forceRender?: boolean;
}

export interface CardRef {
    getRect: () => Rect;
}

const CardView = forwardRef<CardRef, CardProps>(({ card, forceRender }, ref) => {
    const cardRef = useRef() as MutableRefObject<HTMLDivElement>;

    useImperativeHandle(ref, () => ({
        getRect: () => getDivRect(cardRef.current)
    }));

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
        } else if ('short_pause' in card.animation) {
            classes.push('card-overlay')
        } else if ('move_card' in card.animation) {
            if (!forceRender) {
                classes.push('card-hidden');
            }
        }
    } else if (card.inactive) {
        classes.push('card-horizontal');
    }

    return (
        <div ref={cardRef} style={style} className={classes.join(' ')}>
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
});

export default CardView;