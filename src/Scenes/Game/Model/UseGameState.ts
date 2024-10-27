import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Milliseconds, UserId } from "../../../Model/ServerMessage";
import { GameChannel } from "../../../Model/UseBangConnection";
import { createUnionDispatch, createUnionReducer } from "../../../Utils/UnionUtils";
import usePlaySound from "../../../Utils/UsePlaySound";
import { GameTable, newGameTable } from "./GameTable";
import gameTableReducer from "./GameTableReducer";
import { GameString, GameUpdate, TableUpdate } from "./GameUpdate";
import { newTargetSelector, TargetSelector } from "./TargetSelector";
import targetSelectorReducer, { SelectorUpdate } from "./TargetSelectorReducer";

export interface GameState {
    table: GameTable;
    selector: TargetSelector;
}

type GameStateUpdate = 
    { table_update: TableUpdate } |
    { selector_update: SelectorUpdate };

const gameStateReducer = createUnionReducer<GameState, GameStateUpdate>({
    table_update(update) {
        return { ...this, table: gameTableReducer(this.table, update) };
    },
    selector_update(update) {
        return { ...this, selector: targetSelectorReducer(this.selector, this.table, update) };
    }
});

export function newGameState(myUserId: UserId): GameState {
    return {
        table: newGameTable(myUserId),
        selector: newTargetSelector()
    };
}

export default function useGameState(gameChannel: GameChannel, myUserId: UserId, muteSounds: boolean) {
    const [state, stateDispatch] = useReducer(gameStateReducer, myUserId, newGameState);

    const [gameLogs, setGameLogs] = useState<GameString[]>([]);
    const [gameError, setGameError] = useState<GameString>();
    const gameUpdates = useRef<GameUpdate[]>([]);

    const playSound = usePlaySound(muteSounds);

    const clearGameError = useCallback(() => {
        if (gameError) setGameError(undefined);
    }, [gameError]);

    useEffect(() => {
        const timeout = setTimeout(clearGameError, 5000);
        return () => clearTimeout(timeout);
    }, [clearGameError]);
    
    const tableDispatch = (update: TableUpdate) => stateDispatch({ table_update: update });
    const selectorDispatch = (update: SelectorUpdate) => stateDispatch({ selector_update: update });

    const timeout = useRef<number>();
    const extraTime = useRef<Milliseconds>(0);

    useEffect(() => {
        const delayDispatch = (duration: Milliseconds, fn?: () => void) => {
            duration -= extraTime.current;
            if (duration <= 0) {
                if (fn) fn();
                extraTime.current = -duration;
            } else {
                const startTime = Date.now();
                timeout.current = setTimeout(() => {
                    const timeElapsed = Date.now() - startTime;
                    timeout.current = undefined;
                    if (fn) fn();
                    extraTime.current = timeElapsed - duration;
                    handleNextUpdate();
                }, duration);
            }
        };

        const handleUpdate = createUnionDispatch<GameUpdate>({
            game_error(message) {
                setGameError(message);
                selectorDispatch({ undoSelection: {} });
            },
        
            game_log(message) {
                setGameLogs(logs => logs.concat(message));
            },
        
            game_prompt(message) {
                selectorDispatch({ setPrompt: { type: 'yesno', message, response: false } });
            },
        
            play_sound(sound) {
                playSound(sound);
            },
        
            add_cards(update) {
                tableDispatch({ add_cards: update });
            },
        
            remove_cards(update) {
                tableDispatch({ remove_cards: update });
            },
        
            player_add(update) {
                tableDispatch({ player_add: update });
            },
        
            player_order(update) {
                tableDispatch({ player_order: update });
                delayDispatch(update.duration, () => tableDispatch({ player_order_end: update }));
            },
        
            player_hp(update) {
                tableDispatch({ player_hp: update });
                delayDispatch(update.duration, () => tableDispatch({ player_animation_end: update.player }));
            },
        
            player_gold(update) {
                tableDispatch({ player_gold: update });
            },
        
            player_show_role(update) {
                tableDispatch({ player_show_role: update });
                delayDispatch(update.duration, () => tableDispatch({ player_animation_end: update.player }));
            },
        
            player_flags(update) {
                tableDispatch({ player_flags: update });
            },
        
            switch_turn(update) {
                tableDispatch({ switch_turn: update });
            },
        
            move_card(update) {
                tableDispatch({ move_card: update });
                delayDispatch(update.duration, () => tableDispatch({ move_card_end: update }));
            },
        
            deck_shuffled(update) {
                tableDispatch({ deck_shuffled: update });
                delayDispatch(update.duration, () => tableDispatch({ deck_shuffled_end: update }));
            },
        
            show_card(update) {
                tableDispatch({ show_card: update });
                delayDispatch(update.duration, () => tableDispatch({ card_animation_end: update.card }));
            },
        
            hide_card(update) {
                tableDispatch({ hide_card: update });
                delayDispatch(update.duration, () => tableDispatch({ card_animation_end: update.card }));
            },
        
            tap_card(update) {
                tableDispatch({ tap_card: update });
                delayDispatch(update.duration, () => tableDispatch({ card_animation_end: update.card }));
            },
        
            flash_card(update) {
                tableDispatch({ flash_card: update });
                delayDispatch(update.duration, () => tableDispatch({ card_animation_end: update.card }));
            },
        
            short_pause({ card, duration }) {
                tableDispatch({ short_pause: { card, duration } });
                delayDispatch(duration, card ? () => tableDispatch({ card_animation_end: card }) : undefined);
            },
        
            add_cubes(update) {
                tableDispatch({ add_cubes: update });
            },
        
            move_cubes(update) {
                tableDispatch({ move_cubes: update });
                delayDispatch(update.duration, () => tableDispatch({ move_cubes_end: update }));
            },
        
            move_train(update) {
                tableDispatch({ move_train: update });
                delayDispatch(update.duration, () => tableDispatch({ move_train_end: update }));
            },
        
            game_flags(update) {
                tableDispatch({ game_flags: update });
            },
        
            request_status(status) {
                selectorDispatch({ setRequest: status });
            },
        
            status_ready(status) {
                selectorDispatch({ setRequest: status });
            },
        
            status_clear() {
                selectorDispatch({ setRequest: null });
            },
        
            clear_logs() {
                setGameLogs([]);
            }
        
        });

        const handleNextUpdate = () => {
            while (!timeout.current) {
                const update = gameUpdates.current.shift();
                if (!update) {
                    extraTime.current = 0;
                    break;
                }
                handleUpdate(update);
            }
        };

        gameChannel.subscribe(update => {
            gameUpdates.current.push(update);
            handleNextUpdate();
        });

        return gameChannel.unsubscribe;
    }, [gameChannel, playSound]);

    return { state, selectorDispatch, gameLogs, gameError, clearGameError } as const;
}