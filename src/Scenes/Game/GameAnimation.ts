export interface GameAnimation {
    tick(timeElapsed: number): void;
    end(): void;
    done(): boolean;
    extraTime(): number;
}

export class AnimationBase implements GameAnimation {
    private duration: number;
    private elapsed: number;

    constructor(duration: number) {
        this.duration = duration;
        this.elapsed = 0;
    }

    tick(timeElapsed: number): void {
        this.elapsed += timeElapsed;
    }

    end(): void { }

    done(): boolean {
        return this.elapsed >= this.duration;
    }
    extraTime(): number {
        return this.elapsed - this.duration;
    }
}