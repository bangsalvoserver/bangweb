import { UpdateFunction } from "../../../Model/SceneState";
import { Empty } from "../../../Model/ServerMessage";
import { createUnionReducer } from "../../../Utils/UnionUtils";
import { CardTarget } from "./CardEnums";
import { cardHasTag, isEquipCard } from "./Filters";
import { Card, GameTable, KnownCard, Player, getCard, isCardKnown, isCardModifier } from "./GameTable";
import { CardId, PlayerId } from "./GameUpdate";
import targetDispatch from "./TargetDispatch";
import { GamePrompt, PlayCardSelectionMode, RequestStatusUnion, TargetSelector, getModifierContext, getPlayableCards, getTargetSelectorStatus, isCardCurrent, isResponse, newPlayCardSelection, newTargetSelector } from "./TargetSelector";

export type SelectorUpdate =
    { setRequest: RequestStatusUnion } |
    { setPrompt: GamePrompt } |
    { confirmPlay: Empty } |
    { undoSelection: Empty } |
    { selectPlayingCard: KnownCard } |
    { addCardTarget: Card } |
    { addPlayerTarget: Player } |
    { addEquipTarget: Player }
;

type TargetListMapper = UpdateFunction<CardTarget[]>;

function editSelectorTargets(selector: TargetSelector, mapper: TargetListMapper): TargetSelector {
    switch (selector.selection.mode) {
    case 'preselect':
        return {
            ...selector,
            selection: {
                ...selector.selection,
                preselection: {
                    card: selector.selection.preselection!.card,
                    targets: mapper(selector.selection.preselection!.targets)
                }
            }
        };
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

function appendCardTarget(selector: TargetSelector, card: CardId): TargetListMapper {
    const { effects, targets, index } = getTargetSelectorStatus(selector);
    return _ => targets.slice(0, index).concat(targetDispatch.appendCardTarget(targets.at(index), effects[index], card));
}

function appendPlayerTarget(selector: TargetSelector, player: PlayerId): TargetListMapper {
    const { effects, targets, index } = getTargetSelectorStatus(selector);
    return _ => targets.slice(0, index).concat(targetDispatch.appendPlayerTarget(targets.at(index), effects[index], player));
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

function handlePreselect(table: GameTable): TargetSelector {
    const selector = table.selector;
    if (isResponse(selector)) {
        let preselectCard: KnownCard | undefined;
        for (const pair of selector.request.respond_cards) {
            const card = getCard(table, pair.modifiers.at(0) ?? pair.card);
            if (cardHasTag(card, 'preselect')) {
                if (!preselectCard) {
                    preselectCard = card;
                } else if (preselectCard.id !== card.id) {
                    throw new Error('Multiple preselect cards in response');
                }
            }
        }
        if (preselectCard) {
            return handleAutoTargets({
                ...table,
                selector: {
                    ...selector,
                    selection: {
                        ...selector.selection,
                        mode: 'preselect',
                        preselection: {
                            card: preselectCard,
                            targets: []
                        }
                    }
                }
            });
        }
    }
    return selector;
}

function handleAutoSelect(table: GameTable): TargetSelector {
    const selector = setSelectorMode(table.selector, 'middle');
    const cardId = getModifierContext(selector, 'playing_card') ?? getModifierContext(selector, 'repeat_card');
    if (cardId) {
        const card = getCard(table, cardId);
        if (!isCardCurrent(selector, card) && isCardKnown(card) && getPlayableCards(selector).includes(card.id)) {
            return handleSelectPlayingCard(table, card);
        }
    }
    return selector;
}

function handleEndPreselection(table: GameTable, remove: boolean = true): TargetSelector {
    const selector = table.selector;
    if (selector.selection.mode === 'preselect' && selector.selection.preselection !== null) {
        if (isCardModifier(selector.selection.preselection.card, isResponse(selector))) {
            return {
                ...selector,
                selection: {
                    ...selector.selection,
                    modifiers: [{
                        modifier: selector.selection.preselection.card,
                        targets: selector.selection.preselection.targets
                    }],
                    preselection: remove ? null : selector.selection.preselection,
                    mode: 'middle'
                }
            };
        } else {
            return handleAutoTargets({ ...table,
                selector: {
                    ...selector,
                    selection: {
                        playing_card: selector.selection.preselection.card,
                        targets: selector.selection.preselection.targets,
                        preselection: null,
                        modifiers: [],
                        mode: 'target'
                    }
                }
            })
        }
    }
    return handleAutoTargets(table);
}

function handleAutoTargets(table: GameTable): TargetSelector {
    const selector = table.selector;
    const { effects, targets, index } = getTargetSelectorStatus(selector);

    if (index >= effects.length) {
        switch (selector.selection.mode) {
        case 'preselect':
            return handleEndPreselection(table, false);
        case 'target':
            return setSelectorMode(selector, 'finish');
        case 'modifier':
            return handleAutoSelect(table);
        }
    }

    if (index >= targets.length) {
        const value = targetDispatch.buildAutoTarget(table, effects[index]);
        if (value) {
            return handleAutoTargets({ ...table, selector: editSelectorTargets(selector, _ => targets.concat(value)) });
        }
    }
    return selector;
}

function handleSelectPlayingCard(table: GameTable, card: KnownCard): TargetSelector {
    const selector = table.selector;
    const selection = selector.selection;

    if (isEquipCard(card)) {
        return {
            ...selector,
            selection: {
                ...selection,
                preselection: null,
                playing_card: card,
                mode: card.cardData.equip_target.length === 0
                    ? 'finish' : 'equip'
            },
            prompt: { type: 'none' }
        };
    } else if (isCardModifier(card, isResponse(selector))) {
        return handleAutoTargets({ ...table, selector: {
            ...selector,
            selection: {
                ...selection,
                preselection: null,
                modifiers: selection.modifiers.concat({ modifier: card, targets: [] }),
                mode: 'modifier'
            },
            prompt: { type: 'none' }
        }});
    } else {
        return handleAutoTargets({ ...table, selector: {
            ...selector,
            selection: {
                ...selection,
                preselection: null,
                playing_card: card,
                mode: 'target'
            },
            prompt: { type: 'none' }
        }});
    }
}

const targetSelectorReducer = createUnionReducer<GameTable, SelectorUpdate, TargetSelector>({
    setRequest (request) {
        return handlePreselect({ ...this, selector: newTargetSelector(request) });
    },

    setPrompt (prompt) {
        return { ...this.selector, prompt };
    },

    confirmPlay () {
        return handleAutoTargets({
            ...this,
            selector: editSelectorTargets(this.selector, targets => 
                targets.slice(0, -1).concat(targetDispatch.confirmSelection(targets[targets.length - 1])))
        });
    },

    undoSelection () {
        return handlePreselect({
            ...this,
            selector: {
                ...this.selector,
                prompt: { type: 'none' },
                selection: newPlayCardSelection('start')
            }
        });
    },

    selectPlayingCard ( card ) {
        return handleSelectPlayingCard(this, card);
    },

    addCardTarget (card) {
        return handleEndPreselection({ ...this, selector: editSelectorTargets(this.selector, appendCardTarget(this.selector, card.id))});
    },

    addPlayerTarget (player) {
        return handleEndPreselection({...this, selector: editSelectorTargets(this.selector, appendPlayerTarget(this.selector, player.id))});
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