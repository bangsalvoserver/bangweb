import { countIf } from "../../../Utils/ArrayUtils";
import { CardEffect } from "./CardData";
import { CardTarget, CardTargetGenerated, CardTargetTypes, TargetType } from "./CardTarget";
import { calcPlayerDistance, checkCardFilter, checkPlayerFilter, getCardColor, getCardOwner, getCardPocket, isPlayerInGame } from "./Filters";
import { Card, GameTable, getCard, getCubeCount, getPlayer, Player } from "./GameTable";
import { CardId } from "./GameUpdate";
import { countSelectableCubes, countSelectedCubes, getModifierContext, isPlayerSkipped, TargetSelector } from "./TargetSelector";

interface BuildAutoTarget<T> {
    buildAutoTarget: (table: GameTable, selector: TargetSelector, effect: CardEffect) => T;
}

interface TargetDispatchOf<T extends U, U = T | undefined> extends BuildAutoTarget<U> {
    isCardSelected: (table: GameTable, target: T, card: Card) => boolean;
    isValidCardTarget: (table: GameTable, selector: TargetSelector, target: U, effect: CardEffect, card: Card) => boolean;
    appendCardTarget: (target: U, effect: CardEffect, card: Card) => T;

    isPlayerSelected: (table: GameTable, target: T, player: Player) => boolean;
    isValidPlayerTarget: (table: GameTable, selector: TargetSelector, target: U, effect: CardEffect, player: Player) => boolean;
    appendPlayerTarget: (target: U, effect: CardEffect, player: Player) => T;

    isValidCubeTarget: (table: GameTable, selector: TargetSelector, target: U, effect: CardEffect, card: Card) => boolean;
    getCubesSelected: (table: GameTable, target: T, effect: CardEffect, originCard: Card, targetCard: Card) => number;

    isSelectionFinished: (target: T, effect: CardEffect) => boolean;
    isSelectionConfirmable: (target: T, effect: CardEffect) => boolean;
    confirmSelection: (target: T) => T;
}

interface GenerateTarget<From, To> {
    generateTarget: (target: From) => To;
}

export type TargetDispatch = TargetDispatchOf<CardTarget> & GenerateTarget<CardTarget, CardTargetGenerated>;

type PartialDispatch<T extends U, R, U = T | undefined> = Partial<TargetDispatchOf<T, U>> & GenerateTarget<T, R>;
type DispatchMap = {
    [K in TargetType]: CardTargetTypes[K] extends [infer From, infer To] ? PartialDispatch<From, To> : never
};

