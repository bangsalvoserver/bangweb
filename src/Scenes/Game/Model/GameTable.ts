import { Empty, UserId } from "../../../Messages/ServerMessage";
import { ChangeField } from "../../../Utils/UnionUtils";
import { CardData, CardSign } from "./CardData";
import { DeckType, GameFlag, PlayerFlag, PlayerPocketType, PlayerRole, PocketType, TablePocketType } from "./CardEnums";
import { CardId, DeckShuffledUpdate, Duration, MoveCardUpdate, MoveCubesUpdate, MoveTrainUpdate, PlayerId } from "./GameUpdate";
import { TargetSelector, newTargetSelector } from "./TargetSelector";

export interface Id {
    id: number
};

/// players and cards are sorted by id so that finding an object in those arrays is O(log n)
export function sortById(lhs: Id, rhs: Id) {
    return lhs.id - rhs.id;
}

export function searchById<T extends Id>(values: T[], target: number): T | null {
    let left: number = 0;
    let right: number = values.length - 1;
  
    while (left <= right) {
      const mid: number = Math.floor((left + right) / 2);
  
      if (values[mid].id === target) return values[mid];
      if (target < values[mid].id) right = mid - 1;
      else left = mid + 1;
    }
  
    return null;
}

/// Takes as arguments an array of values, an id and a mapping function
/// This function finds the element with the specified id and returns a new array of values
/// with the found object modified according to the mapper function
export function editById<T extends Id>(values: T[], id: number | number[], mapper: (value: T) => T): T[] {
    return values.map(value => {
        if (typeof(id) == 'number' ? value.id === id : id.includes(value.id)) {
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

export type CardAnimation =
    { flipping: { cardImage?: CardImage, backface?: string } & Duration } |
    { turning: Duration } |
    { flash: Duration } |
    { short_pause: Empty };

export interface Card extends Id {
    cardData: { deck: DeckType } | CardData;
    pocket: PocketId;

    inactive: boolean;
    num_cubes: number;
    
    animation?: CardAnimation;
    animationKey: number;
}

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
        num_cubes: 0,
        animationKey: 0
    };
}

export type KnownCard = ChangeField<Card, 'cardData', CardData>;

export function isCardKnown(card: Card): card is KnownCard {
    return 'name' in card.cardData;
}

export type PlayerPockets = Record<PlayerPocketType, CardId[]>;

export type TablePockets = Record<TablePocketType, CardId[]>;

export type PlayerAnimation =
    { flipping_role: { role: PlayerRole } & Duration } |
    { player_hp: { hp: number} & Duration } |
    { player_death: Duration };

export interface Player extends Id {
    userid: UserId;
    status: {
        role: PlayerRole,
        hp: number,
        gold: number,
        flags: PlayerFlag[]
    };
    pockets: PlayerPockets;

    animation?: PlayerAnimation;
    animationKey: number;
}

export function newPlayer(id: PlayerId, userid: UserId): Player {
    return {
        id, userid,
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
        animationKey: 0
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
    { move_card: MoveCardUpdate & Duration } |
    { move_cubes: MoveCubesUpdate & Duration } |
    { deck_shuffle: DeckShuffledUpdate & DeckCards & Duration } |
    { move_train: MoveTrainUpdate & Duration } |
    { move_players: MovePlayersUpdate & Duration };

export interface GameTable {
    myUserId?: UserId;
    self_player?: PlayerId;

    players: Player[];
    cards: Card[];
    
    pockets: TablePockets;

    alive_players: PlayerId[];
    dead_players: PlayerId[];

    status: {
        num_cubes: number;
        train_position: number;
        flags: GameFlag[];
        current_turn?: PlayerId;
    };
    
    animation?: TableAnimation;
    animationKey: number;

    selector: TargetSelector;
}

export function newGameTable(myUserId?: UserId): GameTable {
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
            train_deck: []
        },

        alive_players: [],
        dead_players: [],

        status: {
            num_cubes: 0,
            train_position: 0,
            flags: [],
        },

        animationKey: 0,
        selector: newTargetSelector()
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