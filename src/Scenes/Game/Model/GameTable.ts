import { UserId } from "../../../Model/ServerMessage";
import { CardData, CardSign } from "./CardData";
import { DeckType, GameFlag, PlayerFlag, PlayerPocketType, PlayerRole, PocketType, TablePocketType, TokenType } from "./CardEnums";
import { getCardColor } from "./Filters";
import { CardId, DeckShuffledUpdate, Duration, MoveCardUpdate, MoveTokensUpdate, MoveTrainUpdate, PlayerId } from "./GameUpdate";

export type PocketId = { name: TablePocketType } | { name: PlayerPocketType, player: PlayerId } | null;

export interface CardImage {
    image: string;
    name?: string;
    sign?: CardSign;
}

export type CardAnimation =
    { type: 'none' } |
    { type: 'flipping', cardImage?: CardImage, backface?: CardImage } & Duration |
    { type: 'turning' } & Duration |
    { type: 'flash' } & Duration |
    { type: 'short_pause' };

export type TokenCount = { [k in TokenType]?: number };

type CardDeckOrData = { deck: DeckType } | CardData;

interface CardBase<T extends CardDeckOrData> {
    id: CardId;

    cardData: T;
    pocket: PocketId;

    inactive: boolean;
    tokens: TokenCount;
    
    animation: CardAnimation;
    animationKey: number;
}

export type Card = CardBase<CardDeckOrData>;
export type KnownCard = CardBase<CardData>;

function parseCardImage(image: string, deck: string): string {
    return image.includes('/') ? image : `${deck}/${image}`;
}

function substringBefore(value: string, separator: string) {
    const index = value.indexOf(separator);
    return index >= 0 ? value.substring(0, index) : value;
}

function substringAfter(value: string, separator: string) {
    const index = value.indexOf(separator);
    return index >= 0 ? value.substring(index + separator.length) : undefined;
}

export function getCardImage(card: Card): CardImage | undefined {
    if (isCardKnown(card)) {
        const cardData = card.cardData;
        return {
            name: substringBefore(cardData.name, ':'),
            image: parseCardImage(substringBefore(cardData.image, ':'), cardData.deck),
            sign: cardData.sign.rank !== 'none' && cardData.sign.suit !== 'none' ? cardData.sign : undefined
        };
    }
    return undefined;
};

export function getCardBackface(card: Card): CardImage {
    if (isCardKnown(card)) {
        const cardData = card.cardData;
        const image = substringAfter(cardData.image, ':');
        if (image !== undefined) {
            return {
                name: substringAfter(cardData.name, ':'),
                image: parseCardImage(image, cardData.deck)
            };
        }
    }
    return { image: 'backface/' + card.cardData.deck };
}

export function *getPlayerCubes(table: GameTable, player: Player) {
    const character = getCard(table, getPlayerPocket(player, 'player_character')[0]);
    yield [character, getCubeCount(character)] as const;
    for (const cardId of getPlayerPocket(player, 'player_table')) {
        const card = getCard(table, cardId);
        if (getCardColor(card) === 'orange') {
            yield [card, getCubeCount(card)] as const;
        }
    }
}

export function newPocketId(pocketName: PocketType, player: PlayerId | null = null): PocketId {
    if (pocketName === 'none') {
        return null;
    } else if (player && pocketName.startsWith('player_')) {
        return { name: pocketName as PlayerPocketType, player };
    } else {
        return { name: pocketName as TablePocketType };
    }
}

export function newCard(id: CardId, deck: DeckType, pocket: PocketId): Card {
    return {
        id,
        cardData: { deck },
        pocket,
        inactive: false,
        tokens: {},
        animation: { type: 'none' },
        animationKey: 0
    };
}

export function isCardKnown(card: Card): card is KnownCard {
    return 'name' in card.cardData;
}

export function getCubeCount(card: Card): number {
    return card.tokens.cube ?? 0;
}

export type PlayerPockets = { [k in PlayerPocketType]?: CardId[] };

export type TablePockets = { [k in TablePocketType]?: CardId[] };

export type PlayerAnimation =
    { type: 'none' } |
    { type: 'flipping_role', role: PlayerRole } & Duration |
    { type: 'player_hp', hp: number} & Duration |
    { type: 'player_death' } & Duration;

export interface Player {
    id: PlayerId;
    user_id: UserId;
    
    status: {
        role: PlayerRole,
        hp: number,
        flags: Set<PlayerFlag>
    };
    tokens: TokenCount;
    pockets: PlayerPockets;

    animation: PlayerAnimation;
    animationKey: number;
}

export function newPlayer(id: PlayerId, user_id: UserId): Player {
    return {
        id, user_id,
        status: {
            role: 'unknown',
            hp: 0,
            flags: new Set()
        },
        tokens: {},
        pockets: {},
        animation: { type: 'none' },
        animationKey: 0
    };
}

export function getPlayerPocket(player: Player, pocket: PlayerPocketType) {
    return player.pockets[pocket] ?? [];
}

export interface DeckShuffleAnimation extends DeckShuffledUpdate {
    fromPocket: TablePocketType;
    cards: CardId[];
}

export interface PlayerMoveId {
    from: PlayerId,
    to: PlayerId
};

export interface MovePlayersUpdate {
    players: PlayerMoveId[];
}

export type TableAnimation =
    { type: 'none' } |
    { type: 'move_card' } & MoveCardUpdate & Duration |
    { type: 'move_tokens' } & MoveTokensUpdate & Duration |
    { type: 'deck_shuffle' } & DeckShuffleAnimation & Duration |
    { type: 'move_train' } & MoveTrainUpdate & Duration |
    { type: 'move_players' } & MovePlayersUpdate & Duration;

export type PlayerRecord = Record<PlayerId, Player>;
export type CardRecord = Record<CardId, Card>

export interface GameTable {
    myUserId: UserId;
    self_player?: PlayerId;

    players: PlayerRecord;
    cards: CardRecord;
    
    pockets: TablePockets;

    alive_players: PlayerId[];

    status: {
        tokens: TokenCount;
        train_position: number;
        flags: Set<GameFlag>;
        current_turn?: PlayerId;
    };
    
    animation: TableAnimation;
    animationKey: number;
}

export function newGameTable(myUserId: UserId): GameTable {
    return {
        myUserId,
        
        players: {},
        cards: {},

        pockets: {},

        alive_players: [],

        status: {
            tokens: {},
            train_position: 0,
            flags: new Set(),
        },

        animation: { type: 'none' },
        animationKey: 0
    };
}

export function getTablePocket(table: GameTable, pocket: TablePocketType) {
    return table.pockets[pocket] ?? [];
}

export function getCard(table: GameTable, id: CardId): Card {
    if (id in table.cards) {
        return table.cards[id];
    }
    throw new Error(`Card not found: ${id}`);
}

export function getPlayer(table: GameTable, id: PlayerId): Player {
    if (id in table.players) {
        return table.players[id];
    }
    throw new Error(`Player not found: ${id}`);
}
