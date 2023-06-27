import { Empty } from "../../../Messages/ServerMessage";
import { count } from "../../../Utils/ArrayUtils";
import { FilteredKeys, SpreadUnion, createUnionReducer } from "../../../Utils/UnionUtils";
import { CardTarget } from "./CardEnums";
import { cardHasTag, checkPlayerFilter, getCardColor, getTagValue, isEquipCard } from "./Filters";
import { Card, KnownCard, Player, getCard, getPlayer } from "./GameTable";
import { CardId, PlayerId } from "./GameUpdate";
import { EffectContext, GamePrompt, PlayingSelector, RequestStatusUnion, TargetSelector, checkSelectionPlaying, getAutoSelectCard, getCardEffects, getCurrentCardAndTargets, getEffectAt, getNextTargetIndex, getPlayableCards, isResponse, isSelectionPlaying, newPlayCardSelection, newTargetSelector, selectorCanPlayCard, zipCardTargets } from "./TargetSelector";

export type SelectorUpdate =
    { setRequest: RequestStatusUnion } |
    { setPrompt: GamePrompt } |
    { confirmPlay: Empty } |
    { undoSelection: Empty } |
    { selectPlayingCard: KnownCard } |
    { selectPickCard: Card } |
    { addCardTarget: Card } |
    { addPlayerTarget: Player } |
    { addEquipTarget: Player }
;

type TargetListMapper = (targets: CardTarget[]) => CardTarget[];

function editSelectorTargets(selector: PlayingSelector, mapper: TargetListMapper): PlayingSelector {
    switch (selector.selection.mode) {
    case 'target':
        return {
            ...selector,
            selection: {
                ...selector.selection,
                targets: mapper(selector.selection.targets)
            }
        };
    case 'modifier':
        const lastModifier = selector.selection.modifiers.at(-1)!;
        const modifiers = selector.selection.modifiers.slice(0, -1)
            .concat({ modifier: lastModifier.modifier, targets: mapper(lastModifier.targets) });
        return {
            ...selector,
            selection: { ...selector.selection, modifiers }
        };
    default:
        throw new Error('TargetSelector: not in targeting mode');
    }
}

type SpreadTargetTypes = SpreadUnion<CardTarget>;
type MultiTargetType = FilteredKeys<SpreadTargetTypes, number[]>;

function appendTarget<Key extends keyof SpreadTargetTypes>(targetType: Key, value: SpreadTargetTypes[Key]): TargetListMapper {
    return targets => targets.concat({[targetType]: value} as unknown as CardTarget);
}

function reserveTargets(targetType: MultiTargetType, count: number): TargetListMapper {
    return appendTarget(targetType, Array<number>(count).fill(0));
}

