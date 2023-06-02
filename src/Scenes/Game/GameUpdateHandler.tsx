import { Dispatch, SetStateAction } from "react";
import { CardIdUpdate, GameString, Milliseconds, MoveCardUpdate, PlayerIdUpdate, ShortPauseUpdate } from "../../Messages/GameUpdate";
import { GameUpdate } from "./GameTableDispatch";

export class GameUpdateHandler {

    private queuedUpdates: GameUpdate[] = [];
    private updateTimer?: number;
    private updateOnEnd?: GameUpdate;

    private tableDispatch: Dispatch<GameUpdate>;

    constructor(tableDispatch: Dispatch<any>) {
        this.tableDispatch = tableDispatch;
    }

    pushUpdate(update: GameUpdate) {
        this.queuedUpdates.push(update);
    }

    tick(timeElapsed: Milliseconds) {
        const onEndAnimation = () => {
            if (this.updateOnEnd) {
                this.tableDispatch(this.updateOnEnd);
                this.updateOnEnd = undefined;
            }
            this.updateTimer = undefined;
        };

        if (this.updateTimer && (this.updateTimer -= timeElapsed) <= 0) {
            onEndAnimation();
        } else {
            while (!this.updateTimer && this.queuedUpdates.length != 0) {
                const {updateType, updateValue} = this.queuedUpdates.shift() as GameUpdate;

                if (updateType in this.updateHandlers) {
                    this.updateHandlers[updateType].call(this, updateValue);
                }
                this.tableDispatch({ updateType, updateValue });
                
                if (typeof(updateValue) == 'object' && 'duration' in updateValue) {
                    this.updateTimer = updateValue.duration as Milliseconds;
                    if (this.updateTimer <= 0) {
                        onEndAnimation();
                    }
                }
            }
        }
    }

    private updateHandlers: Record<string, (update: any) => void> = {
        game_error: this.handleGameError,
        game_prompt: this.handleGamePrompt,
        play_sound: this.handlePlaySound,
        move_card: this.handleMoveCard,
        show_card: this.handleCardAnimation,
        hide_card: this.handleCardAnimation,
        tap_card: this.handleCardAnimation,
        flash_card: this.handleCardAnimation,
        short_pause: this.handleCardAnimation,
        player_show_role: this.handlePlayerAnimation,
    };

    private handleGameError(message: GameString) {
        // TODO
    }

    private handleGamePrompt(message: GameString) {
        // TODO
    }

    private handlePlaySound(sound: string) {
        // TODO
    }

    private handleMoveCard({ card, player, pocket, duration }: MoveCardUpdate) {
        this.updateOnEnd = { updateType: 'move_card_end', updateValue: { card, player, pocket } };
    };

    private handleCardAnimation({ card }: CardIdUpdate) {
        this.updateOnEnd = { updateType: 'card_animation_end', updateValue: { card } };
    }

    private handlePlayerAnimation({ player }: PlayerIdUpdate) {
        this.updateOnEnd = { updateType: 'player_animation_end', updateValue: { player } };
    }
}