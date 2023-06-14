import { ChangeField } from "../../../Utils/UnionUtils";
import { CardEffect } from "./CardData";
import { CardTarget } from "./CardEnums";
import { checkCardFilter, checkPlayerFilter, getCardColor, getEquipTarget, isEquipCard } from "./Filters";
import { Card, GameTable, KnownCard, Player, getCard, getPlayer, isCardKnown } from "./GameTable";
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
    playing_card: KnownCard | null;
    targets: CardTarget[];

    modifiers: {
        modifier: KnownCard;
        targets: CardTarget[];
    }[];

    context: EffectContext;
}

export function newPlayCardSelection(card: KnownCard | null = null): PlayCardSelection {
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

export type RequestSelector = ChangeField<TargetSelector, 'request', RequestStatusArgs>;
export type StatusReadySelector = ChangeField<TargetSelector, 'request', StatusReadyArgs>;
export type PlayingSelector = ChangeField<TargetSelector, 'selection', PlayCardSelection>;
export type PickingSelector = ChangeField<TargetSelector, 'selection', PickCardSelection>;

export function isResponse(selector: TargetSelector): selector is RequestSelector {
    return 'respond_cards' in selector.request;
}

export function isStatusReady(selector: TargetSelector): selector is StatusReadySelector {
    return 'play_cards' in selector.request;
}

export function isSelectionPlaying(selector: TargetSelector): selector is PlayingSelector {
    return 'playing_card' in selector.selection;
}

export function isSelectionPicking(selector: TargetSelector): selector is PickingSelector {
    return 'picked_card' in selector.selection;
}

export function checkSelectionPlaying(selector: TargetSelector): asserts selector is PlayingSelector {
    if (!isSelectionPlaying(selector)) {
        throw new Error('TargetSelector: selection is not PlayCardSelection');
    }
}

export function newTargetSelector(request: RequestStatusUnion): TargetSelector {
    return {
        request,
        prompt: {},
        selection: {},
        mode: TargetMode.start
    };
}

export function getCurrentCardAndTargets(selector: PlayingSelector): [KnownCard, CardTarget[]] {
    switch (selector.mode) {
    case TargetMode.target:
        return [selector.selection.playing_card!, selector.selection.targets];
    case TargetMode.modifier: {
        const pair = selector.selection.modifiers.at(-1)!;
        return [pair.modifier, pair.targets];
    }
    default:
        throw new Error('TargetSelector: not in targeting mode');
    }
}

export function selectorCanConfirm(selector: TargetSelector): boolean {
    switch (selector.mode) {
    case TargetMode.target:
    case TargetMode.modifier: {
        const [currentCard, targets] = getCurrentCardAndTargets(selector as PlayingSelector);
        const [effects, optionals] = getCardEffects(currentCard, isResponse(selector));
        
        return optionals.length != 0
            && targets.length >= effects.length
            && (targets.length - effects.length) % optionals.length == 0;
    }
    default:
        return false;
    }
}

export function isAutoSelect(selector: TargetSelector): selector is RequestSelector {
    return isResponse(selector)
        && selector.request.auto_select
        && selector.request.respond_cards.length == 1 && selector.request.pick_cards.length == 0;
}

export function selectorCanUndo(selector: TargetSelector): boolean {
    if (selector.mode == TargetMode.finish || !isSelectionPlaying(selector)) {
        return false;
    }
    if (isAutoSelect(selector)) {
        if (selector.mode == TargetMode.target) {
            return selector.selection.targets.length != 0;
        } else if (selector.mode == TargetMode.modifier) {
            return selector.selection.modifiers.length != 1 || selector.selection.modifiers[0].targets.length != 0;
        }
    }
    return true;
}

export function getPlayableCards(selector: TargetSelector): CardId[] {
    let tree: CardNode[] = [];
    if (isResponse(selector)) {
        tree = selector.request.respond_cards;
    } else if (isStatusReady(selector)) {
        tree = selector.request.play_cards;
    }
    if (isSelectionPlaying(selector)) {
        tree = selector.selection.modifiers.reduce((tree: CardNode[], { modifier }) => {
            return (tree.find(leaf => leaf.card == modifier.id) as CardNode).branches;
        }, tree);
    }
    return tree.map(node => node.card);
}

export function selectorCanPlayCard(selector: TargetSelector, card: Card): card is KnownCard {
    return (!isSelectionPlaying(selector) || selector.selection.playing_card === null)
        && isCardKnown(card)
        && getPlayableCards(selector).includes(card.id);
}

export function selectorCanPickCard(table: GameTable, selector: TargetSelector, card: Card): boolean {
    if (isResponse(selector)) {
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

export function isCardCurrent(selector: TargetSelector, card: Card): card is KnownCard {
    if (isSelectionPlaying(selector)) {
        return selector.selection.playing_card?.id == card.id
            || selector.selection.modifiers.some(({modifier}) => modifier.id == card.id);
    } else {
        return false;
    }
}

export function isCardSelected(selector: TargetSelector, card: Card): boolean {
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
    if (isSelectionPlaying(selector)) {
        if (selector.selection.targets.some(check)) {
            return true;
        }
        if (selector.selection.modifiers.some(({targets}) => targets.some(check))) {
            return true;
        }
    }
    return false;
}

export function isPlayerSelected(selector: TargetSelector, player: Player): boolean {
    const check = (target: CardTarget) => {
        if ('player' in target) {
            return target.player == player.id;
        }
        if ('conditional_player' in target) {
            return target.conditional_player == player.id;
        }
        return false;
    };
    if (isSelectionPlaying(selector)) {
        if (selector.selection.targets.some(check)) {
            return true;
        }
        if (selector.selection.modifiers.some(({targets}) => targets.some(check))) {
            return true;
        }
    }
    return false;
}

export function countSelectedCubes(selector: TargetSelector, targetCard: Card): number {
    let selected = 0;
    const response = isResponse(selector);
    const doCount = (card: KnownCard, targets: CardTarget[]) => {
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
    if (isSelectionPlaying(selector)) {
        if (selector.selection.playing_card) {
            doCount(selector.selection.playing_card, selector.selection.targets);
        }
        for (const {modifier, targets} of selector.selection.modifiers) {
            doCount(modifier, targets);
        }
    }
    return selected;
}

export function isValidCubeTarget(table: GameTable, selector: PlayingSelector, card: Card): boolean {
    const player = card.pocket && 'player' in card.pocket ? card.pocket.player : undefined;

    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const nextTarget = getEffectAt(getCardEffects(currentCard, isResponse(selector)), index);
    
    return nextTarget?.target == 'select_cubes'
        && player == table.self_player
        && card.num_cubes > countSelectedCubes(selector, card);
}

export function isValidCardTarget(table: GameTable, selector: PlayingSelector, card: Card): boolean {
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
        if (getCardColor(card) == 'black' || card.cardData.deck == 'character') {
            return false;
        }
        if (!player || player == table.self_player || player == selector.selection.context.skipped_player) {
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

export type EffectsAndOptionals = [CardEffect[], CardEffect[]];
export type TargetAndEffect = [CardTarget, CardEffect];

export function getCardEffects(card: KnownCard, isResponse: boolean): EffectsAndOptionals {
    return [isResponse ? card.cardData.responses : card.cardData.effects, card.cardData.optionals];
}

export function zipCardTargets(targets: CardTarget[], [effects, optionals]: EffectsAndOptionals): TargetAndEffect[] {
    let ret: TargetAndEffect[] = [];
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

export function getNextTargetIndex(targets: CardTarget[]): number {
    if (targets.length != 0) {
        let lastTarget = Object.values(targets.at(-1)!)[0];
        if (Array.isArray(lastTarget) && lastTarget.includes(0)) {
            return targets.length - 1;
        }
    }
    return targets.length;
}

export function getEffectAt([effects, optionals]: EffectsAndOptionals, index: number): CardEffect | undefined {
    if (index < effects.length) {
        return effects[index];
    } else if (optionals.length != 0) {
        return optionals[(index - effects.length) % optionals.length];
    }
}

export function isValidPlayerTarget(table: GameTable, selector: PlayingSelector, player: Player): boolean {
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

export function isValidEquipTarget(table: GameTable, selector: PlayingSelector, player: Player): boolean {
    return isSelectionPlaying(selector)
        && selector.selection.playing_card !== null
        && isEquipCard(selector.selection.playing_card)
        && checkPlayerFilter(table, selector, getEquipTarget(selector.selection.playing_card), player);
}