function appendMultitarget(targetType: MultiTargetType, id: number): TargetListMapper {
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

function appendCardTarget(selector: PlayingSelector, card: CardId): TargetListMapper {
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const effect = getEffectAt(getCardEffects(currentCard, isResponse(selector)), index);

    switch (effect?.target) {
    case 'card':
    case 'extra_card':
        return appendTarget(effect.target, card);
    case 'cards':
    case 'select_cubes':
    case 'cards_other_players':
        return appendMultitarget(effect.target, card);
    default:
        throw new Error('TargetSelector: cannot add card target');
    }
}

function appendPlayerTarget(selector: PlayingSelector, player: PlayerId): TargetListMapper {
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const effect = getEffectAt(getCardEffects(currentCard, isResponse(selector)), index);

    switch (effect?.target) {
    case 'player':
    case 'conditional_player':
        return appendTarget(effect.target, player);
    default:
        throw new Error('TargetSelector: cannot add player target');
    }
}

function addModifierContext(selector: PlayingSelector): PlayingSelector {
    const [modifier, targets] = getCurrentCardAndTargets(selector);
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

function isAutoConfirmable(selector: PlayingSelector): boolean {
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const [effects, optionals] = getCardEffects(currentCard, isResponse(selector));
    const table = selector.table.current;

    const diff = getNextTargetIndex(targets) - effects.length;
    if (diff < 0) return false;

    if (optionals.length != 0 && diff % optionals.length == 0) {
        if (cardHasTag(currentCard, 'auto_confirm')) {
            if (optionals.some(effect => effect.target == 'player'
                && !table.alive_players.some(target =>
                    checkPlayerFilter(table, selector, effect.player_filter, getPlayer(table, target)))))
            {
                return true;
            }
        } else if (cardHasTag(currentCard, 'auto_confirm_red_ringo')) {
            let cubeSlots = 0;
            for (const cardId of getPlayer(table, table.self_player!).pockets.player_table) {
                const card = getCard(table, cardId);
                if (getCardColor(card) == 'orange') {
                    cubeSlots += 4 - card.num_cubes;
                }
            }
            if (currentCard.num_cubes <= 1 || cubeSlots <= 1) {
                return true;
            }
        }
    }

    const repeatCount = getTagValue(currentCard, 'repeatable') ?? 1;
    return repeatCount > 0 && diff == optionals.length * repeatCount;
}

function appendAutoTarget(selector: PlayingSelector): TargetListMapper | undefined {
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const effect = getEffectAt(getCardEffects(currentCard, isResponse(selector)), index);
    const table = selector.table.current;

    switch (effect?.target) {
    case 'none':
    case 'players':
    case 'self_cubes':
        return appendTarget(effect.target, {});
    case 'extra_card':
        if (selector.selection.context.repeat_card) {
            return appendTarget(effect.target, null);
        }
        break;
    case 'conditional_player': {
        if (!table.alive_players.some(target => checkPlayerFilter(table, selector, effect.player_filter, getPlayer(table, target)))) {
            return appendTarget(effect.target, null);
        }
        break;
    }
    case 'cards':
    case 'select_cubes':
        if (index >= targets.length) {
            return reserveTargets(effect.target, effect.target_value);
        }
        break;
    case 'cards_other_players':
        if (index >= targets.length) {
            const cardIsNotBlack = (card: CardId) => getCardColor(getCard(table, card)) != 'black';
            const playerHasCards = (player: Player) => player.pockets.player_hand.length != 0 || player.pockets.player_table.some(cardIsNotBlack);
            const numTargetable = count(table.alive_players, target =>
                target != table.self_player && target != selector.selection.context.skipped_player
                && playerHasCards(getPlayer(table, target)));
            return reserveTargets(effect.target, numTargetable);
        }
        break;
    }
}

function setSelectorMode(selector: PlayingSelector, mode: 'start' | 'finish'): PlayingSelector {
    return {
        ...selector,
        selection: {
            ...selector.selection,
            mode
        }
    };
}
function handleAutoTargets(selector: PlayingSelector): TargetSelector {
    if (isAutoConfirmable(selector)) {
        if (selector.selection.mode == 'modifier') {
            return handleAutoSelect(setSelectorMode(addModifierContext(selector), 'start'));
        } else {
            return setSelectorMode(selector, 'finish');
        }
    }

    const mapper = appendAutoTarget(selector);
    if (mapper) {
        return handleAutoTargets(editSelectorTargets(selector, mapper));
    } else {
        return selector;
    }
}

function handleSelectPlayingCard(selector: TargetSelector, card: KnownCard): TargetSelector {
    const selection = isSelectionPlaying(selector) ? selector.selection : newPlayCardSelection();

    if (isEquipCard(card)) {
        return {
            ...selector,
            selection: {
                ...selection,
                playing_card: card,
                mode: card.cardData.equip_target.length == 0
                    ? 'finish' : 'equip'
            },
            prompt: { type: 'none' }
        };
    } else if (card.cardData.modifier.type == 'none') {
        return handleAutoTargets({
            ...selector,
            selection: {
                ...selection,
                playing_card: card,
                mode: 'target'
            },
            prompt: { type: 'none' }
        });
    } else {
        return handleAutoTargets({
            ...selector,
            selection: {
                ...selection,
                modifiers: selection.modifiers.concat({ modifier: card, targets: [] }),
                mode: 'modifier'
            },
            prompt: { type: 'none' }
        });
    }
}

function handleAutoSelect(selector: TargetSelector): TargetSelector {
    const cardId = getAutoSelectCard(selector);
    const table = selector.table.current;
    if (cardId) {
      const card = getCard(table, cardId);
      if (selectorCanPlayCard(selector, card)) {
        return handleSelectPlayingCard(selector, card);
      }
    }
    return selector;
}

const targetSelectorReducer = createUnionReducer<TargetSelector, SelectorUpdate>({
    setRequest (request) {
        return handleAutoSelect(newTargetSelector(this.table, request));
    },

    setPrompt (prompt) {
        return { ...this, prompt };
    },

    confirmPlay () {
        checkSelectionPlaying(this);
        return setSelectorMode(editSelectorTargets(this, targets => targets.slice(0, getNextTargetIndex(targets))), 'finish');
    },

    undoSelection () {
        return handleAutoSelect({
            ...this,
            prompt: { type: 'none' },
            selection: { mode: 'start' }
        });
    },

    selectPlayingCard ( card ) {
        return handleSelectPlayingCard(this, card);
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

    addCardTarget (card) {
        checkSelectionPlaying(this);
        return handleAutoTargets(editSelectorTargets(this, appendCardTarget(this, card.id)));
    },

    addPlayerTarget (player) {
        checkSelectionPlaying(this);
        return handleAutoTargets(editSelectorTargets(this, appendPlayerTarget(this, player.id)));
    },

    addEquipTarget (player) {
        if (this.selection.mode != 'equip') {
            throw new Error('TargetSelector: not in equipping mode');
        }
        return {
            ...this,
            selection: {
                ...this.selection,
                targets: [{ player: player.id }],
                mode: 'finish'
            },
        };
    }
    
});

export default targetSelectorReducer;