function buildDispatch(dispatchMap: DispatchMap): TargetDispatch {
    const getDispatch = (key: TargetType) => dispatchMap[key] as PartialDispatch<unknown, unknown>;

    const cardTargetKeyValue = (target: CardTarget) => Object.entries(target)[0] as [TargetType, unknown];
    const cardTargetValue = (target: CardTarget | undefined) => target ? Object.values(target)[0] as unknown : undefined;
    const buildCardTarget = <T>(key: TargetType, value: unknown) => ({ [key]: value } as T);

    return {
        isCardSelected: (table, target, card) => {
            const [key, value] = cardTargetKeyValue(target);
            const fn = getDispatch(key).isCardSelected;
            return fn !== undefined && fn(table, value, card);
        },
        isValidCardTarget: (table, selector, target, effect, card) => {
            const fn = getDispatch(effect.target).isValidCardTarget;
            return fn !== undefined && fn(table, selector, cardTargetValue(target), effect, card);
        },
        appendCardTarget: (target, effect, card) => {
            const fn = getDispatch(effect.target).appendCardTarget;
            if (!fn) throw new Error('Cannot add card target');
            return buildCardTarget(effect.target, fn(cardTargetValue(target), effect, card));
        },
        isPlayerSelected: (table, target, player) => {
            const [key, value] = cardTargetKeyValue(target);
            const fn = getDispatch(key).isPlayerSelected;
            return fn !== undefined && fn(table, value, player);
        },
        isValidPlayerTarget: (table, selector, target, effect, player) => {
            const fn = getDispatch(effect.target).isValidPlayerTarget;
            return fn !== undefined && fn(table, selector, cardTargetValue(target), effect, player);
        },
        appendPlayerTarget: (target, effect, player) => {
            const fn = getDispatch(effect.target).appendPlayerTarget;
            if (!fn) throw new Error('Cannot add player target');
            return buildCardTarget(effect.target, fn(cardTargetValue(target), effect, player));
        },
        isValidCubeTarget: (table, selector, target, effect, card) => {
            const fn = getDispatch(effect.target).isValidCubeTarget;
            return fn !== undefined && fn(table, selector, cardTargetValue(target), effect, card);
        },
        getCubesSelected: (table, target, effect, originCard, targetCard) => {
            const [key, value] = cardTargetKeyValue(target);
            const fn = getDispatch(key).getCubesSelected;
            return fn ? fn(table, value, effect, originCard, targetCard) : 0;
        },
        isSelectionFinished: (target, effect) => {
            const [key, value] = cardTargetKeyValue(target);
            const fn = getDispatch(key).isSelectionFinished;
            return fn === undefined || fn(value, effect);
        },
        isSelectionConfirmable: (target, effect) => {
            const fn = getDispatch(effect.target).isSelectionConfirmable;
            return fn !== undefined && fn(cardTargetValue(target), effect);
        },
        confirmSelection: (target) => {
            const [key, value] = cardTargetKeyValue(target);
            const fn = getDispatch(key).confirmSelection;
            if (!fn) throw new Error('Cannot confirm selection');
            return buildCardTarget(key, fn(value));
        },
        buildAutoTarget: (table, selector, effect) => {
            const fn = getDispatch(effect.target).buildAutoTarget;
            if (!fn) return undefined;
            const targetValue = fn(table, selector, effect);
            return targetValue !== undefined ? buildCardTarget(effect.target, targetValue) : undefined;
        },
        generateTarget: (target) => {
            const [key, value] = cardTargetKeyValue(target);
            const fn = getDispatch(key).generateTarget;
            return buildCardTarget(key, fn(value));
        },
    }
}

const reservedDispatch = <T, R>(dispatch: PartialDispatch<T, R, T> & BuildAutoTarget<T>) => {
    return dispatch as PartialDispatch<T, R>;
};

const isHandSelected = (target: Card, value: Card) => {
    const targetPocket = getCardPocket(target);
    if (targetPocket === 'player_hand') {
        return targetPocket === getCardPocket(value) && getCardOwner(target) === getCardOwner(value);
    }
    return target.id === value.id;
};

const isValidPlayerTarget = <T>(table: GameTable, selector: TargetSelector, target: T, effect: CardEffect, player: Player) => {
    return checkPlayerFilter(table, selector, effect.player_filter, player);
};

const isValidCardTarget = <T>(table: GameTable, selector: TargetSelector, target: T, effect: CardEffect, card: Card) => {
    const player = getCardOwner(card);
    return (!player || checkPlayerFilter(table, selector, effect.player_filter, getPlayer(table, player)))
        && checkCardFilter(table, selector, effect.card_filter, card);
};

const isValidCubeTarget = <T>(table: GameTable, selector: TargetSelector, target: T, effect: CardEffect, card: Card) => {
    return getCardOwner(card) === table.self_player
        && getCubeCount(card.tokens) > countSelectedCubes(table, selector, card);
};

const containsId = <T extends {id: unknown}>(targets: T[], value: T): boolean => {
    return targets.some(target => target.id === value.id);
};

const countIds = <T extends {id: unknown}>(targets: T[], value: T): number => {
    return countIf(targets, target => target.id === value.id);
};

const mapIds = <T extends {id: U}, U>(targets: T[]): U[] => {
    return targets.map(target => target.id);
};

