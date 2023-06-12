import { GameAction } from "./GameAction";
import { GameUpdate } from "./GameUpdate";
import { TargetMode, TargetSelector } from "./TargetSelector";

export interface GameChannel {
    getNextUpdate: () => GameUpdate | undefined;
    sendGameAction: (action: GameAction) => void;
    handleReturnLobby: () => void;
}

export function sendGameAction(channel: GameChannel, selector: TargetSelector) {
    if (selector.mode == TargetMode.finish) {
        if ('picked_card' in selector.selection) {
            const card = selector.selection.picked_card;
            const bypass_prompt = 'yesno' in selector.prompt;
            channel.sendGameAction({ pick_card: { card, bypass_prompt }});
        } else if ('playing_card' in selector.selection && selector.selection.playing_card) {
            const card = selector.selection.playing_card.id;
            const modifiers = selector.selection.modifiers.map(({modifier, targets}) => ({ card: modifier.id, targets }));
            const targets = selector.selection.targets;
            const bypass_prompt = 'yesno' in selector.prompt;
            channel.sendGameAction({ play_card: { card, modifiers, targets, bypass_prompt}});
        }
    }
}