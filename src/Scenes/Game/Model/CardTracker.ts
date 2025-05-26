import { useMemo } from "react";
import { getDivRect, Rect } from "../../../Utils/Rect";
import { matchUnion } from "../../../Utils/UnionUtils";
import { MapRef } from "../../../Utils/UseMapRef";
import { PocketType, TokenType } from "./CardEnums";
import { Card, GameTable, getCard, getPlayer, Player, PocketId } from "./GameTable";
import { CardId, PlayerId, TokenPosition } from "./GameUpdate";

export interface PocketRef {
    getPocketRect: () => Rect | null;
    getCardRect: (card: CardId) => Rect | null;
}

export type PlayerRef = {
    getPlayerRect: () => Rect | null;
    getPocket: (pocket: PocketType) => PocketRef | null;
    getTokensRect: (token_type: TokenType) => Rect | null;
};

export interface CardRef {
    getRect: () => Rect | null;
}

export type TokenPositionValue = { type: 'table' } | { type: 'card', card: Card } | { type: 'player', player: Player };

export function getTokenPositionValue(table: GameTable, position: TokenPosition): TokenPositionValue {
  return matchUnion<TokenPosition, TokenPositionValue>(position, {
    table: () => ({ type: 'table' }),
    card: cardId => ({ type: 'card', card: getCard(table, cardId) }),
    player: playerId => ({ type: 'player', player: getPlayer(table, playerId) }),
  });
}

export interface CardTracker {
    getPlayerPockets: (player: PlayerId) => PlayerRef | null;
    getTablePocket: (pocket: PocketId) => PocketRef | null;
    getTokensRect: (token_type: TokenType, position: TokenPositionValue) => Rect | null;
}

export function useCardTracker(playerRefs: MapRef<PlayerId, PlayerRef>, pocketRefs: MapRef<PocketType, PocketRef>, tokensRef: MapRef<TokenType, HTMLDivElement>): CardTracker {
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
  
      getTokensRect(token_type: TokenType, position: TokenPositionValue) {
        switch (position.type) {
        case 'table': return getDivRect(tokensRef.get(token_type));
        case 'card': return this.getTablePocket(position.card.pocket)?.getCardRect(position.card.id) ?? null;
        case 'player': return this.getPlayerPockets(position.player.id)?.getTokensRect(token_type) ?? null;
        }
      }
    }), [playerRefs, pocketRefs, tokensRef]);
  }