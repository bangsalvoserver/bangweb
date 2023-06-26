import { Dispatch } from "react";
import { Card, GameTable, Player, getCard, getPlayer } from "./GameTable";
import { GameChannel } from "./GameUpdateHandler";
import { PlayingSelector, TargetSelector, isResponse, isSelectionPicking, isSelectionPlaying, isValidCardTarget, isValidEquipTarget, isValidPlayerTarget, selectorCanPickCard, selectorCanPlayCard } from "./TargetSelector";
import { SelectorUpdate } from "./TargetSelectorReducer";

export function handleClickCard(table: GameTable, selector: TargetSelector, selectorDispatch: Dispatch<SelectorUpdate>, card: Card) {
    switch (selector.selection.mode) {
    case 'target':
    case 'modifier': {
        let cardTarget = card;
        if (card.pocket?.name == 'player_character') {
            cardTarget = getCard(table, getPlayer(table, card.pocket.player).pockets.player_character[0]);
        }
        if (isValidCardTarget(table, selector as PlayingSelector, cardTarget)) {
            selectorDispatch({ addCardTarget: { card: cardTarget, table } });
        }
        break;
    }
    case 'start': {
        const canPlay = selectorCanPlayCard(selector, card);
        if (isResponse(selector)) {
            const canPick = selectorCanPickCard(table, selector, card);
            if (canPlay && canPick) {
                selectorDispatch({ setPrompt: { playpickundo: card }});
            } else if (canPlay) {
                selectorDispatch({ selectPlayingCard: { card, table } });
            } else if (canPick) {
                selectorDispatch({ selectPickCard: card });
            }
        } else if (canPlay) {
            selectorDispatch({ selectPlayingCard: { card, table } });
        }
    }
    }
}

export function handleClickPlayer(table: GameTable, selector: TargetSelector, selectorDispatch: Dispatch<SelectorUpdate>, player: Player) {
    switch (selector.selection.mode) {
    case 'target':
    case 'modifier':
        if (isValidPlayerTarget(table, selector as PlayingSelector, player)) {
            selectorDispatch({ addPlayerTarget: { player, table } });
        }
        break;
    case 'equip':
        if (isValidEquipTarget(table, selector as PlayingSelector, player)) {
            selectorDispatch({ addEquipTarget: player });
        }
    }
}

export function handleSendGameAction(channel: GameChannel, selector: TargetSelector) {
    const bypass_prompt = 'yesno' in selector.prompt && selector.prompt.yesno.response;
    if (selector.selection.mode == 'finish' && (!('yesno' in selector.prompt) || bypass_prompt)) {
        if (isSelectionPicking(selector)) {
            const card = selector.selection.picked_card;
            channel.sendGameAction({ pick_card: { card, bypass_prompt }});
        } else if (isSelectionPlaying(selector) && selector.selection.playing_card) {
            const card = selector.selection.playing_card.id;
            const modifiers = selector.selection.modifiers.map(({modifier, targets}) => ({ card: modifier.id, targets }));
            const targets = selector.selection.targets;
            channel.sendGameAction({ play_card: { card, modifiers, targets, bypass_prompt}});
        }
    }
}