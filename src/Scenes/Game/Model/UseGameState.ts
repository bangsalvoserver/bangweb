import { Dispatch, DispatchWithoutAction, SetStateAction, useCallback, useEffect, useReducer, useRef, useState } from "react";
import { UserId } from "../../../Model/ServerMessage";
import { GameUpdateObserver } from "../../../Model/UseBangConnection";
import { createUnionReducer } from "../../../Utils/UnionUtils";
import { newGameTable } from "./GameTable";
import gameTableReducer from "./GameTableReducer";
import { GameString, GameUpdate, Milliseconds, TableUpdate } from "./GameUpdate";
import { SelectorUpdate } from "./TargetSelectorReducer";

export function useGameState(observer: GameUpdateObserver, myUserId?: UserId) {
    const [table, tableDispatch] = useReducer(gameTableReducer, myUserId, newGameTable);
    const [gameLogs, setGameLogs] = useState<GameString[]>([]);
    const [gameError, setGameError] = useState<GameString>();
    const gameUpdates = useRef<GameUpdate[]>([]);

    const clearGameError = useCallback(() => {
        if (gameError) setGameError(undefined);
    }, [gameError]);

    useEffect(() => {
        const timeout = setTimeout(clearGameError, 5000);
        return () => clearTimeout(timeout);
    }, [clearGameError]);
    
    const selectorDispatch = (update: SelectorUpdate) => tableDispatch({ selector_update: update });

    useEffect(() => {
        let timeout : number | undefined;
        let extraTime: Milliseconds = 0;

        const delayDispatch = (duration: Milliseconds, fn?: DispatchWithoutAction) => {
            duration -= extraTime;
            if (duration <= 0) {
                if (fn) fn();
                extraTime = -duration;
            } else {
                const startTime = Date.now();
                timeout = setTimeout(() => {
                    const timeElapsed = Date.now() - startTime;
                    timeout = undefined;
                    if (fn) fn();
                    extraTime = timeElapsed - duration;
                    handleNextUpdate();
                }, duration);
            }
        };

        const handleNextUpdate = () => {
            while (!timeout) {
                const update = gameUpdates.current.shift();
                if (!update) {
                    extraTime = 0;
                    break;
                }
                handleUpdate({ tableDispatch, selectorDispatch, setGameLogs, setGameError, delayDispatch }, update);
            }
        };

        observer.subscribe(update => {
            gameUpdates.current.push(update);
            handleNextUpdate();
        });

        return () => {
            clearTimeout(timeout);
            observer.unsubscribe();
        }
    }, [observer]);

    return { table, selectorDispatch, gameLogs, gameError, clearGameError } as const;
}

interface GameUpdateContext {
    tableDispatch: Dispatch<TableUpdate>;
    selectorDispatch: Dispatch<SelectorUpdate>;
    setGameLogs: Dispatch<SetStateAction<GameString[]>>;
    setGameError: Dispatch<GameString>;
    delayDispatch: (duration: Milliseconds, fn?: DispatchWithoutAction) => void;
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
        this.delayDispatch(update.duration, () => this.tableDispatch({ player_order_end: update }));
    },

    player_hp(update) {
        this.tableDispatch({ player_hp: update });
        this.delayDispatch(update.duration, () => this.tableDispatch({ player_animation_end: update.player }));
    },

    player_gold(update) {
        this.tableDispatch({ player_gold: update });
    },

    player_show_role(update) {
        this.tableDispatch({ player_show_role: update });
        this.delayDispatch(update.duration, () => this.tableDispatch({ player_animation_end: update.player }));
    },

    player_flags(update) {
        this.tableDispatch({ player_flags: update });
    },

    switch_turn(update) {
        this.tableDispatch({ switch_turn: update });
    },

    move_card(update) {
        this.tableDispatch({ move_card: update });
        this.delayDispatch(update.duration, () => this.tableDispatch({ move_card_end: update }));
    },

    deck_shuffled(update) {
        this.tableDispatch({ deck_shuffled: update });
        this.delayDispatch(update.duration, () => this.tableDispatch({ deck_shuffled_end: update }));
    },

    show_card(update) {
        this.tableDispatch({ show_card: update });
        this.delayDispatch(update.duration, () => this.tableDispatch({ card_animation_end: update.card }));
    },

    hide_card(update) {
        this.tableDispatch({ hide_card: update });
        this.delayDispatch(update.duration, () => this.tableDispatch({ card_animation_end: update.card }));
    },

    tap_card(update) {
        this.tableDispatch({ tap_card: update });
        this.delayDispatch(update.duration, () => this.tableDispatch({ card_animation_end: update.card }));
    },

    flash_card(update) {
        this.tableDispatch({ flash_card: update });
        this.delayDispatch(update.duration, () => this.tableDispatch({ card_animation_end: update.card }));
    },

    short_pause(update) {
        const card = update.card;
        this.tableDispatch({ short_pause: update });
        this.delayDispatch(update.duration, card ? () => this.tableDispatch({ card_animation_end: card }) : undefined);
    },

    add_cubes(update) {
        this.tableDispatch({ add_cubes: update });
    },

    move_cubes(update) {
        this.tableDispatch({ move_cubes: update });
        this.delayDispatch(update.duration, () => this.tableDispatch({ move_cubes_end: update }));
    },

    move_train(update) {
        this.tableDispatch({ move_train: update });
        this.delayDispatch(update.duration, () => this.tableDispatch({ move_train_end: update }));
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