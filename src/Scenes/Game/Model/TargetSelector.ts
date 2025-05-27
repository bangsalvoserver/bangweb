import { CardTarget } from "./CardTarget";
import { checkPlayerFilter, getCardEffects, getCardOwner, getCardPocket, getEquipTarget, isEquipCard } from "./Filters";
import { Card, GameTable, KnownCard, Player, getCard, getCubeCount, getPlayer, getPlayerCubes, isCardKnown } from "./GameTable";
import { CardId, EffectContext, GameString, PlayableCardInfo, RequestStatus, StatusReady } from "./GameUpdate";
import targetDispatch from "./TargetDispatch";

export type RequestStatusUnion = RequestStatus | StatusReady | null;

export type GamePrompt =
    { type: 'none' } |
    { type: 'yesno', message: GameString, response: boolean } |
    { type: 'playpick', card: KnownCard };

export type TargetSelectorMode =
    | 'start' // No card selected
    | 'preselect' // Player can either play a card or add a target for the preselection
    | 'modifier' // Selecting target for modifier
    | 'middle' // Modifiers selected, selecting new card
    | 'target' // Selecting target for playing card
    | 'equip' // Selecting target for equip
    | 'finish' // Last target selected, sending game_action

/*
 *                     TARGET SELECTOR STATE MACHINE GRAPH
 * 
 *          /--(1)-----------------------------------------------\
 *         /                            +===========+             \
 *        / /--(4)--------------------> | preselect |              \
 *       / /                 /--------- +===========+ ---------\    \
 *  (0)  | |                (2)               (8)            (1,9)  |
 *   |   | |                 |                 |               |    |
 *   v   | |                 v                 v               v    v
 *  +=======+         +==========+ --(5)-> +========+         +========+         +========+
 *  | start | --(2)-> | modifier |         | middle | --(1)-> | target | --(6)-> | finish |
 *  +=======+         +==========+ <-(2)-- +========+         +========+         +========+
 *       |                                     |                                     ^
 *       \                                     \--(3)--> +=======+                   |
 *        \                                              | equip | --(7)-------------/
 *         \--(3)--------------------------------------> +=======+
 * 
 *  (0) Start here / player has clicked on 'Undo'
 *  (1) Player has clicked on a playing card
 *  (2) Player has clicked on a modifier card
 *  (3) Player has clicked on an equippable card
 *  (4) Client has received a request with a card tagged 'preselect'
 *  (5) Player has selected the last target for the modifier
 *  (6) Player has selected the last target for the playing card
 *  (7) Player has selected the target for the equippable card
 *  (8) Player has selected the last target for the preselect *modifier* card
 *  (9) Player has added a target for the preselect *playing* card -- targeting state is transfered
 * 
 */

export interface TargetSelection {
    card: KnownCard;
    targets: CardTarget[];
}

interface TargetSelectorBase<T extends RequestStatusUnion> {
    request: T;
    prompt: GamePrompt;
    
    preselection: TargetSelection | null;
    selection: TargetSelection | null;
    modifiers: TargetSelection[];

    mode: TargetSelectorMode;
}

export type TargetSelector = TargetSelectorBase<RequestStatusUnion>;

export function newTargetSelector(request: RequestStatusUnion = null): TargetSelector {
    return {
        request,
        prompt: { type: 'none' },

        preselection: null,
        selection: null,
        modifiers: [],
        mode: 'start'
    };
}

export function isResponse(selector: TargetSelector): selector is TargetSelectorBase<RequestStatus> {
    return selector.request !== null && 'respond_cards' in selector.request;
}

export function isStatusReady(selector: TargetSelector): selector is TargetSelectorBase<StatusReady> {
    return selector.request !== null && 'play_cards' in selector.request;
}

function getCurrentTargetSelection(selector: TargetSelector) {
    switch (selector.mode) {
    case 'preselect':
        return selector.preselection!;
    case 'target':
        return selector.selection!;
    case 'modifier':
        return selector.modifiers[selector.modifiers.length - 1];
    default:
        throw new Error('TargetSelector: not in targeting mode');
    }
}

export function getTargetSelectorStatus(selector: TargetSelector) {
    const { card, targets } = getCurrentTargetSelection(selector);

    const effects = getCardEffects(card, isResponse(selector));
    
    let index = targets.length - 1;
    if (targets.length === 0 || targetDispatch.isSelectionFinished(targets[index], effects[index])) {
        ++index;
    }
    return { effects, targets, index } as const;
}

export function selectorIsTargeting(selector: TargetSelector) {
    switch (selector.mode) {
    case 'preselect':
    case 'target':
    case 'modifier':
        return true;
    default:
        return false;
    }
}

export function selectorCanConfirm(table: GameTable, selector: TargetSelector) {
    if (selectorIsTargeting(selector)) {
        const { effects, targets, index } = getTargetSelectorStatus(selector);
        if (index < targets.length) {
            return targetDispatch.isSelectionConfirmable(table, targets[index], effects[index]);
        }
    }
    return false;
}

export function selectorCanUndo(selector: TargetSelector): boolean {
    switch (selector.mode) {
    case 'modifier':
    case 'middle':
    case 'target':
    case 'equip':
        return selector.preselection === null;
    default:
        return false;
    }
}

