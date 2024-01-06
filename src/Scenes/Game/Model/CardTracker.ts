import { RefObject, useMemo } from "react";
import { Rect, getDivRect } from "../../../Utils/Rect";
import { MapRef } from "../../../Utils/UseMapRef";
import { PocketType } from "./CardEnums";
import { Card, PocketId } from "./GameTable";
import { CardId, PlayerId } from "./GameUpdate";

export interface PocketRef {
    getPocketRect: () => Rect | null;
    getCardRect: (card: CardId) => Rect | null;
}

export type PlayerRef = {
    getPlayerRect: () => Rect | null;
    getPocket: (pocket: PocketType) => PocketRef | null;
};

export interface CardRef {
    getRect: () => Rect | null;
}

export interface CardTracker {
    getPlayerPockets: (player: PlayerId) => PlayerRef | null;
    getTablePocket: (pocket: PocketId) => PocketRef | null;
    getCubesRect: (card: Card | null) => Rect | null;
}

export function useCardTracker(playerRefs: MapRef<PlayerId, PlayerRef>, pocketRefs: MapRef<PocketType, PocketRef>, cubesRef: RefObject<HTMLDivElement>): CardTracker {
    return useMemo(() => ({
      getPlayerPockets(player: PlayerId) {
        return playerRefs.get(player);
      },
  
      getTablePocket(pocket: PocketId) {
        if (!pocket) {
          return null;
        } else if ('player' in pocket) {
          return this.getPlayerPockets(pocket.player)?.getPocket(pocket.name) ?? null;
        } else {
          return pocketRefs.get(pocket.name);
        }
      },
  
      getCubesRect(card: Card | null) {
        if (card) {
          return this.getTablePocket(card.pocket)?.getCardRect(card.id) ?? null;
        } else {
          return cubesRef.current ? getDivRect(cubesRef.current) : null;
        }
      }
    }), [playerRefs, pocketRefs, cubesRef]);
  }