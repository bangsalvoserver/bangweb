import { ExtractKeys, createUnionReducer } from "../../../Utils/UnionUtils";
import { CardTarget } from "./CardEnums";
import { getTagValue, isEquipCard } from "./Filters";
import { Card, KnownCard, Player } from "./GameTable";
import { EffectContext, GamePrompt, PlayCardSelection, PlayingSelector, RequestStatusUnion, TargetSelector, checkSelectionPlaying, getCardEffects, getCurrentCardAndTargets, getEffectAt, getNextTargetIndex, getPlayableCards, isResponse, isSelectionPlaying, newPlayCardSelection, newTargetSelector, zipCardTargets } from "./TargetSelector";

export type SelectorUpdate =
    { setRequest: RequestStatusUnion } |
    { setPrompt: GamePrompt } |
    { confirmPlay: {} } |
    { undoSelection: {} } |
    { selectPlayingCard: KnownCard } |
    { selectPickCard: Card } |
    { appendTarget: CardTarget } |
    { addCardTarget: Card } |
    { addPlayerTarget: Player } |
    { addEquipTarget: Player }
;

type TargetListMapper = (targets: CardTarget[]) => CardTarget[];

function editSelectorTargets(selector: PlayingSelector, mapper: TargetListMapper): PlayingSelector {
    switch (selector.selection.mode) {
    case 'target':
        return handleAutoTargets({
            ...selector,
            selection: {
                ...selector.selection,
                targets: mapper(selector.selection.targets)
            }
        });
    case 'modifier':
        const lastModifier = selector.selection.modifiers.at(-1)!;
        const modifiers = selector.selection.modifiers.slice(0, -1)
            .concat({ modifier: lastModifier.modifier, targets: mapper(lastModifier.targets) });
        return handleAutoTargets({
            ...selector,
            selection: { ...selector.selection, modifiers }
        });
    default:
        throw new Error('TargetSelector: not in targeting mode');
    }
}

type MultiTargetType = ExtractKeys<CardTarget, number[]>;

function appendMultitargetReserved(targetType: MultiTargetType, id: number): TargetListMapper {
    return targets => {
        const target = targets.at(-1) as Record<string, number[]> | undefined;
        if (target && targetType in target) {
            const targetList = [...target[targetType]];
            const zeroIndex = targetList.indexOf(0);
            if (zeroIndex >= 0) {
                targetList[zeroIndex] = id;
                return targets.slice(0, -1).concat({[targetType]: targetList} as CardTarget);
            }
        }
        throw new Error('TargetSelector: last target is not an array');
    };
}

function appendMultitarget(targetType: MultiTargetType, id: number, index: number, maxTargets: number): TargetListMapper {
    return targets => {
        if (index < targets.length) {
            return appendMultitargetReserved(targetType, id)(targets);
        } else {
            let targetList = Array<number>(maxTargets).fill(0);
            if (maxTargets > 0) {
                targetList[0] = id;
            }
            return targets.concat({[targetType]: targetList} as CardTarget);
        }
    };
}

function addModifierContext(modifier: KnownCard, targets: CardTarget[], selector: PlayingSelector): PlayingSelector {
    const editContext = (mapper: (context: EffectContext) => EffectContext): PlayingSelector => {
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

function handleAutoTargets(selector: PlayingSelector): PlayingSelector {
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const [effects, optionals] = getCardEffects(currentCard, isResponse(selector));
    const repeatCount = getTagValue(currentCard, 'repeatable') ?? 1;

    if (index >= effects.length && repeatCount > 0
        && targets.length - effects.length == optionals.length * repeatCount)
    {
        if (selector.selection.mode == 'modifier') {
            return addModifierContext(currentCard, targets, {
                ...selector,
                selection: {
                    ...selector.selection,
                    mode: 'start'
                }
            });
        } else {
            return {
                ...selector,
                selection: {
                    ...selector.selection,
                    mode: 'finish'
                }
            };
        }
    }

    const nextEffect = getEffectAt([effects, optionals], index);
    switch (nextEffect?.target) {
    case 'none':
    case 'players':
    case 'self_cubes':
        return editSelectorTargets(selector, targets => targets.concat({[nextEffect.target]: {}} as CardTarget));
    case 'extra_card':
        if (selector.selection.context.repeat_card) {
            return editSelectorTargets(selector, targets => targets.concat({extra_card: null}));
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
        checkSelectionPlaying(this);
        return {
            ...this,
            selection: { ...this.selection, mode: 'finish' }
        };
    },

    undoSelection () {
        return { ...this, prompt: {}, selection: { mode: 'start' }};
    },

    selectPlayingCard (card) {
        const selection = isSelectionPlaying(this) ? this.selection : newPlayCardSelection();

        if (isEquipCard(card)) {
            return {
                ...this,
                selection: {
                    ...selection,
                    playing_card: card,
                    mode: card.cardData.equip_target.length == 0
                        ? 'finish' : 'equip'
                },
                prompt: {}
            };
        } else if (card.cardData.modifier.type == 'none') {
            return handleAutoTargets({
                ...this,
                selection: {
                    ...selection,
                    playing_card: card,
                    mode: 'target'
                },
                prompt: {}
            });
        } else {
            return handleAutoTargets({
                ...this,
                selection: {
                    ...selection,
                    modifiers: selection.modifiers.concat({ modifier: card, targets: [] }),
                    mode: 'modifier'
                },
                prompt: {}
            });
        }
    },

    selectPickCard (card) {
        return {
            ...this,
            selection: {
                picked_card: card.id,
                mode: 'finish'
            }
        };
    },

    appendTarget (target) {
        checkSelectionPlaying(this);
        return editSelectorTargets(this, targets => targets.concat(target));
    },

    addCardTarget (card) {
        checkSelectionPlaying(this);
        const [currentCard, targets] = getCurrentCardAndTargets(this);
        const index = getNextTargetIndex(targets);
        const nextEffect = getEffectAt(getCardEffects(currentCard, isResponse(this)), index);

        switch (nextEffect?.target) {
        case 'card':
        case 'extra_card':
            return editSelectorTargets(this, targets => targets.concat({[nextEffect.target]: card.id} as CardTarget));
        case 'cards':
        case 'select_cubes':
            return editSelectorTargets(this, appendMultitarget(nextEffect.target, card.id, index, nextEffect.target_value));
        case 'cards_other_players':
            return editSelectorTargets(this, appendMultitargetReserved(nextEffect.target, card.id));
        default:
            throw new Error('TargetSelector: cannot add card target');
        }
    },

    addPlayerTarget (player) {
        checkSelectionPlaying(this);
        const [currentCard, targets] = getCurrentCardAndTargets(this);
        const index = getNextTargetIndex(targets);
        const nextEffect = getEffectAt(getCardEffects(currentCard, isResponse(this)), index);

        switch (nextEffect?.target) {
        case 'player':
        case 'conditional_player':
            return editSelectorTargets(this, targets => targets.concat({[nextEffect.target]: player.id} as CardTarget));
        default:
            throw new Error('TargetSelector: cannot add player target');
        }
    },

    addEquipTarget (player) {
        if (this.selection.mode == 'equip') {
            return {
                ...this,
                selection: {
                    ...this.selection,
                    targets: [{ player: player.id }],
                    mode: 'finish'
                },
            };
        } else {
            throw new Error('TargetSelector: not in equipping mode');
        }
    }
    
});

export default targetSelectorReducer;