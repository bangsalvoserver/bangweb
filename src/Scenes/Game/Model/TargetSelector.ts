import { CardEffect } from "./CardData";
import { CardTarget } from "./CardEnums";
import { checkCardFilter, checkPlayerFilter, getEquipTarget, isEquipCard } from "./Filters";
import { Card, GameTable, Player, getCard, getPlayer } from "./GameTable";
import { CardId, CardNode, GameString, PlayerId, RequestStatusArgs, StatusReadyArgs } from "./GameUpdate";

export type RequestStatusUnion = RequestStatusArgs | StatusReadyArgs | {};

export type GamePrompt =
    { yesno: GameString } |
    { playpickundo: Card };

export interface PickCardSelection {
    picked_card: CardId;
}

export interface EffectContext {
    repeat_card?: CardId;
    card_choice?: CardId;
    traincost?: CardId;
    skipped_player?: PlayerId;
    ignore_distances?: boolean;
}

export enum TargetMode {
    start,
    modifier,
    target,
    equip,
    finish
};

export interface PlayCardSelection {
    playing_card?: Card;
    targets: CardTarget[];

    modifiers: {
        modifier: Card;
        targets: CardTarget[];
    }[];

    context: EffectContext;
}

export function newPlayCardSelection(card?: Card): PlayCardSelection {
    return {
        playing_card: card,
        targets: [],
        modifiers: [],
        context: {}
    };
}

export interface TargetSelector {
    request: RequestStatusUnion;
    prompt: GamePrompt | {};
    selection: PickCardSelection | PlayCardSelection | {};
    mode: TargetMode;
}

export function newTargetSelector(request: RequestStatusUnion): TargetSelector {
    return {
        request,
        prompt: {},
        selection: {},
        mode: TargetMode.start
    };
}

export function getCurrentCardAndTargets(selector: TargetSelector): [Card, CardTarget[]] {
    if ('targets' in selector.selection) {
        switch (selector.mode) {
            case TargetMode.target:
                if (selector.selection.playing_card) {
                    return [selector.selection.playing_card, selector.selection.targets];
                }
                break;
            case TargetMode.modifier: {
                const pair = selector.selection.modifiers.at(-1);
                if (pair) {
                    return [pair.modifier, pair.targets];
                }
            }
        }
    }
    throw new Error('Invalid TargetSelector state');
}

export function isResponse(selector: TargetSelector) {
    return selector.request && 'respond_cards' in selector.request;
}

export function selectorCanConfirm(selector: TargetSelector): boolean {
    switch (selector.mode) {
    case TargetMode.target:
    case TargetMode.modifier: {
        const [currentCard, targets] = getCurrentCardAndTargets(selector);
        const [effects, optionals] = getCardEffects(currentCard, isResponse(selector));
        
        return optionals.length != 0
            && targets.length >= effects.length
            && (targets.length - effects.length) % optionals.length == 0;
    }
    default:
        return false;
    }
}

export function selectorCanUndo(selector: TargetSelector): boolean {
    return selector.mode != TargetMode.finish
        && ('playing_card' in selector.selection
        || 'picked_card' in selector.selection);
}

export function getSelectorPlayCards(selector: TargetSelector) {
    if ('play_cards' in selector.request) {
        return selector.request.play_cards;
    } else if ('respond_cards' in selector.request) {
        return selector.request.respond_cards;
    } else {
        return [];
    }
}

export function getSelectorCurrentTree(selector: TargetSelector): CardNode[] {
    const initialCards = getSelectorPlayCards(selector);
    if ('modifiers' in selector.selection) {
        return selector.selection.modifiers.reduce((tree: CardNode[], { modifier }) => {
            return (tree.find(leaf => leaf.card == modifier.id) as CardNode).branches;
        }, initialCards);
    } else {
        return initialCards;
    }
}

export function selectorCanPlayCard(selector: TargetSelector, card: Card): boolean {
    return getSelectorCurrentTree(selector).some(node => node.card == card.id);
}

export function selectorCanPickCard(table: GameTable, selector: TargetSelector, card: Card): boolean {
    if ('pick_cards' in selector.request) {
        switch (card.pocket?.name) {
            case 'main_deck':
            case 'discard_pile':
                return selector.request.pick_cards.some(pickCard => getCard(table, pickCard).pocket?.name == card.pocket?.name);
            default:
                return selector.request.pick_cards.includes(card.id);
        }
    }
    return false;
}

export function isCardCurrent(selector: TargetSelector, card: Card) {
    if ('playing_card' in selector.selection) {
        return selector.selection.playing_card?.id == card.id
            || selector.selection.modifiers.some(({modifier}) => modifier.id == card.id);
    } else {
        return false;
    }
}

export function isCardSelected(selector: TargetSelector, card: Card) {
    const check = (target: CardTarget) => {
        if ('card' in target) {
            return target.card == card.id;
        }
        if ('extra_card' in target) {
            return target.extra_card == card.id;
        }
        if ('cards' in target) {
            return target.cards.includes(card.id);
        }
        if ('cards_other_players' in target) {
            return target.cards_other_players.includes(card.id);
        }
        return false;
    };
    if ('targets' in selector.selection) {
        if (selector.selection.targets.some(check)) {
            return true;
        }
        if (selector.selection.modifiers.some(({targets}) => targets.some(check))) {
            return true;
        }
    }
    return false;
}

