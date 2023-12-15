import { Empty } from "../../../Messages/ServerMessage";
import { countIf } from "../../../Utils/ArrayUtils";
import { FilteredKeys, SpreadUnion, createUnionReducer } from "../../../Utils/UnionUtils";
import { CardTarget } from "./CardEnums";
import { cardHasTag, checkPlayerFilter, getCardColor, getTagValue, isEquipCard } from "./Filters";
import { Card, GameTable, KnownCard, Player, getCard, getPlayer } from "./GameTable";
import { CardId, PlayerId } from "./GameUpdate";
import { GamePrompt, PlayingSelector, PlayingSelectorTable, RequestStatusUnion, TargetSelector, checkSelectionPlaying, getAutoSelectCard, getCardEffects, getCurrentCardAndTargets, getEffectAt, getNextTargetIndex, getPlayableCards, isResponse, isSelectionPlaying, newPlayCardSelection, newTargetSelector, selectorCanPlayCard, zipCardTargets } from "./TargetSelector";

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
        return {
            ...selector,
            selection: {
                ...selector.selection,
                modifiers: selector.selection.modifiers.map((modifier, index) => {
                    if (index === selector.selection.modifiers.length - 1) {
                        return { ...modifier, targets: mapper(modifier.targets) };
                    } else {
                        return modifier;
                    }
                })
            }
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
    case 'adjacent_players':
        return appendMultitarget(effect.target, player);
    default:
        throw new Error('TargetSelector: cannot add player target');
    }
}

function addModifierContext(selector: PlayingSelector): PlayingSelector {
    const [modifier, targets] = getCurrentCardAndTargets(selector);
    const editContext = (source: {}): PlayingSelector => {
        return {
            ...selector,
            selection: {
                ...selector.selection,
                context: Object.assign(selector.selection.context, source)
            }
        };
    };
    switch (modifier.cardData.modifier.type) {
    case 'belltower':
        return editContext({ ignore_distances: true });
    case 'card_choice':
        return editContext({ card_choice: modifier.id });
    case 'leevankliff':
    case 'spike_spiezel':
    case 'moneybag':
        return editContext({ repeat_card: getPlayableCards(selector)[0] });
    case 'traincost':
        if (modifier.pocket?.name === 'stations') {
            return editContext({ traincost: getPlayableCards(selector)[0] });
        }
        break;
    case 'locomotive':
        return editContext({ train_advance: 1 });
    case 'sgt_blaze':
        for (const [target, effect] of zipCardTargets(targets, getCardEffects(modifier, isResponse(selector)))) {
            if (effect.type === 'ctx_add' && 'player' in target) {
                return editContext({ skipped_player: target.player });
            }
        }
        break;
    }
    return selector;
}

function isAutoConfirmable(table: PlayingSelectorTable): boolean {
    const selector = table.selector;
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const [effects, optionals] = getCardEffects(currentCard, isResponse(selector));

    const diff = getNextTargetIndex(targets) - effects.length;
    if (diff < 0) return false;

    if (optionals.length !== 0 && diff % optionals.length === 0) {
        if (cardHasTag(currentCard, 'auto_confirm')) {
            if (optionals.some(effect => effect.target === 'player'
                && !table.alive_players.some(target =>
                    checkPlayerFilter(table, effect.player_filter, getPlayer(table, target)))))
            {
                return true;
            }
        } else if (cardHasTag(currentCard, 'auto_confirm_red_ringo')) {
            let cubeSlots = 0;
            for (const cardId of getPlayer(table, table.self_player!).pockets.player_table) {
                const card = getCard(table, cardId);
                if (getCardColor(card) === 'orange') {
                    cubeSlots += 4 - card.num_cubes;
                }
            }
            if (currentCard.num_cubes <= 1 || cubeSlots <= 1) {
                return true;
            }
        }
    }

    const repeatCount = getTagValue(currentCard, 'repeatable') ?? 1;
    return repeatCount > 0 && diff === optionals.length * repeatCount;
}

