import { Dispatch, SetStateAction, useCallback, useEffect, useReducer, useState } from "react";
import { UserId } from "../../../Model/ServerMessage";
import { createUnionReducer } from "../../../Utils/UnionUtils";
import { FRAMERATE } from "../../../Utils/UseUpdateEveryFrame";
import { GameAction } from "./GameAction";
import { newGameTable } from "./GameTable";
import gameTableReducer from "./GameTableReducer";
import { Duration, GameString, GameUpdate, Milliseconds, TableUpdate } from "./GameUpdate";
import { SelectorUpdate } from "./TargetSelectorReducer";

export type GetNextUpdate = () => GameUpdate | undefined;
export type SendGameAction = (action: GameAction) => void;

export function useGameState(getNextUpdate: GetNextUpdate, myUserId?: UserId) {
    const [table, tableDispatch] = useReducer(gameTableReducer, myUserId, newGameTable);
    const [gameLogs, setGameLogs] = useState<GameString[]>([]);
    const [gameError, setGameError] = useState<GameString>();

    const clearGameError = useCallback(() => {
        if (gameError) setGameError(undefined);
    }, [gameError]);

    useEffect(() => {
        const timeout = setTimeout(clearGameError, 5000);
        return () => clearTimeout(timeout);
    }, [clearGameError]);
    
    const selectorDispatch = (update: SelectorUpdate) => tableDispatch({ selector_update: update });

    useEffect(() => {
        let animationTimeout : number | undefined;

        const handleNextUpdate = (extraTime: Milliseconds) => {
            const context: GameUpdateContext = {
                tableDispatch, selectorDispatch, setGameLogs, setGameError,
                setAnimation: (update, endUpdate) => {
                    const duration = update.duration - extraTime;
                    if (duration <= 0) {
                        if (endUpdate) tableDispatch(endUpdate);
                        extraTime = -duration;
                    } else {
                        const startTime = Date.now();
                        animationTimeout = setTimeout(() => {
                            const timeElapsed = Date.now() - startTime;
                            if (endUpdate) tableDispatch(endUpdate);
                            animationTimeout = undefined;
                            handleNextUpdate(timeElapsed - duration);
                        }, duration);
                    }
                }
            };

            while (!animationTimeout) {
                const update = getNextUpdate();
                if (!update) break;
                handleUpdate(context, update);
            }
        };

        let startTime = Date.now();

        const tickDuration = 1000 / FRAMERATE;
        const updateInterval = setInterval(() => {
            const endTime = Date.now();
            handleNextUpdate(endTime - startTime - tickDuration);
            startTime = endTime;
        }, tickDuration);

        return () => {
            clearTimeout(animationTimeout);
            clearInterval(updateInterval);
        };
    }, [getNextUpdate]);

    return { table, selectorDispatch, gameLogs, gameError, clearGameError } as const;
}

interface GameUpdateContext {
    tableDispatch: Dispatch<TableUpdate>;
    selectorDispatch: Dispatch<SelectorUpdate>;
    setGameLogs: Dispatch<SetStateAction<GameString[]>>;
    setGameError: Dispatch<GameString>;
    setAnimation: (update: Duration, endUpdate: TableUpdate | null) => void;
}

const handleUpdate = createUnionReducer<GameUpdateContext, GameUpdate, void>({

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