import { createUnionReducer } from "../../../Utils/UnionUtils";
import { Card, Player } from "./GameTable";
import { GamePrompt, RequestStatusUnion, TargetMode, TargetSelector, newTargetSelector } from "./TargetSelector";

export type SelectorUpdate =
    { setRequest: RequestStatusUnion } |
    { setPrompt: GamePrompt } |
    { undoSelection: {}} |
    { selectPlayingCard: Card } |
    { selectPickCard: Card } |
    { selectEquipCard: Card } |
    { addCardTarget: Card } |
    { addPlayerTarget: Player } |
    { addEquipTarget: Player } |
    { confirmPlay: {}};

const targetSelectorReducer = createUnionReducer<TargetSelector, SelectorUpdate>({
    setRequest (request) {
        return newTargetSelector(request);
    },

    setPrompt (prompt) {
        return { ...this, prompt };
    },

    undoSelection () {
        return {
            ...this,
            selection: {},
            mode: TargetMode.start
        };
    },

    selectPickCard (card) {
        return {
            ...this,
            selection: { picked_card: card.id },
            mode: TargetMode.finish
        };
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
    },
    
});

export default targetSelectorReducer;