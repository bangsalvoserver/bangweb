import { Empty } from "../../../Model/ServerMessage";
import { count, countIf, sum } from "../../../Utils/ArrayUtils";
import { ChangeField } from "../../../Utils/UnionUtils";
import { CardEffect } from "./CardData";
import { CardTarget } from "./CardEnums";
import { calcPlayerDistance, checkCardFilter, checkPickTarget, checkPlayerFilter, getCardColor, getCardOwner, getEquipTarget, isEquipCard, isPlayerInGame } from "./Filters";
import { Card, GameTable, KnownCard, Player, getCard, getPlayer, isCardKnown } from "./GameTable";
import { CardId, EffectContext, GameString, PlayableCardInfo, PlayerId, RequestStatusArgs, StatusReadyArgs } from "./GameUpdate";

export type RequestStatusUnion = RequestStatusArgs | StatusReadyArgs | Empty;

export type GamePrompt =
    { type: 'none' } |
    { type: 'yesno', message: GameString, response: boolean } |
    { type: 'playpick', card: KnownCard };

export type PlayCardSelectionMode =
    | 'none' // No card selected
    | 'preselect' // Player can either play a card or add a target for the preselection
    | 'modifier' // Selecting target for modifier
    | 'start' // Modifiers selected, selecting new card
    | 'target' // Selecting target for playing card
    | 'equip' // Selecting target for equip
    | 'finish' // Last target selected, sending game_action

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
        selection: newPlayCardSelection('none'),
    };
}

export function getCurrentCardAndTargets(selector: TargetSelector): [KnownCard, CardTarget[]] {
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
        const [currentCard, targets] = getCurrentCardAndTargets(selector);
        const index = getNextTargetIndex(targets);
        if (targets.length !== 0 && index < targets.length) {
            const effect = getCardEffects(currentCard, isResponse(selector)).at(index);
            const target = targets.at(-1)!;
            switch (true) {
            case 'max_cards' in target:
                return target.max_cards[0] !== 0;
            case 'move_cube_slot' in target:
                return target.move_cube_slot[0] !== 0;
            case 'select_cubes_optional' in target:
                return target.select_cubes_optional.at(0) === 0;
            case 'select_cubes_repeat' in target:
                return target.select_cubes_repeat.indexOf(0) % (effect?.target_value ?? 1) === 0;
            case 'select_cubes_players' in target:
                return true;
            }
        }
    }
    return false;
}

