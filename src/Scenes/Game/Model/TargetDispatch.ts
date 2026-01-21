import { countIf, parseContainer } from "../../../Utils/ArrayUtils";
import { CardSuit } from "./CardEnums";
import { CardEffect, CardEffectArgs, CardEffectOf, CardTarget, CardTargetArgs, CardTargetArgsArray, CardTargetGenerated, CardTargetTypes, PlayerTargetArgs, PlayerTargetArgsArray, TargetType } from "./CardTarget";
import { calcPlayerDistance, checkCardFilter, checkPlayerFilter, getCardColor, getCardOwner, getCardPocket, getCardSign, isBangCard, isMissedCard, isPlayerInGame } from "./Filters";
import { Card, GameTable, getCard, getCubeCount, getPlayer, getPlayerCubes, getPlayerPocket, Player } from "./GameTable";
import { CardId } from "./GameUpdate";
import { countSelectableCubes, countSelectedCubes, getModifierContext, isPlayerSkipped, TargetSelector } from "./TargetSelector";

interface BuildAutoTarget<
    TargetValueType = CardTarget | undefined,
    CardEffectType = CardEffect
> {
    buildAutoTarget: (table: GameTable, selector: TargetSelector, effect: CardEffectType) => TargetValueType;
}

interface TargetDispatchOf<
    TargetValueType = CardTarget,
    CardEffectType = CardEffect,
    OptionalTarget = TargetValueType | undefined
>
    extends BuildAutoTarget<OptionalTarget, CardEffectType>
{
    isCardSelected: (target: TargetValueType, card: Card) => boolean;
    isValidCardTarget: (table: GameTable, selector: TargetSelector, target: OptionalTarget, effect: CardEffectType, card: Card) => boolean;
    appendCardTarget: (table: GameTable, selector: TargetSelector, target: OptionalTarget, effect: CardEffectType, card: Card) => TargetValueType;

    isPlayerSelected: (target: TargetValueType, player: Player) => boolean;
    isValidPlayerTarget: (table: GameTable, selector: TargetSelector, target: OptionalTarget, effect: CardEffectType, player: Player) => boolean;
    appendPlayerTarget: (table: GameTable, selector: TargetSelector, target: OptionalTarget, effect: CardEffectType, player: Player) => TargetValueType;

    isValidCubeTarget: (table: GameTable, selector: TargetSelector, target: OptionalTarget, effect: CardEffectType, card: Card) => boolean;
    getCubesSelected: (target: TargetValueType, cubeSlot: Card, card: Card) => number;

    isSelectionFinished: (table: GameTable, selector: TargetSelector, target: TargetValueType, effect: CardEffectType) => boolean;
    isSelectionConfirmable: (table: GameTable, selector: TargetSelector, target: TargetValueType, effect: CardEffectType) => boolean;
    confirmSelection: (target: TargetValueType) => TargetValueType;
}

interface GenerateTarget<From = CardTarget, To = CardTargetGenerated> {
    generateTarget: (target: From) => To;
}

interface ParseCardEffect<From = CardEffectArgs, To = CardEffect> {
    parseCardEffect: (effect: From) => To;
}

export type TargetDispatch = TargetDispatchOf & GenerateTarget & ParseCardEffect;

type PartialDispatch<
    TargetValueType = CardTarget,
    GeneratedType = CardTargetGenerated,
    CardEffectArgsType = CardEffectArgs,
    CardEffectType = CardEffect,
    OptionalTarget = TargetValueType | undefined
>   = Partial<TargetDispatchOf<TargetValueType, CardEffectType, OptionalTarget>>
    & GenerateTarget<TargetValueType, GeneratedType>
    & ParseCardEffect<CardEffectArgsType, CardEffectType>;

type DispatchMap = {
    [K in TargetType]: CardTargetTypes[K] extends {value: infer TargetValueType, target: infer GeneratedType}
        ? PartialDispatch<TargetValueType, GeneratedType, CardEffectOf<K, 'array'>, CardEffectOf<K, 'set'>>
        : never
};

