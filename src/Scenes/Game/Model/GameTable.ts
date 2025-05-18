import { UserId } from "../../../Model/ServerMessage";
import { CardData, CardSign } from "./CardData";
import { DeckType, GameFlag, PlayerFlag, PlayerPocketType, PlayerRole, PocketType, TablePocketType, TokenType } from "./CardEnums";
import { getCardColor } from "./Filters";
import { CardId, DeckShuffledUpdate, Duration, MoveCardUpdate, MoveTokensUpdate, MoveTrainUpdate, PlayerId } from "./GameUpdate";

export type PocketId = { name: TablePocketType } | { name: PlayerPocketType, player: PlayerId } | null;

export interface CardImage {
    image: string;
    sign?: CardSign;
}

export interface AnimationKey {
    key: number;
}

export type CardAnimation =
    { type: 'none' } |
    { type: 'flipping', cardImage?: CardImage, backface?: string } & Duration |
    { type: 'turning' } & Duration |
    { type: 'flash' } & Duration |
    { type: 'short_pause' };

export type TokenCount = [TokenType, number][];

type CardDeckOrData = { deck: DeckType } | CardData;

interface CardBase<T extends CardDeckOrData> {
    id: CardId;

    cardData: T;
    pocket: PocketId;

    inactive: boolean;
    tokens: TokenCount;
    
    animation: CardAnimation & AnimationKey;
}

export type Card = CardBase<CardDeckOrData>;
export type KnownCard = CardBase<CardData>;

function parseCardImage(image: string, deck: string): string {
    return image.includes('/') ? image : `${deck}/${image}`;
}

export function getCardFrontface(card: Card): string | undefined {
    if (isCardKnown(card)) {
        const cardData = card.cardData;
        const colonIndex = cardData.image.indexOf(':');
        const imageFront = colonIndex >= 0 ? cardData.image.substring(0, colonIndex) : cardData.image;
        return parseCardImage(imageFront, cardData.deck);
    }
    return undefined;
}

export function getCardImage(card: Card): CardImage | undefined {
    if (isCardKnown(card)) {
        const cardData = card.cardData;
        return {
            image: getCardFrontface(card)!,
            sign: cardData.sign.rank !== 'none' && cardData.sign.suit !== 'none' ? cardData.sign : undefined
        };
    }
    return undefined;
};

export function getCardBackface(card: Card): string {
    if (isCardKnown(card)) {
        const cardData = card.cardData;
        const colonIndex = cardData.image.indexOf(':');
        if (colonIndex >= 0) {
            return parseCardImage(cardData.image.substring(colonIndex + 1), cardData.deck);
        }
    }
    return 'backface/' + card.cardData.deck;
}

export function *getPlayerCubes(table: GameTable, player: Player) {
    const character = getCard(table, player.pockets.player_character[0]);
    yield [character, getCubeCount(character.tokens)] as const;
    for (const cardId of player.pockets.player_table) {
        const card = getCard(table, cardId);
        if (getCardColor(card) === 'orange') {
            yield [card, getCubeCount(card.tokens)] as const;
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
        tokens: [],
        animation: { type: 'none', key: 0}
    };
}

export function isCardKnown(card: Card): card is KnownCard {
    return 'name' in card.cardData;
}

export function getCubeCount(tokenCount: TokenCount) {
    for (const [key, value] of tokenCount) {
        if (key === 'cube') {
            return value;
        }
    }
    return 0;
}

export function addTokens(tokenCount: TokenCount, type: TokenType, count: number) {
    let result = tokenCount.slice();
    for (let i=0; i<result.length; ++i) {
        let [key, value] = result[i];
        if (key === type) {
            value += count;
            if (value > 0) {
                result[i] = [key, value];
            } else {
                result.splice(i, 1);
            }
            return result;
        }
    }
    if (count > 0) {
        result.push([type, count]);
    }
    return result;
}

export type PlayerPockets = Record<PlayerPocketType, CardId[]>;

export type TablePockets = Record<TablePocketType, CardId[]>;

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
        gold: number,
        flags: PlayerFlag[]
    };
    pockets: PlayerPockets;

    animation: PlayerAnimation & AnimationKey;
}

export function newPlayer(id: PlayerId, user_id: UserId): Player {
    return {
        id, user_id,
        status: {
            role: 'unknown',
            hp: 0,
            gold: 0,
            flags: []
        },
        pockets: {
            player_hand: [],
            player_table: [],
            player_character: []
        },
        animation: { type: 'none', key: 0}
    };
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
        flags: GameFlag[];
        current_turn?: PlayerId;
    };
    
    animation: TableAnimation & AnimationKey;
}

export function newGameTable(myUserId: UserId): GameTable {
    return {
        myUserId,
        
        players: [],
        cards: [],

        pockets: {
            main_deck: [],
            discard_pile: [],
            selection: [],
            shop_deck: [],
            shop_selection: [],
            hidden_deck: [],
            scenario_deck: [],
            scenario_card: [],
            wws_scenario_deck: [],
            wws_scenario_card: [],
            button_row: [],
            stations: [],
            train: [],
            train_deck: [],
            feats_deck: [],
            feats_discard: [],
            feats: []
        },

        alive_players: [],

        status: {
            tokens: [],
            train_position: 0,
            flags: [],
        },

        animation: { type: 'none', key: 0 }
    };
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