import { Dispatch, SetStateAction } from "react";
import { CardIdUpdate, FlashCardUpdate, GameString, Milliseconds, MoveCardUpdate, PlayerIdUpdate, ShortPauseUpdate } from "../../Messages/GameUpdate";
import { GameUpdate } from "./GameUpdateHandler";
import { AnimationState } from "./Components/Animations/AnimationView";

export class Game {

    private queuedUpdates: GameUpdate[] = [];
    private updateTimer?: number;
    private updateOnEnd?: GameUpdate;

    private tableDispatch: Dispatch<GameUpdate>;
    private setGameLogs: Dispatch<SetStateAction<GameString[]>>;
    private setAnimationState: Dispatch<SetStateAction<AnimationState>>;

    constructor(
        tableDispatch: Dispatch<any>,
        setGameLogs: Dispatch<SetStateAction<GameString[]>>,
        setAnimationState: Dispatch<SetStateAction<AnimationState>>
    ) {
        this.tableDispatch = tableDispatch;
        this.setGameLogs = setGameLogs;
        this.setAnimationState = setAnimationState;
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
            this.setAnimationState(null);
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
        game_log: this.handleGameLog,
        game_prompt: this.handleGamePrompt,
        flash_card: this.handleFlashCard,
        play_sound: this.handlePlaySound,
        move_card: this.handleMoveCard,
        show_card: this.handleCardAnimation,
        hide_card: this.handleCardAnimation,
        tap_card: this.handleCardAnimation,
        short_pause: this.handleCardAnimation,
        player_show_role: this.handlePlayerAnimation,
    };

    private handleGameError(message: GameString) {
        // TODO
    }

    private handleGameLog(message: GameString) {
        this.setGameLogs(logs => logs.concat(message));
    }

    private handleGamePrompt(message: GameString) {
        // TODO
    }

    private handleFlashCard({ card }: FlashCardUpdate) {
        // TODO
    }

    private handlePlaySound(sound: string) {
        // TODO
    }

    private handleMoveCard({ card, player, pocket, duration }: MoveCardUpdate) {
        this.updateOnEnd = { updateType: 'move_card_end', updateValue: { card, player, pocket } };
        this.setAnimationState({ move_card: { card, player, pocket, duration }});
    };

    private handleCardAnimation({ card }: CardIdUpdate) {
        this.updateOnEnd = { updateType: 'card_animation_end', updateValue: { card } };
    }

    private handlePlayerAnimation({ player }: PlayerIdUpdate) {
        this.updateOnEnd = { updateType: 'player_animation_end', updateValue: { player } };
    }
}