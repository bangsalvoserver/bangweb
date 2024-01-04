import { CSSProperties, Ref, RefObject, useContext, useEffect, useImperativeHandle, useRef } from "react";
import { getDivRect } from "../../Utils/Rect";
import CardSignView from "./CardSignView";
import { GameTableContext } from "./GameScene";
import { CardRef } from "./Model/CardTracker";
import { Card, GameTable, getCardBackface, getCardImage, isCardKnown } from "./Model/GameTable";
import { PlayingSelectorTable, countSelectedCubes, isCardCurrent, isCardPrompted, isCardSelected, isHandSelected, isResponse, isSelectionPicking, isSelectionPlaying, isValidCardTarget, isValidCubeTarget, selectorCanPickCard, selectorCanPlayCard } from "./Model/TargetSelector";
import "./Style/CardAnimations.css";
import "./Style/CardView.css";
import spriteCube from "/media/sprite_cube.png";
import { getLocalizedCardName } from "./GameStringComponent";

export const SPRITE_CUBE = spriteCube;

export function getCardUrl(image: string) {
    return `/cards/${image}.png`;
}

export type OverlayIdType = 'card' | 'player_role';
export type OverlayId = { type: OverlayIdType, id: number };

export interface CardOverlayTracker {
    add: (card: OverlayId) => void;
    remove: (card: OverlayId) => void;
}

export interface CardProps {
    cardRef?: Ref<CardRef>;
    card: Card;
    showBackface?: boolean;
    onClickCard?: (card: Card) => void;
    cardOverlayTracker?: CardOverlayTracker;
}

export function getSelectorCardClass(table: GameTable, card: Card) {
    const selector = table.selector;
    if (isSelectionPlaying(selector)) {
        if (isHandSelected(table, card) || isCardSelected(selector, card.id)) {
            return 'card-selected';
        }
        if (selector.selection.mode === 'target' || selector.selection.mode === 'modifier') {
            if (isValidCubeTarget(table as PlayingSelectorTable, card)) {
                return 'card-targetable-cubes';
            } else if (isValidCardTarget(table as PlayingSelectorTable, card)) {
                return 'card-targetable';
            }
        }
    } else if (isSelectionPicking(selector)) {
        if (selector.selection.picked_card === card.id) {
            return 'card-picked';
        }
    }
    if (isCardCurrent(selector, card)) {
        return 'card-current';
    } else if (isCardPrompted(selector, card)) {
        return 'card-current';
    } else if (selectorCanPlayCard(selector, card)) {
        return 'card-playable';
    } else if (selectorCanPickCard(table, card)) {
        return 'card-pickable';
    }
    if (isResponse(selector)) {
        if (selector.request.highlight_cards.includes(card.id)) {
            return 'card-highlight';
        }
        if (selector.request.origin_card === card.id) {
            return 'card-origin';
        }
    }
    return null;
}

export function useCardOverlay(type: OverlayIdType, id: number, divRef?: RefObject<HTMLDivElement>, tracker?: CardOverlayTracker) {
    useEffect(() => {
        const div = divRef?.current;
        if (!div || !tracker) return;

        let timeout: number | undefined;
        let added = false;

        const overlayId = { type, id };

        const addOverlay = () => {
            timeout = setTimeout(() => {
                added = true;
                tracker.add(overlayId);
            }, 500);
        };

        const removeOverlay = () => {
            clearTimeout(timeout);
            if (added) {
                added = false;
                tracker.remove(overlayId);
            }
        };

        div.addEventListener('mouseenter', addOverlay);
        div.addEventListener('mouseleave', removeOverlay);

        return () => {
            div.removeEventListener('mouseenter', addOverlay);
            div.removeEventListener('mouseleave', removeOverlay);
            removeOverlay();
        }
    }, [type, id, divRef, tracker]);
}

export default function CardView({ cardRef, card, showBackface, onClickCard, cardOverlayTracker }: CardProps) {
    const table = useContext(GameTableContext);
    const selector = table.selector;

    const divRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(cardRef, () => ({
        getRect: () => divRef.current ? getDivRect(divRef.current) : null
    }));

    useCardOverlay('card', card.id, divRef, cardOverlayTracker);

    const selectorCardClass = getSelectorCardClass(table, card);
    const selectedCubes = countSelectedCubes(selector, card);

    let backfaceSrc = getCardUrl(getCardBackface(card));

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
            if (card.animation.flipping.backface) {
                backfaceSrc = getCardUrl(card.animation.flipping.backface);
            }
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
        <div ref={divRef} style={style} className={classes.join(' ')}
            onClick={onClickCard ? () => onClickCard(card) : undefined} >
            { cardImage ? <div className="card-front">
                <img className="card-view-img" src={getCardUrl(cardImage.image)} alt={isCardKnown(card) ? getLocalizedCardName(card.cardData.name) : ""} />
                {cardImage.sign && <div className="card-view-inner">
                    <CardSignView sign={cardImage.sign} />
                </div>}
                {card.num_cubes > 0 && <div className="card-cubes">
                    {[...Array(card.num_cubes)].map((item, i) => (
                        <img key={i} className={`card-cube${card.num_cubes - i <= selectedCubes ? ' card-cube-selected' : ''}`} src={SPRITE_CUBE} alt=""  />
                    ))}
                </div>}
            </div> : <div className="card-back">
                <img className="card-view-img" src={backfaceSrc} alt="" />
            </div> }
            { showBackface && <div className="card-back-flip">
                <img className="card-view-img" src={backfaceSrc} alt=""  />
            </div> }
        </div>
    )
}