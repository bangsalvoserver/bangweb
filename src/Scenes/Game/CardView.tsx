import { CSSProperties, Ref, useContext, useImperativeHandle, useMemo, useRef } from "react";
import { getDivRect } from "../../Utils/Rect";
import CardSignView from "./CardSignView";
import { GameStateContext } from "./GameScene";
import { getLocalizedCardName } from "./GameStringComponent";
import { TokenType } from "./Model/CardEnums";
import { CardRef } from "./Model/CardTracker";
import { Card, GameTable, getCardBackface, getCardImage, getCubeCount, isCardKnown } from "./Model/GameTable";
import { countSelectedCubes, isCardCurrent, isCardPrompted, isCardSelected, isResponse, isValidCardTarget, isValidCubeTarget, selectorCanPlayCard, selectorIsTargeting, TargetSelector } from "./Model/TargetSelector";
import useCardOverlay from "./Model/UseCardOverlay";
import { SelectorConfirmContext } from "./Model/UseSelectorConfirm";
import "./Style/CardAnimations.css";
import "./Style/CardView.css";
import spriteCube from "/media/sprite_cube.png";
import spriteFame1 from "/media/sprite_fame1.png";
import spriteFame2 from "/media/sprite_fame2.png";
import spriteFame3 from "/media/sprite_fame3.png";
import spriteFame4 from "/media/sprite_fame4.png";
import spriteFame5 from "/media/sprite_fame5.png";
import spriteFame6 from "/media/sprite_fame6.png";
import spriteFame7 from "/media/sprite_fame7.png";
import spriteFame8 from "/media/sprite_fame8.png";

export const SPRITE_CUBE = spriteCube;

export function getTokenSprite(tokenType: TokenType) {
    switch (tokenType) {
    case 'cube': return spriteCube;
    case 'fame1': return spriteFame1;
    case 'fame2': return spriteFame2;
    case 'fame3': return spriteFame3;
    case 'fame4': return spriteFame4;
    case 'fame5': return spriteFame5;
    case 'fame6': return spriteFame6;
    case 'fame7': return spriteFame7;
    case 'fame8': return spriteFame8;
    default: throw new Error('invalid tokenType');
    }
}

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
    if (isCardSelected(table, selector, card.id)) {
        if (selectorIsTargeting(selector) && isValidCardTarget(table, selector, card)) {
            return 'card-retargetable';
        } else {
            return 'card-selected';
        }
    }
    if (selectorIsTargeting(selector)) {
        if (isValidCubeTarget(table, selector, card)) {
            if (isCardCurrent(selector, card)) {
                return 'card-current card-targetable-cubes';
            } else {
                return 'card-targetable-cubes';
            }
        } else if (isValidCardTarget(table, selector, card)) {
            if (selectorCanPlayCard(table, selector, card)) {
                return 'card-playable card-targetable';
            } else {
                return 'card-targetable';
            }
        }
    }
    if (isCardCurrent(selector, card)) {
        return 'card-current';
    } else if (selectorCanPlayCard(table, selector, card)) {
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

    let backfaceImage = getCardBackface(card);
    let cardImage = useMemo(() => getCardImage(card), [card]);
    
    const cardAlt = isCardKnown(card) ? getLocalizedCardName(card.cardData.name) : "";

    useCardOverlay(cardImage ?? backfaceImage, cardAlt, divRef);

    const selectedCubes = countSelectedCubes(table, selector, card);

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
            backfaceImage = card.animation.backface;
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

    const nCubes = getCubeCount(card.tokens);
    const cardCubes = nCubes > 0 && (
        [...Array(nCubes)].map((_, i) => (
            <img key={i} className={`card-cube ${nCubes - i <= selectedCubes ? 'card-cube-selected' : ''}`} src={SPRITE_CUBE} alt=""  />
        ))
    );

    const fameTokens = card.cardData.deck === 'feats' && card.tokens
        .flatMap(([token, count]) => {
            if (token === 'cube' || count === 0) return [];
            return [...Array(count)].map((_, i) => (
                <img key={token + i} className="card-fame" src={getTokenSprite(token as TokenType)} alt="" />
            ));
        });

    return (
        <div ref={divRef} style={style} className={classes.join(' ')}
            onClick={handleClickCard(card)} >
            { cardImage ? <div className="card-front">
                <img className="card-view-img" src={getCardUrl(cardImage.image)} alt={cardAlt} />
                {cardImage.sign && <div className="card-view-inner">
                    <CardSignView sign={cardImage.sign} />
                </div>}
                {cardCubes && <div className="card-cubes">{cardCubes}</div>}
                {fameTokens && <div className="card-fame-tokens">{fameTokens}</div>}
            </div> : <div className="card-back">
                <img className="card-view-img" src={getCardUrl(backfaceImage)} alt="" />
            </div> }
            { showBackface && <div className="card-back-flip">
                <img className="card-view-img" src={getCardUrl(backfaceImage)} alt=""  />
            </div> }
        </div>
    )
}