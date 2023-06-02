import { Dispatch, SetStateAction } from "react";
import { CardId, FlashCardUpdate, GameString, HideCardUpdate, Milliseconds, MoveCardUpdate, PlayerId, ShortPauseUpdate, ShowCardUpdate } from "../../Messages/GameUpdate";
import { GameUpdate } from "./GameUpdateHandler";
import { AnimationState } from "./GameAnimation";
import { getCard, newPocketRef } from "./GameTable";
import MoveCardAnimation from "./Components/Animations/MoveCardAnimation";
import { AnimationRenderArgs } from "./Components/Animations/AnimationView";

export class Game {

    private queuedUpdates: GameUpdate[] = [];
    private updateTimer: number = 0;

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
        if (this.updateTimer > 0) {
            this.updateTimer -= timeElapsed;
            if (this.updateTimer <= 0) {
                this.updateTimer = 0;
                this.setAnimationState(null);
                return;
            }
        }
        while (this.updateTimer == 0 && this.queuedUpdates.length > 0) {
            const {updateType, updateValue} = this.queuedUpdates.shift() as GameUpdate;

            const updateHandlers: Record<string, (update: any) => void> = {
                game_error: this.handleGameError,
                game_log: this.handleGameLog,
                game_prompt: this.handleGamePrompt,
                flash_card: this.handleFlashCard,
                short_pause: this.handleShortPause,
                play_sound: this.handlePlaySound,
                move_card: this.handleMoveCard,
                show_card: this.handleCardAnimation,
                hide_card: this.handleCardAnimation,
                tap_card: this.handleCardAnimation,
                player_show_role: this.handlePlayerAnimation,
            };

            if (updateType in updateHandlers) {
                updateHandlers[updateType].call(this, updateValue);
            }
            this.tableDispatch({ updateType, updateValue });

            if (typeof(updateValue) == 'object' && 'duration' in updateValue) {
                this.updateTimer = updateValue.duration as Milliseconds;
            }
        }
    }

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

    private handleShortPause({ card }: ShortPauseUpdate) {
        // TODO
    }

    private handlePlaySound(sound: string) {
        // TODO
    }

    private handleMoveCard({ card, player, pocket, duration }: MoveCardUpdate) {
        const destPocket = newPocketRef(pocket, player);
        this.queuedUpdates.unshift({ updateType: 'move_card_end', updateValue: { card: card, pocket: destPocket } });
        this.setAnimationState({ move_card: { card, destPocket, duration }});
    };

    private handleCardAnimation({ card }: { card: CardId }) {
        this.queuedUpdates.unshift({ updateType: 'card_animation_end', updateValue: { card } });
    }

    private handlePlayerAnimation({ player }: { player: PlayerId }) {
        this.queuedUpdates.unshift({ updateType: 'player_animation_end', updateValue: { player } });
    }
}