import { Empty } from "../../../Model/ServerMessage";
import { sum } from "../../../Utils/ArrayUtils";
import { ChangeField } from "../../../Utils/UnionUtils";
import { CardEffect } from "./CardData";
import { CardTarget } from "./CardEnums";
import { checkPlayerFilter, getEquipTarget, isEquipCard } from "./Filters";
import { Card, GameTable, KnownCard, Player, getCard, getCardEffects, getPlayer, isCardKnown } from "./GameTable";
import { CardId, EffectContext, GameString, PlayableCardInfo, PlayerId, RequestStatusArgs, StatusReadyArgs } from "./GameUpdate";
import targetDispatch from "./TargetDispatch";

export type RequestStatusUnion = RequestStatusArgs | StatusReadyArgs | Empty;

export type GamePrompt =
    { type: 'none' } |
    { type: 'yesno', message: GameString, response: boolean } |
    { type: 'playpick', card: KnownCard };

export type PlayCardSelectionMode =
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

export interface PlayCardSelection {
    playing_card: KnownCard | null;
    targets: CardTarget[];

    preselection: {
        card: KnownCard;
        targets: CardTarget[];
    } | null;

    modifiers: {
        modifier: KnownCard;
        targets: CardTarget[];
    }[];

    mode: PlayCardSelectionMode;
}

export function newPlayCardSelection(mode: PlayCardSelectionMode): PlayCardSelection {
    return {
        playing_card: null,
        targets: [],
        modifiers: [],
        preselection: null,
        mode
    };
}

export interface TargetSelector {
    request: RequestStatusUnion;
    prompt: GamePrompt;
    selection: PlayCardSelection;
}

export type RequestSelector = ChangeField<TargetSelector, 'request', RequestStatusArgs>;
export type StatusReadySelector = ChangeField<TargetSelector, 'request', StatusReadyArgs>;

export function isResponse(selector: TargetSelector): selector is RequestSelector {
    return 'respond_cards' in selector.request;
}

export function isStatusReady(selector: TargetSelector): selector is StatusReadySelector {
    return 'play_cards' in selector.request;
}

export function newTargetSelector(request: RequestStatusUnion = {}): TargetSelector {
    return {
        request,
        prompt: { type: 'none' },
        selection: newPlayCardSelection('start'),
    };
}

function getCurrentCardAndTargets(selector: TargetSelector): [KnownCard, CardTarget[]] {
    switch (selector.selection.mode) {
    case 'preselect':
        return [selector.selection.preselection!.card, selector.selection.preselection!.targets];
    case 'target':
        return [selector.selection.playing_card!, selector.selection.targets];
    case 'modifier': {
        const pair = selector.selection.modifiers.at(-1)!;
        return [pair.modifier, pair.targets];
    }
    default:
        throw new Error('TargetSelector: not in targeting mode');
    }
}

export function getTargetSelectorStatus(selector: TargetSelector) {
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const effects = getCardEffects(currentCard, isResponse(selector));
    
    let index = targets.length - 1;
    if (targets.length === 0 || targetDispatch.isSelectionFinished(targets[index], effects[index])) {
        ++index;
    }
    return { currentCard, effects, targets, index } as const;
}

export function selectorIsTargeting(selector: TargetSelector) {
    switch (selector.selection.mode) {
    case 'preselect':
    case 'target':
    case 'modifier':
        return true;
    default:
        return false;
    }
}

export function selectorCanConfirm(selector: TargetSelector) {
    if (selectorIsTargeting(selector)) {
        const { effects, targets, index } = getTargetSelectorStatus(selector);
        if (index < targets.length) {
            return targetDispatch.isSelectionConfirmable(targets[index], effects[index]);
        }
    }
    return false;
}

export function selectorCanUndo(table: GameTable): boolean {
    switch (table.selector.selection.mode) {
    case 'modifier':
    case 'middle':
    case 'target':
    case 'equip':
        return table.selector.selection.preselection === null;
    default:
        return false;
    }
}

function isMatchingModifiers(selection: PlayCardSelection, info: PlayableCardInfo): boolean {
    let i = 0;
    for (const { modifier } of selection.modifiers) {
        if (info.modifiers.at(i) !== modifier.id) {
            return false;
        }
        ++i;
    }
    return true;
}

export function getPlayableCards(selector: TargetSelector): CardId[] {
    let result: CardId[] = [];
    
    if (!selector.selection.playing_card) {
        const check = (cards: PlayableCardInfo[]) => {
            for (const info of cards) {
                if (isMatchingModifiers(selector.selection, info)) {
                    const card = info.modifiers.at(selector.selection.modifiers.length) ?? info.card;
                    if (!result.includes(card)) {
                        result.push(card);
                    }
                }
            }
        };
        
        if (isResponse(selector)) {
            check(selector.request.respond_cards);
        } else if (isStatusReady(selector)) {
            check(selector.request.play_cards);
        }
    }

    return result;
}