export function selectorCanUndo(table: GameTable): boolean {
    switch (table.selector.selection.mode) {
    case 'modifier':
    case 'start':
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

export function getModifierContext<K extends keyof EffectContext> (selector: TargetSelector, prop: K): NonNullable<EffectContext[K]> | null {
    if (selector.selection.modifiers.length !== 0) {
        const findContext = (cards: PlayableCardInfo[]) => {
            let result: EffectContext[K] = undefined;
            for (const info of cards) {
                if (isMatchingModifiers(selector.selection, info) && info.context !== null) {
                    const ctx = info.context[prop];
                    if (ctx) {
                        if (result === undefined) {
                            result = ctx;
                        } else if (result !== ctx) {
                            return null;
                        }
                    }
                }
            }
            return result ?? null;
        }
        if (isResponse(selector)) {
            return findContext(selector.request.respond_cards);
        } else if (isStatusReady(selector)) {
            return findContext(selector.request.play_cards);
        }
    }
    return null;
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
    const check = (target: CardTarget) => {
        switch (true) {
        case 'card' in target:
            return target.card === card;
        case 'extra_card' in target:
            return target.extra_card === card;
        case 'cards' in target:
            return target.cards.includes(card);
        case 'max_cards' in target:
            return target.max_cards.includes(card);
        case 'card_per_player' in target:
            return target.card_per_player.includes(card);
        case 'move_cube_slot' in target:
            return target.move_cube_slot.includes(card);
        default:
            return false;
        }
    };
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
    const check = (target: CardTarget) => {
        switch (true) {
        case 'player' in target:
            return target.player === player;
        case 'conditional_player' in target:
            return target.conditional_player === player;
        case 'adjacent_players' in target:
            return target.adjacent_players.includes(player);
        case 'player_per_cube' in target:
            return target.player_per_cube.includes(player);
        default:
            return false;
        }
    };
    if (selector.selection.targets.some(check)) {
        return true;
    }
    if (selector.selection.modifiers.some(({targets}) => targets.some(check))) {
        return true;
    }
    return false;
}

export function countTargetsSelectedCubes(card: Card, targets: CardTarget[], effects: CardEffect[], condition: (card: CardId) => boolean): number {
    return sum(zipCardTargets(targets, effects), ([target, effect]) => {
        switch (true) {
        case 'select_cubes' in target:
            return countIf(target.select_cubes, condition);
        case 'select_cubes_optional' in target:
            return countIf(target.select_cubes_optional, condition);
        case 'select_cubes_repeat' in target:
            return countIf(target.select_cubes_repeat, condition);
        case 'select_cubes_players' in target:
            return countIf(target.select_cubes_players, condition);
        case 'self_cubes' in target:
            return effect.target_value * +condition(card.id);
        default:
            return 0;
        }
    });
}

export function countSelectedCubes(selector: TargetSelector, targetCard: Card): number {
    let selected = 0;
    const response = isResponse(selector);
    const isTargetCard = (card: CardId) => card === targetCard.id;
    if (selector.selection.playing_card) {
        const effects = getCardEffects(selector.selection.playing_card, response);
        selected += countTargetsSelectedCubes(selector.selection.playing_card, selector.selection.targets, effects, isTargetCard);
    }
    for (const {modifier, targets} of selector.selection.modifiers) {
        const effects = getCardEffects(modifier, response);
        selected += countTargetsSelectedCubes(modifier, targets, effects, isTargetCard);
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
    const selector = table.selector;

    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const nextTarget = getCardEffects(currentCard, isResponse(selector)).at(index);

    const nextTargetType = nextTarget?.target ?? 'none';
    return nextTargetType.startsWith('select_cubes')
        && getCardOwner(card) === table.self_player
        && card.num_cubes > countSelectedCubes(selector, card);
}

export function isValidCardTarget(table: GameTable, card: Card): boolean {
    const player = getCardOwner(card);

    const selector = table.selector;
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const effect = getCardEffects(currentCard, isResponse(selector)).at(index);

    switch (effect?.target) {
    case 'card':
    case 'extra_card':
    case 'cards':
    case 'max_cards':
        if (effect.card_filter.includes('pick_card')) {
            return checkPickTarget(table, card);
        }
        if (player && !checkPlayerFilter(table, effect.player_filter, getPlayer(table, player))) {
            return false;
        }
        if (!checkCardFilter(table, effect.card_filter, card)) {
            return false;
        }
        return true;
    case 'card_per_player': {
        if (!checkCardFilter(table, effect.card_filter, card)) {
            return false;
        }
        if (!player || isPlayerSelected(selector, player)
            || !checkPlayerFilter(table, effect.player_filter, getPlayer(table, player))) {
            return false;
        }
        const lastTarget = targets.at(index);
        if (lastTarget && 'card_per_player' in lastTarget) {
            if (lastTarget.card_per_player.some(targetCard =>
                targetCard > 0 && getCardOwner(getCard(table, targetCard)) === player
            )) {
                return false;
            }
        }
        return true;
    }
    case 'select_cubes':
    case 'select_cubes_optional':
    case 'select_cubes_repeat':
    case 'select_cubes_players':
        return player === table.self_player
            && card.num_cubes > countSelectedCubes(selector, card);
    case 'move_cube_slot':
        return player === table.self_player
            && card.pocket?.name === 'player_table'
            && getCardColor(card) === 'orange'
            && card.num_cubes < 4 - count((targets[index] as {move_cube_slot: CardId[]}).move_cube_slot, card.id);
    default:
        return false;
    }
}

export function getCardEffects(card: KnownCard, isResponse: boolean): CardEffect[] {
    return isResponse ? card.cardData.responses : card.cardData.effects;
}

export function isCardModifier(card: KnownCard, isResponse: boolean): boolean {
    return (isResponse ? card.cardData.modifier_response.type : card.cardData.modifier.type) !== null;
}

export function *zipCardTargets(targets: CardTarget[], effects: CardEffect[]): Generator<[CardTarget, CardEffect]> {
    let index = 0;
    for (let effect of effects) {
        if (index >= targets.length) return;
        yield [targets[index++], effect];
    }
}

export function getNextTargetIndex(targets: CardTarget[]): number {
    if (targets.length !== 0) {
        let lastTarget = Object.values(targets.at(-1)!)[0];
        if (Array.isArray(lastTarget) && lastTarget.includes(0)) {
            return targets.length - 1;
        }
    }
    return targets.length;
}

export function isValidPlayerTarget(table: GameTable, player: Player): boolean {
    const selector = table.selector;
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const effect = getCardEffects(currentCard, isResponse(selector)).at(index);

    switch (effect?.target) {
    case 'player':
    case 'conditional_player':
    case 'player_per_cube':
        return checkPlayerFilter(table, effect.player_filter, player);
    case 'adjacent_players': {
        const checkTargets = (target1: Player, target2: Player) => {
            return target1.id !== target2.id && target2.id !== table.self_player
                && calcPlayerDistance(table, target1.id, target2.id) <= effect.target_value;
        };
        const firstPlayer = (targets[index] as {adjacent_players: PlayerId[]}).adjacent_players[0];
        if (firstPlayer === 0) {
            return checkPlayerFilter(table, effect.player_filter, player)
                && table.alive_players.some(target2 => checkTargets(player, getPlayer(table, target2)));
        } else {
            return isPlayerInGame(player) && checkTargets(getPlayer(table, firstPlayer), player);
        }
    }
    default:
        return false;
    }
}

export function isValidEquipTarget(table: GameTable, player: Player): boolean {
    const selector = table.selector;
    return selector.selection.playing_card !== null
        && isEquipCard(selector.selection.playing_card)
        && checkPlayerFilter(table, getEquipTarget(selector.selection.playing_card), player);
}