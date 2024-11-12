import { UpdateFunction } from "../../../Model/SceneState";
import { UserId } from "../../../Model/ServerMessage";
import { CardData, CardSign } from "./CardData";
import { DeckType, GameFlag, PlayerFlag, PlayerPocketType, PlayerRole, PocketType, TablePocketType, TokenType } from "./CardEnums";
import { CardId, DeckShuffledUpdate, Duration, MoveCardUpdate, MoveTokensUpdate, MoveTrainUpdate, PlayerId } from "./GameUpdate";

export interface Id {
    id: number
};

/// players and cards are sorted by id so that finding an object in those arrays is O(log n)
export function searchIndexById<T extends Id>(values: T[], target: number): number {
    let left: number = 0;
    let right: number = values.length - 1;
  
    while (left <= right) {
      const mid: number = Math.floor((left + right) / 2);
  
      if (values[mid].id === target) return mid;
      if (target < values[mid].id) right = mid - 1;
      else left = mid + 1;
    }
  
    return left;
}

export function searchById<T extends Id>(values: T[], target: number): T | null {
    const value = values.at(searchIndexById(values, target));
    return value?.id === target ? value : null;
}

/// Takes as arguments an array of values, an id and a mapping function
/// This function finds the element with the specified id and returns a new array of values
/// with the found object modified according to the mapper function
export function editById<T extends Id>(values: T[], id: number | number[], mapper: UpdateFunction<T>): T[] {
    return values.map(value => {
        if (typeof(id) === 'number' ? value.id === id : id.includes(value.id)) {
            return mapper(value);
        } else {
            return value;
        }
    });
}

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

type TokenCount = Record<TokenType, number>;

function newTokenCount(): TokenCount {
    return {
        'cube': 0,
        'fame': 0
    };
}

type CardDeckOrData = { deck: DeckType } | CardData;

interface CardBase<T extends CardDeckOrData> extends Id {
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

export function getCardImage(card: Card): CardImage | undefined {
    if (isCardKnown(card)) {
        const cardData = card.cardData;
        const colonIndex = cardData.image.indexOf(':');
        const imageFront = colonIndex >= 0 ? cardData.image.substring(0, colonIndex) : cardData.image;
        return {
            image: parseCardImage(imageFront, cardData.deck),
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
        tokens: newTokenCount(),
        animation: { type: 'none', key: 0}
    };
}

export function isCardKnown(card: Card): card is KnownCard {
    return 'name' in card.cardData;
}

export type PlayerPockets = Record<PlayerPocketType, CardId[]>;

export type TablePockets = Record<TablePocketType, CardId[]>;

export type PlayerAnimation =
    { type: 'none' } |
    { type: 'flipping_role', role: PlayerRole } & Duration |
    { type: 'player_hp', hp: number} & Duration |
    { type: 'player_death' } & Duration;

export interface Player extends Id {
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
            player_character: [],
            player_backup: []
        },
        animation: { type: 'none', key: 0}
    };
}

export interface DeckCards {
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
    { type: 'deck_shuffle' } & DeckShuffledUpdate & DeckCards & Duration |
    { type: 'move_train' } & MoveTrainUpdate & Duration |
    { type: 'move_players' } & MovePlayersUpdate & Duration;

export interface GameTable {
    myUserId: UserId;
    self_player?: PlayerId;

    players: Player[];
    cards: Card[];
    
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
            shop_discard: [],
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
            tokens: newTokenCount(),
            train_position: 0,
            flags: [],
        },

        animation: { type: 'none', key: 0 }
    };
}

export function getCard(table: GameTable, id: CardId): Card {
    const card = searchById(table.cards, id);
    if (!card) {
        throw new Error(`Card not found: ${id}`);
    }
    return card;
}

export function getPlayer(table: GameTable, id: PlayerId): Player {
    const player = searchById(table.players, id);
    if (!player) {
        throw new Error(`Player not found: ${id}`);
    }
    return player;
}