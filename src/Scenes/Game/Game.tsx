import { Dispatch, SetStateAction } from "react";
import { FlashCardUpdate, GameString, Milliseconds, MoveCardUpdate, ShortPauseUpdate } from "../../Messages/GameUpdate";
import { GameUpdate } from "./GameUpdateHandler";
import { AnimationState, newAnimation } from "./GameAnimation";
import { getCard, newPocketRef } from "./GameTable";
import MoveCardAnimation from "./Components/Animations/MoveCardAnimation";

export class Game {

    private queuedUpdates: any[] = [];
    private animations: AnimationState[] = [];

    private tableDispatch: Dispatch<GameUpdate>;
    private setGameLogs: Dispatch<SetStateAction<GameString[]>>;
    private setAnimationState: Dispatch<SetStateAction<AnimationState | undefined>>;

    constructor(
        tableDispatch: Dispatch<any>,
        setGameLogs: Dispatch<SetStateAction<GameString[]>>,
        setAnimationState: Dispatch<SetStateAction<AnimationState | undefined>>
    ) {
        this.tableDispatch = tableDispatch;
        this.setGameLogs = setGameLogs;
        this.setAnimationState = setAnimationState;
    }

    pushUpdate(update: any) {
        this.queuedUpdates.push(update);
    }

    tick(timeElapsed: Milliseconds) {
        let tickTime = timeElapsed;
        while (true) {
            if (this.animations.length == 0) {
                if (this.queuedUpdates.length != 0) {
                    const update = this.queuedUpdates.shift();
                    const updateType = Object.keys(update)[0];
                    const updateValue = update[updateType];

                    // console.log(JSON.stringify(update));

                    const updateHandlers: Record<string, (update: any) => void> = {
                        game_error: this.handleGameError,
                        game_log: this.handleGameLog,
                        game_prompt: this.handleGamePrompt,
                        flash_card: this.handleFlashCard,
                        short_pause: this.handleShortPause,
                        play_sound: this.handlePlaySound,
                        move_card: this.handleMoveCard,
                    };

                    if (updateType in updateHandlers) {
                        updateHandlers[updateType].call(this, updateValue);
                    } else {
                        this.tableDispatch({ updateType, updateValue });
                    }
                    if (updateType !== 'move_card') {
                        // TODO add handlers for every animation
                        if (typeof(updateValue) == 'object' && 'duration' in updateValue) {
                            this.animations.push(newAnimation(updateValue.duration as Milliseconds));
                        }
                    }
                } else {
                    break;
                }
            } else {
                const anim = {
                    ...this.animations[0],
                    elapsed: this.animations[0].elapsed + tickTime
                };
                if (anim.elapsed > anim.duration) {
                    tickTime = anim.elapsed - anim.duration;

                    anim.end();
                    this.setAnimationState(undefined);
                    this.animations.shift();
                } else {
                    this.animations[0] = anim;
                    this.setAnimationState(anim);
                    break;
                }
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

        this.tableDispatch({
            updateType:'move_card_begin',
            updateValue: { card }
        });
        this.animations.push(newAnimation(duration,
            () => this.tableDispatch({
                updateType: 'move_card_end',
                updateValue: { card: card, pocket: destPocket }
            }),
            ({table, getPocketRect, amount}) => {
                return (<MoveCardAnimation getPocketRect={getPocketRect} card={getCard(table, card)} destPocket={destPocket} amount={amount} />);
            }));
    };
}