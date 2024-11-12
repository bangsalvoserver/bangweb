import { Dispatch, DispatchWithoutAction, createContext, useEffect, useMemo, useRef } from "react";
import { BangConnection } from "../../../Model/UseBangConnection";
import { GameAction } from "./GameAction";
import { Card, GameTable, Player } from "./GameTable";
import { TargetSelector, isResponse, isValidCardTarget, isValidEquipTarget, isValidPlayerTarget, selectorCanConfirm, selectorCanPlayCard, selectorCanUndo } from "./TargetSelector";
import { SelectorUpdate } from "./TargetSelectorReducer";

function getSelectorGameAction(selector: TargetSelector): GameAction | undefined {
    const bypass_prompt = selector.prompt.type === 'yesno' && selector.prompt.response;
    if (selector.mode === 'finish' && (selector.prompt.type !== 'yesno' || bypass_prompt)) {
        return {
            card: selector.selection!.card.id,
            targets: selector.selection!.targets,
            modifiers: selector.modifiers.map(({card, targets}) => ({ card: card.id, targets })),
            timer_id: (isResponse(selector) && selector.request.timer?.timer_id) || null,
            bypass_prompt,
        };
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

function getClickCardUpdate(table: GameTable, selector: TargetSelector, card: Card): SelectorUpdate | undefined {
    switch (selector.mode) {
    case 'target':
    case 'modifier':
        if (isValidCardTarget(table, selector, card)) {
            return { addCardTarget: card };
        }
        break;
    case 'preselect':  {
        const canPlay = selectorCanPlayCard(selector, card);
        const canPick = isValidCardTarget(table, selector, card);
        if (canPlay && canPick) {
            return { setPrompt: { type: 'playpick', card }};
        } else if (canPlay) {
            return { selectPlayingCard: card };
        } else if (canPick) {
            return { addCardTarget: card };
        }
        break;
    }
    case 'start':
    case 'middle':
        if (selectorCanPlayCard(selector, card)) {
            return { selectPlayingCard: card };
        }
    }
}

function getClickPlayerUpdate(table: GameTable, selector: TargetSelector, player: Player): SelectorUpdate | undefined {
    switch (selector.mode) {
    case 'preselect':
    case 'target':
    case 'modifier':
        if (isValidPlayerTarget(table, selector, player)) {
            return { addPlayerTarget: player };
        }
        break;
    case 'equip':
        if (isValidEquipTarget(table, selector, player)) {
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

export function isClickAllowed(table: GameTable, selector: TargetSelector) {
    return !table.status.flags.includes('game_over')
        && table.self_player !== undefined
        && selector.mode !== 'finish'
        && selector.prompt.type === 'none';
}

export function useSelectorConfirm(table: GameTable, selector: TargetSelector, selectorDispatch: Dispatch<SelectorUpdate>): SelectorConfirm {
    return useMemo(() => {
        if (!isClickAllowed(table, selector)) return DEFAULT_SELECTOR_CONFIRM;
        
        const buildDispatch = (update: SelectorUpdate | undefined): OptionalDispatch => {
            if (update) return () => selectorDispatch(update);
        };

        return {
            handleClickCard: card => buildDispatch(getClickCardUpdate(table, selector, card)),
            handleClickPlayer: player => buildDispatch(getClickPlayerUpdate(table, selector, player)),
            handleConfirm: buildDispatch(selectorCanConfirm(selector) ? { confirmSelection: {} } : undefined),
            handleUndo: buildDispatch(selectorCanUndo(selector) ? { undoSelection: {} } : undefined)
        } as const;
    }, [table, selector, selectorDispatch]);
}