export function *getAllPlayableCards(selector: TargetSelector): Generator<[CardId, EffectContext]> {
    let cards: PlayableCardInfo[];
    if (isResponse(selector)) {
        cards = selector.request.respond_cards;
    } else if (isStatusReady(selector)) {
        cards = selector.request.play_cards;
    } else {
        cards = [];
    }
    outerLoop: for (const { card, modifiers, context } of cards) {
        let i = 0;
        for (const { card: modCard } of selector.modifiers) {
            if (modifiers.at(i) !== modCard.id) {
                continue outerLoop;
            }
            ++i;
        }
        yield [
            modifiers.at(selector.modifiers.length) ?? card,
            context ?? {}
        ];
    }
}

export function isCardPlayable(selector: TargetSelector, card: Card): boolean {
    if (!selector.selection) {
        for (const [playableCard, ] of getAllPlayableCards(selector)) {
            if (playableCard === card.id) {
                return true;
            }
        }
    }
    return false;
}

export function getModifierContext<K extends keyof EffectContext> (selector: TargetSelector, prop: K): EffectContext[K] {
    let result: EffectContext[K] = undefined;
    if (selector.modifiers.length !== 0) {
        for (const [, context] of getAllPlayableCards(selector)) {
            const value = context[prop];
            if (value) {
                if (result === undefined) {
                    result = value;
                } else if (result !== value) {
                    return undefined;
                }
            }
        }
    }
    return result;
}

export function selectorCanPlayCard(selector: TargetSelector, card: Card): card is KnownCard {
    return !isCardCurrent(selector, card)
        && !isCardSelected(selector, card)
        && isCardPlayable(selector, card)
        && isCardKnown(card);
}

export function isCardCurrent(selector: TargetSelector, card: Card): card is KnownCard {
    return selector.selection?.card.id === card.id
        || selector.modifiers.some(selection => selection.card.id === card.id)
        || selector.preselection?.card.id === card.id;
}

export function isCardPrompted(selector: TargetSelector, card: Card): card is KnownCard {
    return selector.prompt.type === 'playpick' && selector.prompt.card.id === card.id;
}

export function *zipSelections(selector: TargetSelector) {
    const response = isResponse(selector);
    for (const { card, targets } of selector.modifiers) {
        const effects = getCardEffects(card, response);
        for (let i = 0; i < targets.length; ++i) {
            yield [card, targets[i], effects.at(i)] as const;
        }
    }
    if (selector.selection) {
        const { card, targets } = selector.selection;
        const effects = getCardEffects(card, response);
        for (let i = 0; i < targets.length; ++i) {
            yield [card, targets[i], effects.at(i)] as const;
        }
    }
}

export function isCardSelected(selector: TargetSelector, card: Card): boolean {
    for (const [, target] of zipSelections(selector)) {
        if (targetDispatch.isCardSelected(target, card)) return true;
    }
    return false;
}

export function isPlayerSelected(selector: TargetSelector, player: Player): boolean {
    for (const [, target] of zipSelections(selector)) {
        if (targetDispatch.isPlayerSelected(target, player)) return true;
    }
    return false;
}

export function isPlayerSkipped(selector: TargetSelector, player: Player): boolean {
    for (const [, target, effect] of zipSelections(selector)) {
        if ('player' in target && effect?.type === 'skip_player') {
            return target.player.id === player.id;
        }
    }
    return false;
}

function getCubeSlot(table: GameTable, card: Card) {
    if (getCardPocket(card) === 'player_character') {
        const player = getCardOwner(card);
        if (player) {
            const cardId = getPlayer(table, player).pockets.player_character[0];
            if (cardId !== card.id) {
                return getCard(table, cardId);
            }
        }
    }
    return card;
}

export function countSelectedCubes(table: GameTable, selector: TargetSelector, targetCard: Card): number {
    let selected = 0;
    if (getCubeCount(targetCard) > 0) {
        for (const [card, target] of zipSelections(selector)) {
            selected += targetDispatch.getCubesSelected(target, getCubeSlot(table, card), targetCard);
        }
    }
    return selected;
}

export function countSelectableCubes(table: GameTable, selector: TargetSelector): number {
    let selectable = 0;
    for (const [card, cubes] of getPlayerCubes(table, getPlayer(table, table.self_player!))) {
        selectable += cubes - countSelectedCubes(table, selector, card);
    }
    return selectable;
}

export function isValidCubeTarget(table: GameTable, selector: TargetSelector, card: Card): boolean {
    const { effects, targets, index } = getTargetSelectorStatus(selector);
    return targetDispatch.isValidCubeTarget(table, selector, targets.at(index), effects[index], card);
}

export function isValidCardTarget(table: GameTable, selector: TargetSelector, card: Card): boolean {
    const { effects, targets, index } = getTargetSelectorStatus(selector);
    const target = targets.at(index);
    const effect = effects[index];
    return targetDispatch.isValidCubeTarget(table, selector, target, effect, card)
        || targetDispatch.isValidCardTarget(table, selector, target, effect, card);
}

export function isValidPlayerTarget(table: GameTable, selector: TargetSelector, player: Player): boolean {
    const { effects, targets, index } = getTargetSelectorStatus(selector);
    return targetDispatch.isValidPlayerTarget(table, selector, targets.at(index), effects[index], player);
}

export function isValidEquipTarget(table: GameTable, selector: TargetSelector, player: Player): boolean {
    return selector.selection !== null
        && isEquipCard(selector.selection.card)
        && checkPlayerFilter(table, selector, getEquipTarget(selector.selection.card), player);
}