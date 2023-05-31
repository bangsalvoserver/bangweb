import { Dispatch, SetStateAction } from "react";
import { GameUpdate } from "./GameUpdateHandler";
import { AnimationBase, DispatchAnimation, GameAnimation } from "./GameAnimation";
import { AnimationUpdate, FlashCardUpdate, GameString, Milliseconds, ShortPauseUpdate } from "../../Messages/GameUpdate";

export class Game {

    private queuedUpdates: any[] = [];
    private animations: GameAnimation[] = [];

    private tableDispatch: Dispatch<GameUpdate>;
    private setGameLogs: Dispatch<SetStateAction<GameString[]>>;

    private updateHandlers = new Map<string, (update: any) => void>([
        ['game_error', this.handleGameError],
        ['game_log', this.handleGameLog],
        ['game_prompt', this.handleGamePrompt],
        ['flash_card', this.handleFlashCard],
        ['short_pause', this.handleShortPause],
        ['play_sound', this.handlePlaySound]
    ]);

    constructor(tableDispatch: Dispatch<any>, setGameLogs: Dispatch<SetStateAction<GameString[]>>) {
        this.tableDispatch = tableDispatch;
        this.setGameLogs = setGameLogs;
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

                    console.log(JSON.stringify(update));

                    const handler = this.updateHandlers.get(updateType);
                    if (handler) {
                        handler.call(this, updateValue);
                    } else {
                        this.tableDispatch({ updateType, updateValue });
                    }
                    if (typeof(updateValue) == 'object' && 'duration' in updateValue) {
                        this.animations.push(new AnimationBase(updateValue.duration as Milliseconds));
                    }
                } else {
                    break;
                }
            } else {
                const anim = this.animations[0];
                anim.tick(tickTime);
                if (anim.done()) {
                    tickTime = anim.extraTime();

                    anim.end();
                    this.animations.shift();
                } else {
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
}