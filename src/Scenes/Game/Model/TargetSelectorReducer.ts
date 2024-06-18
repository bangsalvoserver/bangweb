import { UpdateFunction } from "../../../Model/SceneState";
import { Empty } from "../../../Model/ServerMessage";
import { countIf, sum } from "../../../Utils/ArrayUtils";
import { FilteredKeys, SpreadUnion, createUnionReducer } from "../../../Utils/UnionUtils";
import { CardTarget, TagType } from "./CardEnums";
import { cardHasTag, checkCardFilter, checkPlayerFilter, getCardColor, isEquipCard } from "./Filters";
import { Card, GameTable, KnownCard, Player, getCard, getPlayer, isCardKnown } from "./GameTable";
import { CardId, PlayerId } from "./GameUpdate";
import { GamePrompt, PlayCardSelectionMode, RequestStatusUnion, TargetSelector, countSelectableCubes, countTargetsSelectedCubes, getAutoSelectCard, getCardEffects, getCardModifierType, getCurrentCardAndTargets, getNextTargetIndex, getPlayableCards, isCardCurrent, isResponse, isStatusReady, newPlayCardSelection, newTargetSelector } from "./TargetSelector";

export type SelectorUpdate =
    { setRequest: RequestStatusUnion } |
    { setPrompt: GamePrompt } |
    { confirmPlay: Empty } |
    { dismissSelection: Empty } |
    { undoSelection: Empty } |
    { selectPlayingCard: KnownCard } |
    { selectPickCard: Card } |
    { addCardTarget: Card } |
    { addPlayerTarget: Player } |
    { addEquipTarget: Player }
;

type TargetListMapper = UpdateFunction<CardTarget[]>;

