import { CardData } from "../../Messages/CardData";

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
        player?: number
    };
}

export function newCard(id: number, deck: string, pocketName: string, player?: number): Card {
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
    userid: number;
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
        player_hand: number[],
        player_table: number[],
        player_character: number[],
        player_backup: number[]
    };
}

export function newPlayer(id: number, userid: number): Player {
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
    players: Player[];
    cards: Card[];
    
    pockets: {
        main_deck: number[],
        discard_pile: number[],
        selection: number[],
        shop_deck: number[],
        shop_selection: number[],
        shop_discard: number[],
        hidden_deck: number[],
        scenario_deck: number[],
        scenario_card: number[],
        wws_scenario_deck: number[],
        wws_scenario_card: number[],
        button_row: number[],
        stations: number[],
        train: number[],
        train_deck: number[]
    };

    alive_players: number[];
    dead_players: number[];

    status: {
        num_cubes: number;
        train_position: number;
        flags: string[];
        scenario_deck_holder?: number;
        wws_scenario_deck_holder?: number;
    };
}

export function newGameTable(): GameTable {
    return {
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

export function getCard(table: GameTable, id: number): Card | null {
    return searchById(table.cards, id);
}

export function getPlayer(table: GameTable, id: number): Player | null {
    return searchById(table.players, id);
}