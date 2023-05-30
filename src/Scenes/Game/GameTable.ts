import { CardData } from "../../Messages/CardData";
import { CardId, PlayerId } from "../../Messages/GameUpdate";
import { UserId } from "../../Messages/ServerMessage";

export interface Id {
    id: number
};

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

export interface Card extends Id {
    deck: string;

    inactive: boolean;
    num_cubes: number;

    cardData?: CardData;
    pocket?: {
        pocketName: string,
        player?: PlayerId
    };
}

export function newCard(id: CardId, deck: string, pocketName: string, player?: PlayerId): Card {
    return {
        id, deck,
        inactive: false,
        num_cubes: 0,
        pocket: {
            pocketName,
            player
        }
    };
}

export interface Player extends Id {
    userid: UserId;
    status: {
        role: string,
        hp: number,
        gold: number,
        flags: string[],
        range_mod: number,
        weapon_range: number,
        distance_mod: number
    };
    pockets: {
        player_hand: CardId[],
        player_table: CardId[],
        player_character: CardId[],
        player_backup: CardId[]
    };
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

export interface GameTable {
    myUserId: UserId;
    self_player?: PlayerId;

    players: Player[];
    cards: Card[];
    
    pockets: {
        main_deck: CardId[],
        discard_pile: CardId[],
        selection: CardId[],
        shop_deck: CardId[],
        shop_selection: CardId[],
        shop_discard: CardId[],
        hidden_deck: CardId[],
        scenario_deck: CardId[],
        scenario_card: CardId[],
        wws_scenario_deck: CardId[],
        wws_scenario_card: CardId[],
        button_row: CardId[],
        stations: CardId[],
        train: CardId[],
        train_deck: CardId[]
    };

    alive_players: PlayerId[];
    dead_players: PlayerId[];

    status: {
        num_cubes: number;
        train_position: number;
        flags: string[];
        scenario_deck_holder?: PlayerId;
        wws_scenario_deck_holder?: PlayerId;
        current_turn?: PlayerId;
    };
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
            train_deck: []
        },

        alive_players: [],
        dead_players: [],

        status: {
            num_cubes: 0,
            train_position: 0,
            flags: [],
        }
    };
}

export function getCard(table: GameTable, id: CardId): Card | null {
    return searchById(table.cards, id);
}

export function getPlayer(table: GameTable, id: PlayerId): Player | null {
    return searchById(table.players, id);
}