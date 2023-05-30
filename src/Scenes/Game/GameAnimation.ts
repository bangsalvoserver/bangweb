import { Milliseconds } from "../../Messages/GameUpdate";

export interface GameAnimation {
    tick(timeElapsed: Milliseconds): void;
    end(): void;
    done(): boolean;
    extraTime(): Milliseconds;
}

export class AnimationBase implements GameAnimation {
    private duration: Milliseconds;
    private elapsed: Milliseconds;

    constructor(duration: Milliseconds) {
        this.duration = duration;
        this.elapsed = 0;
    }

    tick(timeElapsed: Milliseconds): void {
        this.elapsed += timeElapsed;
    }

    end(): void { }

    done(): boolean {
        return this.elapsed >= this.duration;
    }
    extraTime(): Milliseconds {
        return this.elapsed - this.duration;
    }
}