export function isPlayerSelected(selector: TargetSelector, player: Player) {
    const check = (target: CardTarget) => {
        if ('player' in target) {
            return target.player == player.id;
        }
        if ('conditional_player' in target) {
            return target.conditional_player == player.id;
        }
        return false;
    };
    if ('targets' in selector.selection) {
        if (selector.selection.targets.some(check)) {
            return true;
        }
        if (selector.selection.modifiers.some(({targets}) => targets.some(check))) {
            return true;
        }
    }
    return false;
}

export function countSelectedCubes(selector: TargetSelector, targetCard: Card) {
    let selected = 0;
    const response = isResponse(selector);
    const doCount = (card: Card, targets: CardTarget[]) => {
        for (const [target, effect] of zipCardTargets(targets, getCardEffects(card, response))) {
            if ('select_cubes' in target) {
                for (const cube of target.select_cubes) {
                    if (targetCard.id == cube) {
                        ++selected;
                    }
                }
            } else if ('self_cubes' in target) {
                if (targetCard.id == card.id) {
                    selected += effect.target_value;
                }
            }
        }
    };
    if ('targets' in selector.selection) {
        if (selector.selection.playing_card) {
            doCount(selector.selection.playing_card, selector.selection.targets);
        }
        for (const {modifier, targets} of selector.selection.modifiers) {
            doCount(modifier, targets);
        }
    }
    return selected;
}

export function isValidCubeTarget(table: GameTable, selector: TargetSelector, card: Card) {
    if (!('targets' in selector.selection)) {
        throw new Error('Invalid state in TargetSelector');
    }

    const player = card.pocket && 'player' in card.pocket ? card.pocket.player : undefined;

    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const nextTarget = getEffectAt(getCardEffects(currentCard, isResponse(selector)), index);
    
    return nextTarget?.target == 'select_cubes'
        && player == table.self_player
        && card.num_cubes > countSelectedCubes(selector, card);
}

export function isValidCardTarget(table: GameTable, selector: TargetSelector, card: Card) {
    if (!('targets' in selector.selection)) {
        throw new Error('Invalid state in TargetSelector');
    }

    const player = card.pocket && 'player' in card.pocket ? card.pocket.player : undefined;

    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const nextTarget = getEffectAt(getCardEffects(currentCard, isResponse(selector)), index);

    switch (nextTarget?.target) {
    case 'card':
    case 'extra_card':
    case 'cards':
        if (player && !checkPlayerFilter(table, selector, nextTarget.player_filter, getPlayer(table, player))) {
            return false;
        }
        if (!checkCardFilter(table, selector, nextTarget.card_filter, currentCard, card)) {
            return false;
        }
        return true;
    case 'cards_other_players': {
        if ('color' in card.cardData && card.cardData.color == 'black') {
            return false;
        }
        if (player == table.self_player || player == selector.selection.context.skipped_player) {
            return false;
        }
        const lastTarget = selector.selection.targets.at(index);
        if (lastTarget && 'cards_other_players' in lastTarget) {
            if (lastTarget.cards_other_players.some(targetCard => {
                if (targetCard <= 0) return false;
                const selectedCard = getCard(table, targetCard);
                if (selectedCard.pocket && 'player' in selectedCard.pocket) {
                    return selectedCard.pocket.player == player;
                } else {
                    return false;
                }
            })) {
                return false;
            }
        }
        return true;
    }
    case 'select_cubes':
        return player == table.self_player
            && card.num_cubes > countSelectedCubes(selector, card);
    default:
        return false;
    }
}

export type CardEffectPair = [CardEffect[], CardEffect[]];

export function getCardEffects(card: Card, isResponse: boolean): CardEffectPair {
    if ('effects' in card.cardData) {
        return [isResponse ? card.cardData.responses : card.cardData.effects, card.cardData.optionals];
    } else {
        return [[], []];
    }
}

export function zipCardTargets(targets: CardTarget[], [effects, optionals]: CardEffectPair) {
    let ret: [CardTarget, CardEffect][] = [];
    let index = 0;
    for (let effect of effects) {
        if (index >= targets.length) return ret;
        ret.push([targets[index++], effect]);
    }
    while (optionals.length != 0) {
        for (let effect of optionals) {
            if (index >= targets.length) return ret;
            ret.push([targets[index++], effect]);
        }
    }
    return ret;
}

export function getNextTargetIndex(targets: CardTarget[]) {
    if (targets.length != 0) {
        let lastTarget = Object.values(targets[targets.length - 1])[0];
        if (Array.isArray(lastTarget) && lastTarget.includes(0)) {
            return targets.length - 1;
        }
    }
    return targets.length;
}

export function getEffectAt([effects, optionals]: CardEffectPair, index: number) {
    if (index < effects.length) {
        return effects[index];
    } else if (optionals.length != 0) {
        return optionals[(index - effects.length) % optionals.length];
    }
}

export function isValidPlayerTarget(table: GameTable, selector: TargetSelector, player: Player) {
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const nextTarget = getEffectAt(getCardEffects(currentCard, isResponse(selector)), index);

    switch (nextTarget?.target) {
    case 'player':
    case 'conditional_player':
        return checkPlayerFilter(table, selector, nextTarget.player_filter, player);
    default:
        return false;
    }
}

export function isValidEquipTarget(table: GameTable, selector: TargetSelector, player: Player) {
    return 'playing_card' in selector.selection
        && selector.selection.playing_card !== undefined
        && isEquipCard(selector.selection.playing_card)
        && checkPlayerFilter(table, selector, getEquipTarget(selector.selection.playing_card), player);
}