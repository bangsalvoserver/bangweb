import { createUnionReducer } from "../../../Utils/UnionUtils";
import { CardTarget } from "./CardEnums";
import { getTagValue } from "./Filters";
import { Card, KnownCard, Player, isCardKnown } from "./GameTable";
import { EffectContext, GamePrompt, RequestStatusUnion, TargetMode, TargetSelector, checkSelectionPlaying, getCardEffects, getCurrentCardAndTargets, getEffectAt, getNextTargetIndex, getPlayableCards, isResponse, isSelectionPlaying, newPlayCardSelection, newTargetSelector, zipCardTargets } from "./TargetSelector";

export type SelectorUpdate =
    { setRequest: RequestStatusUnion } |
    { setPrompt: GamePrompt } |
    { confirmPlay: {} } |
    { undoSelection: {} } |
    { selectPlayingCard: KnownCard } |
    { selectPickCard: Card } |
    { selectEquipCard: KnownCard } |
    { revertLastTarget: {} } |
    { reserveTargets: number } |
    { addCardTarget: Card } |
    { addPlayerTarget: Player } |
    { addEquipTarget: Player }
;

type TargetListMapper = (targets: CardTarget[]) => CardTarget[];

function editSelectorTargets(selector: TargetSelector, mapper: TargetListMapper): TargetSelector {
    checkSelectionPlaying(selector);

    switch (selector.mode) {
    case TargetMode.target:
        return {
            ...selector,
            selection: {
                ...selector.selection,
                targets: mapper(selector.selection.targets)
            }
        };
    case TargetMode.modifier:
        const lastModifier = selector.selection.modifiers[selector.selection.modifiers.length - 1];
        const modifiers = [
            ...selector.selection.modifiers.slice(0, -1),
            { modifier: lastModifier.modifier, targets: mapper(lastModifier.targets) }
        ];
        return {
            ...selector,
            selection: { ...selector.selection, modifiers }
        };
    default:
        throw new Error('TargetSelector: not in targeting mode');
    }
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
        throw new Error('TargetSelector: last target is not an array');
    };
}

function addModifierContext(modifier: KnownCard, targets: CardTarget[], selector: TargetSelector): TargetSelector {
    const editContext = (mapper: (context: EffectContext) => EffectContext): TargetSelector => {
        checkSelectionPlaying(selector);
        return {
            ...selector,
            selection: {
                ...selector.selection,
                context: mapper(selector.selection.context)
            }
        };
    };
    switch (modifier.cardData.modifier.type) {
    case 'belltower':
        return editContext(context => ({ ...context, ignore_distances: true }));
    case 'card_choice':
        return editContext(context => ({ ...context, card_choice: modifier.id }));
    case 'leevankliff':
    case 'moneybag': {
        const repeat_card = getPlayableCards(selector)[0];
        return editContext(context => ({ ...context, repeat_card }));
    }
    case 'traincost':
        if (modifier.pocket?.name == 'stations') {
            const traincost = getPlayableCards(selector)[0];
            return editContext(context => ({ ...context, traincost  }))
        }
        break;
    case 'sgt_blaze':
        for (const [target, effect] of zipCardTargets(targets, getCardEffects(modifier, isResponse(selector)))) {
            if (effect.type == 'ctx_add' && 'player' in target) {
                return editContext(context => ({ ...context, skipped_player: target.player }));
            }
        }
        break;
    }
    return selector;
}

function handleAutoTargets(selector: TargetSelector): TargetSelector {
    checkSelectionPlaying(selector);

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
        const selection = isSelectionPlaying(this) ? this.selection : newPlayCardSelection();
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
    },

    selectPickCard (card) {
        return {
            ...this,
            selection: { picked_card: card.id },
            mode: TargetMode.finish
        };
    },

    selectEquipCard (card) {
        return {
            ...this,
            selection: newPlayCardSelection(card),
            mode: card.cardData.equip_target.length == 0
                ? TargetMode.finish : TargetMode.equip
        };
    },

    revertLastTarget () {
        return editSelectorTargets(this, targets => targets.slice(0, -1));
    },

    reserveTargets (numTargets) {
        let selector = this;
        if (numTargets > 0) {
            selector = editSelectorTargets(selector, targets => {
                const lastTarget = targets.at(-1);
                if (lastTarget) {
                    const [targetType, targetValue] = Object.entries(lastTarget)[0];
                    if (Array.isArray(targetValue)) {
                        return targets.slice(0, -1).concat({[targetType]: Array(numTargets).fill(0)} as CardTarget);
                    }
                }
                throw new Error('TargetSelector: last target is not an array');
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
            throw new Error('TargetSelector: cannot add card target');
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
            throw new Error('TargetSelector: cannot add player target');
        }
    },

    addEquipTarget (player) {
        if (isSelectionPlaying(this) && this.mode == TargetMode.equip) {
            return {
                ...this,
                selection: {
                    ...this.selection,
                    targets: [{ player: player.id }]
                },
                mode: TargetMode.finish
            };
        } else {
            throw new Error('TargetSelector: not in equipping mode');
        }
    }
    
});

export default targetSelectorReducer;