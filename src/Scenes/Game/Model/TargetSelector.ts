import { Empty } from "../../../Model/ServerMessage";
import { sum } from "../../../Utils/ArrayUtils";
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

interface TargetSelectorBase<T extends RequestStatusUnion> {
    request: T;
    prompt: GamePrompt;
    
    preselection: TargetSelection | null;
    selection: TargetSelection | null;
    modifiers: TargetSelection[];

    mode: TargetSelectorMode;
}

export type TargetSelector = TargetSelectorBase<RequestStatusUnion>;

export function newTargetSelector(request: RequestStatusUnion = {}): TargetSelector {
    return {
        request,
        prompt: { type: 'none' },

        preselection: null,
        selection: null,
        modifiers: [],
        mode: 'start'
    };
}

export function isResponse(selector: TargetSelector): selector is TargetSelectorBase<RequestStatusArgs> {
    return 'respond_cards' in selector.request;
}

export function isStatusReady(selector: TargetSelector): selector is TargetSelectorBase<StatusReadyArgs> {
    return 'play_cards' in selector.request;
}

export function getTargetSelectorStatus(selector: TargetSelector) {
    const { card, targets} = (() => {
        switch (selector.mode) {
        case 'preselect': return selector.preselection!;
        case 'target': return selector.selection!;
        case 'modifier': return selector.modifiers[selector.modifiers.length - 1];
        default:
            throw new Error('TargetSelector: not in targeting mode');
        }
    })();

    const effects = getCardEffects(card, isResponse(selector));
    
    let index = targets.length - 1;
    if (targets.length === 0 || targetDispatch.isSelectionFinished(targets[index], effects[index])) {
        ++index;
    }
    return { currentCard: card, effects, targets, index } as const;
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

export function isCardPlayable(selector: TargetSelector, card: CardId): boolean {
    if (!selector.selection) {
        const check = (info: PlayableCardInfo) => {
            return isMatchingModifiers(selector, info)
                && card === (info.modifiers.at(selector.modifiers.length) ?? info.card);
        };
        
        if (isResponse(selector)) {
            return selector.request.respond_cards.some(check);
        } else if (isStatusReady(selector)) {
            return selector.request.play_cards.some(check);
        }
    }

    return false;
}

export function getAllPlayableCards(selector: TargetSelector): CardId[] {
    let result: CardId[] = [];
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
        && isCardPlayable(selector, card.id)
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

export function isCardSelected(selector: TargetSelector, card: CardId): boolean {
    const check = (target: CardTarget) => targetDispatch.isCardSelected(target, card);
    if (selector.selection?.targets.some(check)) {
        return true;
    }
    if (selector.modifiers.some(({targets}) => targets.some(check))) {
        return true;
    }
    return false;
}

export function isHandSelected(table: GameTable, selector: TargetSelector, card: Card): boolean {
    const cardOwner = getCardOwner(card);
    if (getCardPocket(card) === 'player_hand' && cardOwner !== table.self_player) {
        const player = getPlayer(table, cardOwner!);
        return player.pockets.player_hand.some(id => isCardSelected(selector, id));
    } else {
        return false;
    }
}

export function isPlayerSelected(selector: TargetSelector, player: PlayerId): boolean {
    const check = (target: CardTarget) => targetDispatch.isPlayerSelected(target, player);
    if (selector.selection?.targets.some(check)) {
        return true;
    }
    if (selector.modifiers.some(({targets}) => targets.some(check))) {
        return true;
    }
    return false;
}

export function countSelectedCubes(selector: TargetSelector, targetCard: Card): number {
    let selected = 0;
    const doCount = ({ card, targets }: TargetSelection) => {
        const effects = getCardEffects(card, response);
        let index = 0;
        for (const effect of effects) {
            if (index >= targets.length) break;
            selected += targetDispatch.getCubesSelected(targets[index], effect, card, targetCard);
            ++index;
        }
    };

    const response = isResponse(selector);
    if (selector.selection) {
        doCount(selector.selection);
    }
    for (const selection of selector.modifiers) {
        doCount(selection);
    }
    return selected;
}

export function countSelectableCubes(table: GameTable, selector: TargetSelector): number {
    const getCountCubes = (cardId: CardId) => {
        const card = getCard(table, cardId);
        return card.num_cubes - countSelectedCubes(selector, card);
    };
    const selfPlayer = getPlayer(table, table.self_player!);
    return sum(selfPlayer.pockets.player_character, getCountCubes)
        + sum(selfPlayer.pockets.player_table, getCountCubes);
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