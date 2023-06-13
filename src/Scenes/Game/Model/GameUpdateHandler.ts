import { Dispatch, SetStateAction } from "react";
import { createUnionFunction } from "../../../Utils/UnionUtils";
import { Duration, GameString, GameUpdate, Milliseconds } from "./GameUpdate";
import { SelectorUpdate } from "./TargetSelectorReducer";
import { GameAction } from "./GameAction";

export interface GameChannel {
    getNextUpdate: () => GameUpdate | undefined;
    pendingUpdates: () => boolean;
    sendGameAction: (action: GameAction) => void;
    handleReturnLobby: () => void;
}

export class GameUpdateHandler {
    
    private channel: GameChannel;
    private tableDispatch: Dispatch<GameUpdate>;
    private selectorDispatch: Dispatch<SelectorUpdate>;
    private setGameLogs: Dispatch<SetStateAction<GameString[]>>;

    private animation?: {
        timer: Milliseconds;
        endUpdate?: GameUpdate
    };

    constructor(
        channel: GameChannel,
        tableDispatch: Dispatch<GameUpdate>,
        selectorDispatch: Dispatch<SelectorUpdate>,
        setGameLogs: Dispatch<SetStateAction<GameString[]>>
    ) {
        this.channel = channel;
        this.tableDispatch = tableDispatch;
        this.selectorDispatch = selectorDispatch;
        this.setGameLogs = setGameLogs;
    }

    tick(timeElapsed: Milliseconds) {
        if (this.animation && (this.animation.timer -= timeElapsed) <= 0) {
            if (this.animation.endUpdate) {
                this.tableDispatch(this.animation.endUpdate);
            }
            delete this.animation;
        } else {
            let update: GameUpdate | undefined;
            while (!this.animation && (update = this.channel.getNextUpdate())) {
                this.handleUpdate(update);
            }
        }
    }

    pendingUpdates() {
        return this.animation !== undefined
            || this.channel.pendingUpdates();
    }

    private setAnimation(update: Duration, endUpdate?: GameUpdate) {
        if (update.duration <= 0) {
            if (endUpdate) {
                this.tableDispatch(endUpdate);
            }
        } else {
            this.animation = { timer: update.duration, endUpdate };
        }
    }

    private handleUpdate = createUnionFunction<GameUpdateHandler, GameUpdate>({

        game_error (message) {
            // TODO
            console.error(message.format_str);
            this.selectorDispatch({ undoSelection: {} });
        },

        game_log (message) {
            this.setGameLogs(logs => logs.concat(message));
        },

        game_prompt (message) {
            this.selectorDispatch({ setPrompt: { yesno: message }});
        },
        
        play_sound (sound) {
            // TODO
        },
        
        add_cards (update) {
            this.tableDispatch({ add_cards: update });
        },

        remove_cards (update) {
            this.tableDispatch({ remove_cards: update });
        },

        player_add (update) {
            this.tableDispatch({ player_add: update });
        },

        player_order (update) {
            this.tableDispatch({ player_order: update });
            this.setAnimation(update); // TODO
        },

        player_hp (update) {
            this.tableDispatch({ player_hp: update });
            this.setAnimation(update, { player_animation_end: update.player });
        },

        player_gold (update) {
            this.tableDispatch({ player_gold: update });
        },

        player_show_role (update) {
            this.tableDispatch({ player_show_role: update });
            this.setAnimation(update, { player_animation_end: update.player });
        },

        player_status (update) {
            this.tableDispatch({ player_status: update });
        },

        switch_turn (update) {
            this.tableDispatch({ switch_turn: update });
        },

        move_card (update) {
            this.tableDispatch({ move_card: update });
            this.setAnimation(update, { move_card_end: update });
        },

        deck_shuffled(update) {
            this.tableDispatch({ deck_shuffled: update });
            this.setAnimation(update, { deck_shuffled_end: update });
        },

        show_card (update) {
            this.tableDispatch({ show_card: update });
            this.setAnimation(update, { card_animation_end: update.card });
        },
        
        hide_card (update) {
            this.tableDispatch({ hide_card: update });
            this.setAnimation(update, { card_animation_end: update.card });
        },

        tap_card (update) {
            this.tableDispatch({ tap_card: update });
            this.setAnimation(update, { card_animation_end: update.card });
        },

        flash_card (update) {
            this.tableDispatch({ flash_card: update });
            this.setAnimation(update, { card_animation_end: update.card });
        },

        short_pause (update) {
            this.tableDispatch({ short_pause: update });
            this.setAnimation(update, update.card ? { card_animation_end: update.card } : undefined);
        },

        add_cubes (update) {
            this.tableDispatch({ add_cubes: update });
        },

        move_cubes (update) {
            this.tableDispatch({ move_cubes: update });
            this.setAnimation(update, { move_cubes_end: update });
        },

        move_scenario_deck (update) {
            this.tableDispatch({ move_scenario_deck: update });
            this.setAnimation(update, { move_scenario_deck_end: update });
        },

        move_train (update) {
            this.tableDispatch({ move_train: update });
            this.setAnimation(update); // TODO
        },

        game_flags (update) {
            this.tableDispatch({ game_flags: update });
        },
        
        request_status (status) {
            this.selectorDispatch({ setRequest: status });
        },

        status_ready (status) {
            this.selectorDispatch({ setRequest: status });
        },

        status_clear () {
            this.selectorDispatch({ setRequest: {}});
        },
        
    });

}