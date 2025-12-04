import { editById, UpdateFunction } from "../../../Utils/RecordUtils";
import { matchUnion } from "../../../Utils/UnionUtils";
import { TokenType } from "./CardEnums";
import { GameTable, PlayerRecord, PocketId, TablePockets, TokenCount } from "./GameTable";
import { CardId, PocketPosition, TokenPosition } from "./GameUpdate";

export type CardMapper = UpdateFunction<CardId[]>;

function editPocketMap(
    pockets: TablePockets, players: PlayerRecord, pocket: PocketId,
    cardMapper: CardMapper): [TablePockets, PlayerRecord]
{
    const mapper = (cards: CardId[] | undefined) => {
        const value = cardMapper(cards ?? []);
        if (value.length === 0) return undefined;
        return value;
    };
    if (pocket) {
        if ('player' in pocket) {
            players = editById(players, pocket.player, player => ({
                ...player, pockets: editById(player.pockets, pocket.name, mapper)
            }));
        } else {
            pockets = editById(pockets, pocket.name, mapper);
        }
    }
    return [pockets, players];
}

/// Changes a card to another
export function exchangeCard(pockets: TablePockets, players: PlayerRecord, pocket: PocketId, cardFrom: CardId, cardTo: CardId) {
    return editPocketMap(pockets, players, pocket, cards => cards.map(card => card === cardFrom ? cardTo : card));
}

/// Adds a list of cards to a pocket
export function addToPocket(pockets: TablePockets, players: PlayerRecord, pocket: PocketId, cardsToAdd: CardId[], position: PocketPosition = 'end') {
    return editPocketMap(pockets, players, pocket, cards => position === 'end' ? cards.concat(cardsToAdd) : cardsToAdd.concat(cards));
}

/// Removes a list of cards from a pocket
export function removeFromPocket(pockets: TablePockets, players: PlayerRecord, pocket: PocketId, cardsToRemove: CardId[]) {
    return editPocketMap(pockets, players, pocket, cards => cards.filter(id => !cardsToRemove.includes(id)));
}

/// Moves a card to the end of a pocket
export function moveCardToEnd(pockets: TablePockets, players: PlayerRecord, pocket: PocketId, card: CardId) {
    return editPocketMap(pockets, players, pocket, cards => cards.filter(id => id !== card).concat(card));
}

export function setAnimation<T extends { animation: unknown; animationKey: number; }>(value: T, animation: T['animation']): T {
    return { ...value, animation, animationKey: value.animationKey + 1 };
}


export function clearAnimation<T extends { animation: A; }, A extends { type: string; }>(value: T): T {
    if (value.animation.type === 'none') return value;
    return { ...value, animation: { type: 'none' } };
}

export function addTokens(table: GameTable, token_type: TokenType, count: number, position: TokenPosition, keepZero: boolean = false): GameTable {
    const doAddTokens = <T extends { tokens: TokenCount; }>(value: T, type: TokenType, count: number) => (
        { ...value, tokens: editById(value.tokens, type, oldCount => {
            const newCount = (oldCount ?? 0) + count;
            if (newCount <= 0 && !keepZero) return undefined;
            return newCount;
        }) }
    );

    return matchUnion<TokenPosition, GameTable>(position, {
        table: () => ({ ...table, status: doAddTokens(table.status, token_type, count) }),
        card: cardId => ({ ...table, cards: editById(table.cards, cardId, card => doAddTokens(card, token_type, count)) }),
        player: playerId => ({ ...table, players: editById(table.players, playerId, player => doAddTokens(player, token_type, count)) }),
    })
}

