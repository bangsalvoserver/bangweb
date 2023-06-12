import { createUnionReducer } from "../../../Utils/UnionUtils";
import { Card, Player } from "./GameTable";
import { GamePrompt, RequestStatusUnion, TargetMode, TargetSelector, newPlayCardSelection, newTargetSelector } from "./TargetSelector";

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

function handleAutoTargets(selector: TargetSelector) {
    return selector;
}

function handleSelectPlayingCard(selector: TargetSelector, card: Card) {
    if ('modifier' in card.cardData) {
        const selection = 'targets' in selector.selection ? selector.selection : newPlayCardSelection();
        
        if (card.cardData.modifier.type == 'none') {
            return handleAutoTargets({
                ...selector,
                selection: { ...selection, playing_card: card },
                mode: TargetMode.target
            });
        } else {
            return handleAutoTargets({
                ...selector,
                selection: { ...selection,
                    modifiers: selection.modifiers.concat({ modifier: card, targets: [] })
                },
                mode: TargetMode.modifier
            });
        }
    } else {
        throw new Error('Cannot select unknown card');
    }
}

function handleAutoSelect(selector: TargetSelector) {
    if ('auto_select' in selector.request && selector.request.auto_select) {
        if (selector.request.respond_cards.length == 1 && selector.request.pick_cards.length == 0) {
            // const table = newGameTable(); // TODO find solution
            // return handleSelectPlayingCard(selector, getCard(table, selector.request.respond_cards[0].card));
        }
    }
    return selector;
}

const targetSelectorReducer = createUnionReducer<TargetSelector, SelectorUpdate>({
    setRequest (request) {
        return handleAutoSelect(newTargetSelector(request));
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
        return handleSelectPlayingCard(this, card);
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
        return this;
    },

    addPlayerTarget (player) {
        return this;
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