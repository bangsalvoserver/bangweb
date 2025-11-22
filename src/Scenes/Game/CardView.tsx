import React, { CSSProperties, Ref, useContext, useImperativeHandle, useMemo, useRef } from "react";
import { useLanguage } from "../../Locale/Registry";
import { asArray } from "../../Utils/ArrayUtils";
import CardSignView from "./CardSignView";
import { GameStateContext } from "./GameScene";
import { getCardRegistryEntry } from "./GameStringComponent";
import { TokenType } from "./Model/CardEnums";
import { buildCardRef, CardRef } from "./Model/CardTracker";
import { cardHasTag } from "./Model/Filters";
import { Card, CardImage, GameTable, getCard, getCardBackface, getCardImage, getTablePocket } from "./Model/GameTable";
import { useSelectorConfirm } from "./Model/SelectorConfirm";
import { countSelectedCubes, isCardCurrent, isCardPrompted, isCardSelected, isResponse, isValidCardTarget, isValidCubeTarget, selectorCanPlayCard, selectorIsTargeting, TargetSelector } from "./Model/TargetSelector";
import useCardOverlay from "./Model/UseCardOverlay";
import "./Style/CardAnimations.css";
import "./Style/CardDescriptionView.css";
import "./Style/CardView.css";

export function getTokenSprite(tokenType: TokenType) {
    return `/media/sprite_${tokenType}.png`;
}

export function getCardUrl(image: string) {
    return `/cards/${image}.webp`;
}

export interface CardProps {
    cardRef?: Ref<CardRef>;
    card: Card;
    showBackface?: boolean;
}

function isHighlight(selector: TargetSelector, card: Card): boolean {
    if (isResponse(selector)) {
        return selector.request.highlight_cards.has(card.id);
    }
    return false;
}

function isOriginCard(table: GameTable, selector: TargetSelector, card: Card): boolean {
    if (isResponse(selector)) {
        let originCardId = selector.request.origin_card;
        if (originCardId !== null) {
            const originCard = getCard(table, originCardId);
            if (cardHasTag(originCard, 'card_choice')) {
                switch (originCard.cardData.deck) {
                    case 'goldrush': originCardId = getTablePocket(table, 'shop_deck')[0]; break;
                    case 'train': originCardId = getTablePocket(table, 'train_deck')[0]; break;
                }
            }
            return originCardId === card.id;
        }
    }
    return false;
}

export function getSelectorCardClass(table: GameTable, selector: TargetSelector, card: Card): string {
    if (isCardPrompted(selector, card)) {
        return 'card-prompted';
    }
    if (isCardSelected(selector, card)) {
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
    if (isHighlight(selector, card)) {
        return 'card-highlight';
    }
    if (isOriginCard(table, selector, card)) {
        return 'card-origin';
    }
    return '';
}

export const CardImageView = React.memo(({ image, name, sign }: CardImage) => {
    const language = useLanguage();
    const entry = name ? getCardRegistryEntry(language, name) : undefined;
    return <>
        <img className="card-view-img" src={getCardUrl(image)} alt={entry?.name} />
        {entry && !entry.hideTitle && <div className={entry.titleClass ?? 'card-title'}>{entry.name}</div>}
        {entry && asArray(entry.description).map((elem, index) =>
            <div key={index} className={entry.descriptionClass ?? 'card-description'} description-index={index}>
                <div className='card-description-inner'>{elem}</div>
            </div>)}
        {sign && <div className="card-sign-view"><CardSignView sign={sign} /></div>}
    </>
});

export default function CardView({ cardRef, card, showBackface }: CardProps) {
    const { table, selector } = useContext(GameStateContext);

    const { handleClickCard } = useSelectorConfirm();

    const divRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(cardRef, () => buildCardRef(divRef, card.id), [card.id]);

    let [cardImage, backface] = useMemo(() => [
        getCardImage(card), getCardBackface(card)
    ], [card]);

    useCardOverlay(cardImage ?? backface, divRef);

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
            backface = card.animation.backface;
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

    const selectedCubes = countSelectedCubes(table, selector, card);
    const tokens = (Object.entries(card.tokens) as [TokenType, number][])
        .flatMap(([token, count]) => [...Array(count)].map((_,i) => {
            let className = 'card-token';
            if (token === 'cube') {
                className += ' card-cube';
                if (count - i <= selectedCubes) {
                    className += ' card-cube-selected';
                }
            }
            return <img key={token + i} className={className} src={getTokenSprite(token)} alt="" />
        }));

    return (
        <div ref={divRef} style={style} className={classes.join(' ')}
            onClick={handleClickCard(card)} >
            { cardImage ? <div className="card-front">
                <CardImageView {...cardImage} />
                {tokens.length !== 0 && <div className="card-tokens">{tokens}</div>}
            </div> : <div className="card-back">
                <CardImageView {...backface} />
            </div> }
            { showBackface && <div className="card-back-flip">
                <CardImageView {...backface} />
            </div> }
        </div>
    )
}