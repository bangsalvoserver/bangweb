import { CSSProperties, Ref, useContext, useImperativeHandle, useMemo, useRef } from "react";
import { getDivRect } from "../../Utils/Rect";
import CardSignView from "./CardSignView";
import { GameStateContext } from "./GameScene";
import { getLocalizedCardName } from "./GameStringComponent";
import { CardRef } from "./Model/CardTracker";
import { Card, CardImage, GameTable, getCardBackface, getCardImage, isCardKnown } from "./Model/GameTable";
import { countSelectedCubes, isCardCurrent, isCardPrompted, isCardSelected, isHandSelected, isResponse, isValidCardTarget, isValidCubeTarget, selectorCanPlayCard, selectorIsTargeting, TargetSelector } from "./Model/TargetSelector";
import useCardOverlay from "./Model/UseCardOverlay";
import { SelectorConfirmContext } from "./Model/UseSelectorConfirm";
import "./Style/CardAnimations.css";
import "./Style/CardView.css";
import spriteCube from "/media/sprite_cube.png";

export const SPRITE_CUBE = spriteCube;

export function getCardUrl(image: string) {
    return `/cards/${image}.png`;
}

export interface CardProps {
    cardRef?: Ref<CardRef>;
    card: Card;
    showBackface?: boolean;
}

export function getSelectorCardClass(table: GameTable, selector: TargetSelector, card: Card): string {
    if (isCardPrompted(selector, card)) {
        return 'card-prompted';
    }
    if (isHandSelected(table, selector, card) || isCardSelected(selector, card.id)) {
        if (selectorIsTargeting(selector) && isValidCardTarget(table, selector, card)) {
            return 'card-retargetable';
        } else {
            return 'card-selected';
        }
    }
    if (selectorIsTargeting(selector)) {
        if (isValidCubeTarget(table, selector, card)) {
            return 'card-targetable-cubes';
        } else if (isValidCardTarget(table, selector, card)) {
            if (selectorCanPlayCard(selector, card)) {
                return 'card-playable card-targetable';
            } else {
                return 'card-targetable';
            }
        }
    }
    if (isCardCurrent(selector, card)) {
        return 'card-current';
    } else if (selectorCanPlayCard(selector, card)) {
        switch (selector.mode) {
        case 'start':
        case 'middle':
        case 'preselect':
            return 'card-playable';
        default:
            return 'card-modified';
        }
    }
    if (isResponse(selector)) {
        if (selector.request.highlight_cards.includes(card.id)) {
            return 'card-highlight';
        }
        if (selector.request.origin_card === card.id) {
            return 'card-origin';
        }
    }
    return '';
}

export default function CardView({ cardRef, card, showBackface }: CardProps) {
    const { table, selector } = useContext(GameStateContext);

    const { handleClickCard } = useContext(SelectorConfirmContext);

    const divRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(cardRef, () => ({
        getRect: () => divRef.current ? getDivRect(divRef.current) : null
    }));

    let [backfaceImage, cardImage, cardAlt] = useMemo(() => {
        const backfaceImage: CardImage = { image: getCardBackface(card) };
        const cardImage = getCardImage(card);
        const cardAlt = isCardKnown(card) ? getLocalizedCardName(card.cardData.name) : "";
        return [backfaceImage, cardImage, cardAlt] as const;
    }, [card]);

    useCardOverlay(cardImage ?? backfaceImage, cardAlt, divRef);

    const selectedCubes = countSelectedCubes(selector, card);

    let style: CSSProperties | undefined;
    let classes = ['card-view'];

    switch (card.animation.type) {
    case 'flipping':
        style = {
            '--duration': card.animation.duration + 'ms'
        } as CSSProperties;

        showBackface = true;

        classes.push('card-animation', 'z-10', 'card-animation-flip');
        if (card.animation.backface) {
            backfaceImage.image = card.animation.backface;
        }
        if (card.animation.cardImage) {
            cardImage = card.animation.cardImage;
        } else {
            classes.push('card-animation-reverse');
        }
        break;
    case 'turning':
        style = {
            '--duration': card.animation.duration + 'ms'
        } as CSSProperties;

        classes.push('card-animation', 'z-10', 'card-animation-turn');
        if (!card.inactive) classes.push('card-animation-reverse');
        break;
    case 'flash':
        style = {
            '--duration': card.animation.duration + 'ms'
        } as CSSProperties;

        classes.push('z-10', 'card-animation-flash');
        break;
    case 'short_pause':
        classes.push('z-10');
        break;
    case 'none':
        if (card.inactive) {
            classes.push('card-horizontal');
        }
        classes.push(getSelectorCardClass(table, selector, card));
    }

    return (
        <div ref={divRef} style={style} className={classes.join(' ')}
            onClick={handleClickCard(card)} >
            { cardImage ? <div className="card-front">
                <img className="card-view-img" src={getCardUrl(cardImage.image)} alt={cardAlt} />
                {cardImage.sign && <div className="card-view-inner">
                    <CardSignView sign={cardImage.sign} />
                </div>}
                {card.num_cubes > 0 && <div className="card-cubes">
                    {[...Array(card.num_cubes)].map((item, i) => (
                        <img key={i} className={`card-cube${card.num_cubes - i <= selectedCubes ? ' card-cube-selected' : ''}`} src={SPRITE_CUBE} alt=""  />
                    ))}
                </div>}
            </div> : <div className="card-back">
                <img className="card-view-img" src={getCardUrl(backfaceImage.image)} alt="" />
            </div> }
            { showBackface && <div className="card-back-flip">
                <img className="card-view-img" src={getCardUrl(backfaceImage.image)} alt=""  />
            </div> }
        </div>
    )
}