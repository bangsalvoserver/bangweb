import { count, countIf } from "../../../Utils/ArrayUtils";
import { CardEffect } from "./CardData";
import { CardTarget, TargetType } from "./CardTarget";
import { calcPlayerDistance, checkCardFilter, checkPlayerFilter, getCardColor, getCardOwner, isPlayerInGame } from "./Filters";
import { Card, GameTable, getCard, getPlayer, Player } from "./GameTable";
import { CardId, PlayerId } from "./GameUpdate";
import { countSelectableCubes, countSelectedCubes, getModifierContext, isPlayerSelected } from "./TargetSelector";

interface TargetDispatchOf<T> {
    isCardSelected: (target: T, card: CardId) => boolean;
    isValidCardTarget: (table: GameTable, target: T | undefined, effect: CardEffect, card: Card) => boolean;
    appendCardTarget: (target: T | undefined, effect: CardEffect, card: CardId) => T;

    isPlayerSelected: (target: T, player: PlayerId) => boolean;
    isValidPlayerTarget: (table: GameTable, target: T | undefined, effect: CardEffect, player: Player) => boolean;
    appendPlayerTarget: (target: T | undefined, effect: CardEffect, player: PlayerId) => T;

    isValidCubeTarget: (table: GameTable, target: T | undefined, effect: CardEffect, card: Card) => boolean;
    getCubesSelected: (target: T, effect: CardEffect, originCard: Card, targetCard: Card) => number;

    isSelectionFinished: (target: T, effect: CardEffect) => boolean;
    isSelectionConfirmable: (target: T, effect: CardEffect) => boolean;
    confirmSelection: (target: T) => T;

    buildAutoTarget: (table: GameTable, effect: CardEffect) => T | undefined;
}

export type TargetDispatch = TargetDispatchOf<CardTarget>;

type DispatchMap = { [K in CardTarget as keyof K]: Partial<TargetDispatchOf<K[keyof K]>> };

