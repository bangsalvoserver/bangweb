import { Milliseconds } from "../../Messages/GameUpdate";
import { AnimationRenderArgs } from "./Components/Animations/AnimationView";

export type RenderFunction = (props: AnimationRenderArgs) => JSX.Element | null;
export interface AnimationState {
    duration: Milliseconds;
    elapsed: Milliseconds;

    end: () => void;
    render: RenderFunction;
}

export function newAnimation(duration: Milliseconds, end?: () => void, render?: RenderFunction): AnimationState {
    return {
        duration, elapsed: 0,
        end: end ?? (() => {}),
        render: render ?? (() => null)
    }
}