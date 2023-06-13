import { createUnionReducer } from "../../../Utils/UnionUtils";
import { getTagValue } from "./CardData";
import { CardTarget } from "./CardEnums";
import { Card, Player } from "./GameTable";
import { GamePrompt, RequestStatusUnion, TargetMode, TargetSelector, getCardEffects, getCurrentCardAndTargets, getEffectAt, getNextTargetIndex, isResponse, newPlayCardSelection, newTargetSelector } from "./TargetSelector";

export type SelectorUpdate =
    { setRequest: RequestStatusUnion } |
    { setPrompt: GamePrompt } |
    { confirmPlay: {} } |
    { undoSelection: {} } |
    { selectPlayingCard: Card } |
    { selectPickCard: Card } |
    { selectEquipCard: Card } |
    { revertLastTarget: {} } |
    { reserveTargets: number } |
    { addCardTarget: Card } |
    { addPlayerTarget: Player } |
    { addEquipTarget: Player }
;

type TargetListMapper = (targets: CardTarget[]) => CardTarget[];

function editSelectorTargets(selector: TargetSelector, mapper: TargetListMapper): TargetSelector {
    if ('targets' in selector.selection) {
        if (selector.mode == TargetMode.target) {
            return {
                ...selector,
                selection: {
                    ...selector.selection,
                    targets: mapper(selector.selection.targets)
                }
            };
        } else if (selector.mode == TargetMode.modifier) {
            const lastModifier = selector.selection.modifiers[selector.selection.modifiers.length - 1];
            const modifiers = [
                ...selector.selection.modifiers.slice(0, -1),
                { modifier: lastModifier.modifier, targets: mapper(lastModifier.targets) }
            ];
            return {
                ...selector,
                selection: { ...selector.selection, modifiers }
            };
        }
    }
    throw new Error('Invalid TargetSelector state');
}

type EmptyKeys<T> = T extends T ? T[keyof T] extends Record<string, never> ? keyof T : never : never;
type NumberNullKeys<T> = T extends T ? T[keyof T] extends number | null ? keyof T : never : never;
type ArrayKeys<T> = T extends T ? T[keyof T] extends number[] ? keyof T : never : never;

type EmptyTargetType = EmptyKeys<CardTarget>;
type SingleTargetType = NumberNullKeys<CardTarget>;
type MultiTargetType = ArrayKeys<CardTarget>;

function appendEmptyTarget(targetType: EmptyTargetType): TargetListMapper {
    return targets => targets.concat({[targetType]: {}} as CardTarget);
}

function appendTarget(targetType: SingleTargetType, id: number | null): TargetListMapper {
    return targets => targets.concat({[targetType]: id} as CardTarget);
}

function appendTargets(targetType: MultiTargetType, id: number, index: number, maxTargets: number): TargetListMapper {
    return targets => {
        if (index >= targets.length) {
            let targetList = Array<number>(maxTargets).fill(0);
            if (maxTargets > 0) {
                targetList[0] = id;
            }
            return targets.concat({[targetType]: targetList} as CardTarget);
        } else if (targets.length != 0) {
            let target = targets[targets.length - 1];
            if (targetType in target) {
                const targetList = [...target[targetType as keyof CardTarget] as number[]];
                const zeroIndex = targetList.indexOf(0);
                if (zeroIndex >= 0) {
                    targetList[zeroIndex] = id;
                    return targets.slice(0, -1).concat({[targetType]: targetList} as CardTarget);
                }
            }
        }
        throw new Error('Invalid TargetSelector state');
    };
}

function addModifierContext(modifier: Card, targets: CardTarget[], selector: TargetSelector) {
    return selector;
}

function handleAutoTargets(selector: TargetSelector): TargetSelector {
    if (!('targets' in selector.selection)) {
        throw new Error('Invalid TargetSelector state');
    }

    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const [effects, optionals] = getCardEffects(currentCard, isResponse(selector));
    const repeatCount = getTagValue(currentCard, 'repeatable') ?? 1;

    if (index >= effects.length && repeatCount > 0
        && targets.length - effects.length == optionals.length * repeatCount)
    {
        if (selector.mode == TargetMode.modifier) {
            return addModifierContext(currentCard, targets, {
                ...selector, mode: TargetMode.start
            });
        } else {
            return { ...selector, mode: TargetMode.finish };
        }
    }

    // TODO auto_confirm

    const nextEffect = getEffectAt([effects, optionals], index);
    switch (nextEffect?.target) {
    case 'none':
    case 'players':
    case 'self_cubes':
        return handleAutoTargets(editSelectorTargets(selector, appendEmptyTarget(nextEffect.target)));
    case 'conditional_player':
        return editSelectorTargets(selector, appendTarget('conditional_player', null));
    case 'extra_card':
        if (selector.selection.context.repeat_card) {
            return handleAutoTargets(editSelectorTargets(selector, appendTarget('extra_card', null)));
        }
        break;
    case 'cards_other_players':
        return editSelectorTargets(selector, appendTargets('cards_other_players', 0, index, 0));
    }
    return selector;
}

