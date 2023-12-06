import { Rect } from "../../../Utils/Rect";
import { PocketType } from "./CardEnums";
import { Card, PocketId } from "./GameTable";
import { CardId, PlayerId } from "./GameUpdate";

export interface PocketRef {
    getPocketRect: () => Rect | null;
    getCardRect: (card: CardId) => Rect | null;
}

export type PlayerRef = {
    getPlayerRect: () => Rect | null
    getPocket: (pocket: PocketType) => PocketRef | null,
};

export interface CardRef {
    getRect: () => Rect | null;
}

export interface CardTracker {
    getPlayerPockets: (player: PlayerId) => PlayerRef | null;
    getTablePocket: (pocket: PocketId) => PocketRef | null;
    getCubesRect: (card: Card | null) => Rect | null;
}