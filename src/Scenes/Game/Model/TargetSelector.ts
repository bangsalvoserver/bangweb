import { anyOf } from "../../../Utils/ArrayUtils";
import { CardEffect, getCardEffects, getEffectHolder as getEffectHolderAt, getEquipTarget, getTargetIndex as getNextTargetIndex, zipCardTargets } from "./CardData";
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
    if (selector.mode == TargetMode.target || selector.mode == TargetMode.modifier) {
        const [effects, optionals] = getCardEffects(getCurrentCard(selector), isResponse(selector));

        const numEffects = effects.length;
        const numOptionals = optionals.length;
        const numTargets = getSelectorCurrentTargetList(selector).length;
        
        return numOptionals != 0
            && numTargets >= numEffects
            && (numTargets - numEffects) % numOptionals == 0;
    }
    return false;
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
    if ('modifiers' in selector.selection) {
        return selector.selection.modifiers.reduce((tree: CardNode[], { modifier }) => {
            return (tree.find(leaf => leaf.card == modifier.id) as CardNode).branches;
        }, getSelectorPlayCards(selector));
    } else {
        return [];
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
    const nextTarget = getEffectHolderAt(getCardEffects(getCurrentCard(selector), isResponse(selector)), index);

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
            && nextTarget.target_value <= card.num_cubes - countSelectedCubes(selector, card);
    default:
        return false;
    }
}

export function isValidPlayerTarget(table: GameTable, selector: TargetSelector, player: Player) {
    const nextTarget = getEffectHolderAt(
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