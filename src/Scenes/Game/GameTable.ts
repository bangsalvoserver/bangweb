import { CardData } from "../../Messages/CardData";
import { AddCardsUpdate, RemoveCardsUpdate } from "../../Messages/GameUpdate";

interface Id {
    id: number
};

function sortById(lhs: Id, rhs: Id) {
    return lhs.id - rhs.id;
}

function searchById<T extends Id>(values: T[], target: number): T | null {
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

interface PocketRef {
    pocket_type: string;
    player?: number;
}

export interface Card extends Id {
    deck: string;

    cardData?: CardData;
    pocket?: PocketRef;
}

type Pockets = {
    [key: string]: number[]
};

export interface Player extends Id {
    userid: number;
    pockets: {
        player_hand: number[],
        player_table: number[],
        player_character: number[],
        player_backup: number[]
    };
}

export interface GameTable {
    alive_players: number[],
    dead_players: number[],
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
}

export function newGameTable(): GameTable {
    return {
        alive_players: [],
        dead_players: [],
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
    };
}

export function getCard(table: GameTable, id: number): Card | null {
    return searchById(table.cards, id);
}

export function getPlayer(table: GameTable, id: number): Player | null {
    return searchById(table.players, id);
}

export interface GameUpdate {
    updateType: string,
    updateValue: any
}

const gameUpdateHandlers = new Map<string, (table: GameTable, update: any) => GameTable>([
    ['add_cards', handleAddCards],
    ['remove_cards', handleRemoveCards],
]);

export function gameTableHandleUpdate(table: GameTable, update: GameUpdate) {
    let handler = gameUpdateHandlers.get(update.updateType);
    if (handler) {
        return handler(table, update.updateValue);
    } else {
        return table;
    }
}

function newCard(id: number, deck: string, pocket_type: string, player?: number) {
    return {
        id, deck,
        pocket: {
            pocket_type,
            player
        }
    };
}

function editById<T extends Id>(values: T[], mapper: (value: T) => T, id?: number): T[] {
    if (id && searchById(values, id)) {
        return values.map(value => {
            if (value.id == id) {
                return mapper(value);
            } else {
                return value;
            }
        });
    } else {
        return values;
    }
}

function addToPocket<T extends Pockets>(pockets: T, pocket_type: string, cards: number[]): T {
    if (pocket_type in pockets) {
        return {
            ...pockets,
            [pocket_type]: pockets[pocket_type].concat(cards)
        };
    } else {
        return pockets;
    }
}

function handleAddCards(table: GameTable, { card_ids, pocket_type, player }: AddCardsUpdate): GameTable {
    const addedCards = card_ids.map(({id}) => id);
    return {
        ... table,
        cards: table.cards.concat(card_ids.map(({ id, deck }) => newCard(id, deck, pocket_type, player))).sort(sortById),
        players: editById(table.players, p => ({ ... p, pockets: addToPocket(p.pockets, pocket_type, addedCards) }), player),
        pockets: addToPocket(table.pockets, pocket_type, addedCards)
    };
}

function removeFromPocket<T extends Pockets>(pockets: T, pocket_type: string, cards: number[]): T {
    if (pocket_type in pockets) {
        return {
            ...pockets,
            [pocket_type]: (pockets[pocket_type] as number[]).filter(id => !(id in cards))
        }
    } else {
        return pockets;
    }
}

function handleRemoveCards(table: GameTable, { cards }: RemoveCardsUpdate): GameTable {
    let cardsToPockets = new Map<PocketRef, number[]>();
    cards.forEach(id => {
        let pocket = getCard(table, id)?.pocket;
        if (pocket) {
            if (cardsToPockets.has(pocket)) {
                cardsToPockets.get(pocket)?.push(id);
            } else {
                cardsToPockets.set(pocket, [id]);
            }
        }
    });

    return [...cardsToPockets.entries()].reduce((table, [{pocket_type, player}, cards]) => ({
        ... table,
        players: editById(table.players, p => ({ ... p, pockets: removeFromPocket(p.pockets, pocket_type, cards)}), player),
        pockets: removeFromPocket(table.pockets, pocket_type, cards)
    }), { ... table, cards: table.cards.filter(card => !(card.id in cards))});
}