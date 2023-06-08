import { UserId } from "../../../Messages/ServerMessage";
import { CardData, CardSign } from "./CardData";
import { DeckType, GameFlag, PlayerFlag, PlayerPocketType, PlayerRole, PocketType, ScenarioDeckPocket, TablePocketType } from "./CardEnums";
import { AnimationUpdate, CardId, DeckShuffledUpdate, GameString, MoveCardUpdate, MoveCubesUpdate, MoveScenarioDeckUpdate, PlayerId, RequestStatusArgs, StatusReadyArgs } from "./GameUpdate";

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
export function editById<T extends Id>(values: T[], id: number, mapper: (value: T) => T): T[] {
    return values.map(value => {
        if (value.id === id) {
            return mapper(value);
        } else {
            return value;
        }
    });
}

export type PocketRef = { name: TablePocketType } | { name: PlayerPocketType, player: PlayerId } | null;

export interface CardImage {
    image: string;
    sign?: CardSign;
}

export interface CardFlipping extends AnimationUpdate {
    cardImage?: CardImage;
}

export type CardTurning = AnimationUpdate;
export type ShortPause = AnimationUpdate;
export type CardFlash = AnimationUpdate;
export type CardMove = AnimationUpdate;

export type CardAnimation =
    {flipping: CardFlipping} |
    {turning: CardTurning} |
    {flash: CardFlash} |
    {move_card: CardMove} |
    {short_pause: {}};

export interface Card extends Id {
    cardData: { deck: DeckType } | CardData;
    pocket: PocketRef;

    animation?: CardAnimation;

    inactive: boolean;
    num_cubes: number;
}

export function getCardImage(card: Card): CardImage | undefined {
    return 'image' in card.cardData ? {
        image: card.cardData.image,
        sign: card.cardData.sign.rank != 'none' && card.cardData.sign.suit != 'none' ? card.cardData.sign : undefined
    } : undefined;
};

export function newPocketRef(pocketName: PocketType, player?: PlayerId): PocketRef {
    if (pocketName == 'none') {
        return null;
    } else if (player && pocketName.startsWith('player_')) {
        return { name: pocketName as PlayerPocketType, player };
    } else {
        return { name: pocketName as TablePocketType };
    }
}

export function newCard(id: CardId, deck: DeckType, pocket: PocketRef): Card {
    return {
        id,
        cardData: { deck },
        pocket,
        inactive: false,
        num_cubes: 0,
    };
}

export type PlayerPockets = Record<PlayerPocketType, CardId[]>;

export type TablePockets = Record<TablePocketType, CardId[]>;

export interface PlayerFlippingRole extends AnimationUpdate {
    role: PlayerRole;
}

export interface PlayerHp extends AnimationUpdate {
    hp: number;
}

export type PlayerAnimation =
    { flipping_role: PlayerFlippingRole } |
    { player_hp: PlayerHp };

export interface Player extends Id {
    userid: UserId;
    status: {
        role: PlayerRole,
        hp: number,
        gold: number,
        flags: PlayerFlag[],
        range_mod: number,
        weapon_range: number,
        distance_mod: number
    };
    animation?: PlayerAnimation;
    pockets: PlayerPockets;
}

export function newPlayer(id: PlayerId, userid: UserId): Player {
    return {
        id, userid,
        status: {
            role: 'unknown',
            hp: 0,
            gold: 0,
            flags: [],
            range_mod: 0,
            weapon_range: 1,
            distance_mod: 0
        },
        pockets: {
            player_hand: [],
            player_table: [],
            player_character: [],
            player_backup: []
        }
    };
}

export interface DeckUpdate {
    cards: CardId[];
}

export type RequestStatusUnion = RequestStatusArgs | StatusReadyArgs | {};

export type ScenarioHolders = Partial<Record<ScenarioDeckPocket, PlayerId>>;

export type DeckShuffleAnimation = DeckShuffledUpdate & DeckUpdate;
export type MoveScenarioDeckAnimation = MoveScenarioDeckUpdate & DeckUpdate;

export type TableAnimation =
    {move_card: MoveCardUpdate} |
    {move_cubes: MoveCubesUpdate} |
    {deck_shuffle: DeckShuffleAnimation} |
    {move_scenario_deck : MoveScenarioDeckAnimation};

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
        scenario_holders: ScenarioHolders;
        current_turn?: PlayerId;
    };

    animation?: TableAnimation;
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
            scenario_holders: {},
            flags: [],
        }
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