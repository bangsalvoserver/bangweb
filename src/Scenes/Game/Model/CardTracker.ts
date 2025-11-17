import { RefObject, useMemo } from "react";
import { getDivRect, Rect } from "../../../Utils/Rect";
import { matchUnion } from "../../../Utils/UnionUtils";
import { MapRef } from "../../../Utils/UseMapRef";
import { PocketType, TokenType } from "./CardEnums";
import { Card, GameTable, getCard, PocketId } from "./GameTable";
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
    cardId?: CardId;
}

export function buildCardRef(divRef: RefObject<HTMLDivElement>, id?: CardId) {
    return {
        getRect: () => getDivRect(divRef.current),
        cardId: id
    }
}

export interface CardTracker {
    getPlayerPockets: (player: PlayerId) => PlayerRef | null;
    getTablePocket: (pocket: PocketId) => PocketRef | null;
    getCardRect: (card: Card) => Rect | null;
    getTokensRect: (table: GameTable, token_type: TokenType, position: TokenPosition) => Rect | null;
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

        getCardRect(card: Card) {
            return this.getTablePocket(card.pocket)?.getCardRect(card.id) ?? null;
        },
    
        getTokensRect(table: GameTable, token_type: TokenType, position: TokenPosition) {
            return matchUnion<TokenPosition, Rect | null>(position, {
                table: () => getDivRect(tokensRef.get(token_type)),
                card: (card) => this.getCardRect(getCard(table, card)),
                player: (player) => this.getPlayerPockets(player)?.getTokensRect(token_type) ?? null
            });
        }
    }), [playerRefs, pocketRefs, tokensRef]);
  }