function appendAutoTarget(table: PlayingSelectorTable): TargetListMapper | undefined {
    const selector = table.selector;
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const effect = getEffectAt(getCardEffects(currentCard, isResponse(selector)), index);

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
    case 'conditional_player':
        if (!table.alive_players.some(target => checkPlayerFilter(table, effect.player_filter, getPlayer(table, target)))) {
            return appendTarget(effect.target, null);
        }
        break;
    case 'adjacent_players':
        if (index >= targets.length) {
            return reserveTargets(effect.target, 2);
        }
        break;
    case 'cards':
    case 'select_cubes':
        if (index >= targets.length) {
            return reserveTargets(effect.target, effect.target_value);
        }
        break;
    case 'cards_other_players':
        if (index >= targets.length) {
            const cardIsNotBlack = (card: CardId) => getCardColor(getCard(table, card)) !== 'black';
            const playerHasCards = (player: Player) => player.pockets.player_hand.length !== 0 || player.pockets.player_table.some(cardIsNotBlack);
            const numTargetable = countIf(table.alive_players, target =>
                target !== table.self_player && target !== selector.selection.context.skipped_player
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
function handleAutoTargets(table: PlayingSelectorTable): TargetSelector {
    const selector = table.selector;
    if (isAutoConfirmable(table)) {
        if (selector.selection.mode === 'modifier') {
            return handleAutoSelect({ ...table, selector: setSelectorMode(addModifierContext(selector), 'start')});
        } else {
            return setSelectorMode(selector, 'finish');
        }
    }

    const mapper = appendAutoTarget(table);
    if (mapper) {
        return handleAutoTargets({ ...table, selector: editSelectorTargets(selector, mapper) });
    } else {
        return selector;
    }
}

function handleSelectPlayingCard(table: GameTable, card: KnownCard): TargetSelector {
    const selector = table.selector;
    const selection = isSelectionPlaying(table.selector) ? table.selector.selection : newPlayCardSelection();

    if (isEquipCard(card)) {
        return {
            ...selector,
            selection: {
                ...selection,
                playing_card: card,
                mode: card.cardData.equip_target.length === 0
                    ? 'finish' : 'equip'
            },
            prompt: { type: 'none' }
        };
    } else if (card.cardData.modifier.type === 'none') {
        return handleAutoTargets({ ...table, selector: {
            ...selector,
            selection: {
                ...selection,
                playing_card: card,
                mode: 'target'
            },
            prompt: { type: 'none' }
        }});
    } else {
        return handleAutoTargets({ ...table, selector: {
            ...selector,
            selection: {
                ...selection,
                modifiers: selection.modifiers.concat({ modifier: card, targets: [] }),
                mode: 'modifier'
            },
            prompt: { type: 'none' }
        }});
    }
}

function handleAutoSelect(table: GameTable): TargetSelector {
    const selector = table.selector;
    const cardId = getAutoSelectCard(table);
    if (cardId) {
      const card = getCard(table, cardId);
      if (selectorCanPlayCard(selector, card)) {
        return handleSelectPlayingCard(table, card);
      }
    }
    return selector;
}

const targetSelectorReducer = createUnionReducer<GameTable, SelectorUpdate, TargetSelector>({
    setRequest (request) {
        return handleAutoSelect({ ...this, selector: newTargetSelector(request) });
    },

    setPrompt (prompt) {
        return { ...this.selector, prompt };
    },

    confirmPlay () {
        checkSelectionPlaying(this.selector);
        return setSelectorMode(editSelectorTargets(this.selector, targets => targets.slice(0, getNextTargetIndex(targets))), 'finish');
    },

    undoSelection () {
        return handleAutoSelect({
            ...this,
            selector: {
                ...this.selector,
                prompt: { type: 'none' },
                selection: { mode: 'start' }
            }
        });
    },

    selectPlayingCard ( card ) {
        return handleSelectPlayingCard(this, card);
    },

    selectPickCard (card) {
        return {
            ...this.selector,
            selection: {
                picked_card: card.id,
                mode: 'finish'
            }
        };
    },

    addCardTarget (card) {
        checkSelectionPlaying(this.selector);
        return handleAutoTargets({ ...this, selector: editSelectorTargets(this.selector, appendCardTarget(this.selector, card.id))});
    },

    addPlayerTarget (player) {
        checkSelectionPlaying(this.selector);
        return handleAutoTargets({...this, selector: editSelectorTargets(this.selector, appendPlayerTarget(this.selector, player.id))});
    },

    addEquipTarget (player) {
        if (this.selector.selection.mode !== 'equip') {
            throw new Error('TargetSelector: not in equipping mode');
        }
        return {
            ...this.selector,
            selection: {
                ...this.selector.selection,
                targets: [{ player: player.id }],
                mode: 'finish'
            },
        };
    }
    
});

export default targetSelectorReducer;