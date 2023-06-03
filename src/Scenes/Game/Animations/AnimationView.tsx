import { useEffect, useState } from "react";
import { MoveCardUpdate } from "../../../Messages/GameUpdate";
import { Card, GameTable, PocketRef, getCard, newPocketRef } from "../Model/GameTable";
import { CardTracker, PocketPosition } from "../PocketView";
import { Rect } from "../Rect";
import MoveCardAnimation from "./MoveCardAnimation";

export type AnimationState = {move_card: MoveCardUpdate} | null;

export interface AnimationProps {
    state?: AnimationState;
    table: GameTable;
    tracker: CardTracker;
};

export default function AnimationView({ state, table, tracker}: AnimationProps) {
    if (state) {
        if ('move_card' in state) {
            return <MoveCardAnimation
                tracker={tracker}
                card={getCard(table, state.move_card.card)}
                destPocket={newPocketRef(state.move_card.pocket, state.move_card.player)}
                duration={state.move_card.duration}
            />
        }
    }
    return null;
}