function buildDispatch(dispatchMap: DispatchMap): TargetDispatch {
    const getDispatch = (type: TargetType) => dispatchMap[type] as PartialDispatch<unknown>;
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
        appendCardTarget: (table, selector, target, effect, card) => {
            const fn = getDispatch(effect.target).appendCardTarget;
            if (!fn) throw new Error('Cannot add card target');
            return buildCardTarget(effect.target, fn(table, selector, target?.value, effect, card));
        },
        isPlayerSelected: (target, player) => {
            const fn = getDispatch(target.type).isPlayerSelected;
            return fn !== undefined && fn(target.value, player);
        },
        isValidPlayerTarget: (table, selector, target, effect, player) => {
            const fn = getDispatch(effect.target).isValidPlayerTarget;
            return fn !== undefined && fn(table, selector, target?.value, effect, player);
        },
        appendPlayerTarget: (table, selector, target, effect, player) => {
            const fn = getDispatch(effect.target).appendPlayerTarget;
            if (!fn) throw new Error('Cannot add player target');
            return buildCardTarget(effect.target, fn(table, selector, target?.value, effect, player));
        },
        isValidCubeTarget: (table, selector, target, effect, card) => {
            const fn = getDispatch(effect.target).isValidCubeTarget;
            return fn !== undefined && fn(table, selector, target?.value, effect, card);
        },
        getCubesSelected: (target, cubeSlot, card) => {
            const fn = getDispatch(target.type).getCubesSelected;
            return fn ? fn(target.value, cubeSlot, card) : 0;
        },
        isSelectionFinished: (table, selector, target, effect) => {
            const fn = getDispatch(target.type).isSelectionFinished;
            return fn === undefined || fn(table, selector, target.value, effect);
        },
        isSelectionConfirmable: (table, selector, target, effect) => {
            const fn = getDispatch(effect.target).isSelectionConfirmable;
            return fn !== undefined && fn(table, selector, target.value, effect);
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
            return getDispatch(target.type).generateTarget(target.value);
        },
        parseCardEffect: effect => {
            return getDispatch(effect.target).parseCardEffect(effect);
        },
    }
}

const reservedDispatch = <TargetValueType, GeneratedType, CardEffectArgsType, CardEffectType>
    (dispatch: PartialDispatch<TargetValueType, GeneratedType, CardEffectArgsType, CardEffectType, TargetValueType> & BuildAutoTarget<TargetValueType, CardEffectType>) =>
        dispatch as PartialDispatch<TargetValueType, GeneratedType, CardEffectArgsType, CardEffectType>;

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

const checkAdjacentPlayers = (table: GameTable, selector: TargetSelector, target1: Player, target2: Player, max_distance: number) => {
    return target1.id !== target2.id && target2.id !== table.self_player
        && isPlayerInGame(target2)
        && calcPlayerDistance(table, selector, target1.id, target2.id) <= max_distance;
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
    player_filter: parseContainer(effect.player_filter)
});

const parseCardEffect = <T extends CardTargetArgsArray>(effect: T) => ({
    ...effect,
    player_filter: parseContainer(effect.player_filter),
    card_filter: parseContainer(effect.card_filter)
});

