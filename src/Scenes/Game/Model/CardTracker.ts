import { RefObject, useMemo } from "react";
import { getDivRect, Rect } from "../../../Utils/Rect";
import { MapRef } from "../../../Utils/UseMapRef";
import { PocketType, TokenType } from "./CardEnums";
import { Card, PocketId } from "./GameTable";
import { CardId, PlayerId } from "./GameUpdate";

export interface PocketRef {
    getPocketRect: () => Rect | null;
    getCardRect: (card: CardId) => Rect | null;
}

export type PlayerRef = {
    getPlayerRect: () => Rect | null;
    getPocket: (pocket: PocketType) => PocketRef | null;
    getTokensRect: () => Rect | null;
};

export interface CardRef {
    getRect: () => Rect | null;
}

export interface CardTracker {
    getPlayerPockets: (player: PlayerId) => PlayerRef | null;
    getTablePocket: (pocket: PocketId) => PocketRef | null;
    getTokensRect: (token_type: TokenType, card: Card | null) => Rect | null;
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
  
      getTokensRect(token_type: TokenType, card: Card | null) {
        if (card) {
          if (token_type !== 'cube' && card.cardData.deck === 'character' && card.pocket && 'player' in card.pocket) {
            return this.getPlayerPockets(card.pocket.player)?.getTokensRect() ?? null;
          } else {
            return this.getTablePocket(card.pocket)?.getCardRect(card.id) ?? null;
          }
        } else if (token_type === 'cube' && cubesRef.current) {
          return getDivRect(cubesRef.current);
        } else {
          return null;
        }
      }
    }), [playerRefs, pocketRefs, cubesRef]);
  }