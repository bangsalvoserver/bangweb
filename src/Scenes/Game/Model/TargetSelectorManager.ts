import { Dispatch } from "react";
import { cardHasTag, checkPlayerFilter, getCardColor, isEquipCard, isPlayerAlive } from "./Filters";
import { Card, GameTable, Player, getCard, getPlayer } from "./GameTable";
import { CardId } from "./GameUpdate";
import { GameChannel } from "./GameUpdateHandler";
import { PlayingSelector, TargetMode, TargetSelector, getCardEffects, getCurrentCardAndTargets, getEffectAt, getNextTargetIndex, isAutoSelect, isResponse, isSelectionPicking, isSelectionPlaying, isValidCardTarget, isValidEquipTarget, isValidPlayerTarget, selectorCanPickCard, selectorCanPlayCard } from "./TargetSelector";
import { SelectorUpdate } from "./TargetSelectorReducer";

export function handleClickCard(table: GameTable, selector: TargetSelector, selectorDispatch: Dispatch<SelectorUpdate>, card: Card) {
    switch (selector.mode) {
    case TargetMode.target:
    case TargetMode.modifier: {
        let cardTarget = card;
        if (card.pocket?.name == 'player_character') {
            cardTarget = getCard(table, getPlayer(table, card.pocket.player).pockets.player_character[0]);
        }
        if (isValidCardTarget(table, selector as PlayingSelector, cardTarget)) {
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
        if (isValidPlayerTarget(table, selector as PlayingSelector, player)) {
            selectorDispatch({ addPlayerTarget: player });
        }
        break;
    case TargetMode.equip:
        if (isValidEquipTarget(table, selector as PlayingSelector, player)) {
            selectorDispatch({ addEquipTarget: player });
        }
    }
}

function handleConditionalAutoTargets(table: GameTable, selector: PlayingSelector, selectorDispatch: Dispatch<SelectorUpdate>) {
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    if (index < targets.length) return;
    
    const [effects, optionals] = getCardEffects(currentCard, isResponse(selector));

    if (optionals.length != 0
        && targets.length >= effects.length
        && (targets.length - effects.length) % optionals.length == 0) {

        if (cardHasTag(currentCard, 'auto_confirm')) {
            if (optionals.some(effect => effect.target == 'player'
                && !table.alive_players.some(target =>
                    checkPlayerFilter(table, selector, effect.player_filter, getPlayer(table, target)))))
            {
                selectorDispatch({ confirmPlay: {} });
                return;
            }
        }
        
        if (cardHasTag(currentCard, 'auto_confirm_red_ringo')) {
            let cubeSlots = 0;
            for (const cardId of getPlayer(table, table.self_player!).pockets.player_table) {
                const card = getCard(table, cardId);
                if (getCardColor(card) == 'orange') {
                    cubeSlots += 4 - card.num_cubes;
                }
            }
            if (currentCard.num_cubes <= 1 || cubeSlots <= 1) {
                selectorDispatch({ confirmPlay: {} });
                return;
            }
        }
    }
    
    const nextEffect = getEffectAt([effects, optionals], index);
    switch (nextEffect?.target) {
    case 'conditional_player': {
        if (!table.alive_players.some(target => checkPlayerFilter(table, selector, nextEffect.player_filter, getPlayer(table, target)))) {
            selectorDispatch({ appendTarget: { conditional_player: null }});
        }
        break;
    }
    case 'cards_other_players': {
        let numTargetable = 0;
        for (const target of table.alive_players) {
            if (target != table.self_player && target != selector.selection.context.skipped_player) {
                const player = getPlayer(table, target);
                if (isPlayerAlive(player)) {
                    const cardIsNotBlack = (card: CardId) => getCardColor(getCard(table, card)) != 'black';
                    if (player.pockets.player_hand.length != 0 || player.pockets.player_table.some(cardIsNotBlack)) {
                        ++numTargetable;
                    }
                }
            }
        }
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
    } else if (!isSelectionPicking(selector) && isAutoSelect(selector)) {
        selectCard(selector.request.respond_cards[0].card);
    }
}

export function handleSendGameAction(channel: GameChannel, selector: TargetSelector) {
    const bypass_prompt = 'yesno' in selector.prompt && selector.prompt.yesno.response;
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