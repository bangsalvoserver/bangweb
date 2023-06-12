import { Dispatch } from "react";
import { isEquipCard } from "./Filters";
import { Card, GameTable, Player, getCard, getFirstCharacter } from "./GameTable";
import { TargetMode, TargetSelector, isValidCardTarget, isValidEquipTarget, isValidPlayerTarget, selectorCanPickCard, selectorCanPlayCard } from "./TargetSelector";
import { SelectorUpdate } from "./TargetSelectorReducer";
import { GameChannel } from "./GameUpdateHandler";

export function handleClickCard(table: GameTable, selector: TargetSelector, selectorDispatch: Dispatch<SelectorUpdate>, card: Card) {
    switch (selector.mode) {
    case TargetMode.target:
    case TargetMode.modifier: {
        let cardTarget: Card | undefined;
        switch (card.pocket?.name) {
        case 'player_character':
            cardTarget = getFirstCharacter(table, card.pocket.player);
            break;
        case 'player_table':
        case 'player_hand':
        case 'selection':
            cardTarget = card;
            break;
        }
        if (cardTarget && isValidCardTarget(table, selector, cardTarget)) {
            selectorDispatch({ addCardTarget: cardTarget });
        }
        break;
    }
    case TargetMode.start: {
        const canPlay = selectorCanPlayCard(selector, card);
        if ('respond_cards' in selector.request) {
            const canPick = selectorCanPickCard(table, selector, card);
            if (canPlay && canPick) {
                selectorDispatch({ setPrompt: { playpickundo: card }});
            } else if (canPlay) {
                selectorDispatch({ selectPlayingCard: card });
            } else if (canPick) {
                selectorDispatch({ selectPickCard: card });
            }
        } else if (canPlay) {
            if (isEquipCard(card)) {
                selectorDispatch({ selectEquipCard: card });
            } else {
                selectorDispatch({ selectPlayingCard: card });
            }
        }
    }
    }
}

export function handleClickPlayer(table: GameTable, selector: TargetSelector, selectorDispatch: Dispatch<SelectorUpdate>, player: Player) {
    switch (selector.mode) {
    case TargetMode.target:
    case TargetMode.modifier:
        if (isValidPlayerTarget(table, selector, player)) {
            selectorDispatch({ addPlayerTarget: player });
        }
        break;
    case TargetMode.equip:
        if (isValidEquipTarget(table, selector, player)) {
            selectorDispatch({ addEquipTarget: player });
        }
    }
}

export function handleAutoSelect(table: GameTable, selector: TargetSelector, selectorDispatch: Dispatch<SelectorUpdate>) {
    if (!('playing_card' in selector.selection) && !('picked_card' in selector.selection)) {
        if ('auto_select' in selector.request && selector.request.auto_select) {
            if (selector.request.respond_cards.length == 1 && selector.request.pick_cards.length == 0) {
                selectorDispatch({ selectPlayingCard: getCard(table, selector.request.respond_cards[0].card) });
            }
        }
    }
}

export function handleSendGameAction(channel: GameChannel, selector: TargetSelector, bypass_prompt: boolean = true) {
    if (selector.mode == TargetMode.finish && (!('yesno' in selector.prompt) || bypass_prompt)) {
        if ('picked_card' in selector.selection) {
            const card = selector.selection.picked_card;
            channel.sendGameAction({ pick_card: { card, bypass_prompt }});
        } else if ('playing_card' in selector.selection && selector.selection.playing_card) {
            const card = selector.selection.playing_card.id;
            const modifiers = selector.selection.modifiers.map(({modifier, targets}) => ({ card: modifier.id, targets }));
            const targets = selector.selection.targets;
            channel.sendGameAction({ play_card: { card, modifiers, targets, bypass_prompt}});
        }
    }
}