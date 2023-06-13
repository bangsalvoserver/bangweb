import { CSSProperties, forwardRef, useContext, useImperativeHandle, useMemo, useRef } from "react";
import { Rect, getDivRect } from "../../Utils/Rect";
import CardSignView from "./CardSignView";
import { GameTableContext, TargetSelectorContext } from "./GameScene";
import { Card, CardImage, GameTable, getCardImage } from "./Model/GameTable";
import { TargetMode, TargetSelector, countSelectedCubes, getSelectorCurrentTree, isCardCurrent, isCardSelected, isValidCardTarget, isValidCubeTarget, selectorCanPickCard } from "./Model/TargetSelector";
import "./Style/CardAnimations.css";
import "./Style/CardView.css";

export interface CardProps {
    card: Card;
    showBackface?: boolean;
    onClickCard?: () => void;
}

export interface CardRef {
    getRect: () => Rect | undefined;
}

function getSelectorCardClass(table: GameTable, selector: TargetSelector, card: Card) {
    if ('targets' in selector.selection) {
        if (isCardSelected(selector, card)) {
            return 'card-selected';
        }
        if (selector.mode == TargetMode.target || selector.mode == TargetMode.modifier) {
            if (isValidCubeTarget(table, selector, card)) {
                return 'card-targetable-cubes';
            } else if (isValidCardTarget(table, selector, card)) {
                return 'card-targetable';
            }
        }
        if (isCardCurrent(selector, card)) {
            return 'card-current';
        }
    } else if ('picked_card' in selector.selection) {
        if (selector.selection.picked_card == card.id) {
            return 'card-picked';
        }
    } else if (selectorCanPickCard(table, selector, card)) {
        return 'card-pickable';
    }
    if (!('playing_card' in selector.selection) || selector.selection.playing_card === undefined) {
        if (getSelectorCurrentTree(selector).some(node => node.card == card.id)) {
            return 'card-playable';
        }
    }
    if ('respond_cards' in selector.request) {
        if (selector.request.highlight_cards.includes(card.id)) {
            return 'card-highlight';
        }
        if (selector.request.origin_card == card.id) {
            return 'card-origin';
        }
    }
    return null;
}

const CardView = forwardRef<CardRef, CardProps>(({ card, showBackface, onClickCard }, ref) => {
    const table = useContext(GameTableContext);
    const selector = useContext(TargetSelectorContext);

    const cardRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        getRect: () => cardRef.current ? getDivRect(cardRef.current) : undefined
    }));

    const selectorCardClass = useMemo(() => getSelectorCardClass(table, selector, card), [selector]);
    const selectedCubes = useMemo(() => countSelectedCubes(selector, card), [selector]);

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
        if (selectorCardClass) {
            classes.push(selectorCardClass);
        }
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
                {[...Array(card.num_cubes)].map((item, i) => (
                    <img key={i} className={`card-cube${card.num_cubes - i <= selectedCubes ? ' card-cube-selected' : ''}`} src='/media/sprite_cube.png' />
                ))}
            </div> : null}
        </div>
    )
});

export default CardView;