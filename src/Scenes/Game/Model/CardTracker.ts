import { MapRef } from "../../../Utils/UseMapRef";
import { Rect } from "../../../Utils/Rect";
import { PocketType } from "./CardEnums";
import { Card, PocketRef } from "./GameTable";
import { CardId, PlayerId } from "./GameUpdate";

export interface PocketPosition {
    getPocketRect: () => Rect | null;
    getCardRect: (card: CardId) => Rect | null;
}

export type PocketPositionMap = MapRef<PocketType, PocketPosition>;

export type PlayerRef = {
    getPlayerRect: () => Rect | null
    getPocket: (pocket: PocketType) => PocketPosition | null,
};

export interface CardTracker {
    getPlayerPockets: (player: PlayerId) => PlayerRef | null;
    getTablePocket: (pocket: PocketRef) => PocketPosition | null;
    getCubesRect: (card: Card | null) => Rect | null;
}