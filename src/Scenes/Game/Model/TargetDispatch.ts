import { count, countIf } from "../../../Utils/ArrayUtils";
import { CardEffect } from "./CardData";
import { CardTarget, TargetType } from "./CardTarget";
import { calcPlayerDistance, checkCardFilter, checkPlayerFilter, getCardColor, getCardOwner, getCardPocket, isPlayerInGame } from "./Filters";
import { Card, GameTable, getCard, getCubeCount, getPlayer, Player } from "./GameTable";
import { CardId, PlayerId } from "./GameUpdate";
import { countSelectableCubes, countSelectedCubes, getModifierContext, isPlayerSelected, TargetSelector } from "./TargetSelector";

interface BuildAutoTarget<T> {
    buildAutoTarget: (table: GameTable, selector: TargetSelector, effect: CardEffect) => T;
}

interface TargetDispatchOf<T extends U, U = T | undefined> extends BuildAutoTarget<U> {
    isCardSelected: (target: T, card: CardId) => boolean;
    isValidCardTarget: (table: GameTable, selector: TargetSelector, target: U, effect: CardEffect, card: Card) => boolean;
    appendCardTarget: (target: U, effect: CardEffect, card: CardId) => T;

    isPlayerSelected: (target: T, player: PlayerId) => boolean;
    isValidPlayerTarget: (table: GameTable, selector: TargetSelector, target: U, effect: CardEffect, player: Player) => boolean;
    appendPlayerTarget: (target: U, effect: CardEffect, player: PlayerId) => T;

    isValidCubeTarget: (table: GameTable, selector: TargetSelector, target: U, effect: CardEffect, card: Card) => boolean;
    getCubesSelected: (table: GameTable, target: T, effect: CardEffect, originCard: Card, targetCard: Card) => number;

    isSelectionFinished: (target: T, effect: CardEffect) => boolean;
    isSelectionConfirmable: (target: T, effect: CardEffect) => boolean;
    confirmSelection: (target: T) => T;
}

export type TargetDispatch = TargetDispatchOf<CardTarget>;

type DispatchMap = { [K in CardTarget as keyof K]: Partial<TargetDispatchOf<K[keyof K]>> };

