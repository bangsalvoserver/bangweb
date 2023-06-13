import { Dispatch } from "react";
import { checkPlayerFilter, getCardColor, isEquipCard, isPlayerAlive } from "./Filters";
import { Card, GameTable, Player, getCard, getPlayer, isCardKnown } from "./GameTable";
import { GameChannel } from "./GameUpdateHandler";
import { PlayingSelector, RequestSelector, TargetMode, TargetSelector, getCardEffects, getCurrentCardAndTargets, getEffectAt, getNextTargetIndex, isCardCurrent, isResponse, isSelectionPicking, isSelectionPlaying, isValidCardTarget, isValidEquipTarget, isValidPlayerTarget, selectorCanPickCard, selectorCanPlayCard } from "./TargetSelector";
import { SelectorUpdate } from "./TargetSelectorReducer";
import { CardId } from "./GameUpdate";

export function handleClickCard(table: GameTable, selector: TargetSelector, selectorDispatch: Dispatch<SelectorUpdate>, card: Card) {
    switch (selector.mode) {
    case TargetMode.target:
    case TargetMode.modifier: {
        let cardTarget: Card | undefined;
        switch (card.pocket?.name) {
        case 'player_character':
            cardTarget = getCard(table, getPlayer(table, card.pocket.player).pockets.player_character[0]);
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
        if (isResponse(selector)) {
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

function handleConditionalAutoTargets(table: GameTable, selector: PlayingSelector, selectorDispatch: Dispatch<SelectorUpdate>) {
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    if (index < targets.length) return;

    // TODO handle auto_confirm
    
    const nextEffect = getEffectAt(getCardEffects(currentCard, isResponse(selector)), index);
    switch (nextEffect?.target) {
    case 'conditional_player': {
        if (!table.alive_players.some(target => checkPlayerFilter(table, selector, nextEffect.player_filter, getPlayer(table, target)))) {
            selectorDispatch({ appendTarget: { conditional_player: null }});
        }
        break;
    }
    case 'cards_other_players': {
        const numTargetable = table.alive_players.reduce((count, target) => {
            if (target != table.self_player && target != selector.selection.context.skipped_player) {
                const player = getPlayer(table, target);
                if (isPlayerAlive(player)) {
                    const cardIsNotBlack = (card: CardId) => getCardColor(getCard(table, card)) == 'black';
                    if (player.pockets.player_hand.length != 0 || player.pockets.player_table.some(cardIsNotBlack)) {
                        return count + 1;
                    }
                }
            }
            return count;
        }, 0);
        selectorDispatch({ appendTarget: { cards_other_players: Array<number>(numTargetable).fill(0) }});
        break;
    }
    }
}

export function handleAutoSelect(table: GameTable, selector: TargetSelector, selectorDispatch: Dispatch<SelectorUpdate>) {
    const selectCard = (cardId: CardId) => {
        const card = getCard(table, cardId);
        if (selectorCanPlayCard(selector, card)) {
            selectorDispatch({ selectPlayingCard: card });
        }
    };
    if (isSelectionPlaying(selector)) {
        switch (selector.mode) {
        case TargetMode.start:
            if (selector.selection.context.repeat_card) {
                selectCard(selector.selection.context.repeat_card);
            } else if (selector.selection.context.traincost) {
                selectCard(selector.selection.context.traincost);
            }
            break;
        case TargetMode.target:
        case TargetMode.modifier:
            handleConditionalAutoTargets(table, selector, selectorDispatch);
            break;
        }
    } else if (!isSelectionPicking(selector)) {
        if (isResponse(selector) && selector.request.auto_select) {
            if (selector.request.respond_cards.length == 1 && selector.request.pick_cards.length == 0) {
                selectCard(selector.request.respond_cards[0].card);
            }
        }
    }
}

export function handleSendGameAction(channel: GameChannel, selector: TargetSelector, bypass_prompt: boolean = true) {
    if (selector.mode == TargetMode.finish && (!('yesno' in selector.prompt) || bypass_prompt)) {
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