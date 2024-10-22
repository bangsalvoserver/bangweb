import { SetStateAction } from "react";
import { Empty } from "../../../Model/ServerMessage";
import { mapLast } from "../../../Utils/ArrayUtils";
import { createContextUnionReducer } from "../../../Utils/UnionUtils";
import { CardTarget } from "./CardTarget";
import { cardHasTag, isCardModifier, isEquipCard } from "./Filters";
import { Card, GameTable, KnownCard, Player, getCard, isCardKnown } from "./GameTable";
import { CardId, PlayerId } from "./GameUpdate";
import targetDispatch from "./TargetDispatch";
import { GamePrompt, RequestStatusUnion, TargetSelection, TargetSelector, TargetSelectorMode, getModifierContext, getTargetSelectorStatus, isCardCurrent, isCardPlayable, isResponse, newTargetSelector } from "./TargetSelector";

export type SelectorUpdate =
    { setRequest: RequestStatusUnion } |
    { setPrompt: GamePrompt } |
    { confirmSelection: Empty } |
    { undoSelection: Empty } |
    { selectPlayingCard: KnownCard } |
    { addCardTarget: Card } |
    { addPlayerTarget: Player } |
    { addEquipTarget: Player }
;

type TargetListMapper = SetStateAction<CardTarget[]>;

function mapSelection(selection: TargetSelection, mapper: TargetListMapper): TargetSelection {
    return {
        card: selection.card,
        targets: typeof(mapper) === 'function' ? mapper(selection.targets) : mapper
    }
};

function editSelectorTargets(selector: TargetSelector, mapper: TargetListMapper): TargetSelector {
    switch (selector.mode) {
    case 'preselect':
        return { ...selector, preselection: mapSelection(selector.preselection!, mapper) };
    case 'target':
        return { ...selector, selection: mapSelection(selector.selection!, mapper) };
    case 'modifier': 
        return { ...selector, modifiers: mapLast(selector.modifiers, mod => mapSelection(mod, mapper)) };
    default:
        throw new Error('TargetSelector: not in targeting mode');
    }
}

function appendCardTarget(selector: TargetSelector, card: CardId): TargetListMapper {
    const { effects, targets, index } = getTargetSelectorStatus(selector);
    return targets.slice(0, index).concat(targetDispatch.appendCardTarget(targets.at(index), effects[index], card));
}

function appendPlayerTarget(selector: TargetSelector, player: PlayerId): TargetListMapper {
    const { effects, targets, index } = getTargetSelectorStatus(selector);
    return targets.slice(0, index).concat(targetDispatch.appendPlayerTarget(targets.at(index), effects[index], player));
}

function setSelectorMode(selector: TargetSelector, mode: TargetSelectorMode): TargetSelector {
    return { ...selector, mode };
}

function handleSetRequest(table: GameTable, request: RequestStatusUnion): TargetSelector {
    const selector = newTargetSelector(request);
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
            return handleAutoTargets(table, {
                ...selector,
                mode: 'preselect',
                preselection: {
                    card: preselectCard,
                    targets: []
                }
            });
        }
    }
    return selector;
}

function handleAutoSelect(table: GameTable, selector: TargetSelector): TargetSelector {
    const cardId = getModifierContext(selector, 'playing_card') ?? getModifierContext(selector, 'repeat_card');
    if (cardId) {
        const card = getCard(table, cardId);
        if (!isCardCurrent(selector, card) && isCardKnown(card) && isCardPlayable(selector, card.id)) {
            return handleSelectPlayingCard(table, selector, card);
        }
    }
    return selector;
}

function handleEndPreselection(table: GameTable, selector: TargetSelector, remove: boolean = true): TargetSelector {
    if (selector.mode === 'preselect' && selector.preselection !== null) {
        if (isCardModifier(selector.preselection.card, isResponse(selector))) {
            return {
                ...selector,
                prompt: { type: 'none' },
                modifiers: [selector.preselection],
                preselection: remove ? null : selector.preselection,
                mode: 'middle'
            };
        } else {
            return handleAutoTargets(table, {
                ...selector,
                prompt: { type: 'none' },
                selection: selector.preselection,
                preselection: null,
                modifiers: [],
                mode: 'target'
            });
        }
    }
    return handleAutoTargets(table, selector);
}

function handleAutoTargets(table: GameTable, selector: TargetSelector): TargetSelector {
    const { effects, targets, index } = getTargetSelectorStatus(selector);

    if (index >= effects.length) {
        switch (selector.mode) {
        case 'preselect':
            return handleEndPreselection(table, selector, false);
        case 'target':
            return setSelectorMode(selector, 'finish');
        case 'modifier':
            return handleAutoSelect(table, setSelectorMode(selector, 'middle'));
        default:
            throw new Error('TargetSelector: not in targeting mode');
        }
    }

    if (index >= targets.length) {
        const value = targetDispatch.buildAutoTarget(table, selector, effects[index]);
        if (value) {
            return handleAutoTargets(table, editSelectorTargets(selector, targets.concat(value)));
        }
    }
    return selector;
}

function handleSelectPlayingCard(table: GameTable, selector: TargetSelector, card: KnownCard): TargetSelector {
    if (isEquipCard(card)) {
        return {
            ...selector,
            prompt: { type: 'none' },
            preselection: null,
            selection: { card, targets: [] },
            mode: card.cardData.equip_target.length === 0 ? 'finish' : 'equip'
        };
    } else if (isCardModifier(card, isResponse(selector))) {
        return handleAutoTargets(table, {
            ...selector,
            prompt: { type: 'none' },
            preselection: null,
            modifiers: selector.modifiers.concat({ card, targets: [] }),
            mode: 'modifier'
        });
    } else {
        return handleAutoTargets(table, {
            ...selector,
            prompt: { type: 'none' },
            preselection: null,
            selection: { card, targets: [] },
            mode: 'target'
        });
    }
}

function handleAddEquipTarget(selector: TargetSelector, player: PlayerId): TargetSelector {
    if (selector.mode !== 'equip') {
        throw new Error('TargetSelector: not in equipping mode');
    }
    return {
        ...selector,
        selection: {
            ...selector.selection!,
            targets: [{ player }]
        },
        mode: 'finish'
    };
}

const targetSelectorReducer = createContextUnionReducer<TargetSelector, GameTable, SelectorUpdate>({
    setRequest (table, request) {
        return handleSetRequest(table, request);
    },

    setPrompt (table, prompt) {
        return { ...this, prompt };
    },

    confirmSelection (table) {
        return handleAutoTargets(table, editSelectorTargets(this, targets => mapLast(targets, targetDispatch.confirmSelection)));
    },

    undoSelection (table) {
        return handleSetRequest(table, this.request);
    },

    selectPlayingCard (table, card) {
        return handleSelectPlayingCard(table, this, card);
    },

    addCardTarget (table, card) {
        return handleEndPreselection(table, editSelectorTargets(this, appendCardTarget(this, card.id)));
    },

    addPlayerTarget (table, player) {
        return handleEndPreselection(table, editSelectorTargets(this, appendPlayerTarget(this, player.id)));
    },

    addEquipTarget (table, player) {
        return handleAddEquipTarget(this, player.id);
    }
    
});

export default targetSelectorReducer;