const targetDispatch = buildDispatch({
    none: {
        buildAutoTarget: () => ({}),
        generateTarget: () => ({}),
    },
    player: {
        isPlayerSelected: (table, target, player) => target.id === player.id,
        appendPlayerTarget: (target, effect, player) => player,
        isValidPlayerTarget,
        generateTarget: target => target.id
    },
    conditional_player: {
        isPlayerSelected: (table, target, player) => target?.id === player.id,
        appendPlayerTarget: (target, effect, player) => player,
        isValidPlayerTarget,
        buildAutoTarget: (table, selector, effect) => {
            if (table.alive_players.every(target => !checkPlayerFilter(table, selector, effect.player_filter, getPlayer(table, target)))) {
                return null;
            }
        },
        generateTarget: target => target ? target.id : null,
    },
    adjacent_players: {
        isPlayerSelected: (table, target, player) => containsId(target, player),
        appendPlayerTarget: (target, effect, player) => (target ?? []).concat(player),
        isSelectionFinished: (target) => target.length === 2,
        isValidPlayerTarget: (table, selector, target, effect, player) => {
            const checkTargets = (target1: Player, target2: Player) => {
                return target1.id !== target2.id && target2.id !== table.self_player
                    && isPlayerInGame(target2)
                    && calcPlayerDistance(table, selector, target1.id, target2.id) <= effect.target_value;
            };
            if (target) {
                return checkTargets(target[0], player);
            } else {
                return checkPlayerFilter(table, selector, effect.player_filter, player)
                    && table.alive_players.some(target2 => checkTargets(player, getPlayer(table, target2)));
            }
        },
        generateTarget: mapIds
    },
    player_per_cube: reservedDispatch({
        appendCardTarget: ({cubes, max_cubes, players}, effect, card) => ({ cubes: cubes.concat(card), max_cubes, players }),
        appendPlayerTarget: ({cubes, max_cubes, players}, effect, player) => ({ cubes, max_cubes, players: players.concat(player) }),
        isValidCubeTarget: (table, selector, {cubes, max_cubes }, effect, card) => {
            return cubes.length !== max_cubes && isValidCubeTarget(table, selector, cubes, effect, card);
        },
        isValidPlayerTarget: (table, selector, {cubes, players}, effect, player) => {
            return cubes.length + effect.target_value > players.length
                && isValidPlayerTarget(table, selector, players, effect, player);
        },
        getCubesSelected: (table, {cubes}, effect, originCard, targetCard) => countIds(cubes, targetCard),
        isPlayerSelected: (table, {players}, player) => containsId(players, player),
        isSelectionFinished: ({cubes, max_cubes, players}, effect) => cubes.length === max_cubes && players.length === cubes.length + effect.target_value,
        isSelectionConfirmable: ({cubes, players}, effect) => players.length === cubes.length + effect.target_value,
        confirmSelection: ({cubes, players}) => ({cubes, max_cubes: cubes.length, players}),
        buildAutoTarget: (table, selector, effect) => {
            const cubeCount = countSelectableCubes(table, selector);
            const numPlayers = countIf(table.alive_players, target => checkPlayerFilter(table, selector, effect.player_filter, getPlayer(table, target)));
            const max_cubes = Math.min(cubeCount, numPlayers - effect.target_value);
            return {cubes:[], max_cubes, players:[]};
        },
        generateTarget: ({cubes, players}) => [mapIds(cubes), mapIds(players)]
    }),
    random_if_hand_card: {
        isCardSelected: (table, target, card) => isHandSelected(target, card),
        appendCardTarget: (target, effect, card) => card,
        isValidCardTarget,
        generateTarget: card => card.id
    },
    card: {
        isCardSelected: (table, target, card) => target.id === card.id,
        appendCardTarget: (target, effect, card) => card,
        isValidCardTarget,
        generateTarget: card => card.id
    },
    extra_card: {
        isCardSelected: (table, target, card) => target?.id === card.id,
        appendCardTarget: (target, effect, card) => card,
        isValidCardTarget,
        buildAutoTarget: (table, selector, effect) => {
            if (getModifierContext(selector, 'repeat_card')) {
                return null;
            }
        },
        generateTarget: card => card ? card.id : null
    },
    players: {
        isPlayerSelected: (table, players, player) => containsId(players, player),
        buildAutoTarget: (table, selector, effect) => table.players.filter(player => 
            checkPlayerFilter(table, selector, effect.player_filter, player) && !isPlayerSkipped(table, selector, player)
        ),
        generateTarget: () => ({})
    },
    cards: {
        isCardSelected: (table, cards, card) => containsId(cards, card),
        appendCardTarget: (target, effect, card) => (target ?? []).concat(card),
        isSelectionFinished: (target, effect) => target.length === effect.target_value,
        isValidCardTarget,
        generateTarget: mapIds
    },
    max_cards: reservedDispatch({
        isCardSelected: (table, { cards }, card) => containsId(cards, card),
        appendCardTarget: ({ cards, max_cards }, effect, card) => ({ cards: cards.concat(card), max_cards }),
        isValidCardTarget,
        isSelectionConfirmable: ({ cards }, effect) => cards.length !== 0,
        isSelectionFinished: ({ cards, max_cards }, effect) => cards.length === max_cards,
        confirmSelection: ({ cards }) => ({ cards, max_cards: cards.length }),
        buildAutoTarget: (table, selector, effect) => {
            const cardTargetable = (card: CardId) => checkCardFilter(table, selector, effect.card_filter, getCard(table, card));
            let max_cards = 0;
            for (const player of table.players) {
                if (checkPlayerFilter(table, selector, effect.player_filter, player)) {
                    max_cards += countIf(player.pockets.player_hand, cardTargetable);
                    max_cards += countIf(player.pockets.player_table, cardTargetable);
                }
            }
            if (effect.target_value !== 0 && max_cards > effect.target_value) {
                max_cards = effect.target_value;
            }
            return { cards: [], max_cards };
        },
        generateTarget: ({ cards }) => mapIds(cards),
    }),
    card_per_player: reservedDispatch({
        isCardSelected: (table, { cards }, card) => {
            return cards.some(selected => isHandSelected(selected, card));
        },
        appendCardTarget: ({ cards, max_cards }, effect, card) => ({ cards: cards.concat(card), max_cards }),
        isSelectionFinished: ({ cards, max_cards }, effect) => cards.length === max_cards,
        isValidCardTarget: (table, selector, { cards }, effect, card) => {
            const playerId = getCardOwner(card);
            if (playerId === undefined) return false;
            const player = getPlayer(table, playerId);

            return !isPlayerSkipped(table, selector, player)
                && checkPlayerFilter(table, selector, effect.player_filter, player)
                && checkCardFilter(table, selector, effect.card_filter, card)
                && !cards.some(targetCard => getCardOwner(targetCard) === playerId);
        },
        buildAutoTarget: (table, selector, effect) => {
            const cardIsValid = (card: CardId) => checkCardFilter(table, selector, effect.card_filter, getCard(table, card));
            const max_cards = countIf(table.alive_players, target => {
                const targetPlayer = getPlayer(table, target);
                return !isPlayerSkipped(table, selector, targetPlayer)
                    && checkPlayerFilter(table, selector, effect.player_filter, targetPlayer)
                    && (targetPlayer.pockets.player_hand.some(cardIsValid) || targetPlayer.pockets.player_table.some(cardIsValid));
            });
            return { cards:[], max_cards };
        },
        generateTarget: ({ cards }) => mapIds(cards),
    }),
    move_cube_slot: reservedDispatch({
        appendCardTarget: ({ cards, max_cubes }, effect, card) => ({ cards: cards.concat(card), max_cubes }),
        isValidCardTarget: (table, selector, { cards }, effect, card) => {
            return getCardOwner(card) === table.self_player
                && getCardPocket(card) === 'player_table'
                && getCardColor(card) === 'orange'
                && getCubeCount(card.tokens) < 4 - countIds(cards, card);
        },
        isCardSelected: (table, {cards}, card) => containsId(cards, card),
        isSelectionConfirmable: ({ cards }) => cards.length !== 0,
        isSelectionFinished: ({ cards, max_cubes }) => cards.length === max_cubes,
        confirmSelection: ({ cards }) => ({ cards, max_cubes: cards.length }),
        getCubesSelected: (table, { cards }, effect, originCard, targetCard) => {
            const selfPlayer = getPlayer(table, table.self_player!);
            const firstCharacter = selfPlayer.pockets.player_character[0];
            return targetCard.id === firstCharacter ? cards.length : 0;
        },
        buildAutoTarget: (table, selector, effect) => {
            const selfPlayer = getPlayer(table, table.self_player!);
            let cubeSlots = 0;
            for (const cardId of selfPlayer.pockets.player_table) {
                const card = getCard(table, cardId);
                if (getCardColor(card) === 'orange') {
                    cubeSlots += 4 - getCubeCount(card.tokens);
                }
            }
            const firstCharacter = selfPlayer.pockets.player_character[0];
            const characterCubes = getCubeCount(getCard(table, firstCharacter).tokens);
            const max_cubes = Math.min(effect.target_value, cubeSlots, characterCubes);
            return { cards: [], max_cubes };
        },
        generateTarget: ({ cards }) => mapIds(cards)
    }),
    select_cubes: {
        appendCardTarget: (target, effect, card) => (target ?? []).concat(card),
        isValidCubeTarget,
        getCubesSelected: (table, cubes, effect, originCard, targetCard) => countIds(cubes, targetCard),
        isSelectionFinished: (cards, effect) => cards.length === effect.target_value,
        generateTarget: mapIds,
    },
    select_cubes_optional: reservedDispatch({
        appendCardTarget: ({ cubes, max_cubes }, effect, card) => ({ cubes: cubes.concat(card), max_cubes }),
        isValidCubeTarget,
        getCubesSelected: (table, { cubes }, effect, originCard, targetCard) => countIds(cubes, targetCard),
        isSelectionConfirmable: ({cubes}) => cubes.length === 0,
        isSelectionFinished: ({cubes, max_cubes}) => cubes.length === max_cubes,
        confirmSelection: ({cubes, max_cubes}) => ({cubes, max_cubes: cubes.length}),
        buildAutoTarget: (table, selector, effect) => {
            const max_cubes = countSelectableCubes(table, selector) >= effect.target_value ? effect.target_value : 0;
            return { cubes: [], max_cubes };
        },
        generateTarget: ({cubes}) => mapIds(cubes),
    }),
    select_cubes_repeat: reservedDispatch({
        appendCardTarget: ({ cubes, max_cubes }, effect, card) => ({ cubes: cubes.concat(card), max_cubes }),
        isValidCubeTarget,
        getCubesSelected: (table, { cubes }, effect, originCard, targetCard) => countIds(cubes, targetCard),
        isSelectionConfirmable: ({ cubes }, effect) => cubes.length % (effect.target_value || 1) === 0,
        isSelectionFinished: ({ cubes, max_cubes }) => cubes.length === max_cubes,
        confirmSelection: ({ cubes }) => ({ cubes, max_cubes: cubes.length }),
        buildAutoTarget: (table, selector, effect) => {
            const cubeCount = countSelectableCubes(table, selector);
            const max_cubes = cubeCount - cubeCount % (effect.target_value || 1);
            return { cubes: [], max_cubes };
        },
        generateTarget: ({ cubes }) => mapIds(cubes),
    }),
    self_cubes: {
        getCubesSelected: (table, target, effect, originCard, targetCard) => originCard.id === targetCard.id ? effect.target_value : 0,
        buildAutoTarget: () => ({}),
        generateTarget: () => ({})
    }
});

export default targetDispatch;