const targetSelectorReducer = createUnionReducer<TargetSelector, SelectorUpdate>({
    setRequest (request) {
        return newTargetSelector(request);
    },

    setPrompt (prompt) {
        return { ...this, prompt };
    },

    confirmPlay () {
        return { ...this, mode: TargetMode.finish };
    },

    undoSelection () {
        return { ...this, selection: {}, mode: TargetMode.start };
    },

    selectPlayingCard (card) {
        if ('modifier' in card.cardData) {
            const selection = 'targets' in this.selection ? this.selection : newPlayCardSelection();
            if (card.cardData.modifier.type == 'none') {
                return handleAutoTargets({
                    ...this,
                    selection: { ...selection, playing_card: card },
                    mode: TargetMode.target
                });
            } else {
                return handleAutoTargets({
                    ...this,
                    selection: { ...selection,
                        modifiers: selection.modifiers.concat({ modifier: card, targets: [] })
                    },
                    mode: TargetMode.modifier
                });
            }
        } else {
            throw new Error('Cannot select unknown card');
        }
    },

    selectPickCard (card) {
        return {
            ...this,
            selection: { picked_card: card.id },
            mode: TargetMode.finish
        };
    },

    selectEquipCard (card) {
        if ('equip_target' in card.cardData) {
            return {
                ...this,
                selection: newPlayCardSelection(card),
                mode: card.cardData.equip_target.length == 0
                    ? TargetMode.finish : TargetMode.equip
            };
        } else {
            throw new Error('Cannot select unknown card');
        }
    },

    revertLastTarget () {
        return editSelectorTargets(this, targets => targets.slice(0, -1));
    },

    reserveTargets (numTargets) {
        let selector = this;
        if (numTargets > 0) {
            selector = editSelectorTargets(selector, targets => {
                const lastTarget = targets.at(-1);
                if (!lastTarget) {
                    throw new Error('Invalid TargetSelector state');
                }
                const [targetType, targetValue] = Object.entries(lastTarget)[0];
                if (!Array.isArray(targetValue)) {
                    throw new Error('Invalid TargetSelector state');
                }
                return targets.slice(0, -1).concat({[targetType]: Array(numTargets).fill(0)} as CardTarget);
            });
        }
        return handleAutoTargets(selector);
    },

    addCardTarget (card) {
        const [currentCard, targets] = getCurrentCardAndTargets(this);
        const index = getNextTargetIndex(targets);
        const nextEffect = getEffectAt(getCardEffects(currentCard, isResponse(this)), index);

        switch (nextEffect?.target) {
        case 'card':
        case 'extra_card':
            return handleAutoTargets(editSelectorTargets(this, appendTarget(nextEffect.target, card.id)));
        case 'cards':
        case 'select_cubes':
            return handleAutoTargets(editSelectorTargets(this, appendTargets(nextEffect.target, card.id, index, nextEffect.target_value)));
        case 'cards_other_players':
            return handleAutoTargets(editSelectorTargets(this, appendTargets(nextEffect.target, card.id, index, 0)));
        default:
            throw new Error('Invalid TargetSelector state');
        }
    },

    addPlayerTarget (player) {
        const [currentCard, targets] = getCurrentCardAndTargets(this);
        const index = getNextTargetIndex(targets);
        const nextEffect = getEffectAt(getCardEffects(currentCard, isResponse(this)), index);

        switch (nextEffect?.target) {
        case 'player':
        case 'conditional_player':
            return handleAutoTargets(editSelectorTargets(this, appendTarget(nextEffect.target, player.id)));
        default:
            throw new Error('Invalid TargetSelector state');
        }
    },

    addEquipTarget (player) {
        if ('playing_card' in this.selection && this.mode == TargetMode.equip) {
            return {
                ...this,
                selection: {
                    ...this.selection,
                    targets: [{ player: player.id }]
                },
                mode: TargetMode.finish
            };
        } else {
            throw new Error('Invalid TargetSelector state');
        }
    }
    
});

export default targetSelectorReducer;