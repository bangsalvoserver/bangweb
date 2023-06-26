import { ExtractKeys, FilteredKeys, KeysOfUnion, SpreadUnion, createUnionReducer } from "../../../Utils/UnionUtils";
import { CardTarget } from "./CardEnums";
import { cardHasTag, checkPlayerFilter, getCardColor, getTagValue, isEquipCard, isPlayerAlive } from "./Filters";
import { Card, GameTable, KnownCard, Player, getCard, getPlayer } from "./GameTable";
import { CardId } from "./GameUpdate";
import { EffectContext, GamePrompt, PlayingSelector, RequestStatusUnion, TargetSelector, checkSelectionPlaying, getAutoSelectCard, getCardEffects, getCurrentCardAndTargets, getEffectAt, getNextTargetIndex, getPlayableCards, isResponse, isSelectionPlaying, newPlayCardSelection, newTargetSelector, selectorCanPlayCard, zipCardTargets } from "./TargetSelector";

export type SelectorUpdate =
    { setRequest: { status: RequestStatusUnion, table: GameTable } } |
    { setPrompt: GamePrompt } |
    { confirmPlay: {} } |
    { undoSelection: { table: GameTable } } |
    { selectPlayingCard: { card: KnownCard, table: GameTable } } |
    { selectPickCard: Card } |
    { addCardTarget: { card: Card, table: GameTable } } |
    { addPlayerTarget: { player: Player, table: GameTable } } |
    { addEquipTarget: Player }
;

type TargetListMapper = (targets: CardTarget[]) => CardTarget[];

function editSelectorTargets(selector: PlayingSelector, table: GameTable, mapper: TargetListMapper): TargetSelector {
    switch (selector.selection.mode) {
    case 'target':
        return handleAutoTargets({
            ...selector,
            selection: {
                ...selector.selection,
                targets: mapper(selector.selection.targets)
            }
        }, table);
    case 'modifier':
        const lastModifier = selector.selection.modifiers.at(-1)!;
        const modifiers = selector.selection.modifiers.slice(0, -1)
            .concat({ modifier: lastModifier.modifier, targets: mapper(lastModifier.targets) });
        return handleAutoTargets({
            ...selector,
            selection: { ...selector.selection, modifiers }
        }, table);
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

function handleAutoTargets(selector: PlayingSelector, table: GameTable): TargetSelector {
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const [effects, optionals] = getCardEffects(currentCard, isResponse(selector));
    const repeatCount = getTagValue(currentCard, 'repeatable') ?? 1;

    const autoConfirm = (() => {
        if (optionals.length != 0 && index >= effects.length
            && (index - effects.length) % optionals.length == 0)
        {
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
        return index >= effects.length && repeatCount > 0
            && index - effects.length == optionals.length * repeatCount;
    })();

    if (autoConfirm) {
        if (selector.selection.mode == 'modifier') {
            return handleAutoSelect(addModifierContext(currentCard, targets, {
                ...selector,
                selection: {
                    ...selector.selection,
                    mode: 'start'
                }
            }), table);
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
        return editSelectorTargets(selector, table, appendTarget(nextEffect.target, {}));
    case 'extra_card':
        if (selector.selection.context.repeat_card) {
            return editSelectorTargets(selector, table, appendTarget(nextEffect.target, null));
        }
        break;
    case 'conditional_player': {
        if (!table.alive_players.some(target => checkPlayerFilter(table, selector, nextEffect.player_filter, getPlayer(table, target)))) {
            return editSelectorTargets(selector, table, appendTarget(nextEffect.target, null));
        }
        break;
    }
    case 'cards':
    case 'select_cubes':
        if (index >= targets.length) {
            return editSelectorTargets(selector, table, reserveTargets(nextEffect.target, nextEffect.target_value));
        }
        break;
    case 'cards_other_players':
        if (index >= targets.length) {
            let numTargetable = 0;
            for (const target of table.alive_players) {
                if (target != table.self_player && target != selector.selection.context.skipped_player) {
                    const player = getPlayer(table, target);
                    if (isPlayerAlive(player)) {
                        const cardIsNotBlack = (card: CardId) => getCardColor(getCard(table, card)) != 'black';
                        if (player.pockets.player_hand.length != 0 || player.pockets.player_table.some(cardIsNotBlack)) {
                            ++numTargetable;
                        }
                    }
                }
            }
            return editSelectorTargets(selector, table, reserveTargets(nextEffect.target, numTargetable));
        }
        break;
    }
    return selector;
}

function handleSelectPlayingCard(selector: TargetSelector, table: GameTable, card: KnownCard): TargetSelector {
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
            prompt: {}
        };
    } else if (card.cardData.modifier.type == 'none') {
        return handleAutoTargets({
            ...selector,
            selection: {
                ...selection,
                playing_card: card,
                mode: 'target'
            },
            prompt: {}
        }, table);
    } else {
        return handleAutoTargets({
            ...selector,
            selection: {
                ...selection,
                modifiers: selection.modifiers.concat({ modifier: card, targets: [] }),
                mode: 'modifier'
            },
            prompt: {}
        }, table);
    }
}

function handleAutoSelect(selector: TargetSelector, table: GameTable): TargetSelector {
    const cardId = getAutoSelectCard(selector);
    if (cardId) {
      const card = getCard(table, cardId);
      if (selectorCanPlayCard(selector, card)) {
        return handleSelectPlayingCard(selector, table, card);
      }
    }
    return selector;
}

const targetSelectorReducer = createUnionReducer<TargetSelector, SelectorUpdate>({
    setRequest ({ status, table }) {
        return handleAutoSelect(newTargetSelector(status), table);
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

    undoSelection ({ table }) {
        return handleAutoSelect({ ...this, prompt: {}, selection: { mode: 'start' }}, table);
    },

    selectPlayingCard ({ card, table }) {
        return handleSelectPlayingCard(this, table, card);
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

    addCardTarget ({ card, table }) {
        checkSelectionPlaying(this);
        const [currentCard, targets] = getCurrentCardAndTargets(this);
        const index = getNextTargetIndex(targets);
        const nextEffect = getEffectAt(getCardEffects(currentCard, isResponse(this)), index);

        switch (nextEffect?.target) {
        case 'card':
        case 'extra_card':
            return editSelectorTargets(this, table, appendTarget(nextEffect.target, card.id));
        case 'cards':
        case 'select_cubes':
        case 'cards_other_players':
            return editSelectorTargets(this, table, appendMultitarget(nextEffect.target, card.id));
        default:
            throw new Error('TargetSelector: cannot add card target');
        }
    },

    addPlayerTarget ({ player, table }) {
        checkSelectionPlaying(this);
        const [currentCard, targets] = getCurrentCardAndTargets(this);
        const index = getNextTargetIndex(targets);
        const nextEffect = getEffectAt(getCardEffects(currentCard, isResponse(this)), index);

        switch (nextEffect?.target) {
        case 'player':
        case 'conditional_player':
            return editSelectorTargets(this, table, appendTarget(nextEffect.target, player.id));
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