const targetDispatch = buildDispatch({
    none: {
        buildAutoTarget: () => null,
        generateTarget: () => null,
        parseCardEffect: parseNoneEffect
    },
    player: {
        isPlayerSelected: checkId,
        appendPlayerTarget: (table, selector, target, effect, player) => player,
        isValidPlayerTarget,
        generateTarget: target => target.id,
        parseCardEffect: parsePlayerEffect
    },
    conditional_player: {
        isPlayerSelected: (target, player) => target?.id === player.id,
        appendPlayerTarget: (table, selector, target, effect, player) => player,
        isValidPlayerTarget,
        buildAutoTarget: (table, selector, effect) => {
            if (table.alive_players.every(target => !checkPlayerFilter(table, selector, effect.player_filter, getPlayer(table, target)))) {
                return null;
            }
        },
        generateTarget: target => target ? target.id : null,
        parseCardEffect: parsePlayerEffect
    },
    adjacent_players: reservedDispatch({
        isPlayerSelected: ({ players }, player) => containsId(players, player),
        appendPlayerTarget: (table, selector, { players }, effect, player) => {
            const finished = players.length === 1 || !table.alive_players.some(target2 =>
                checkAdjacentPlayers(table, selector, player, getPlayer(table, target2), effect.max_distance)
            );
            return { players: players.concat(player), finished };
        },
        isSelectionFinished: (table, selector, { finished }, effect) => finished,
        isValidPlayerTarget: (table, selector, { players }, effect, player) => {
            if (players.length === 1) {
                return checkAdjacentPlayers(table, selector, players[0], player, effect.max_distance);
            } else {
                return checkPlayerFilter(table, selector, effect.player_filter, player);
            }
        },
        buildAutoTarget: (table, selector, effect) => ({ players: [], finished: false }),
        generateTarget: ({ players }) => mapIds(players),
        parseCardEffect: parsePlayerEffect
    }),
    player_per_cube: reservedDispatch({
        appendCardTarget: (table, selector, {cubes, max_cubes, players}, effect, card) => ({ cubes: cubes.concat(card), max_cubes, players }),
        appendPlayerTarget: (table, selector, {cubes, max_cubes, players}, effect, player) => ({ cubes, max_cubes, players: players.concat(player) }),
        isValidCubeTarget: (table, selector, {cubes, max_cubes }, effect, card) => {
            return cubes.length !== max_cubes && isValidCubeTarget(table, selector, cubes, effect, card);
        },
        isValidPlayerTarget: (table, selector, {cubes, players}, effect, player) => {
            return cubes.length + effect.extra_players > players.length
                && isValidPlayerTarget(table, selector, players, effect, player);
        },
        getCubesSelected: ({cubes}, cubeSlot, card) => countIds(cubes, card),
        isPlayerSelected: ({players}, player) => containsId(players, player),
        isSelectionFinished: (table, selector, {cubes, max_cubes, players}, effect) => cubes.length === max_cubes && players.length === cubes.length + effect.extra_players,
        isSelectionConfirmable: (table, selector, {cubes, players}, effect) => players.length === cubes.length + effect.extra_players,
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
        appendCardTarget: (table, selector, target, effect, card) => card,
        isValidCardTarget,
        generateTarget: card => card.id,
        parseCardEffect
    },
    card: {
        isCardSelected: checkId,
        appendCardTarget: (table, selector, target, effect, card) => card,
        isValidCardTarget,
        generateTarget: card => card.id,
        parseCardEffect
    },
    extra_card: {
        isCardSelected: (target, card) => target?.id === card.id,
        appendCardTarget: (table, selector, target, effect, card) => card,
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
        appendCardTarget: (table, selector, target, effect, card) => (target ?? []).concat(card),
        isSelectionFinished: (table, selector, target, effect) => target.length === effect.ncards,
        isValidCardTarget,
        generateTarget: mapIds,
        parseCardEffect
    },
    max_cards: reservedDispatch({
        isCardSelected: ({ cards }, card) => containsId(cards, card),
        appendCardTarget: (table, selector, { cards, max_cards }, effect, card) => ({ cards: cards.concat(card), max_cards }),
        isValidCardTarget,
        isSelectionConfirmable: (table, selector, { cards }, effect) => cards.length !== 0,
        isSelectionFinished: (table, selector, { cards, max_cards }, effect) => cards.length === max_cards,
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
        appendCardTarget: (table, selector, target, effect, card) => ({ cards: (target?.cards ?? []).concat(card), confirmed: false }),
        isSelectionFinished: (table, selector, { cards, confirmed }, effect) => confirmed || cards.length === effect.ncards,
        isValidCardTarget,
        isSelectionConfirmable: (table, selector, { cards }) => cards.length === 1 && isBangCard(getPlayer(table, table.self_player!), cards[0]),
        confirmSelection: ({ cards }) => ({ cards, confirmed: true }),
        generateTarget: ({ cards }) => mapIds(cards),
        parseCardEffect
    },
    card_per_player: reservedDispatch({
        isCardSelected: ({ cards }, card) => {
            return cards.some(selected => isHandSelected(selected, card));
        },
        appendCardTarget: (table, selector, { cards, max_cards }, effect, card) => ({ cards: cards.concat(card), max_cards }),
        isSelectionFinished: (table, selector, { cards, max_cards }, effect) => cards.length === max_cards,
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
        appendCardTarget: (table, selector, {cards, targets_by_suit}, effect, card) => {
            const suit = getCardSign(card).suit;
            const targets = (targets_by_suit[suit] ?? []).filter(c => c.id !== card.id);
            return {
                cards: cards.concat(card),
                targets_by_suit: { [suit]: targets }
            };
        },
        isSelectionFinished: (table, selector, {cards}, effect) => cards.length === effect.ncards,
        isValidCardTarget: (table, selector, {cards, targets_by_suit}, effect, card) => {
            const suit = getCardSign(card).suit;
            const targets = (targets_by_suit[suit] ?? []);
            if (containsId(targets, card) && (cards.length + targets.length) >= effect.ncards) {
                const origin = getPlayer(table, table.self_player!);
                const cardIsMissed = (c: Card) => isMissedCard(origin, c);
                if (cards.some(cardIsMissed)) {
                    return true;
                } else if (cards.length < effect.ncards - 1) {
                    return targets.some(cardIsMissed);
                } else {
                    return cardIsMissed(card);
                }
            }
            return false;
        },
        buildAutoTarget: (table, selector, effect) => {
            let targets_by_suit: Partial<Record<CardSuit, Card[]>> = {};
            for (const card of getValidCardTargets(table, selector, effect)) {
                const suit = getCardSign(card).suit;
                (targets_by_suit[suit] ??= []).push(card);
            }
            return { cards: [], targets_by_suit };
        },
        generateTarget: ({ cards }) => mapIds(cards),
        parseCardEffect
    }),
    cube_slot: {
        isCardSelected: checkId,
        appendCardTarget: (table, selector, target, effect, card) => card,
        isValidCardTarget: (table, selector, target, effect, card) => {
            const playerId = getCardOwner(card);
            if (!playerId) return false;
            
            const player = getPlayer(table, playerId);
            if (!checkPlayerFilter(table, selector, effect.player_filter, player)) return false;

            const pocket = getCardPocket(card);

            if (!(pocket === 'player_character' && card.id === getPlayerPocket(player, 'player_character')[0])
                && !(pocket === 'player_table' && getCardColor(card) === 'orange')
            ) return false;

            if (effect.stealing) {
                return !(pocket === 'player_character' && playerId === table.self_player)
                    && getCubeCount(card) !== 0;
            }

            return true;
        },
        generateTarget: card => card.id,
        parseCardEffect: parsePlayerEffect
    },
    move_cube_slot: reservedDispatch({
        appendCardTarget: (table, selector, { cards, max_cubes }, effect, card) => ({ cards: cards.concat(card), max_cubes }),
        isValidCardTarget: (table, selector, { cards }, effect, card) => {
            return getCardOwner(card) === table.self_player
                && getCardPocket(card) === 'player_table'
                && getCardColor(card) === 'orange'
                && getCubeCount(card) < 4 - countIds(cards, card);
        },
        isCardSelected: ({cards}, card) => containsId(cards, card),
        isSelectionConfirmable: (table, selector, { cards }) => cards.length !== 0,
        isSelectionFinished: (table, selector, { cards, max_cubes }) => cards.length === max_cubes,
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
        appendCardTarget: (table, selector, target, effect, card) => (target ?? []).concat(card),
        isValidCubeTarget,
        getCubesSelected: (cubes, cubeSlot, card) => countIds(cubes, card),
        isSelectionFinished: (table, selector, cards, effect) => cards.length === effect.ncubes,
        generateTarget: mapIds,
        parseCardEffect: parseNoneEffect
    },
    select_cubes_optional: reservedDispatch({
        appendCardTarget: (table, selector, { cubes, max_cubes }, effect, card) => ({ cubes: cubes.concat(card), max_cubes }),
        isValidCubeTarget,
        getCubesSelected: ({ cubes }, cubeSlot, card) => countIds(cubes, card),
        isSelectionConfirmable: (table, selector, {cubes}) => cubes.length === 0,
        isSelectionFinished: (table, selector, {cubes, max_cubes}) => cubes.length === max_cubes,
        confirmSelection: ({cubes, max_cubes}) => ({cubes, max_cubes: cubes.length}),
        buildAutoTarget: (table, selector, effect) => {
            const max_cubes = countSelectableCubes(table, selector) >= effect.ncubes ? effect.ncubes : 0;
            return { cubes: [], max_cubes };
        },
        generateTarget: ({cubes}) => mapIds(cubes),
        parseCardEffect: parseNoneEffect
    }),
    select_cubes_player: reservedDispatch({
        appendCardTarget: (table, selector, { cubes, max_cubes, player }, effect, card) => ({ cubes: cubes.concat(card), max_cubes, player }),
        isValidCubeTarget: (table, selector, { cubes, max_cubes }, effect, card) => cubes.length < max_cubes && isValidCubeTarget(table, selector, null, effect, card),
        getCubesSelected: ({ cubes }, cubeSlot, card) => countIds(cubes, card),
        appendPlayerTarget: (table, selector, { cubes, max_cubes }, effect, player) => ({ cubes, max_cubes, player }),
        isValidPlayerTarget: (table, selector, { player }, effect, target) => player === null && checkPlayerFilter(table, selector, effect.player_filter, target),
        isPlayerSelected: ({ player }, target) => player?.id === target.id,
        isSelectionConfirmable: (table, selector, {cubes, player}) => cubes.length === 0 && player !== null,
        isSelectionFinished: (table, selector, {cubes, max_cubes, player}) => cubes.length === max_cubes && player !== null,
        confirmSelection: ({player}) => ({ cubes: [], max_cubes: 0, player }),
        buildAutoTarget: (table, selector, effect) => {
            const max_cubes = countSelectableCubes(table, selector) >= effect.ncubes ? effect.ncubes : 0;
            return { cubes: [], max_cubes, player: null };
        },
        generateTarget: ({cubes, player}) => [mapIds(cubes), player!.id],
        parseCardEffect: parsePlayerEffect
    }),
    select_cubes_repeat: reservedDispatch({
        appendCardTarget: (table, selector, { cubes, max_cubes }, effect, card) => ({ cubes: cubes.concat(card), max_cubes }),
        isValidCubeTarget,
        getCubesSelected: ({ cubes }, cubeSlot, card) => countIds(cubes, card),
        isSelectionConfirmable: (table, selector, { cubes }, effect) => cubes.length % effect.ncubes === 0,
        isSelectionFinished: (table, selector, { cubes, max_cubes }) => cubes.length === max_cubes,
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