import { Dispatch, SetStateAction } from "react";
import { createUnionFunction } from "../../../Utils/UnionUtils";
import { GameString, GameUpdate, Milliseconds } from "./GameUpdate";
import { TargetSelectorUpdate } from "./TargetSelectorReducer";
import { GameAction } from "./GameAction";

export interface GameChannel {
  getNextUpdate: () => GameUpdate | undefined;
  sendGameAction: (action: GameAction) => void;
  handleReturnLobby: () => void;
};

export class GameUpdateHandler {
    
    private channel: GameChannel;
    private updateTimer?: number;
    private updateOnEnd?: GameUpdate;

    private tableDispatch: Dispatch<GameUpdate>;
    private selectorDispatch: Dispatch<TargetSelectorUpdate>;
    private setGameLogs: Dispatch<SetStateAction<GameString[]>>;

    constructor(
        channel: GameChannel,
        tableDispatch: Dispatch<GameUpdate>,
        selectorDispatch: Dispatch<TargetSelectorUpdate>,
        setGameLogs: Dispatch<SetStateAction<GameString[]>>
    ) {
        this.channel = channel;
        this.tableDispatch = tableDispatch;
        this.selectorDispatch = selectorDispatch;
        this.setGameLogs = setGameLogs;
    }

    tick(timeElapsed: Milliseconds) {
        if (this.updateTimer && (this.updateTimer -= timeElapsed) <= 0) {
            this.onEndAnimation();
        } else {
            let update: GameUpdate | undefined;
            while (!this.updateTimer && (update = this.channel.getNextUpdate())) {
                this.updateHandler(update);
                this.tableDispatch(update);
                
                const updateValue = Object.values(update)[0];
                if (typeof(updateValue) == 'object' && 'duration' in updateValue) {
                    this.updateTimer = updateValue.duration as Milliseconds;
                    if (this.updateTimer <= 0) {
                        this.onEndAnimation();
                    }
                }
            }
        }
    }

    private onEndAnimation () {
        if (this.updateOnEnd) {
            this.tableDispatch(this.updateOnEnd);
            this.updateOnEnd = undefined;
        }
        this.updateTimer = undefined;
    }

    private updateHandler = createUnionFunction<GameUpdateHandler, GameUpdate>({
        
        game_error (message) { /* TODO */ },
        game_prompt (message) { /* TODO */ },
        game_log (message) { this.setGameLogs(logs => logs.concat(message)); },

        play_sound (sound) { /* TODO */ },

        move_card ({card, player, pocket}) { this.updateOnEnd = { move_card_end: { card, player, pocket }}; },
        move_cubes ({ num_cubes, target_card }) { this.updateOnEnd = { move_cubes_end: { num_cubes, target_card } }; },
        deck_shuffled({ pocket }) { this.updateOnEnd = { deck_shuffled_end: { pocket } }; },
        move_scenario_deck ({ player, pocket }) { this.updateOnEnd = { move_scenario_deck_end: { player, pocket } }; },

        show_card ({ card }) { this.updateOnEnd = { card_animation_end: card }},
        hide_card ({ card }) { this.updateOnEnd = { card_animation_end: card }},
        tap_card ({ card }) { this.updateOnEnd = { card_animation_end: card }},
        flash_card ({ card }) { this.updateOnEnd = { card_animation_end: card }},
        short_pause ({ card }) { if (card) this.updateOnEnd = { card_animation_end: card }},

        player_show_role ({ player }) { this.updateOnEnd = { player_animation_end: player }},
        player_hp ({ player }) { this.updateOnEnd = { player_animation_end: player }},
        
        request_status (status) { this.selectorDispatch({ setRequest: status }); },
        status_ready (status) { this.selectorDispatch({ setRequest: status }); },
        status_clear () { this.selectorDispatch({ setRequest: {}}); },
        
    });

}