function editSelectorTargets(selector: TargetSelector, mapper: TargetListMapper): TargetSelector {
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

function appendCardTarget(selector: TargetSelector, card: CardId): TargetListMapper {
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const effect = getCardEffects(currentCard, isResponse(selector)).at(index);

    switch (effect?.target) {
    case 'card':
    case 'extra_card':
        return appendTarget(effect.target, card);
    case 'cards':
    case 'select_cubes':
    case 'select_cubes_optional':
    case 'select_cubes_repeat':
    case 'select_cubes_players':
    case 'cards_other_players':
    case 'move_cube_slot':
    case 'max_cards':
        return appendMultitarget(effect.target, card);
    default:
        throw new Error('TargetSelector: cannot add card target');
    }
}

function appendPlayerTarget(selector: TargetSelector, player: PlayerId): TargetListMapper {
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const effect = getCardEffects(currentCard, isResponse(selector)).at(index);

    switch (effect?.target) {
    case 'player':
    case 'conditional_player':
        return appendTarget(effect.target, player);
    case 'adjacent_players':
    case 'player_per_cube':
        return appendMultitarget(effect.target, player);
    default:
        throw new Error('TargetSelector: cannot add player target');
    }
}

function addModifierContext(selector: TargetSelector): TargetSelector {
    const [modifier, targets] = getCurrentCardAndTargets(selector);
    const editContext = (source: {}): TargetSelector => {
        return {
            ...selector,
            selection: {
                ...selector.selection,
                context: Object.assign(selector.selection.context, source)
            }
        };
    };
    switch (getCardModifierType(modifier, isResponse(selector))) {
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
        return editContext({ skipped_player: (targets[0] as { player: PlayerId }).player});
    }
    return selector;
}

function appendAutoTarget(table: GameTable): TargetListMapper | undefined {
    const selector = table.selector;
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const effects = getCardEffects(currentCard, isResponse(selector));
    const effect = effects.at(index);

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
    case 'player_per_cube':
        if (index >= targets.length) {
            const numCubes = countTargetsSelectedCubes(currentCard, targets, effects, _ => true);
            return reserveTargets(effect.target, numCubes + 1);
        }
        break;
    case 'cards':
    case 'select_cubes':
        if (index >= targets.length) {
            return reserveTargets(effect.target, effect.target_value);
        }
        break;
    case 'select_cubes_optional':
        if (index >= targets.length) {
            if (countSelectableCubes(table) >= effect.target_value) {
                return reserveTargets(effect.target, effect.target_value);
            } else {
                return appendTarget(effect.target, []);
            }
        }
        break;
    case 'select_cubes_repeat':
        if (index >= targets.length) {
            const cubeCount = countSelectableCubes(table);
            const maxCount = cubeCount - cubeCount % effect.target_value;
            return reserveTargets(effect.target, maxCount);
        }
        break;
    case 'select_cubes_players':
        if (index >= targets.length) {
            const cubeCount = countSelectableCubes(table);
            const numPlayers = countIf(table.alive_players, target => checkPlayerFilter(table, effect.player_filter, getPlayer(table, target)));
            const maxCount = Math.min(cubeCount, numPlayers - 1);
            return reserveTargets(effect.target, maxCount);
        }
        break;
    case 'max_cards':
        if (index >= targets.length) {
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
            return reserveTargets(effect.target, countTargetableCards);
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
    case 'move_cube_slot':
        if (index >= targets.length) {
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
            return reserveTargets(effect.target, Math.min(effect.target_value, cubeSlots, characterCubes));
        }
        break;
    }
}

function setSelectorMode(selector: TargetSelector, mode: PlayCardSelectionMode): TargetSelector {
    return {
        ...selector,
        selection: {
            ...selector.selection,
            mode
        }
    };
}
function handleAutoTargets(table: GameTable): TargetSelector {
    const selector = table.selector;
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const effects = getCardEffects(currentCard, isResponse(selector));
    const index = getNextTargetIndex(targets);

    if (index === effects.length) {
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
    const selection = selector.selection;

    if (isEquipCard(card)) {
        const newSelector: TargetSelector = {
            ...selector,
            selection: {
                ...selection,
                playing_card: card,
                mode: 'equip'
            },
            prompt: { type: 'none' }
        };
        if (card.cardData.equip_target.length === 0) {
            return handleAddEquipTarget({ ...table, selector: newSelector }, getPlayer(table, table.self_player!));
        } else {
            return newSelector;
        }
    } else if (getCardModifierType(card, isResponse(selector)) === null) {
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

function getBasePlayableCards(selector: TargetSelector) {
    if (isResponse(selector)) {
        return selector.request.respond_cards;
    } else if (isStatusReady(selector)) {
        return selector.request.play_cards;
    } else {
        throw new Error('TargetSelector: cannot');
    }
}

function selectTaggedCard(table: GameTable, tag: TagType): TargetSelector {
    const origin_card = getBasePlayableCards(table.selector)
        .map(card => getCard(table, card.card))
        .find(card => cardHasTag(card, tag));
    if (!origin_card || !isCardKnown(origin_card)) {
        throw new Error('TargetSelector: cannot find card tagged ' + tag);
    }
    return handleSelectPlayingCard(table, origin_card);
}

function handleSelectPickCard(table: GameTable, card: Card): TargetSelector {
    let selector = selectTaggedCard(table, 'pick');
    selector = editSelectorTargets(selector, appendCardTarget(selector, card.id));
    return handleAutoTargets({ ...table, selector });
}

function handleAddEquipTarget(table: GameTable, player: Player): TargetSelector {
    if (table.selector.selection.mode !== 'equip') {
        throw new Error('TargetSelector: not in equipping mode');
    }
    const equip_card = table.selector.selection.playing_card;
    if (equip_card == null) {
        throw new Error('TargetSelector: no equip card selected');
    }
    let selector = table.selector;
    selector = {
        ...selector,
        selection: {
            ...selector.selection,
            playing_card: null,
            mode: selector.selection.modifiers.length === 0 ? 'none' : 'start'
        }
    };
    selector = selectTaggedCard({ ...table, selector }, 'equip');
    selector = editSelectorTargets(selector, appendCardTarget(selector, equip_card.id));
    selector = editSelectorTargets(selector, appendPlayerTarget(selector, player.id));
    return handleAutoTargets({ ...table, selector });
}

function handleDismiss(table: GameTable): TargetSelector {
    const selector: TargetSelector = {
        ...table.selector,
        selection: newPlayCardSelection('none')
    };
    return selectTaggedCard({ ...table, selector }, 'resolve');
}

function confirmTarget(targets: CardTarget[]): CardTarget[] {
    const lastTarget = targets.at(-1);
    if (lastTarget) {
        const [key, value] = Object.entries(lastTarget)[0];
        if (Array.isArray(value)) {
            const zeroIndex = value.indexOf(0);
            if (zeroIndex === 0) {
                switch (key) {
                case 'select_cubes_repeat':
                    return targets.slice(0, -1).concat({ select_cubes_repeat: [] });
                case 'select_cubes_optional':
                    return targets.slice(0, -1).concat({ select_cubes_optional: [] });
                case 'select_cubes_players':
                    return targets.slice(0, -1).concat({ select_cubes_players: [] });
                default:
                    return targets.slice(0, -1);
                }
            } else if (zeroIndex > 0) {
                return targets.slice(0, -1).concat({ [key]: value.slice(0, zeroIndex) } as CardTarget);
            }
        }
    }
    return targets;
}

function handleAutoSelect(table: GameTable): TargetSelector {
    const selector = table.selector;
    const cardId = getAutoSelectCard(table);
    if (cardId) {
      const card = getCard(table, cardId);
      if (isCardKnown(card) && !isCardCurrent(selector, card)) {
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
        return handleAutoTargets({
            ...this,
            selector: editSelectorTargets(this.selector, confirmTarget)
        });
    },

    dismissSelection () {
        return handleDismiss(this);
    },

    undoSelection () {
        return handleAutoSelect({
            ...this,
            selector: {
                ...this.selector,
                prompt: { type: 'none' },
                selection: newPlayCardSelection('none')
            }
        });
    },

    selectPlayingCard ( card ) {
        return handleSelectPlayingCard(this, card);
    },

    selectPickCard (card) {
        return handleSelectPickCard(this, card);
    },

    addCardTarget (card) {
        return handleAutoTargets({ ...this, selector: editSelectorTargets(this.selector, appendCardTarget(this.selector, card.id))});
    },

    addPlayerTarget (player) {
        return handleAutoTargets({...this, selector: editSelectorTargets(this.selector, appendPlayerTarget(this.selector, player.id))});
    },

    addEquipTarget (player) {
        return handleAddEquipTarget(this, player);
    }
    
});

export default targetSelectorReducer;