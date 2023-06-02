import { MoveCardUpdate } from "../../../../Messages/GameUpdate";
import { GameTable, PocketRef, getCard, newPocketRef } from "../../GameTable";
import { Rect } from "../PocketView";
import MoveCardAnimation from "./MoveCardAnimation";

export type GetPocketRectFunction = (pocket: PocketRef) => Rect | undefined;

export type AnimationState = {move_card: MoveCardUpdate} | null;

export interface AnimationProps {
    state?: AnimationState;
    table: GameTable;
    getPocketRect: GetPocketRectFunction;
};

export default function AnimationView({ state, table, getPocketRect}: AnimationProps) {
    if (state) {
        if ('move_card' in state) {
            return <MoveCardAnimation
                getPocketRect={getPocketRect}
                card={getCard(table, state.move_card.card)}
                destPocket={newPocketRef(state.move_card.pocket, state.move_card.player)}
                duration={state.move_card.duration}
            />
        }
    }
    return null;
}