function buildDispatch(dispatchMap: DispatchMap): TargetDispatch {
    const getDispatch = (key: TargetType) => dispatchMap[key] as Partial<TargetDispatchOf<unknown>>;

    const cardTargetKeyValue = (target: CardTarget) => Object.entries(target)[0] as [TargetType, unknown];
    const cardTargetValue = (target: CardTarget | undefined) => target ? Object.values(target)[0] as unknown : undefined;
    const buildCardTarget = (key: TargetType, value: unknown) => ({ [key]: value } as CardTarget);

    return {
        isCardSelected: (target, card) => {
            const [key, value] = cardTargetKeyValue(target);
            const fn = getDispatch(key).isCardSelected;
            return fn !== undefined && fn(value, card);
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
        isPlayerSelected: (target, player) => {
            const [key, value] = cardTargetKeyValue(target);
            const fn = getDispatch(key).isPlayerSelected;
            return fn !== undefined && fn(value, player);
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
            const fn = getDispatch(effect.target).getCubesSelected;
            return fn ? fn(table, cardTargetValue(target), effect, originCard, targetCard) : 0;
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
        }
    }
}

const reservedDispatch = <T>(dispatch: Partial<TargetDispatchOf<T, T>> & BuildAutoTarget<T>) => {
    return dispatch as Partial<TargetDispatchOf<T>>;
};

const PLACEHOLDER = -1;

const reserveTargets = (count: number) => {
    return Array<number>(count).fill(PLACEHOLDER);
};

const checkSingleTarget = <T, U extends T>(target: T, value: U) => {
    return target === value;
};

const checkMultiTarget = <T>(target: T[], value: T) => {
    return target.includes(value);
};

const appendSingleTarget = <T, U extends T>(target: T, effect: CardEffect, value: U) => {
    return value;
};

const appendMultiTarget = (target: number[] | undefined, effect: CardEffect, value: number) => {
    return (target ?? []).concat(value);
};

const appendReservedTarget = (target: number[], effect: CardEffect, value: number) => {
    const index = target.indexOf(PLACEHOLDER);
    if (index < 0) throw new Error('Target is full');
    let copy = target.slice();
    copy[index] = value;
    return copy;
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

const getCubesSelected = (table: GameTable, target: CardId[], effect: CardEffect, originCard: Card, targetCard: Card) => {
    return count(target, targetCard.id);
};

const targetIsEmpty = (target: number[], effect?: CardEffect) => target[0] === PLACEHOLDER;
const targetIsNotEmpty = (target: number[], effect?: CardEffect) => target[0] !== PLACEHOLDER;
const targetIsSized = (target: number[], size: number) => target.length === size;

const isSelectionFinished = (target: number[], effect?: CardEffect) => target.length === 0 || target[target.length - 1] !== PLACEHOLDER;
const confirmSelection = (target: number[]) => isSelectionFinished(target) ? target : target.slice(0, target.indexOf(PLACEHOLDER));
const getReservedLength = (target: number[]) => isSelectionFinished(target) ? target.length : target.indexOf(PLACEHOLDER);

const targetDispatch = buildDispatch({
    none: {
        buildAutoTarget: () => ({})
    },
    player: {
        isPlayerSelected: checkSingleTarget,
        appendPlayerTarget: appendSingleTarget,
        isValidPlayerTarget
    },
    conditional_player: {
        isPlayerSelected: checkSingleTarget,
        appendPlayerTarget: appendSingleTarget,
        isValidPlayerTarget,
        buildAutoTarget: (table, selector, effect) => {
            if (table.alive_players.every(target => !checkPlayerFilter(table, selector, effect.player_filter, getPlayer(table, target)))) {
                return null;
            }
        }
    },
    adjacent_players: {
        isPlayerSelected: checkMultiTarget,
        appendPlayerTarget: appendMultiTarget,
        isSelectionFinished: (target) => targetIsSized(target, 2),
        isValidPlayerTarget: (table, selector, target, effect, player) => {
            const checkTargets = (target1: Player, target2: Player) => {
                return target1.id !== target2.id && target2.id !== table.self_player
                    && isPlayerInGame(target2)
                    && calcPlayerDistance(table, selector, target1.id, target2.id) <= effect.target_value;
            };
            if (target) {
                return checkTargets(getPlayer(table, target[0]), player);
            } else {
                return checkPlayerFilter(table, selector, effect.player_filter, player)
                    && table.alive_players.some(target2 => checkTargets(player, getPlayer(table, target2)));
            }
        }
    },
    player_per_cube: reservedDispatch({
        appendCardTarget: ([cubes, players], effect, card) => [appendReservedTarget(cubes, effect, card), players],
        appendPlayerTarget: ([cubes, players], effect, player) => [cubes, appendMultiTarget(players, effect, player)],
        isValidCubeTarget: (table, selector, [cubes, players], effect, card) => {
            return !isSelectionFinished(cubes) && isValidCubeTarget(table, selector, cubes, effect, card);
        },
        isValidPlayerTarget: (table, selector, [cubes, players], effect, player) => {
            return getReservedLength(cubes) + effect.target_value > players.length
                && isValidPlayerTarget(table, selector, players, effect, player);
        },
        getCubesSelected: (table, [cubes, players], effect, originCard, targetCard) => getCubesSelected(table, cubes, effect, originCard, targetCard),
        isPlayerSelected: ([cubes, players], player) => checkMultiTarget(players, player),
        isSelectionFinished: ([cubes, players], effect) => isSelectionFinished(cubes) && targetIsSized(players, cubes.length + effect.target_value),
        isSelectionConfirmable: ([cubes, players], effect) => targetIsSized(players, getReservedLength(cubes) + effect.target_value),
        confirmSelection: ([cubes, players]) => [confirmSelection(cubes), players],
        buildAutoTarget: (table, selector, effect) => {
            const cubeCount = countSelectableCubes(table, selector);
            const numPlayers = countIf(table.alive_players, target => checkPlayerFilter(table, selector, effect.player_filter, getPlayer(table, target)));
            const maxCount = Math.min(cubeCount, numPlayers - effect.target_value);
            return [reserveTargets(maxCount), []];
        }
    }),
    card: {
        isCardSelected: checkSingleTarget,
        appendCardTarget: appendSingleTarget,
        isValidCardTarget
    },
    extra_card: {
        isCardSelected: checkSingleTarget,
        appendCardTarget: appendSingleTarget,
        isValidCardTarget,
        buildAutoTarget: (table, selector, effect) => {
            if (getModifierContext(selector, 'repeat_card')) {
                return null;
            }
        }
    },
    players: {
        buildAutoTarget: () => ({})
    },
    cards: {
        isCardSelected: checkMultiTarget,
        appendCardTarget: appendMultiTarget,
        isSelectionFinished: (target, effect) => targetIsSized(target, effect.target_value),
        isValidCardTarget,
    },
    max_cards: reservedDispatch({
        isCardSelected: checkMultiTarget,
        appendCardTarget: appendReservedTarget,
        isValidCardTarget,
        isSelectionConfirmable: targetIsNotEmpty,
        isSelectionFinished, confirmSelection,
        buildAutoTarget: (table, selector, effect) => {
            const cardTargetable = (card: CardId) => checkCardFilter(table, selector, effect.card_filter, getCard(table, card));
            let countTargetableCards = 0;
            for (const player of table.players) {
                if (checkPlayerFilter(table, selector, effect.player_filter, player)) {
                    countTargetableCards += countIf(player.pockets.player_hand, cardTargetable);
                    countTargetableCards += countIf(player.pockets.player_table, cardTargetable);
                }
            }
            if (effect.target_value !== 0 && countTargetableCards > effect.target_value) {
                countTargetableCards = effect.target_value;
            }
            return reserveTargets(countTargetableCards);
        }
    }),
    card_per_player: reservedDispatch({
        isCardSelected: checkMultiTarget,
        appendCardTarget: appendReservedTarget,
        isSelectionFinished,
        isValidCardTarget: (table, selector, target, effect, card) => {
            const player = getCardOwner(card);
            return player !== undefined && !isPlayerSelected(selector, player)
                && checkPlayerFilter(table, selector, effect.player_filter, getPlayer(table, player))
                && checkCardFilter(table, selector, effect.card_filter, card)
                && !target.some(targetCard => targetCard !== PLACEHOLDER && getCardOwner(getCard(table, targetCard)) === player);
        },
        buildAutoTarget: (table, selector, effect) => {
            const cardIsValid = (card: CardId) => checkCardFilter(table, selector, effect.card_filter, getCard(table, card));
            const numTargetable = countIf(table.alive_players, target => {
                const targetPlayer = getPlayer(table, target);
                return !isPlayerSelected(selector, target)
                    && checkPlayerFilter(table, selector, effect.player_filter, targetPlayer)
                    && (targetPlayer.pockets.player_hand.some(cardIsValid) || targetPlayer.pockets.player_table.some(cardIsValid));
            });
            return reserveTargets(numTargetable);
        }
    }),
    move_cube_slot: reservedDispatch({
        appendCardTarget: appendReservedTarget,
        isValidCardTarget: (table, selector, target, effect, card) => {
            return getCardOwner(card) === table.self_player
                && getCardPocket(card) === 'player_table'
                && getCardColor(card) === 'orange'
                && getCubeCount(card.tokens) < 4 - count(target, card.id);
        },
        isCardSelected: checkMultiTarget,
        isSelectionConfirmable: targetIsNotEmpty,
        isSelectionFinished, confirmSelection,
        getCubesSelected: (table, target, effect, originCard, targetCard) => {
            const selfPlayer = getPlayer(table, table.self_player!);
            const firstCharacter = selfPlayer.pockets.player_character[0];
            return targetCard.id === firstCharacter ? getReservedLength(target) : 0;
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
            return reserveTargets(Math.min(effect.target_value, cubeSlots, characterCubes));
        }
    }),
    select_cubes: {
        appendCardTarget: appendMultiTarget,
        isValidCubeTarget, getCubesSelected,
        isSelectionFinished: (target, effect) => targetIsSized(target, effect.target_value),
    },
    select_cubes_optional: reservedDispatch({
        appendCardTarget: appendReservedTarget,
        isValidCubeTarget, getCubesSelected,
        isSelectionConfirmable: targetIsEmpty,
        isSelectionFinished, confirmSelection,
        buildAutoTarget: (table, selector, effect) => {
            return reserveTargets(countSelectableCubes(table, selector) >= effect.target_value ? effect.target_value : 0);
        }
    }),
    select_cubes_repeat: reservedDispatch({
        appendCardTarget: appendReservedTarget,
        isValidCubeTarget, getCubesSelected,
        isSelectionConfirmable: (target, effect) => getReservedLength(target) % (effect.target_value || 1) === 0,
        isSelectionFinished, confirmSelection,
        buildAutoTarget: (table, selector, effect) => {
            const cubeCount = countSelectableCubes(table, selector);
            const maxCount = cubeCount - cubeCount % (effect.target_value || 1);
            return reserveTargets(maxCount);
        }
    }),
    self_cubes: {
        getCubesSelected: (table, target, effect, originCard, targetCard) => originCard.id === targetCard.id ? effect.target_value : 0,
        buildAutoTarget: () => ({})
    }
});

export default targetDispatch;