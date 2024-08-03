import { count, countIf, sum } from "../../../Utils/ArrayUtils";
import { UnionValue } from "../../../Utils/UnionUtils";
import { CardEffect } from "./CardData";
import { CardTarget, TargetType } from "./CardEnums";
import { calcPlayerDistance, checkCardFilter, checkPlayerFilter, getCardColor, getCardOwner, isPlayerInGame } from "./Filters";
import { Card, GameTable, getCard, getPlayer, Player } from "./GameTable";
import { CardId, PlayerId } from "./GameUpdate";
import { countSelectableCubes, countSelectedCubes, countTargetsSelectedCubes, getModifierContext, getTargetSelectorStatus, isPlayerSelected } from "./TargetSelector";

interface TargetDispatch<T> {
    isCardSelected: (target: T, card: CardId) => boolean;
    isValidCardTarget: (table: GameTable, target: T | undefined, effect: CardEffect, card: Card) => boolean;
    appendCardTarget: (target: T | undefined, card: CardId) => T;

    isPlayerSelected: (target: T, player: PlayerId) => boolean;
    isValidPlayerTarget: (table: GameTable, target: T | undefined, effect: CardEffect, player: Player) => boolean;
    appendPlayerTarget: (target: T | undefined, player: PlayerId) => T;

    isValidCubeTarget: (table: GameTable, card: Card) => boolean;
    countCubesIf: (target: T, effect: CardEffect, card: Card, condition: (card: CardId) => boolean) => number;

    isSelectionConfirmable: (target: T, effect: CardEffect) => boolean;

    buildAutoTarget: (table: GameTable, effect: CardEffect) => T | undefined;
}

type DispatchMap = { [K in TargetType]: Partial<TargetDispatch<UnionValue<CardTarget, K>>> };

