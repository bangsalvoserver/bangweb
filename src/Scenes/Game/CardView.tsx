import { CSSProperties, forwardRef, useContext, useImperativeHandle, useMemo, useRef } from "react";
import { Rect, getDivRect } from "../../Utils/Rect";
import CardSignView from "./CardSignView";
import { TargetSelectorContext } from "./GameScene";
import { Card, getCardImage } from "./Model/GameTable";
import { TargetSelector, countSelectedCubes, isCardCurrent, isCardPrompted, isCardSelected, isHandSelected, isResponse, isSelectionPicking, isSelectionPlaying, isValidCardTarget, isValidCubeTarget, selectorCanPickCard, selectorCanPlayCard } from "./Model/TargetSelector";
import "./Style/CardAnimations.css";
import "./Style/CardView.css";
import spriteCube from "/media/sprite_cube.png";

export const SPRITE_CUBE = spriteCube;

export function getCardUrl(image: string) {
    return `/cards/${image}.png`;
}

export interface CardProps {
    card: Card;
    showBackface?: boolean;
    onClickCard?: (card: Card) => void;
}

export interface CardRef {
    getRect: () => Rect | null;
}

export function getSelectorCardClass(selector: TargetSelector, card: Card) {
    if (isSelectionPlaying(selector)) {
        if (isHandSelected(selector, card) || isCardSelected(selector, card.id)) {
            return 'card-selected';
        }
        if (selector.selection.mode == 'target' || selector.selection.mode == 'modifier') {
            if (isValidCubeTarget(selector, card)) {
                return 'card-targetable-cubes';
            } else if (isValidCardTarget(selector, card)) {
                return 'card-targetable';
            }
        }
    } else if (isSelectionPicking(selector)) {
        if (selector.selection.picked_card == card.id) {
            return 'card-picked';
        }
    }
    if (isCardCurrent(selector, card)) {
        return 'card-current';
    } else if (isCardPrompted(selector, card)) {
        return 'card-current';
    } else if (selectorCanPlayCard(selector, card)) {
        return 'card-playable';
    } else if (selectorCanPickCard(selector, card)) {
        return 'card-pickable';
    }
    if (isResponse(selector)) {
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
    const selector = useContext(TargetSelectorContext);

    const cardRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        getRect: () => cardRef.current ? getDivRect(cardRef.current) : null
    }));

    const selectorCardClass = useMemo(() => getSelectorCardClass(selector, card), [selector]);
    const selectedCubes = useMemo(() => countSelectedCubes(selector, card), [selector]);

    let backfaceSrc = getCardUrl('backface/' + card.cardData.deck);

    let cardImage = getCardImage(card);

    let style: CSSProperties | undefined;
    let classes = ['card-view'];

    if (card.animation) {
        if ('flipping' in card.animation) {
            style = {
                '--duration': card.animation.flipping.duration + 'ms'
            } as CSSProperties;

            showBackface = true;

            classes.push('card-animation', 'z-10', 'card-animation-flip');
            if (card.animation.flipping.cardImage) {
                cardImage = card.animation.flipping.cardImage;
            } else {
                classes.push('card-animation-reverse');
            }
        } else if ('turning' in card.animation) {
            style = {
                '--duration': card.animation.turning.duration + 'ms'
            } as CSSProperties;

            classes.push('card-animation', 'z-10', 'card-animation-turn');
            if (!card.inactive) classes.push('card-animation-reverse');
        } else if ('flash' in card.animation) {
            style = {
                '--duration': card.animation.flash.duration + 'ms'
            } as CSSProperties;

            classes.push('z-10', 'card-animation-flash');
        } else if ('short_pause' in card.animation) {
            classes.push('z-10')
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
        <div ref={cardRef} style={style} className={classes.join(' ')}
            onClick={onClickCard ? () => onClickCard(card) : undefined} >
            { cardImage ? <div className="card-front">
                <img className="card-view-img" src={getCardUrl(cardImage.image)}/>
                {cardImage.sign && <div className="card-view-inner">
                    <CardSignView sign={cardImage.sign} />
                </div>}
                {card.num_cubes > 0 && <div className="card-cubes">
                    {[...Array(card.num_cubes)].map((item, i) => (
                        <img key={i} className={`card-cube${card.num_cubes - i <= selectedCubes ? ' card-cube-selected' : ''}`} src={SPRITE_CUBE} />
                    ))}
                </div>}
            </div> : <div className="card-back">
                <img className="card-view-img" src={backfaceSrc} />
            </div> }
            { showBackface && <div className="card-back-flip">
                <img className="card-view-img" src={backfaceSrc} />
            </div> }
        </div>
    )
});

export default CardView;