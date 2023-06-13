import { CSSProperties, forwardRef, useContext, useImperativeHandle, useMemo, useRef } from "react";
import { Rect, getDivRect } from "../../Utils/Rect";
import CardSignView from "./CardSignView";
import { Card, CardImage, getCardImage } from "./Model/GameTable";
import "./Style/CardAnimations.css";
import "./Style/CardView.css";
import { TargetSelectorContext } from "./GameScene";
import { TargetSelector, getSelectorPlayCards } from "./Model/TargetSelector";

export interface CardProps {
    card: Card;
    showBackface?: boolean;
    onClickCard?: () => void;
}

export interface CardRef {
    getRect: () => Rect | undefined;
}

function getSelectorCardClasses(selector: TargetSelector, card: Card) {
    if ('playing_card' in selector.selection) {
        if (getSelectorPlayCards(selector).some(node => node.card == card.id)) {
            return ['card-playable'];
        }
        if (selector.selection.playing_card?.id == card.id) {
            return ['card-current'];
        }
        if (selector.selection.modifiers.some(({modifier}) => modifier.id == card.id)) {
            return ['card-current'];
        }
    }
    if ('highlight_cards' in selector.request && selector.request.highlight_cards.includes(card.id)) {
        return ['card-highlight'];
    }
    if ('origin_card' in selector.request && selector.request.origin_card == card.id) {
        return ['card-origin'];
    }
    return [];
}

const CardView = forwardRef<CardRef, CardProps>(({ card, showBackface, onClickCard }, ref) => {
    const selector = useContext(TargetSelectorContext);

    const cardRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        getRect: () => cardRef.current ? getDivRect(cardRef.current) : undefined
    }));

    const selectorCardClasses = useMemo(() => getSelectorCardClasses(selector, card), [selector, card]);

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
        classes.push(...selectorCardClasses);
    }

    return (
        <div ref={cardRef} style={style} className={classes.join(' ')} onClick={onClickCard}>
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