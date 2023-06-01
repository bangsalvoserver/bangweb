import { AnimationState } from "../../GameAnimation";
import { GameTable, PocketRef, getCard } from "../../GameTable";
import MoveCardAnimation from "./MoveCardAnimation";

export type GetPocketRectFunction = (pocket: PocketRef) => DOMRect | undefined;

export interface AnimationProps {
    state?: AnimationState;
    table: GameTable;
    getPocketRect: GetPocketRectFunction;
};

export interface AnimationRenderArgs {
    table: GameTable;
    getPocketRect: GetPocketRectFunction;
}

export default function AnimationView({ state, table, getPocketRect}: AnimationProps) {
    if (state) {
        if ('move_card' in state) {
            return <MoveCardAnimation
                getPocketRect={getPocketRect}
                card={getCard(table, state.move_card.card)}
                destPocket={state.move_card.destPocket}
                duration={state.move_card.duration}
            />
        }
    }
    return null;
}