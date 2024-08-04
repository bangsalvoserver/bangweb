import { count, countIf } from "../../../Utils/ArrayUtils";
import { CardEffect } from "./CardData";
import { CardTarget, TargetType } from "./CardEnums";
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

    isSelectionFinished: (target: T) => boolean;
    isSelectionConfirmable: (target: T, effect: CardEffect) => boolean;
    confirmSelection: (target: T) => T;

    buildAutoTarget: (table: GameTable, effect: CardEffect) => T | undefined;
}

export type TargetDispatch = TargetDispatchOf<CardTarget>;

type DispatchMap = { [K in CardTarget as keyof K]: Partial<TargetDispatchOf<K[keyof K]>> };

function buildDispatch(dispatchMap: DispatchMap): TargetDispatch {
    const getDispatch = (key: TargetType) => dispatchMap[key] as Partial<TargetDispatchOf<unknown>>;
    return {
        isCardSelected: (target: CardTarget, card: CardId) => {
            const [key, value] = Object.entries(target)[0];
            const fn = getDispatch(key as TargetType).isCardSelected;
            if (!fn) return false;
            return fn(value, card);
        },
        isValidCardTarget: (table: GameTable, target: CardTarget | undefined, effect: CardEffect, card: Card) => {
            const fn = getDispatch(effect.target).isValidCardTarget;
            if (!fn) return false;
            const targetValue = target ? Object.values(target)[0] : undefined;
            return fn(table, targetValue, effect, card);
        },
        appendCardTarget: (target: CardTarget | undefined, effect: CardEffect, card: CardId) => {
            const fn = getDispatch(effect.target).appendCardTarget;
            if (!fn) throw new Error('TargetSelector: cannot add card target');
            const targetValue = target ? Object.values(target)[0] : undefined;
            return {[effect.target]: fn(targetValue, effect, card)} as CardTarget;
        },
        isPlayerSelected: (target: CardTarget, player: PlayerId) => {
            const [key, value] = Object.entries(target)[0];
            const fn = getDispatch(key as TargetType).isPlayerSelected;
            if (!fn) return false;
            return fn(value, player);
        },
        isValidPlayerTarget: (table: GameTable, target: CardTarget | undefined, effect: CardEffect, player: Player) => {
            const fn = getDispatch(effect.target).isValidPlayerTarget;
            if (!fn) return false;
            const targetValue = target ? Object.values(target)[0] : undefined;
            return fn(table, targetValue, effect, player);
        },
        appendPlayerTarget: (target: CardTarget | undefined, effect: CardEffect, player: PlayerId) => {
            const fn = getDispatch(effect.target).appendPlayerTarget;
            if (!fn) throw new Error('TargetSelector: cannot add player target');
            const targetValue = target ? Object.values(target)[0] : undefined;
            return {[effect.target]: fn(targetValue, effect, player)} as CardTarget;
        },
        isValidCubeTarget: (table: GameTable, target: CardTarget | undefined, effect: CardEffect, card: Card) => {
            const fn = getDispatch(effect.target).isValidCubeTarget;
            if (!fn) return false;
            const targetValue = target ? Object.values(target)[0] : undefined;
            return fn(table, targetValue, effect, card);
        },
        getCubesSelected: (target: CardTarget, effect: CardEffect, originCard: Card, targetCard: Card) => {
            const fn = getDispatch(effect.target).getCubesSelected;
            if (!fn) return 0;
            const targetValue = target ? Object.values(target)[0] : undefined;
            return fn(targetValue, effect, originCard, targetCard);
        },
        isSelectionFinished: (target: CardTarget) => {
            const [key, value] = Object.entries(target)[0];
            const fn = getDispatch(key as TargetType).isSelectionFinished;
            if (!fn) return true;
            return fn(value);
        },
        isSelectionConfirmable: (target: CardTarget, effect: CardEffect) => {
            const fn = getDispatch(effect.target).isSelectionConfirmable;
            if (!fn) return false;
            return fn(Object.values(target)[0], effect);
        },
        confirmSelection: (target: CardTarget) => {
            const [key, value] = Object.entries(target)[0];
            const fn = getDispatch(key as TargetType).confirmSelection;
            if (!fn) throw new Error('Cannot confirm selection');
            return {[key]: fn(value)} as CardTarget;
        },
        buildAutoTarget: (table: GameTable, effect: CardEffect) => {
            const fn = getDispatch(effect.target).buildAutoTarget;
            if (fn) {
                const targetValue = fn(table, effect);
                if (targetValue !== undefined) {
                    return {[effect.target] : targetValue} as CardTarget;
                }
            }
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
}

const appendMultiTarget = (target: number[] | undefined, effect: CardEffect, value: number) => {
    if (!target) throw new Error('TargetSelector: last target is not reserved');
    let copy = [...target];
    copy[target.indexOf(0)] = value;
    return copy;
}

const isValidPlayerTarget = <T>(table: GameTable, target: T, effect: CardEffect, player: Player) => {
    return checkPlayerFilter(table, effect.player_filter, player);
}

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
}

const targetIsEmpty = (target: number[], effect: CardEffect) => target[0] === 0;
const targetIsNotEmpty = (target: number[], effect: CardEffect) => target[0] !== 0;

const isSelectionFinished = (target: number[]) => target.at(-1) !== 0;
const confirmSelection = (target: number[]) => target.slice(0, target.indexOf(0));

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
        appendPlayerTarget: (target, effect, player) => (target ?? []).concat(player),
        isSelectionFinished: (target) => target.length === 2,
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
            let [cubes, players] = target;
            cubes = appendMultiTarget(cubes, effect, card);
            if (isSelectionFinished(cubes)) {
                players = buildZeroes(cubes.length + 1);
            }
            return [cubes, players];
        },
        appendPlayerTarget: (target, effect, player) => {
            if (!target) throw new Error('target is not reserved');
            let [cubes, players] = target;
            players = appendMultiTarget(players, effect, player);
            return [cubes, players];
        },
        isValidCubeTarget: (table, target, effect, card) => {
            return !(target !== undefined && isSelectionFinished(target[0]))
                && isValidCubeTarget(table, target, effect, card);
        },
        isValidPlayerTarget: (table, target, effect, player) => {
            return target !== undefined && isSelectionFinished(target[0])
                && isValidPlayerTarget(table, target, effect, player);
        },
        getCubesSelected: ([cubes, players], effect, originCard, targetCard) => getCubesSelected(cubes, effect, originCard, targetCard),
        isPlayerSelected: ([cubes, players], player) => checkMultiTarget(players, player),
        isSelectionConfirmable: (target, effect) => !isSelectionFinished(target[0]),
        isSelectionFinished: ([cubes, players]) => isSelectionFinished(cubes) && isSelectionFinished(players),
        confirmSelection: ([cubes, players]) => {
            cubes = confirmSelection(cubes);
            players = buildZeroes(cubes.length + 1);
            return [cubes, players];
        },
        buildAutoTarget: (table, effect) => {
            const cubeCount = countSelectableCubes(table);
            const numPlayers = countIf(table.alive_players, target => checkPlayerFilter(table, effect.player_filter, getPlayer(table, target)));
            const maxCount = Math.min(cubeCount, numPlayers - 1);
            return [buildZeroes(maxCount), [0]];
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
        isSelectionFinished, isValidCardTarget,
        buildAutoTarget: (table, effect) => buildZeroes(effect.target_value)
    },
    max_cards: {
        isCardSelected: checkMultiTarget,
        appendCardTarget: appendMultiTarget,
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
        appendCardTarget: appendMultiTarget,
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
        appendCardTarget: appendMultiTarget,
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
        isSelectionFinished,
        buildAutoTarget: (table, effect) => buildZeroes(effect.target_value)
    },
    select_cubes_optional: {
        appendCardTarget: appendMultiTarget,
        isValidCubeTarget, getCubesSelected,
        isSelectionConfirmable: targetIsEmpty,
        isSelectionFinished, confirmSelection,
        buildAutoTarget: (table, effect) => {
            if (countSelectableCubes(table) >= effect.target_value) {
                return buildZeroes(effect.target_value);
            } else {
                return [];
            }
        }
    },
    select_cubes_repeat: {
        appendCardTarget: appendMultiTarget,
        isValidCubeTarget, getCubesSelected,
        isSelectionConfirmable: (target, effect) => target.indexOf(0) % (effect.target_value ?? 1) === 0,
        isSelectionFinished, confirmSelection,
        buildAutoTarget: (table, effect) => {
            const cubeCount = countSelectableCubes(table);
            const maxCount = cubeCount - cubeCount % effect.target_value;
            return buildZeroes(maxCount);
        }
    },
    self_cubes: {
        getCubesSelected: (target, effect, originCard, targetCard) => originCard.id === targetCard.id ? effect.target_value : 0,
        buildAutoTarget: () => ({})
    }
});

export default targetDispatch;