export function getModifierContext<K extends keyof EffectContext> (selector: TargetSelector, prop: K): EffectContext[K] {
    if (selector.selection.modifiers.length !== 0) {
        const findContext = (cards: PlayableCardInfo[]) => {
            let result: EffectContext[K] = undefined;
            for (const info of cards) {
                if (isMatchingModifiers(selector.selection, info)) {
                    const value = info.context?.[prop];
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
        if (isResponse(selector)) {
            return findContext(selector.request.respond_cards);
        } else if (isStatusReady(selector)) {
            return findContext(selector.request.play_cards);
        }
    }
}

export function selectorCanPlayCard(selector: TargetSelector, card: Card): card is KnownCard {
    return !isCardCurrent(selector, card)
        && !isCardSelected(selector, card.id)
        && isCardKnown(card)
        && getPlayableCards(selector).includes(card.id);
}

export function isCardCurrent(selector: TargetSelector, card: Card): card is KnownCard {
    return selector.selection.playing_card?.id === card.id
        || selector.selection.modifiers.some(({modifier}) => modifier.id === card.id)
        || selector.selection.preselection?.card.id === card.id;
}

export function isCardPrompted(selector: TargetSelector, card: Card): card is KnownCard {
    return selector.prompt.type === 'playpick' && selector.prompt.card.id === card.id;
}

export function isCardSelected(selector: TargetSelector, card: CardId): boolean {
    const check = (target: CardTarget) => targetDispatch.isCardSelected(target, card);
    if (selector.selection.targets.some(check)) {
        return true;
    }
    if (selector.selection.modifiers.some(({targets}) => targets.some(check))) {
        return true;
    }
    return false;
}

export function isHandSelected(table: GameTable, card: Card): boolean {
    const selector = table.selector;
    if (card.pocket?.name === 'player_hand' && card.pocket.player !== table.self_player) {
        const player = getPlayer(table, card.pocket.player);
        return player.pockets.player_hand.some(id => isCardSelected(selector, id));
    } else {
        return false;
    }
}

export function isPlayerSelected(selector: TargetSelector, player: PlayerId): boolean {
    const check = (target: CardTarget) => targetDispatch.isPlayerSelected(target, player);
    if (selector.selection.targets.some(check)) {
        return true;
    }
    if (selector.selection.modifiers.some(({targets}) => targets.some(check))) {
        return true;
    }
    return false;
}

export function countSelectedCubes(selector: TargetSelector, targetCard: Card): number {
    let selected = 0;
    const doCount = (originCard: Card, targets: CardTarget[], effects: CardEffect[]) => {
        let index = 0;
        for (const effect of effects) {
            if (index >= targets.length) break;
            selected += targetDispatch.getCubesSelected(targets[index], effect, originCard, targetCard);
            ++index;
        }
    };

    const response = isResponse(selector);
    if (selector.selection.playing_card) {
        const effects = getCardEffects(selector.selection.playing_card, response);
        doCount(selector.selection.playing_card, selector.selection.targets, effects);
    }
    for (const {modifier, targets} of selector.selection.modifiers) {
        const effects = getCardEffects(modifier, response);
        doCount(modifier, targets, effects);
    }
    return selected;
}

export function countSelectableCubes(table: GameTable): number {
    const getCountCubes = (cardId: CardId) => {
        const card = getCard(table, cardId);
        return card.num_cubes - countSelectedCubes(table.selector, card);
    };
    const selfPlayer = getPlayer(table, table.self_player!);
    return sum(selfPlayer.pockets.player_character, getCountCubes)
        + sum(selfPlayer.pockets.player_table, getCountCubes);
}

export function isValidCubeTarget(table: GameTable, card: Card): boolean {
    const { effects, targets, index } = getTargetSelectorStatus(table.selector);
    return targetDispatch.isValidCubeTarget(table, targets.at(index), effects[index], card);
}

export function isValidCardTarget(table: GameTable, card: Card): boolean {
    const { effects, targets, index } = getTargetSelectorStatus(table.selector);
    const target = targets.at(index);
    const effect = effects[index];
    return targetDispatch.isValidCubeTarget(table, target, effect, card)
        || targetDispatch.isValidCardTarget(table, target, effect, card);
}

export function isValidPlayerTarget(table: GameTable, player: Player): boolean {
    const { effects, targets, index } = getTargetSelectorStatus(table.selector);
    return targetDispatch.isValidPlayerTarget(table, targets.at(index), effects[index], player);
}

export function isValidEquipTarget(table: GameTable, player: Player): boolean {
    const selector = table.selector;
    return selector.selection.playing_card !== null
        && isEquipCard(selector.selection.playing_card)
        && checkPlayerFilter(table, getEquipTarget(selector.selection.playing_card), player);
}