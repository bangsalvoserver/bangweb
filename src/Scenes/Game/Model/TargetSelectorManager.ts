import { Dispatch } from "react";
import { Card, GameTable, Player, getCard, getPlayer } from "./GameTable";
import { PlayingSelectorTable, isResponse, isSelectionPicking, isSelectionPlaying, isValidCardTarget, isValidEquipTarget, isValidPlayerTarget, selectorCanPickCard, selectorCanPlayCard } from "./TargetSelector";
import { SelectorUpdate } from "./TargetSelectorReducer";
import { GameChannel } from "./UseGameState";

export function handleClickCard(table: GameTable, selectorDispatch: Dispatch<SelectorUpdate>, card: Card) {
    const selector = table.selector;
    switch (selector.selection.mode) {
    case 'target':
    case 'modifier': {
        let cardTarget = card;
        if (card.pocket?.name == 'player_character') {
            cardTarget = getCard(table, getPlayer(table, card.pocket.player).pockets.player_character[0]);
        }
        if (isValidCardTarget(table as PlayingSelectorTable, cardTarget)) {
            selectorDispatch({ addCardTarget: cardTarget });
        }
        break;
    }
    case 'start': {
        const canPlay = selectorCanPlayCard(selector, card);
        if (isResponse(selector)) {
            const canPick = selectorCanPickCard(table, card);
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

export function handleClickPlayer(table: GameTable, selectorDispatch: Dispatch<SelectorUpdate>, player: Player) {
    switch (table.selector.selection.mode) {
    case 'target':
    case 'modifier':
        if (isValidPlayerTarget(table as PlayingSelectorTable, player)) {
            selectorDispatch({ addPlayerTarget: player });
        }
        break;
    case 'equip':
        if (isValidEquipTarget(table as PlayingSelectorTable, player)) {
            selectorDispatch({ addEquipTarget: player });
        }
    }
}

export function handleSendGameAction(table: GameTable, channel: GameChannel) {
    const selector = table.selector;
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