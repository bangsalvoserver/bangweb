import { Dispatch, DispatchWithoutAction, createContext, useEffect, useMemo, useRef } from "react";
import { Card, GameTable, Player, getCard, getPlayer } from "./GameTable";
import { PlayingSelectorTable, TargetSelector, isResponse, isSelectionPicking, isSelectionPlaying, isValidCardTarget, isValidEquipTarget, isValidPlayerTarget, selectorCanConfirm, selectorCanPickCard, selectorCanPlayCard, selectorCanUndo } from "./TargetSelector";
import { SelectorUpdate } from "./TargetSelectorReducer";
import { GameAction } from "./GameAction";
import { BangConnection } from "../../../Model/UseBangConnection";

function getSelectorGameAction(selector: TargetSelector): GameAction | undefined {
    const bypass_prompt = selector.prompt.type === 'yesno' && selector.prompt.response;
    if (selector.selection.mode === 'finish' && (selector.prompt.type !== 'yesno' || bypass_prompt)) {
        const timer_id = (isResponse(selector) && selector.request.timer?.timer_id) || null;
        if (isSelectionPicking(selector)) {
            const card = selector.selection.picked_card;
            return { pick_card: { card, bypass_prompt, timer_id }};
        } else if (isSelectionPlaying(selector) && selector.selection.playing_card) {
            const card = selector.selection.playing_card.id;
            const modifiers = selector.selection.modifiers.map(({modifier, targets}) => ({ card: modifier.id, targets }));
            const targets = selector.selection.targets;
            return { play_card: { card, modifiers, targets, bypass_prompt, timer_id }};
        }
    }
}

export function useSendGameAction(selector: TargetSelector, connection: BangConnection) {
    const gameActionSent = useRef(false);
    useEffect(() => {
        if (gameActionSent.current) {
            gameActionSent.current = false;
        } else {
            const action = getSelectorGameAction(selector);
            if (action) {
                connection.sendMessage({ game_action: action });
                gameActionSent.current = true;
            }
        }
    }, [selector, connection]);
}

function getClickCardUpdate(table: GameTable, card: Card): SelectorUpdate | undefined {
    const selector = table.selector;
    switch (selector.selection.mode) {
    case 'target':
    case 'modifier': {
        let cardTarget = card;
        if (card.pocket?.name === 'player_character') {
            cardTarget = getCard(table, getPlayer(table, card.pocket.player).pockets.player_character[0]);
        }
        if (isValidCardTarget(table as PlayingSelectorTable, cardTarget)) {
            return { addCardTarget: cardTarget };
        }
        break;
    }
    case 'start': {
        const canPlay = selectorCanPlayCard(selector, card);
        if (isResponse(selector)) {
            const canPick = selectorCanPickCard(table, card);
            if (canPlay && canPick) {
                return { setPrompt: { type: 'playpick', card }};
            } else if (canPlay) {
                return { selectPlayingCard: card };
            } else if (canPick) {
                return { selectPickCard: card };
            }
        } else if (canPlay) {
            return { selectPlayingCard: card };
        }
    }
    }
}

function getClickPlayerUpdate(table: GameTable, player: Player): SelectorUpdate | undefined {
    switch (table.selector.selection.mode) {
    case 'target':
    case 'modifier':
        if (isValidPlayerTarget(table as PlayingSelectorTable, player)) {
            return { addPlayerTarget: player };
        }
        break;
    case 'equip':
        if (isValidEquipTarget(table as PlayingSelectorTable, player)) {
            return { addEquipTarget: player };
        }
    }
}

export type OptionalDispatch = DispatchWithoutAction | undefined;

export interface SelectorConfirm {
    handleClickCard: (card: Card) => OptionalDispatch;
    handleClickPlayer: (player: Player) => OptionalDispatch;
    handleConfirm: OptionalDispatch;
    handleUndo: OptionalDispatch;
}

export const DEFAULT_SELECTOR_CONFIRM: SelectorConfirm = {
    handleClickCard: card => undefined,
    handleClickPlayer: player => undefined,
    handleConfirm: undefined,
    handleUndo: undefined,
};

export const SelectorConfirmContext = createContext<SelectorConfirm>(DEFAULT_SELECTOR_CONFIRM);

export function useSelectorConfirm(table: GameTable, selectorDispatch: Dispatch<SelectorUpdate>): SelectorConfirm {
    return useMemo(() => {
        const buildDispatch = (update: SelectorUpdate | undefined): OptionalDispatch => {
            if (update) return () => selectorDispatch(update);
        };
        if (!table.status.flags.includes('game_over')
            && table.self_player !== undefined
            && table.selector.selection.mode !== 'finish'
            && table.selector.prompt.type === 'none')
        {
            return {
                handleClickCard: card => buildDispatch(getClickCardUpdate(table, card)),
                handleClickPlayer: player => buildDispatch(getClickPlayerUpdate(table, player)),
                handleConfirm: buildDispatch(selectorCanConfirm(table) ? { confirmPlay: {} } : undefined),
                handleUndo: buildDispatch(selectorCanUndo(table) ? { undoSelection: {} } : undefined)
            } as const;
        }
        return DEFAULT_SELECTOR_CONFIRM;
    }, [table, selectorDispatch]);
}