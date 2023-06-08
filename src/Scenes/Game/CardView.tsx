import { CSSProperties, forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { Rect, getDivRect } from "../../Utils/Rect";
import CardSignView from "./CardSignView";
import { Card, CardImage, getCardImage } from "./Model/GameTable";
import "./Style/CardAnimations.css";
import "./Style/CardView.css";
import { RequestContext } from "./GameScene";

export interface CardProps {
    card: Card;
    showBackface?: boolean;
}

export interface CardRef {
    getRect: () => Rect | undefined;
}

const CardView = forwardRef<CardRef, CardProps>(({ card, showBackface }, ref) => {
    const request = useContext(RequestContext);

    const cardRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        getRect: () => cardRef.current ? getDivRect(cardRef.current) : undefined
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

            showBackface = true;

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
        }
    } else {
        if (card.inactive) {
            classes.push('card-horizontal');
        }
        if ('highlight_cards' in request && request.highlight_cards.includes(card.id)) {
            classes.push('card-highlight');
        } else if ('origin_card' in request && request.origin_card == card.id) {
            classes.push('card-origin');
        }
    }

    return (
        <div ref={cardRef} style={style} className={classes.join(' ')}>
            <div className="card-front">
                <img className="card-view-img" src={cardImage ? getImageSrc(cardImage) : backfaceSrc}/>
                {cardImage?.sign ? <div className="card-view-inner">
                    <CardSignView sign={cardImage.sign} />
                </div> : null}
            </div>
            { showBackface ?
            <div className="card-back">
                <img className="card-view-img" src={backfaceSrc} />
            </div> : null}
            {card.num_cubes > 0 ? <div className="card-cubes">
                {[...Array(card.num_cubes)].map((item, i) => <img key={i} src='/media/sprite_cube.png' />)}
            </div> : null}
        </div>
    )
});

export default CardView;