import { Dispatch, SetStateAction, useCallback, useEffect, useReducer, useRef, useState } from "react";
import { createUnionFunction } from "../../../Utils/UnionUtils";
import { GameAction } from "./GameAction";
import { Duration, GameString, GameUpdate, Milliseconds, PlayerId } from "./GameUpdate";
import targetSelectorReducer, { SelectorUpdate } from "./TargetSelectorReducer";
import { FRAMERATE, useInterval, useTimeout } from "../../../Utils/UseInterval";
import { useReducerRef } from "../../../Utils/LazyRef";
import gameTableReducer from "./GameTableReducer";
import { newGameTable } from "./GameTable";
import { newTargetSelector } from "./TargetSelector";
import { UserId } from "../../../Messages/ServerMessage";

export interface GameChannel {
    getNextUpdate: () => GameUpdate | undefined;
    sendGameAction: (action: GameAction) => void;
}

export function useGameState(channel: GameChannel, myUserId?: UserId) {
    const [table, tableDispatch, tableRef] = useReducerRef(gameTableReducer, myUserId, newGameTable);
    const [selector, selectorDispatch] = useReducer(targetSelectorReducer, tableRef, newTargetSelector);
    const [gameLogs, setGameLogs] = useState<GameString[]>([]);
    const [gameError, setGameError] = useState<GameString>();

    const clearGameError = () => {
        if (gameError) setGameError(undefined);
    };
    useTimeout(clearGameError, 5000, [gameError])

    const updateTimeout = useRef<number>();
    useEffect(() => () => clearTimeout(updateTimeout.current), []);

    const tick = (timeElapsed: Milliseconds) => {
        const setAnimation = (update: Duration, endUpdate: GameUpdate | null) => {
            const duration = update.duration - timeElapsed;
            if (duration <= 0) {
                if (endUpdate) tableDispatch(endUpdate);
            } else {
                const startTime = Date.now();
                updateTimeout.current = setTimeout(() => {
                    const extraTime = Date.now() - startTime - duration;
                    if (endUpdate) tableDispatch(endUpdate);
                    updateTimeout.current = undefined;
                    tick(extraTime);
                }, duration);
            }
        };
        
        const context: GameUpdateContext = { tableDispatch, selectorDispatch, setGameLogs, setGameError, setAnimation };
        while (!updateTimeout.current) {
            const update = channel.getNextUpdate();
            if (update) {
                handleUpdate(context, update);
            } else {
                break;
            }
        }
    };

    useInterval(tick, 1000 / FRAMERATE, []);

    return { table, selector, selectorDispatch, gameLogs, gameError, clearGameError };
}

interface GameUpdateContext {
    tableDispatch: Dispatch<GameUpdate>;
    selectorDispatch: Dispatch<SelectorUpdate>;
    setGameLogs: Dispatch<SetStateAction<GameString[]>>;
    setGameError: Dispatch<GameString>;
    setAnimation: (update: Duration, endUpdate: GameUpdate | null) => void;
}

const handleUpdate = createUnionFunction<GameUpdateContext, GameUpdate>({

    game_error(message) {
        this.setGameError(message);
        this.selectorDispatch({ undoSelection: {} });
    },

    game_log(message) {
        this.setGameLogs(logs => logs.concat(message));
    },

    game_prompt(message) {
        this.selectorDispatch({ setPrompt: { type: 'yesno', message, response: false } });
    },

    play_sound(sound) {
        // TODO
    },

    add_cards(update) {
        this.tableDispatch({ add_cards: update });
    },

    remove_cards(update) {
        this.tableDispatch({ remove_cards: update });
    },

    player_add(update) {
        this.tableDispatch({ player_add: update });
    },

    player_order(update) {
        this.tableDispatch({ player_order: update });
        this.setAnimation(update, { player_order_end: update });
    },

    player_hp(update) {
        this.tableDispatch({ player_hp: update });
        this.setAnimation(update, { player_animation_end: update.player });
    },

    player_gold(update) {
        this.tableDispatch({ player_gold: update });
    },

    player_show_role(update) {
        this.tableDispatch({ player_show_role: update });
        this.setAnimation(update, { player_animation_end: update.player });
    },

    player_flags(update) {
        this.tableDispatch({ player_flags: update });
    },

    switch_turn(update) {
        this.tableDispatch({ switch_turn: update });
    },

    move_card(update) {
        this.tableDispatch({ move_card: update });
        this.setAnimation(update, { move_card_end: update });
    },

    deck_shuffled(update) {
        this.tableDispatch({ deck_shuffled: update });
        this.setAnimation(update, { deck_shuffled_end: update });
    },

    show_card(update) {
        this.tableDispatch({ show_card: update });
        this.setAnimation(update, { card_animation_end: update.card });
    },

    hide_card(update) {
        this.tableDispatch({ hide_card: update });
        this.setAnimation(update, { card_animation_end: update.card });
    },

    tap_card(update) {
        this.tableDispatch({ tap_card: update });
        this.setAnimation(update, { card_animation_end: update.card });
    },

    flash_card(update) {
        this.tableDispatch({ flash_card: update });
        this.setAnimation(update, { card_animation_end: update.card });
    },

    short_pause(update) {
        this.tableDispatch({ short_pause: update });
        this.setAnimation(update, update.card ? { card_animation_end: update.card } : null);
    },

    add_cubes(update) {
        this.tableDispatch({ add_cubes: update });
    },

    move_cubes(update) {
        this.tableDispatch({ move_cubes: update });
        this.setAnimation(update, { move_cubes_end: update });
    },

    move_train(update) {
        this.tableDispatch({ move_train: update });
        this.setAnimation(update, { move_train_end: update });
    },

    game_flags(update) {
        this.tableDispatch({ game_flags: update });
    },

    request_status(status) {
        this.selectorDispatch({ setRequest: status });
    },

    status_ready(status) {
        this.selectorDispatch({ setRequest: status });
    },

    status_clear() {
        this.selectorDispatch({ setRequest: {} });
    },

    clear_logs() {
        this.setGameLogs([]);
    }

});