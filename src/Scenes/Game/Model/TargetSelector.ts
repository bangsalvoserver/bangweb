import { anyOf } from "../../../Utils/ArrayUtils";
import { getEquipTarget } from "./CardData";
import { CardTarget } from "./CardEnums";
import { checkPlayerFilter, isEquipCard } from "./Filters";
import { Card, GameTable, Player, getCard } from "./GameTable";
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

export function getSelectorCurrentCard(selector: TargetSelector): Card {
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

export function selectorCanConfirm(selector: TargetSelector): boolean {
    if (selector.mode == TargetMode.target || selector.mode == TargetMode.modifier) {
        const currentCard = getSelectorCurrentCard(selector);
        if ('effects' in currentCard.cardData) {
            const isResponse = selector.request && 'respond_cards' in selector.request;
            const numEffects = (isResponse ? currentCard.cardData.responses : currentCard.cardData.effects).length;
            const numOptionals = currentCard.cardData.optionals.length;
            const numTargets = getSelectorCurrentTargetList(selector).length;
            return numOptionals != 0
                && numTargets >= numEffects
                && (numTargets - numEffects) % numOptionals == 0;
        }
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

export function isValidCardTarget(selector: TargetSelector, card: Card) {
    return false;
}

export function isValidPlayerTarget(selector: TargetSelector, player: Player) {
    return false;
}

export function isValidEquipTarget(selector: TargetSelector, player: Player) {
    return 'playing_card' in selector.selection
        && selector.selection.playing_card
        && isEquipCard(selector.selection.playing_card)
        && checkPlayerFilter(selector, getEquipTarget(selector.selection.playing_card), player);
}