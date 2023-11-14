import { Dispatch } from "react";
import { Card, GameTable, Player, getCard, getPlayer } from "./GameTable";
import { GameChannel } from "./GameUpdateHandler";
import { PlayingSelector, TargetSelector, isResponse, isSelectionPicking, isSelectionPlaying, isValidCardTarget, isValidEquipTarget, isValidPlayerTarget, selectorCanPickCard, selectorCanPlayCard } from "./TargetSelector";
import { SelectorUpdate } from "./TargetSelectorReducer";

export function handleClickCard(selector: TargetSelector, selectorDispatch: Dispatch<SelectorUpdate>, card: Card) {
    const table = selector.table.current;
    switch (selector.selection.mode) {
    case 'target':
    case 'modifier': {
        let cardTarget = card;
        if (card.pocket?.name == 'player_character') {
            cardTarget = getCard(table, getPlayer(table, card.pocket.player).pockets.player_character[0]);
        }
        if (isValidCardTarget(selector as PlayingSelector, cardTarget)) {
            selectorDispatch({ addCardTarget: cardTarget });
        }
        break;
    }
    case 'start': {
        const canPlay = selectorCanPlayCard(selector, card);
        if (isResponse(selector)) {
            const canPick = selectorCanPickCard(selector, card);
            if (canPlay && canPick) {
                selectorDispatch({ setPrompt: { type: 'playpick', card }});
            } else if (canPlay) {
                selectorDispatch({ selectPlayingCard: card });
            } else if (canPick) {
                selectorDispatch({ selectPickCard: card });
            }
        } else if (canPlay) {
            selectorDispatch({ selectPlayingCard: card });
        }
    }
    }
}

export function handleClickPlayer(selector: TargetSelector, selectorDispatch: Dispatch<SelectorUpdate>, player: Player) {
    switch (selector.selection.mode) {
    case 'target':
    case 'modifier':
        if (isValidPlayerTarget(selector as PlayingSelector, player)) {
            selectorDispatch({ addPlayerTarget: player });
        }
        break;
    case 'equip':
        if (isValidEquipTarget(selector as PlayingSelector, player)) {
            selectorDispatch({ addEquipTarget: player });
        }
    }
}

export function handleSendGameAction(channel: GameChannel, selector: TargetSelector) {
    const bypass_prompt = selector.prompt.type == 'yesno' && selector.prompt.response;
    if (selector.selection.mode == 'finish' && (selector.prompt.type !== 'yesno' || bypass_prompt)) {
        const timer_id = isResponse(selector) && selector.request.timer?.timer_id || null;
        if (isSelectionPicking(selector)) {
            const card = selector.selection.picked_card;
            channel.sendGameAction({ pick_card: { card, bypass_prompt, timer_id }});
        } else if (isSelectionPlaying(selector) && selector.selection.playing_card) {
            const card = selector.selection.playing_card.id;
            const modifiers = selector.selection.modifiers.map(({modifier, targets}) => ({ card: modifier.id, targets }));
            const targets = selector.selection.targets;
            channel.sendGameAction({ play_card: { card, modifiers, targets, bypass_prompt, timer_id }});
        }
    }
}