import { CSSProperties, Ref, useContext, useImperativeHandle, useMemo, useRef } from "react";
import { getDivRect } from "../../Utils/Rect";
import CardSignView from "./CardSignView";
import { GameStateContext } from "./GameScene";
import { getLocalizedCardName } from "./GameStringComponent";
import { TokenType } from "./Model/CardEnums";
import { CardRef } from "./Model/CardTracker";
import { cardHasTag } from "./Model/Filters";
import { Card, GameTable, getCard, getCardBackface, getCardImage, isCardKnown } from "./Model/GameTable";
import { useSelectorConfirm } from "./Model/SelectorConfirm";
import { countSelectedCubes, isCardCurrent, isCardPrompted, isCardSelected, isResponse, isValidCardTarget, isValidCubeTarget, selectorCanPlayCard, selectorIsTargeting, TargetSelector } from "./Model/TargetSelector";
import useCardOverlay from "./Model/UseCardOverlay";
import "./Style/CardAnimations.css";
import "./Style/CardView.css";
import spriteGold from "/media/icon_gold.png";
import spriteCube from "/media/sprite_cube.png";
import spriteFame1 from "/media/sprite_fame1.png";
import spriteFame2 from "/media/sprite_fame2.png";
import spriteFame3 from "/media/sprite_fame3.png";
import spriteFame4 from "/media/sprite_fame4.png";
import spriteFame5 from "/media/sprite_fame5.png";
import spriteFame6 from "/media/sprite_fame6.png";
import spriteFame7 from "/media/sprite_fame7.png";
import spriteFame8 from "/media/sprite_fame8.png";

const TOKEN_SPRITES: Record<TokenType, string> = {
    'gold': spriteGold,
    'cube': spriteCube,
    'fame1': spriteFame1,
    'fame2': spriteFame2,
    'fame3': spriteFame3,
    'fame4': spriteFame4,
    'fame5': spriteFame5,
    'fame6': spriteFame6,
    'fame7': spriteFame7,
    'fame8': spriteFame8,
};

export function getTokenSprite(tokenType: TokenType) {
    return TOKEN_SPRITES[tokenType];
}

export function getCardUrl(image: string) {
    return `/cards/${image}.png`;
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
                    case 'goldrush': originCardId = table.pockets.shop_deck[0]; break;
                    case 'train': originCardId = table.pockets.train_deck[0]; break;
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

export default function CardView({ cardRef, card, showBackface }: CardProps) {
    const { table, selector } = useContext(GameStateContext);

    const { handleClickCard } = useSelectorConfirm();

    const divRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(cardRef, () => ({
        getRect: () => getDivRect(divRef.current)
    }), []);

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

    const tokens = (Object.entries(card.tokens) as [TokenType, number][]).flatMap(([token, count]) => {
        return [...Array(count)].map((_,i) => {
            let className = 'card-token';
            if (token === 'cube') {
                className += ' card-cube';
                if (count - i <= selectedCubes) {
                    className += ' card-cube-selected';
                }
            }
            return <img key={token + i} className={className} src={getTokenSprite(token)} alt="" />
        });
    })

    return (
        <div ref={divRef} style={style} className={classes.join(' ')}
            onClick={handleClickCard(card)} >
            { cardImage ? <div className="card-front">
                <img className="card-view-img" src={getCardUrl(cardImage.image)} alt={cardAlt} />
                {cardImage.sign && <div className="card-view-inner">
                    <CardSignView sign={cardImage.sign} />
                </div>}
                {tokens.length !== 0 && <div className="card-tokens">{tokens}</div>}
            </div> : <div className="card-back">
                <img className="card-view-img" src={getCardUrl(backfaceImage)} alt="" />
            </div> }
            { showBackface && <div className="card-back-flip">
                <img className="card-view-img" src={getCardUrl(backfaceImage)} alt=""  />
            </div> }
        </div>
    )
}