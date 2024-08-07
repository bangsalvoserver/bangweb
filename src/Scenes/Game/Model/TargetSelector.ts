import { Empty } from "../../../Model/ServerMessage";
import { sum } from "../../../Utils/ArrayUtils";
import { ChangeField } from "../../../Utils/UnionUtils";
import { CardEffect } from "./CardData";
import { CardTarget } from "./CardTarget";
import { checkPlayerFilter, getCardEffects, getCardOwner, getCardPocket, getEquipTarget, isEquipCard } from "./Filters";
import { Card, GameTable, KnownCard, Player, getCard, getPlayer, isCardKnown } from "./GameTable";
import { CardId, EffectContext, GameString, PlayableCardInfo, PlayerId, RequestStatusArgs, StatusReadyArgs } from "./GameUpdate";
import targetDispatch from "./TargetDispatch";

export type RequestStatusUnion = RequestStatusArgs | StatusReadyArgs | Empty;

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

export interface TargetSelector {
    request: RequestStatusUnion;
    prompt: GamePrompt;
    
    playing_card: KnownCard | null;
    targets: CardTarget[];
    modifiers: TargetSelection[];
    preselection: TargetSelection | null;

    mode: TargetSelectorMode;
}

export function newTargetSelector(request: RequestStatusUnion = {}): TargetSelector {
    return {
        request,
        prompt: { type: 'none' },

        playing_card: null,
        targets: [],
        modifiers: [],
        preselection: null,
        mode: 'start'
    };
}

export type RequestSelector = ChangeField<TargetSelector, 'request', RequestStatusArgs>;
export type StatusReadySelector = ChangeField<TargetSelector, 'request', StatusReadyArgs>;

export function isResponse(selector: TargetSelector): selector is RequestSelector {
    return 'respond_cards' in selector.request;
}

export function isStatusReady(selector: TargetSelector): selector is StatusReadySelector {
    return 'play_cards' in selector.request;
}

export function getTargetSelectorStatus(selector: TargetSelector) {
    let currentCard: KnownCard | undefined;
    let targets: CardTarget[] | undefined;

    switch (selector.mode) {
    case 'preselect':
        currentCard = selector.preselection!.card;
        targets = selector.preselection!.targets;
        break;
    case 'target':
        currentCard = selector.playing_card!;
        targets = selector.targets;
        break;
    case 'modifier': {
        const modifier = selector.modifiers[selector.modifiers.length - 1];
        currentCard = modifier.card;
        targets = modifier.targets;
        break;
    }
    default:
        throw new Error('TargetSelector: not in targeting mode');
    }

    const effects = getCardEffects(currentCard, isResponse(selector));
    
    let index = targets.length - 1;
    if (targets.length === 0 || targetDispatch.isSelectionFinished(targets[index], effects[index])) {
        ++index;
    }
    return { currentCard, effects, targets, index } as const;
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
    switch (table.selector.mode) {
    case 'modifier':
    case 'middle':
    case 'target':
    case 'equip':
        return table.selector.preselection === null;
    default:
        return false;
    }
}

function isMatchingModifiers(selector: TargetSelector, info: PlayableCardInfo): boolean {
    let i = 0;
    for (const { card } of selector.modifiers) {
        if (info.modifiers.at(i) !== card.id) {
            return false;
        }
        ++i;
    }
    return true;
}

export function getPlayableCards(selector: TargetSelector): CardId[] {
    let result: CardId[] = [];
    
    if (!selector.playing_card) {
        const check = (cards: PlayableCardInfo[]) => {
            for (const info of cards) {
                if (isMatchingModifiers(selector, info)) {
                    const card = info.modifiers.at(selector.modifiers.length) ?? info.card;
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
    if (selector.modifiers.length !== 0) {
        const findContext = (cards: PlayableCardInfo[]) => {
            let result: EffectContext[K] = undefined;
            for (const info of cards) {
                if (isMatchingModifiers(selector, info)) {
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
    return selector.playing_card?.id === card.id
        || selector.modifiers.some(selection => selection.card.id === card.id)
        || selector.preselection?.card.id === card.id;
}

export function isCardPrompted(selector: TargetSelector, card: Card): card is KnownCard {
    return selector.prompt.type === 'playpick' && selector.prompt.card.id === card.id;
}

export function isCardSelected(selector: TargetSelector, card: CardId): boolean {
    const check = (target: CardTarget) => targetDispatch.isCardSelected(target, card);
    if (selector.targets.some(check)) {
        return true;
    }
    if (selector.modifiers.some(({targets}) => targets.some(check))) {
        return true;
    }
    return false;
}

export function isHandSelected(table: GameTable, card: Card): boolean {
    const cardOwner = getCardOwner(card);
    if (getCardPocket(card) === 'player_hand' && cardOwner !== table.self_player) {
        const player = getPlayer(table, cardOwner!);
        return player.pockets.player_hand.some(id => isCardSelected(table.selector, id));
    } else {
        return false;
    }
}

export function isPlayerSelected(selector: TargetSelector, player: PlayerId): boolean {
    const check = (target: CardTarget) => targetDispatch.isPlayerSelected(target, player);
    if (selector.targets.some(check)) {
        return true;
    }
    if (selector.modifiers.some(({targets}) => targets.some(check))) {
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
    if (selector.playing_card) {
        const effects = getCardEffects(selector.playing_card, response);
        doCount(selector.playing_card, selector.targets, effects);
    }
    for (const {card, targets} of selector.modifiers) {
        const effects = getCardEffects(card, response);
        doCount(card, targets, effects);
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
    return selector.playing_card !== null
        && isEquipCard(selector.playing_card)
        && checkPlayerFilter(table, getEquipTarget(selector.playing_card), player);
}