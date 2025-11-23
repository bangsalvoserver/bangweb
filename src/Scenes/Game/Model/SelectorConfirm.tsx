import { Dispatch, DispatchWithoutAction, ReactNode, createContext, useContext, useEffect, useRef } from "react";
import { BangConnection } from "../../../Model/UseBangConnection";
import { GameStateContext } from "../GameScene";
import { GameAction } from "./GameAction";
import { Card, GameTable, Player } from "./GameTable";
import targetDispatch from "./TargetDispatch";
import { TargetSelector, isResponse, isValidCardTarget, isValidEquipTarget, isValidPlayerTarget, selectorCanConfirm, selectorCanPlayCard, selectorCanUndo } from "./TargetSelector";
import { SelectorUpdate } from "./TargetSelectorReducer";

function getSelectorGameAction(selector: TargetSelector): GameAction | undefined {
    const bypass_prompt = selector.prompt.type === 'yesno' && selector.prompt.response;
    if (selector.mode === 'finish' && (selector.prompt.type !== 'yesno' || bypass_prompt)) {
        return {
            card: selector.selection!.card.id,
            targets: selector.selection!.targets.map(targetDispatch.generateTarget),
            modifiers: selector.modifiers.map(({card, targets}) => ({ card: card.id, targets: targets.map(targetDispatch.generateTarget) })),
            timer_id: isResponse(selector) ? selector.request.timer?.timer_id : undefined,
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

const DEFAULT_SELECTOR_CONFIRM: SelectorConfirm = {
    handleClickCard: card => undefined,
    handleClickPlayer: player => undefined,
    handleConfirm: undefined,
    handleUndo: undefined,
};

export const SelectorConfirmContext = createContext<SelectorConfirm>(DEFAULT_SELECTOR_CONFIRM);

export function useSelectorConfirm() {
    return useContext(SelectorConfirmContext);
}

export interface SelectorConfirmProps {
    selectorDispatch: Dispatch<SelectorUpdate> | null;
    children: ReactNode;
}

export function SelectorConfirmProvider({ selectorDispatch, children }: SelectorConfirmProps) {
    const { table, selector } = useContext(GameStateContext);

    let selectorConfirm: SelectorConfirm = DEFAULT_SELECTOR_CONFIRM;

    if (selectorDispatch !== null
        && !table.status.flags.has('game_over')
        && table.self_player !== undefined
        && selector.mode !== 'finish'
        && selector.prompt.type === 'none'
    ) {
        const buildDispatch = (update: SelectorUpdate | undefined): OptionalDispatch => {
            if (update) return () => selectorDispatch(update);
        };

        selectorConfirm = {
            handleClickCard: card => buildDispatch(getClickCardUpdate(table, selector, card)),
            handleClickPlayer: player => buildDispatch(getClickPlayerUpdate(table, selector, player)),
            handleConfirm: buildDispatch(selectorCanConfirm(table, selector) ? { confirmSelection: {} } : undefined),
            handleUndo: buildDispatch(selectorCanUndo(selector) ? { undoSelection: {} } : undefined)
        } as const;
    }

    return <SelectorConfirmContext.Provider value={selectorConfirm}>
        {children}
    </SelectorConfirmContext.Provider>
};