function buildDispatch(dispatchMap: DispatchMap) {
    return {
        isCardSelected: (target: CardTarget, card: CardId) => {
            const [key, value] = Object.entries(target)[0];
            const fn = dispatchMap[key as TargetType].isCardSelected;
            if (!fn) return false;
            return (fn as (target: unknown, card: CardId) => boolean)(value, card);
        },
        isValidCardTarget: (table: GameTable, target: CardTarget | undefined, effect: CardEffect, card: Card) => {
            const fn = dispatchMap[effect.target].isValidCardTarget;
            if (!fn) return false;
            const targetValue = target ? Object.values(target)[0] : undefined;
            return (fn as (table: GameTable, target: unknown, effect: CardEffect, card: Card) => boolean)(table, targetValue, effect, card);
        },
        appendCardTarget: (target: CardTarget | undefined, effect: CardEffect, card: CardId) => {
            const fn = dispatchMap[effect.target].appendCardTarget;
            if (!fn) throw new Error('TargetSelector: cannot add card target');
            const targetValue = target ? Object.values(target)[0] : undefined;
            const result = (fn as (target: unknown, card: CardId) => unknown)(targetValue, card);
            return {[effect.target]: result} as CardTarget;
        },
        isPlayerSelected: (target: CardTarget, player: PlayerId) => {
            const [key, value] = Object.entries(target)[0];
            const fn = dispatchMap[key as TargetType].isPlayerSelected;
            if (!fn) return false;
            return (fn as (target: unknown, player: PlayerId) => boolean)(value, player);
        },
        isValidPlayerTarget: (table: GameTable, target: CardTarget | undefined, effect: CardEffect, player: Player) => {
            const fn = dispatchMap[effect.target].isValidPlayerTarget;
            if (!fn) return false;
            const targetValue = target ? Object.values(target)[0] : undefined;
            return (fn as (table: GameTable, target: unknown, effect: CardEffect, player: Player) => boolean)(table, targetValue, effect, player);
        },
        appendPlayerTarget: (target: CardTarget | undefined, effect: CardEffect, player: PlayerId) => {
            const fn = dispatchMap[effect.target].appendPlayerTarget;
            if (!fn) throw new Error('TargetSelector: cannot add player target');
            const targetValue = target ? Object.values(target)[0] : undefined;
            const result = (fn as (target: unknown, player: PlayerId) => unknown)(targetValue, player);
            return {[effect.target]: result} as CardTarget;
        },
        isValidCubeTarget: (table: GameTable, effect: CardEffect, card: Card) => {
            const fn = dispatchMap[effect.target].isValidCubeTarget;
            if (!fn) return false;
            return fn(table, card);
        },
        countCubesIf: (target: CardTarget, effect: CardEffect, card: Card, condition: (card: CardId) => boolean = _ => true) => {
            const fn = dispatchMap[effect.target].countCubesIf;
            if (!fn) return 0;
            const targetValue = target ? Object.values(target)[0] : undefined;
            return (fn as (target: unknown, effect: CardEffect, card: Card, condition: (card: CardId) => boolean) => number)(targetValue, effect, card, condition);
        },
        isSelectionConfirmable: (target: CardTarget, effect: CardEffect) => {
            const fn = dispatchMap[effect.target].isSelectionConfirmable;
            if (!fn) return false;
            const targetValue = Object.values(target)[0];
            return (fn as (target: unknown, effect: CardEffect) => boolean)(targetValue, effect);
        },
        buildAutoTarget: (table: GameTable, effect: CardEffect) => {
            const fn = dispatchMap[effect.target].buildAutoTarget;
            if (fn) {
                const targetValue = (fn as (table: GameTable, effect: CardEffect) => unknown)(table, effect);
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

const appendSingleTarget = <T>(target: unknown, value: T) => {
    return value;
}

const appendMultiTarget = (target: number[] | undefined, value: number) => {
    if (!target) throw new Error('TargetSelector: last target is not reserved');
    let copy = [...target];
    copy[target.indexOf(0)] = value;
    return copy;
}

const isValidPlayerTarget = (table: GameTable, target: unknown, effect: CardEffect, player: Player) => {
    return checkPlayerFilter(table, effect.player_filter, player);
}

const isValidCardTarget = (table: GameTable, target: unknown, effect: CardEffect, card: Card) => {
    const player = getCardOwner(card);
    return (!player || checkPlayerFilter(table, effect.player_filter, getPlayer(table, player)))
        && checkCardFilter(table, effect.card_filter, card);
};

const isValidCubeTarget = (table: GameTable, card: Card) => {
    return getCardOwner(card) === table.self_player
        && card.num_cubes > countSelectedCubes(table.selector, card);
};

const countCubesIf = (target: CardId[], effect: CardEffect, card: Card, condition: (card: CardId) => boolean) => {
    return countIf(target, condition);
}

const targetIsEmpty = (target: number[], effect: CardEffect) => target[0] === 0;
const targetIsNotEmpty = (target: number[], effect: CardEffect) => target[0] !== 0;

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
        appendPlayerTarget: (target, player) => {
            if (target) {
                return [target[0], player];
            } else {
                return [player, 0];
            }
        },
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
        isPlayerSelected: checkMultiTarget,
        appendPlayerTarget: appendMultiTarget,
        isValidPlayerTarget,
        buildAutoTarget: (table, effect) => {
            const {currentCard, targets, effects} = getTargetSelectorStatus(table.selector);
            const numCubes = countTargetsSelectedCubes(currentCard, targets, effects);
            return buildZeroes(numCubes + 1);
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
        isValidCardTarget,
        buildAutoTarget: (table, effect) => buildZeroes(effect.target_value)
    },
    max_cards: {
        isCardSelected: checkMultiTarget,
        appendCardTarget: appendMultiTarget,
        isValidCardTarget,
        isSelectionConfirmable: targetIsNotEmpty,
        buildAutoTarget: (table, effect) => {
            const cardTargetable = (card: CardId) => checkCardFilter(table, effect.card_filter, getCard(table, card));
            let countTargetableCards = sum(table.players, player => {
                if (checkPlayerFilter(table, effect.player_filter, player)) {
                    return countIf(player.pockets.player_hand, cardTargetable)
                        + countIf(player.pockets.player_table, cardTargetable);
                } else {
                    return 0;
                }
            });
            if (effect.target_value !== 0 && countTargetableCards > effect.target_value) {
                countTargetableCards = effect.target_value;   
            }
            return buildZeroes(countTargetableCards);
        }
    },
    card_per_player: {
        isCardSelected: checkMultiTarget,
        appendCardTarget: appendMultiTarget,
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
        isValidCubeTarget, countCubesIf,
        buildAutoTarget: (table, effect) => buildZeroes(effect.target_value)
    },
    select_cubes_optional: {
        appendCardTarget: appendMultiTarget,
        isValidCubeTarget, countCubesIf,
        isSelectionConfirmable: targetIsEmpty,
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
        isValidCubeTarget, countCubesIf,
        isSelectionConfirmable: (target, effect) => target.indexOf(0) % (effect.target_value ?? 1) === 0,
        buildAutoTarget: (table, effect) => {
            const cubeCount = countSelectableCubes(table);
            const maxCount = cubeCount - cubeCount % effect.target_value;
            return buildZeroes(maxCount);
        }
    },
    select_cubes_players: {
        appendCardTarget: appendMultiTarget,
        isValidCubeTarget, countCubesIf,
        isSelectionConfirmable: () => true,
        buildAutoTarget: (table, effect) => {
            const cubeCount = countSelectableCubes(table);
            const numPlayers = countIf(table.alive_players, target => checkPlayerFilter(table, effect.player_filter, getPlayer(table, target)));
            const maxCount = Math.min(cubeCount, numPlayers - 1);
            return buildZeroes(maxCount);
        }
    },
    self_cubes: {
        countCubesIf: (target, effect, card, condition) => effect.target_value * +condition(card.id),
        buildAutoTarget: () => ({})
    }
});

export default targetDispatch;