function buildDispatch(dispatchMap: DispatchMap): TargetDispatch {
    const getDispatch = (key: TargetType) => dispatchMap[key] as Partial<TargetDispatchOf<unknown>>;

    const cardTargetKeyValue = (target: CardTarget) => Object.entries(target)[0] as [TargetType, unknown];
    const cardTargetValue = (target: CardTarget | undefined) => target ? Object.values(target)[0] as unknown : undefined;
    const buildCardTarget = (key: TargetType, value: unknown) => ({[key]: value} as CardTarget);

    return {
        isCardSelected: (target, card) => {
            const [key, value] = cardTargetKeyValue(target);
            const fn = getDispatch(key).isCardSelected;
            return fn !== undefined && fn(value, card);
        },
        isValidCardTarget: (table, target, effect, card) => {
            const fn = getDispatch(effect.target).isValidCardTarget;
            return fn !== undefined && fn(table, cardTargetValue(target), effect, card);
        },
        appendCardTarget: (target, effect, card) => {
            const fn = getDispatch(effect.target).appendCardTarget;
            if (!fn) throw new Error('TargetSelector: cannot add card target');
            return buildCardTarget(effect.target, fn(cardTargetValue(target), effect, card));
        },
        isPlayerSelected: (target, player) => {
            const [key, value] = cardTargetKeyValue(target);
            const fn = getDispatch(key).isPlayerSelected;
            return fn !== undefined && fn(value, player);
        },
        isValidPlayerTarget: (table, target, effect, player) => {
            const fn = getDispatch(effect.target).isValidPlayerTarget;
            return fn !== undefined && fn(table, cardTargetValue(target), effect, player);
        },
        appendPlayerTarget: (target, effect, player) => {
            const fn = getDispatch(effect.target).appendPlayerTarget;
            if (!fn) throw new Error('TargetSelector: cannot add player target');
            return buildCardTarget(effect.target, fn(cardTargetValue(target), effect, player));
        },
        isValidCubeTarget: (table, target, effect, card) => {
            const fn = getDispatch(effect.target).isValidCubeTarget;
            return fn !== undefined && fn(table, cardTargetValue(target), effect, card);
        },
        getCubesSelected: (target, effect, originCard, targetCard) => {
            const fn = getDispatch(effect.target).getCubesSelected;
            return fn ? fn(cardTargetValue(target), effect, originCard, targetCard) : 0;
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
        buildAutoTarget: (table, effect) => {
            const fn = getDispatch(effect.target).buildAutoTarget;
            if (!fn) return undefined;
            const targetValue = fn(table, effect);
            return targetValue !== undefined ? buildCardTarget(effect.target, targetValue) : undefined;
        }
    }
}

const buildZeroes = (count: number) => {
    return Array<number>(count).fill(0);
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

const appendReservedMultiTarget = (target: number[] | undefined, effect: CardEffect, value: number) => {
    if (target) {
        const index = target.indexOf(0);
        if (index >= 0) {
            let copy = [...target];
            copy[index] = value;
            return copy;
        }
    }
    throw new Error('TargetSelector: last target is not reserved');
};

const isValidPlayerTarget = <T>(table: GameTable, target: T, effect: CardEffect, player: Player) => {
    return checkPlayerFilter(table, effect.player_filter, player);
};

const isValidCardTarget = <T>(table: GameTable, target: T, effect: CardEffect, card: Card) => {
    const player = getCardOwner(card);
    return (!player || checkPlayerFilter(table, effect.player_filter, getPlayer(table, player)))
        && checkCardFilter(table, effect.card_filter, card);
};

const isValidCubeTarget = <T>(table: GameTable, target: T, effect: CardEffect, card: Card) => {
    return getCardOwner(card) === table.self_player
        && card.num_cubes > countSelectedCubes(table.selector, card);
};

const getCubesSelected = (target: CardId[], effect: CardEffect, originCard: Card, targetCard: Card) => {
    return count(target, targetCard.id);
};

const targetIsEmpty = (target: number[], effect: CardEffect) => target[0] === 0;
const targetIsNotEmpty = (target: number[], effect: CardEffect) => target[0] !== 0;
const targetIsSized = (target: number[], size: number) => target.length === size;

const isSelectionFinished = (target: number[], effect: CardEffect) => target.at(-1) !== 0;
const confirmSelection = (target: number[]) => target.slice(0, target.indexOf(0));
const getReservedLength = (target: number[]) => target.at(-1) === 0 ? target.indexOf(0) : target.length;

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
        buildAutoTarget: (table, effect) => {
            if (table.alive_players.every(target => !checkPlayerFilter(table, effect.player_filter, getPlayer(table, target)))) {
                return null;
            }
        }
    },
    adjacent_players: {
        isPlayerSelected: checkMultiTarget,
        appendPlayerTarget: appendMultiTarget,
        isSelectionFinished: (target, effect) => targetIsSized(target, 2),
        isValidPlayerTarget: (table, target, effect, player) => {
            const checkTargets = (target1: Player, target2: Player) => {
                return target1.id !== target2.id && target2.id !== table.self_player
                    && isPlayerInGame(target2)
                    && calcPlayerDistance(table, target1.id, target2.id) <= effect.target_value;
            };
            if (target) {
                return checkTargets(getPlayer(table, target[0]), player);
            } else {
                return checkPlayerFilter(table, effect.player_filter, player)
                    && table.alive_players.some(target2 => checkTargets(player, getPlayer(table, target2)));
            }
        }
    },
    player_per_cube: {
        appendCardTarget: (target, effect, card) => {
            if (!target) throw new Error('target is not reserved');
            const [cubes, players] = target;
            return [appendReservedMultiTarget(cubes, effect, card), players];
        },
        appendPlayerTarget: (target, effect, player) => {
            if (!target) throw new Error('target is not reserved');
            const [cubes, players] = target;
            return [cubes, appendMultiTarget(players, effect, player)];
        },
        isValidCubeTarget: (table, target, effect, card) => {
            if (!target) throw new Error('target is not reserved');
            return !isSelectionFinished(target[0], effect)
                && isValidCubeTarget(table, target, effect, card);
        },
        isValidPlayerTarget: (table, target, effect, player) => {
            if (!target) throw new Error('target is not reserved');
            const [cubes, players] = target;
            return getReservedLength(cubes) >= players.length && isValidPlayerTarget(table, target, effect, player);
        },
        getCubesSelected: ([cubes, players], effect, originCard, targetCard) => getCubesSelected(cubes, effect, originCard, targetCard),
        isPlayerSelected: ([cubes, players], player) => checkMultiTarget(players, player),
        isSelectionFinished: ([cubes, players], effect) => isSelectionFinished(cubes, effect) && targetIsSized(players, cubes.length + 1),
        isSelectionConfirmable: ([cubes, players], effect) => targetIsSized(players, getReservedLength(cubes) + 1),
        confirmSelection: ([cubes, players]) => [confirmSelection(cubes), players],
        buildAutoTarget: (table, effect) => {
            const cubeCount = countSelectableCubes(table);
            const numPlayers = countIf(table.alive_players, target => checkPlayerFilter(table, effect.player_filter, getPlayer(table, target)));
            const maxCount = Math.min(cubeCount, numPlayers - 1);
            return [buildZeroes(maxCount), []];
        }
    },
    card: {
        isCardSelected: checkSingleTarget,
        appendCardTarget: appendSingleTarget,
        isValidCardTarget
    },
    extra_card: {
        isCardSelected: checkSingleTarget,
        appendCardTarget: appendSingleTarget,
        isValidCardTarget,
        buildAutoTarget: (table, effect) => {
            if (getModifierContext(table.selector, 'repeat_card')) {
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
    max_cards: {
        isCardSelected: checkMultiTarget,
        appendCardTarget: appendReservedMultiTarget,
        isValidCardTarget,
        isSelectionConfirmable: targetIsNotEmpty,
        isSelectionFinished, confirmSelection,
        buildAutoTarget: (table, effect) => {
            const cardTargetable = (card: CardId) => checkCardFilter(table, effect.card_filter, getCard(table, card));
            let countTargetableCards = 0;
            for (const player of table.players) {
                if (checkPlayerFilter(table, effect.player_filter, player)) {
                    countTargetableCards += countIf(player.pockets.player_hand, cardTargetable);
                    countTargetableCards += countIf(player.pockets.player_table, cardTargetable);
                }
            }
            if (effect.target_value !== 0 && countTargetableCards > effect.target_value) {
                countTargetableCards = effect.target_value;   
            }
            return buildZeroes(countTargetableCards);
        }
    },
    card_per_player: {
        isCardSelected: checkMultiTarget,
        appendCardTarget: appendReservedMultiTarget,
        isSelectionFinished,
        isValidCardTarget: (table, target, effect, card) => {
            const player = getCardOwner(card);
            return player !== undefined && !isPlayerSelected(table.selector, player)
                && checkPlayerFilter(table, effect.player_filter, getPlayer(table, player))
                && checkCardFilter(table, effect.card_filter, card)
                && !target?.some(targetCard => targetCard !== 0 && getCardOwner(getCard(table, targetCard)) === player);
        },
        buildAutoTarget: (table, effect) => {
            const cardIsValid = (card: CardId) => checkCardFilter(table, effect.card_filter, getCard(table, card));
            const numTargetable = countIf(table.alive_players, target => {
                const targetPlayer = getPlayer(table, target);
                return !isPlayerSelected(table.selector, target)
                    && checkPlayerFilter(table, effect.player_filter, targetPlayer)
                    && (targetPlayer.pockets.player_hand.some(cardIsValid) || targetPlayer.pockets.player_table.some(cardIsValid));
            });
            return buildZeroes(numTargetable);
        }
    },
    move_cube_slot: {
        appendCardTarget: appendReservedMultiTarget,
        isValidCardTarget: (table, target, effect, card) => {
            return getCardOwner(card) === table.self_player
                && card.pocket?.name === 'player_table'
                && getCardColor(card) === 'orange'
                && card.num_cubes < 4 - count(target ?? [], card.id);
        },
        isCardSelected: checkMultiTarget,
        isSelectionConfirmable: targetIsNotEmpty,
        isSelectionFinished, confirmSelection,
        buildAutoTarget: (table, effect) => {
            const selfPlayer = getPlayer(table, table.self_player!);
            let cubeSlots = 0;
            for (const cardId of selfPlayer.pockets.player_table) {
                const card = getCard(table, cardId);
                if (getCardColor(card) === 'orange') {
                    cubeSlots += 4 - card.num_cubes;
                }
            }
            const firstCharacter = selfPlayer.pockets.player_character[0];
            const characterCubes = getCard(table, firstCharacter).num_cubes;
            return buildZeroes(Math.min(effect.target_value, cubeSlots, characterCubes));
        }
    },
    select_cubes: {
        appendCardTarget: appendMultiTarget,
        isValidCubeTarget, getCubesSelected,
        isSelectionFinished: (target, effect) => targetIsSized(target, effect.target_value),
    },
    select_cubes_optional: {
        appendCardTarget: appendReservedMultiTarget,
        isValidCubeTarget, getCubesSelected,
        isSelectionConfirmable: targetIsEmpty,
        isSelectionFinished, confirmSelection,
        buildAutoTarget: (table, effect) => {
            return buildZeroes(countSelectableCubes(table) >= effect.target_value ? effect.target_value : 0);
        }
    },
    select_cubes_repeat: {
        appendCardTarget: appendReservedMultiTarget,
        isValidCubeTarget, getCubesSelected,
        isSelectionConfirmable: (target, effect) => getReservedLength(target) % (effect.target_value ?? 1) === 0,
        isSelectionFinished, confirmSelection,
        buildAutoTarget: (table, effect) => {
            const cubeCount = countSelectableCubes(table);
            const maxCount = cubeCount - cubeCount % (effect.target_value ?? 1);
            return buildZeroes(maxCount);
        }
    },
    self_cubes: {
        getCubesSelected: (target, effect, originCard, targetCard) => originCard.id === targetCard.id ? effect.target_value : 0,
        buildAutoTarget: () => ({})
    }
});

export default targetDispatch;