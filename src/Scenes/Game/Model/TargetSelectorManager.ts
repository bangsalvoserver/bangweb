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

function buildHandleClickCard(table: GameTable, selectorDispatch: Dispatch<SelectorUpdate>, card: Card): OptionalDispatch {
    const selector = table.selector;
    switch (selector.selection.mode) {
    case 'target':
    case 'modifier': {
        let cardTarget = card;
        if (card.pocket?.name === 'player_character') {
            cardTarget = getCard(table, getPlayer(table, card.pocket.player).pockets.player_character[0]);
        }
        if (isValidCardTarget(table as PlayingSelectorTable, cardTarget)) {
            return () => selectorDispatch({ addCardTarget: cardTarget });
        }
        break;
    }
    case 'start': {
        const canPlay = selectorCanPlayCard(selector, card);
        if (isResponse(selector)) {
            const canPick = selectorCanPickCard(table, card);
            if (canPlay && canPick) {
                return () => selectorDispatch({ setPrompt: { type: 'playpick', card }});
            } else if (canPlay) {
                return () => selectorDispatch({ selectPlayingCard: card });
            } else if (canPick) {
                return () => selectorDispatch({ selectPickCard: card });
            }
        } else if (canPlay) {
            return () => selectorDispatch({ selectPlayingCard: card });
        }
    }
    }
}

function buildHandleClickPlayer(table: GameTable, selectorDispatch: Dispatch<SelectorUpdate>, player: Player): OptionalDispatch | undefined {
    switch (table.selector.selection.mode) {
    case 'target':
    case 'modifier':
        if (isValidPlayerTarget(table as PlayingSelectorTable, player)) {
            return () => selectorDispatch({ addPlayerTarget: player });
        }
        break;
    case 'equip':
        if (isValidEquipTarget(table as PlayingSelectorTable, player)) {
            return () => selectorDispatch({ addEquipTarget: player });
        }
    }
}

export function useSelectorConfirm(table: GameTable, selectorDispatch: Dispatch<SelectorUpdate>): SelectorConfirm {
    return useMemo(() => {
        if (!table.status.flags.includes('game_over')
            && table.self_player !== undefined
            && table.selector.selection.mode !== 'finish'
            && table.selector.prompt.type === 'none')
        {
            return {
                handleClickCard: card => buildHandleClickCard(table, selectorDispatch, card),
                handleClickPlayer: player => buildHandleClickPlayer(table, selectorDispatch, player),
                handleConfirm: selectorCanConfirm(table) ? () => selectorDispatch({ confirmPlay: {} }) : undefined,
                handleUndo: selectorCanUndo(table) ? () => selectorDispatch({ undoSelection: {} }) : undefined
            } as const;
        }
        return DEFAULT_SELECTOR_CONFIRM;
    }, [table, selectorDispatch]);
}