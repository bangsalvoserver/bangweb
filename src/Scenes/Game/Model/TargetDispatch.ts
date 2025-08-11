import { countIf } from "../../../Utils/ArrayUtils";
import { Identity } from "../../../Utils/UnionUtils";
import { CardEffect, CardEffectArgs, CardEffectOf, CardTarget, CardTargetArgs, CardTargetArgsArray, CardTargetGenerated, CardTargetTypes, PlayerTargetArgs, PlayerTargetArgsArray, TargetType } from "./CardTarget";
import { calcPlayerDistance, checkCardFilter, checkPlayerFilter, getCardColor, getCardOwner, getCardPocket, getCardSign, isBangCard, isMissedCard, isPlayerInGame } from "./Filters";
import { Card, GameTable, getCard, getCubeCount, getPlayer, getPlayerCubes, getPlayerPocket, Player } from "./GameTable";
import { CardId } from "./GameUpdate";
import { countSelectableCubes, countSelectedCubes, getModifierContext, isPlayerSkipped, TargetSelector } from "./TargetSelector";

interface BuildAutoTarget<T, E> {
    buildAutoTarget: (table: GameTable, selector: TargetSelector, effect: E) => T;
}

interface TargetDispatchOf<T extends U, E = CardEffect, U = T | undefined> extends BuildAutoTarget<U, E> {
    isCardSelected: (target: T, card: Card) => boolean;
    isValidCardTarget: (table: GameTable, selector: TargetSelector, target: U, effect: E, card: Card) => boolean;
    appendCardTarget: (target: U, effect: E, card: Card) => T;

    isPlayerSelected: (target: T, player: Player) => boolean;
    isValidPlayerTarget: (table: GameTable, selector: TargetSelector, target: U, effect: E, player: Player) => boolean;
    appendPlayerTarget: (target: U, effect: E, player: Player) => T;

    isValidCubeTarget: (table: GameTable, selector: TargetSelector, target: U, effect: E, card: Card) => boolean;
    getCubesSelected: (target: T, cubeSlot: Card, card: Card) => number;

    isSelectionFinished: (target: T, effect: E) => boolean;
    isSelectionConfirmable: (table: GameTable, target: T, effect: E) => boolean;
    confirmSelection: (target: T) => T;
}

interface GenerateTarget<From, To> {
    generateTarget: (target: From) => To;
}

interface ParseCardEffect<From, To> {
    parseCardEffect: (effect: From) => To;
}

export type TargetDispatch = TargetDispatchOf<CardTarget> & GenerateTarget<CardTarget, CardTargetGenerated> & ParseCardEffect<CardEffectArgs, CardEffect>;

type PartialDispatch<T extends U, R, EArgs = CardEffectArgs, E = CardEffect, U = T | undefined> =
    Partial<TargetDispatchOf<T, E, U>> & GenerateTarget<T, R> & ParseCardEffect<EArgs, E>;

type DispatchMap = {
    [K in TargetType]: CardTargetTypes[K] extends {value: infer From, target: infer To}
        ? PartialDispatch<From, To, Identity<CardEffectOf<K, 'array'>>, Identity<CardEffectOf<K, 'set'>>>
        : never
};

