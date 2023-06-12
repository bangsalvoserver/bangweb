import { anyOf } from "../../../Utils/ArrayUtils";
import { CardEffect, getEquipTarget } from "./CardData";
import { CardTarget } from "./CardEnums";
import { checkCardFilter, checkPlayerFilter, isEquipCard } from "./Filters";
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

export function getSelectorCardClasses(selector: TargetSelector, card: Card) {
    let classes = [];
    if ('highlight_cards' in selector.request && selector.request.highlight_cards.includes(card.id)) {
        classes.push('card-highlight');
    } else if ('origin_card' in selector.request && selector.request.origin_card == card.id) {
        classes.push('card-origin');
    }
    return classes;
}

export function getCurrentCard(selector: TargetSelector): Card {
    if ('targets' in selector.selection) {
        switch (selector.mode) {
            case TargetMode.target: return selector.selection.playing_card as Card;
            case TargetMode.modifier: return selector.selection.modifiers.at(-1)?.modifier as Card;
        }
    }
    throw new Error('Invalid TargetSelector state');
}

export function getSelectorCurrentTargetList(selector: TargetSelector): CardTarget[] {
    if ('targets' in selector.selection) {
        switch (selector.mode) {
            case TargetMode.target: return selector.selection.targets;
            case TargetMode.modifier: return selector.selection.modifiers.at(-1)?.targets as CardTarget[];
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
        const [effects, optionals] = getCardEffects(getCurrentCard(selector), isResponse(selector));

        const numEffects = effects.length;
        const numOptionals = optionals.length;
        const numTargets = getSelectorCurrentTargetList(selector).length;
        
        return numOptionals != 0
            && numTargets >= numEffects
            && (numTargets - numEffects) % numOptionals == 0;
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
    return anyOf(getSelectorCurrentTree(selector), node => node.card == card.id);
}

export function selectorCanPickCard(table: GameTable, selector: TargetSelector, card: Card): boolean {
    if ('pick_cards' in selector.request) {
        switch (card.pocket?.name) {
            case 'main_deck':
            case 'discard_pile':
                return anyOf(selector.request.pick_cards, pickCard => getCard(table, pickCard).pocket?.name == card.pocket?.name);
            default:
                return selector.request.pick_cards.includes(card.id);
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

export function isValidCardTarget(table: GameTable, selector: TargetSelector, card: Card) {
    if (!('targets' in selector.selection)) {
        throw new Error('Invalid state in TargetSelector');
    }

    const player = card.pocket && 'player' in card.pocket ? card.pocket.player : undefined;

    const index = getNextTargetIndex(getSelectorCurrentTargetList(selector));
    const nextTarget = getEffectAt(getCardEffects(getCurrentCard(selector), isResponse(selector)), index);

    switch (nextTarget.target) {
    case 'card':
    case 'extra_card':
    case 'cards':
        if (player && !checkPlayerFilter(selector, nextTarget.player_filter, getPlayer(table, player))) {
            return false;
        }
        if (!checkCardFilter(selector, nextTarget.card_filter, card)) {
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
            if (anyOf(lastTarget.cards_other_players, (targetCard) => {
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

export function countTargetableForCardsOtherPlayers(selector: TargetSelector) {
    // TODO
    return 0;
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
        if (Array.isArray(lastTarget) && anyOf(lastTarget as number[], value => value == 0)) {
            return targets.length - 1;
        }
    }
    return targets.length;
}

export function getEffectAt([effects, optionals]: CardEffectPair, index: number) {
    if (index < effects.length) {
        return effects[index];
    } else {
        return optionals[(index - effects.length) % optionals.length];
    }
}

export function isValidPlayerTarget(table: GameTable, selector: TargetSelector, player: Player) {
    const nextTarget = getEffectAt(
        getCardEffects(getCurrentCard(selector), isResponse(selector)),
        getNextTargetIndex(getSelectorCurrentTargetList(selector)));

    switch (nextTarget.target) {
    case 'player':
    case 'conditional_player':
        return checkPlayerFilter(selector, nextTarget.player_filter, player);
    default:
        return false;
    }
}

export function isValidEquipTarget(table: GameTable, selector: TargetSelector, player: Player) {
    return 'playing_card' in selector.selection
        && selector.selection.playing_card
        && isEquipCard(selector.selection.playing_card)
        && checkPlayerFilter(selector, getEquipTarget(selector.selection.playing_card), player);
}