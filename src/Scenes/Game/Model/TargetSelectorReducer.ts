import { createUnionReducer } from "../../../Utils/UnionUtils";
import { getTagValue } from "./CardData";
import { CardTarget } from "./CardEnums";
import { Card, Player } from "./GameTable";
import { GamePrompt, RequestStatusUnion, TargetMode, TargetSelector, countTargetableForCardsOtherPlayers, getCardEffects, getCurrentCard, getEffectAt, getNextTargetIndex, getSelectorCurrentTargetList, isResponse, newPlayCardSelection, newTargetSelector } from "./TargetSelector";

export type SelectorUpdate =
    { setRequest: RequestStatusUnion } |
    { setPrompt: GamePrompt } |
    { confirmPlay: {} } |
    { undoSelection: {} } |
    { selectPlayingCard: Card } |
    { selectPickCard: Card } |
    { selectEquipCard: Card } |
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
                ...selector.selection.modifiers.slice(-1),
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
        if (index > targets.length) {
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
                if (zeroIndex > 0) {
                    targetList[zeroIndex] = id;
                    return targets.slice(-1).concat({[targetType]: targetList} as CardTarget);
                }
            }
        }
        throw new Error('Invalid TargetSelector state');
    };
}

function handleAutoTargets(selector: TargetSelector): TargetSelector {
    if (!('targets' in selector.selection)) {
        throw new Error('Invalid TargetSelector state');
    }

    const currentCard = getCurrentCard(selector);
    const index = getNextTargetIndex(getSelectorCurrentTargetList(selector));
    const [effects, optionals] = getCardEffects(currentCard, isResponse(selector));
    const repeatCount = getTagValue(currentCard, 'repeatable') ?? 1;

    if (index >= effects.length) {
        if (repeatCount > 0) {
            if (selector.selection.targets.length - effects.length == optionals.length * repeatCount) {
                return { ...selector, mode: TargetMode.finish };
            }
        }
    }

    // TODO auto_confirm

    const nextEffect = getEffectAt([effects, optionals], index);
    switch (nextEffect.target) {
    case 'none':
    case 'players':
    case 'self_cubes':
        return handleAutoTargets(editSelectorTargets(selector, appendEmptyTarget(nextEffect.target)));
    case 'conditional_player':
        break; // TODO add {conditional_player: null} if no target possible
    case 'extra_card':
        if (selector.selection.context.repeat_card) {
            return handleAutoTargets(editSelectorTargets(selector, appendTarget('extra_card', null)));
        }
        break;
    case 'cards_other_players':
        if (countTargetableForCardsOtherPlayers(selector) == 0) {
            return handleAutoTargets(editSelectorTargets(selector, appendTargets('cards_other_players', 0, index, 0)));
        }
        break;
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

    addCardTarget (card) {
        const index = getNextTargetIndex(getSelectorCurrentTargetList(this));
        const nextEffect = getEffectAt(getCardEffects(getCurrentCard(this), isResponse(this)), index);

        switch (nextEffect.target) {
        case 'card':
        case 'extra_card':
            return handleAutoTargets(editSelectorTargets(this, appendTarget(nextEffect.target, card.id)));
        case 'cards':
        case 'cards_other_players':
            return handleAutoTargets(editSelectorTargets(this, appendTargets(nextEffect.target, card.id, index, nextEffect.target_value)));
        default:
            throw new Error('Invalid TargetSelector state');
        }
    },

    addPlayerTarget (player) {
        const index = getNextTargetIndex(getSelectorCurrentTargetList(this));
        const nextEffect = getEffectAt(getCardEffects(getCurrentCard(this), isResponse(this)), index);

        switch (nextEffect.target) {
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