function buildDispatch(dispatchMap: DispatchMap): TargetDispatch {
    const getDispatch = (type: TargetType) => dispatchMap[type] as PartialDispatch<unknown, unknown>;
    const buildCardTarget = (type: TargetType, value: unknown) => ({ type, value } as CardTarget);

    return {
        isCardSelected: (target, card) => {
            const fn = getDispatch(target.type).isCardSelected;
            return fn !== undefined && fn(target.value, card);
        },
        isValidCardTarget: (table, selector, target, effect, card) => {
            const fn = getDispatch(effect.target).isValidCardTarget;
            return fn !== undefined && fn(table, selector, target?.value, effect, card);
        },
        appendCardTarget: (target, effect, card) => {
            const fn = getDispatch(effect.target).appendCardTarget;
            if (!fn) throw new Error('Cannot add card target');
            return buildCardTarget(effect.target, fn(target?.value, effect, card));
        },
        isPlayerSelected: (target, player) => {
            const fn = getDispatch(target.type).isPlayerSelected;
            return fn !== undefined && fn(target.value, player);
        },
        isValidPlayerTarget: (table, selector, target, effect, player) => {
            const fn = getDispatch(effect.target).isValidPlayerTarget;
            return fn !== undefined && fn(table, selector, target?.value, effect, player);
        },
        appendPlayerTarget: (target, effect, player) => {
            const fn = getDispatch(effect.target).appendPlayerTarget;
            if (!fn) throw new Error('Cannot add player target');
            return buildCardTarget(effect.target, fn(target?.value, effect, player));
        },
        isValidCubeTarget: (table, selector, target, effect, card) => {
            const fn = getDispatch(effect.target).isValidCubeTarget;
            return fn !== undefined && fn(table, selector, target?.value, effect, card);
        },
        getCubesSelected: (target, cubeSlot, card) => {
            const fn = getDispatch(target.type).getCubesSelected;
            return fn ? fn(target.value, cubeSlot, card) : 0;
        },
        isSelectionFinished: (target, effect) => {
            const fn = getDispatch(target.type).isSelectionFinished;
            return fn === undefined || fn(target.value, effect);
        },
        isSelectionConfirmable: (table, target, effect) => {
            const fn = getDispatch(effect.target).isSelectionConfirmable;
            return fn !== undefined && fn(table, target.value, effect);
        },
        confirmSelection: target => {
            const fn = getDispatch(target.type).confirmSelection;
            if (!fn) throw new Error('Cannot confirm selection');
            return buildCardTarget(target.type, fn(target.value));
        },
        buildAutoTarget: (table, selector, effect) => {
            const fn = getDispatch(effect.target).buildAutoTarget;
            if (!fn) return undefined;
            const targetValue = fn(table, selector, effect);
            return targetValue !== undefined ? buildCardTarget(effect.target, targetValue) : undefined;
        },
        generateTarget: target => {
            const fn = getDispatch(target.type).generateTarget;
            return fn(target.value) as CardTargetGenerated;
        },
        parseCardEffect: effect => {
            const fn = getDispatch(effect.target).parseCardEffect;
            return fn(effect) as CardEffect;
        },
    }
}

const reservedDispatch = <T, R, EArgs, E>(dispatch: PartialDispatch<T, R, EArgs, E, T> & BuildAutoTarget<T, E>) => {
    return dispatch as PartialDispatch<T, R, EArgs, E>;
};

const isHandSelected = (target: Card, value: Card) => {
    const targetPocket = getCardPocket(target);
    if (targetPocket === 'player_hand') {
        return targetPocket === getCardPocket(value) && getCardOwner(target) === getCardOwner(value);
    }
    return target.id === value.id;
};

const isValidPlayerTarget = <T>(table: GameTable, selector: TargetSelector, target: T, effect: PlayerTargetArgs, player: Player) => {
    return checkPlayerFilter(table, selector, effect.player_filter, player);
};

const isValidCardTarget = <T>(table: GameTable, selector: TargetSelector, target: T, effect: CardTargetArgs, card: Card) => {
    const player = getCardOwner(card);
    return (!player || checkPlayerFilter(table, selector, effect.player_filter, getPlayer(table, player)))
        && checkCardFilter(table, selector, effect.card_filter, card);
};

const isValidCubeTarget = <T>(table: GameTable, selector: TargetSelector, target: T, effect: CardEffect, card: Card) => {
    return getCardOwner(card) === table.self_player
        && getCubeCount(card) > countSelectedCubes(table, selector, card);
};

const getValidCardTargets = (table: GameTable, selector: TargetSelector, effect: CardTargetArgs) => {
    return Object.values(table.players)
        .filter(player => checkPlayerFilter(table, selector, effect.player_filter, player))
        .flatMap(player => getPlayerPocket(player, 'player_hand').concat(getPlayerPocket(player, 'player_table')))
        .map(card => getCard(table, card))
        .filter(card => checkCardFilter(table, selector, effect.card_filter, card));
};

const checkId = <T extends {id: U}, U>(target: T, value: T): boolean => {
    return target.id === value.id;
};

const containsId = <T extends {id: U}, U>(targets: T[], value: T): boolean => {
    return targets.some(target => target.id === value.id);
};

