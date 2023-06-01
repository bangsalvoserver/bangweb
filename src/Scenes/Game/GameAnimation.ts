import { AnimationUpdate, CardId, Milliseconds } from "../../Messages/GameUpdate";
import { Card, PocketRef } from "./GameTable";

export interface MoveCardState extends AnimationUpdate {
    card: CardId;
    destPocket: PocketRef;
}

export type AnimationState = {move_card: MoveCardState} | null;