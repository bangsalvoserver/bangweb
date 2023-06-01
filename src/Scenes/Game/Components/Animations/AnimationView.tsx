import { AnimationState } from "../../GameAnimation";
import { GameTable, PocketRef } from "../../GameTable";

export type GetPocketRectFunction = (pocket: PocketRef) => DOMRect | undefined;

export interface AnimationProps {
    state?: AnimationState;
    table: GameTable;
    getPocketRect: GetPocketRectFunction;
};

export interface AnimationRenderArgs {
    table: GameTable;
    getPocketRect: GetPocketRectFunction;
    amount: number;
}

export default function AnimationView({ state, table, getPocketRect}: AnimationProps) {
    return state?.render({ table, getPocketRect, amount: state.elapsed / state.duration }) || null;
}