const countIds = <T extends {id: U}, U>(targets: T[], value: T): number => {
    return countIf(targets, target => target.id === value.id);
};

const mapIds = <T extends {id: U}, U>(targets: T[]): U[] => {
    return targets.map(target => target.id);
};

const parseNoneEffect = <T>(effect: T) => effect;

const parsePlayerEffect = <T extends PlayerTargetArgsArray>(effect: T) => ({
    ...effect,
    player_filter: new Set(effect.player_filter)
});

const parseCardEffect = <T extends CardTargetArgsArray>(effect: T) => ({
    ...effect,
    player_filter: new Set(effect.player_filter),
    card_filter: new Set(effect.card_filter)
});

const targetDispatch = buildDispatch({
    none: {
        buildAutoTarget: () => null,
        generateTarget: () => null,
        parseCardEffect: parseNoneEffect
    },
    player: {
        isPlayerSelected: checkId,
        appendPlayerTarget: (target, effect, player) => player,
        isValidPlayerTarget,
        generateTarget: target => target.id,
        parseCardEffect: parsePlayerEffect
    },
    conditional_player: {
        isPlayerSelected: (target, player) => target?.id === player.id,
        appendPlayerTarget: (target, effect, player) => player,
        isValidPlayerTarget,
        buildAutoTarget: (table, selector, effect) => {
            if (table.alive_players.every(target => !checkPlayerFilter(table, selector, effect.player_filter, getPlayer(table, target)))) {
                return null;
            }
        },
        generateTarget: target => target ? target.id : null,
        parseCardEffect: parsePlayerEffect
    },
    adjacent_players: {
        isPlayerSelected: containsId,
        appendPlayerTarget: (target, effect, player) => (target ?? []).concat(player),
        isSelectionFinished: target => target.length === 2,
        isValidPlayerTarget: (table, selector, target, effect, player) => {
            const checkTargets = (target1: Player, target2: Player) => {
                return target1.id !== target2.id && target2.id !== table.self_player
                    && isPlayerInGame(target2)
                    && calcPlayerDistance(table, selector, target1.id, target2.id) <= effect.max_distance;
            };
            if (target) {
                return checkTargets(target[0], player);
            } else {
                return checkPlayerFilter(table, selector, effect.player_filter, player)
                    && table.alive_players.some(target2 => checkTargets(player, getPlayer(table, target2)));
            }
        },
        generateTarget: mapIds,
        parseCardEffect: parsePlayerEffect
    },
    player_per_cube: reservedDispatch({
        appendCardTarget: ({cubes, max_cubes, players}, effect, card) => ({ cubes: cubes.concat(card), max_cubes, players }),
        appendPlayerTarget: ({cubes, max_cubes, players}, effect, player) => ({ cubes, max_cubes, players: players.concat(player) }),
        isValidCubeTarget: (table, selector, {cubes, max_cubes }, effect, card) => {
            return cubes.length !== max_cubes && isValidCubeTarget(table, selector, cubes, effect, card);
        },
        isValidPlayerTarget: (table, selector, {cubes, players}, effect, player) => {
            return cubes.length + effect.extra_players > players.length
                && isValidPlayerTarget(table, selector, players, effect, player);
        },
        getCubesSelected: ({cubes}, cubeSlot, card) => countIds(cubes, card),
        isPlayerSelected: ({players}, player) => containsId(players, player),
        isSelectionFinished: ({cubes, max_cubes, players}, effect) => cubes.length === max_cubes && players.length === cubes.length + effect.extra_players,
        isSelectionConfirmable: (table, {cubes, players}, effect) => players.length === cubes.length + effect.extra_players,
        confirmSelection: ({cubes, players}) => ({cubes, max_cubes: cubes.length, players}),
        buildAutoTarget: (table, selector, effect) => {
            const cubeCount = countSelectableCubes(table, selector);
            const numPlayers = countIf(table.alive_players, target => checkPlayerFilter(table, selector, effect.player_filter, getPlayer(table, target)));
            const max_cubes = Math.min(cubeCount, numPlayers - effect.extra_players);
            return {cubes:[], max_cubes, players:[]};
        },
        generateTarget: ({cubes, players}) => [mapIds(cubes), mapIds(players)],
        parseCardEffect: parsePlayerEffect
    }),
    random_if_hand_card: {
        isCardSelected: isHandSelected,
        appendCardTarget: (target, effect, card) => card,
        isValidCardTarget,
        generateTarget: card => card.id,
        parseCardEffect
    },
    card: {
        isCardSelected: checkId,
        appendCardTarget: (target, effect, card) => card,
        isValidCardTarget,
        generateTarget: card => card.id,
        parseCardEffect
    },
    extra_card: {
        isCardSelected: (target, card) => target?.id === card.id,
        appendCardTarget: (target, effect, card) => card,
        isValidCardTarget,
        buildAutoTarget: (table, selector, effect) => {
            if (getModifierContext(selector, 'repeat_card')) {
                return null;
            }
        },
        generateTarget: card => card ? card.id : null,
        parseCardEffect
    },
    players: {
        isPlayerSelected: containsId,
        buildAutoTarget: (table, selector, effect) => Object.values(table.players).filter(player => 
            checkPlayerFilter(table, selector, effect.player_filter, player) && !isPlayerSkipped(selector, player)
        ),
        generateTarget: () => null,
        parseCardEffect: parsePlayerEffect
    },
    cards: {
        isCardSelected: containsId,
        appendCardTarget: (target, effect, card) => (target ?? []).concat(card),
        isSelectionFinished: (target, effect) => target.length === effect.ncards,
        isValidCardTarget,
        generateTarget: mapIds,
        parseCardEffect
    },
    max_cards: reservedDispatch({
        isCardSelected: ({ cards }, card) => containsId(cards, card),
        appendCardTarget: ({ cards, max_cards }, effect, card) => ({ cards: cards.concat(card), max_cards }),
        isValidCardTarget,
        isSelectionConfirmable: (table, { cards }, effect) => cards.length !== 0,
        isSelectionFinished: ({ cards, max_cards }, effect) => cards.length === max_cards,
        confirmSelection: ({ cards }) => ({ cards, max_cards: cards.length }),
        buildAutoTarget: (table, selector, effect) => {
            let max_cards = getValidCardTargets(table, selector, effect).length;
            if (effect.ncards !== 0 && max_cards > effect.ncards) {
                max_cards = effect.ncards;
            }
            return { cards: [], max_cards };
        },
        generateTarget: ({ cards }) => mapIds(cards),
        parseCardEffect
    }),
    bang_or_cards: {
        isCardSelected: ({ cards }, card) => containsId(cards, card),
        appendCardTarget: (target, effect, card) => ({ cards: (target?.cards ?? []).concat(card), confirmed: false }),
        isSelectionFinished: ({ cards, confirmed }, effect) => confirmed || cards.length === effect.ncards,
        isValidCardTarget,
        isSelectionConfirmable: (table, { cards }) => cards.length === 1 && isBangCard(getPlayer(table, table.self_player!), cards[0]),
        confirmSelection: ({ cards }) => ({ cards, confirmed: true }),
        generateTarget: ({ cards }) => mapIds(cards),
        parseCardEffect
    },
    card_per_player: reservedDispatch({
        isCardSelected: ({ cards }, card) => {
            return cards.some(selected => isHandSelected(selected, card));
        },
        appendCardTarget: ({ cards, max_cards }, effect, card) => ({ cards: cards.concat(card), max_cards }),
        isSelectionFinished: ({ cards, max_cards }, effect) => cards.length === max_cards,
        isValidCardTarget: (table, selector, { cards }, effect, card) => {
            const playerId = getCardOwner(card);
            if (playerId === undefined) return false;
            const player = getPlayer(table, playerId);

            return !isPlayerSkipped(selector, player)
                && checkPlayerFilter(table, selector, effect.player_filter, player)
                && checkCardFilter(table, selector, effect.card_filter, card)
                && !cards.some(selected => getCardOwner(selected) === playerId);
        },
        buildAutoTarget: (table, selector, effect) => {
            const cardIsValid = (card: CardId) => checkCardFilter(table, selector, effect.card_filter, getCard(table, card));
            const max_cards = countIf(table.alive_players, target => {
                const targetPlayer = getPlayer(table, target);
                return !isPlayerSkipped(selector, targetPlayer)
                    && checkPlayerFilter(table, selector, effect.player_filter, targetPlayer)
                    && (getPlayerPocket(targetPlayer, 'player_hand').some(cardIsValid) || getPlayerPocket(targetPlayer, 'player_table').some(cardIsValid));
            });
            return { cards:[], max_cards };
        },
        generateTarget: ({ cards }) => mapIds(cards),
        parseCardEffect
    }),
    missed_and_same_suit: reservedDispatch({
        isCardSelected: ({cards}, card) => containsId(cards, card),
        appendCardTarget: ({cards, possible_targets}, effect, card) => ({
            cards: cards.concat(card),
            possible_targets: possible_targets.filter(c => c.id !== card.id && getCardSign(c).suit === getCardSign(card).suit)
        }),
        isSelectionFinished: ({cards}, effect) => cards.length === effect.ncards,
        isValidCardTarget: (table, selector, {cards, possible_targets}, effect, card) => {
            if (containsId(possible_targets, card)) {
                const filteredCards = cards.length === 0
                    ? possible_targets.filter(c => getCardSign(c).suit === getCardSign(card).suit)
                    : possible_targets;
                if ((cards.length + filteredCards.length) >= effect.ncards) {
                    const origin = getPlayer(table, table.self_player!);
                    const cardIsMissed = (c: Card) => isMissedCard(origin, c);
                    if (cards.some(cardIsMissed)) {
                        return true;
                    } else if (cards.length < effect.ncards - 1) {
                        return filteredCards.some(cardIsMissed);
                    } else {
                        return cardIsMissed(card);
                    }
                }
            }
            return false;
        },
        buildAutoTarget: (table, selector, effect) => ({
            cards: [],
            possible_targets: getValidCardTargets(table, selector, effect)
        }),
        generateTarget: ({ cards }) => mapIds(cards),
        parseCardEffect
    }),
    cube_slot: {
        isCardSelected: checkId,
        appendCardTarget: (target, effect, card) => card,
        isValidCardTarget: (table, selector, target, effect, card) => {
            const playerId = getCardOwner(card);
            if (!playerId) return false;
            
            const player = getPlayer(table, playerId);
            if (!checkPlayerFilter(table, selector, effect.player_filter, player)) return false;

            const pocket = getCardPocket(card);
            return (
                (pocket === 'player_character' && card.id === getPlayerPocket(player, 'player_character')[0])
                || (pocket === 'player_table' && getCardColor(card) === 'orange')
            ) && ( !effect.stealing || (
                (pocket !== 'player_character' || playerId !== table.self_player) 
                && getCubeCount(card) !== 0
            ));
        },
        generateTarget: card => card.id,
        parseCardEffect
    },
    move_cube_slot: reservedDispatch({
        appendCardTarget: ({ cards, max_cubes }, effect, card) => ({ cards: cards.concat(card), max_cubes }),
        isValidCardTarget: (table, selector, { cards }, effect, card) => {
            return getCardOwner(card) === table.self_player
                && getCardPocket(card) === 'player_table'
                && getCardColor(card) === 'orange'
                && getCubeCount(card) < 4 - countIds(cards, card);
        },
        isCardSelected: ({cards}, card) => containsId(cards, card),
        isSelectionConfirmable: (table, { cards }) => cards.length !== 0,
        isSelectionFinished: ({ cards, max_cubes }) => cards.length === max_cubes,
        confirmSelection: ({ cards }) => ({ cards, max_cubes: cards.length }),
        getCubesSelected: ({ cards }, cubeSlot, card) => {
            return card.id === cubeSlot.id ? cards.length : 0;
        },
        buildAutoTarget: (table, selector, effect) => {
            const player = getPlayer(table, table.self_player!);
            let characterCubes = 0;
            let cubeSlots = 0;
            for (const [card, cubes] of getPlayerCubes(table, player)) {
                if (card.pocket?.name === 'player_character') {
                    characterCubes = cubes;
                } else {
                    cubeSlots += 4 - cubes;
                }
            }
            const max_cubes = Math.min(effect.max_cubes, cubeSlots, characterCubes);
            return { cards: [], max_cubes };
        },
        generateTarget: ({ cards }) => mapIds(cards),
        parseCardEffect: parseNoneEffect
    }),
    select_cubes: {
        appendCardTarget: (target, effect, card) => (target ?? []).concat(card),
        isValidCubeTarget,
        getCubesSelected: (cubes, cubeSlot, card) => countIds(cubes, card),
        isSelectionFinished: (cards, effect) => cards.length === effect.ncubes,
        generateTarget: mapIds,
        parseCardEffect: parseNoneEffect
    },
    select_cubes_optional: reservedDispatch({
        appendCardTarget: ({ cubes, max_cubes }, effect, card) => ({ cubes: cubes.concat(card), max_cubes }),
        isValidCubeTarget,
        getCubesSelected: ({ cubes }, cubeSlot, card) => countIds(cubes, card),
        isSelectionConfirmable: (table, {cubes}) => cubes.length === 0,
        isSelectionFinished: ({cubes, max_cubes}) => cubes.length === max_cubes,
        confirmSelection: ({cubes, max_cubes}) => ({cubes, max_cubes: cubes.length}),
        buildAutoTarget: (table, selector, effect) => {
            const max_cubes = countSelectableCubes(table, selector) >= effect.ncubes ? effect.ncubes : 0;
            return { cubes: [], max_cubes };
        },
        generateTarget: ({cubes}) => mapIds(cubes),
        parseCardEffect: parseNoneEffect
    }),
    select_cubes_player: reservedDispatch({
        appendCardTarget: ({ cubes, max_cubes, player }, effect, card) => ({ cubes: cubes.concat(card), max_cubes, player }),
        isValidCubeTarget: (table, selector, { cubes, max_cubes }, effect, card) => cubes.length < max_cubes && isValidCubeTarget(table, selector, null, effect, card),
        getCubesSelected: ({ cubes }, cubeSlot, card) => countIds(cubes, card),
        appendPlayerTarget: ({ cubes, max_cubes }, effect, player) => ({ cubes, max_cubes, player }),
        isValidPlayerTarget: (table, selector, { player }, effect, target) => player === null && checkPlayerFilter(table, selector, effect.player_filter, target),
        isPlayerSelected: ({ player }, target) => player?.id === target.id,
        isSelectionConfirmable: (table, {cubes, player}) => cubes.length === 0 && player !== null,
        isSelectionFinished: ({cubes, max_cubes, player}) => cubes.length === max_cubes && player !== null,
        confirmSelection: ({player}) => ({ cubes: [], max_cubes: 0, player }),
        buildAutoTarget: (table, selector, effect) => {
            const max_cubes = countSelectableCubes(table, selector) >= effect.ncubes ? effect.ncubes : 0;
            return { cubes: [], max_cubes, player: null };
        },
        generateTarget: ({cubes, player}) => [mapIds(cubes), player!.id],
        parseCardEffect: parsePlayerEffect
    }),
    select_cubes_repeat: reservedDispatch({
        appendCardTarget: ({ cubes, max_cubes }, effect, card) => ({ cubes: cubes.concat(card), max_cubes }),
        isValidCubeTarget,
        getCubesSelected: ({ cubes }, cubeSlot, card) => countIds(cubes, card),
        isSelectionConfirmable: (table, { cubes }, effect) => cubes.length % effect.ncubes === 0,
        isSelectionFinished: ({ cubes, max_cubes }) => cubes.length === max_cubes,
        confirmSelection: ({ cubes }) => ({ cubes, max_cubes: cubes.length }),
        buildAutoTarget: (table, selector, effect) => {
            const cubeCount = countSelectableCubes(table, selector);
            const max_cubes = cubeCount - cubeCount % effect.ncubes;
            return { cubes: [], max_cubes };
        },
        generateTarget: ({ cubes }) => mapIds(cubes),
        parseCardEffect: parseNoneEffect
    }),
    self_cubes: {
        getCubesSelected: ({ num_cubes }, cubeSlot, card) => cubeSlot.id === card.id ? num_cubes : 0,
        buildAutoTarget: (table, selector, effect) => ({ num_cubes: effect.ncubes }),
        generateTarget: () => null,
        parseCardEffect: parseNoneEffect
    }
});

export default targetDispatch;