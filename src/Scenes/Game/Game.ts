import { Dispatch } from "react";
import { GameUpdate } from "./GameTable";
import { AnimationBase, GameAnimation } from "./GameAnimation";

export class Game {

    private queuedUpdates: any[] = [];
    private animations: GameAnimation[] = [];

    private tableDispatch: Dispatch<GameUpdate>;

    constructor(tableDispatch: Dispatch<any>) {
        this.tableDispatch = tableDispatch;
    }

    pushUpdate(update: any) {
        this.queuedUpdates.push(update);
    }

    tick(timeElapsed: number) {
        let tickTime = timeElapsed;
        while (true) {
            if (this.animations.length == 0) {
                if (this.queuedUpdates.length != 0) {
                    const update = this.queuedUpdates.shift();
                    const updateType = Object.keys(update)[0];
                    const updateValue = update[updateType];

                    this.tableDispatch({ updateType, updateValue });

                    if ('duration' in updateValue) {
                        this.animations.push(new AnimationBase(updateValue.duration as number));
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
}