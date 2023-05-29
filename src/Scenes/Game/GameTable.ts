import { CardData } from "../../Messages/CardData";
import { AddCardsUpdate, AddCubesUpdate, HideCardUpdate, MoveCardUpdate, MoveCubesUpdate, MoveScenarioDeckUpdate, MoveTrainUpdate, PlayerAddUpdate, PlayerGoldUpdate, PlayerHpUpdate, PlayerOrderUpdate, PlayerShowRoleUpdate, PlayerStatusUpdate, RemoveCardsUpdate, ShowCardUpdate, TapCardUpdate } from "../../Messages/GameUpdate";

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

interface PocketRef {
    pocket_type: string;
    player?: number;
}

export interface Card extends Id {
    deck: string;

    inactive: boolean;
    num_cubes: number;

    cardData?: CardData;
    pocket?: PocketRef;
}

function newCard(id: number, deck: string, pocket_type: string, player?: number): Card {
    return {
        id, deck,
        inactive: false,
        num_cubes: 0,
        pocket: {
            pocket_type,
            player
        }
    };
}

type Pockets = {
    [key: string]: number[]
};

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

function newPlayer(id: number, userid: number): Player {
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

export interface GameUpdate {
    updateType: string,
    updateValue: any
}

const gameUpdateHandlers = new Map<string, (table: GameTable, update: any) => GameTable>([
    // ['game_error', handleGameError],
    // ['game_log', handleGameLog],
    // ['game_prompt', handleGamePrompt],
    ['add_cards', handleAddCards],
    ['remove_cards', handleRemoveCards],
    ['move_card', handleMoveCard],
    ['add_cubes', handleAddCubes],
    ['move_cubes', handleMoveCubes],
    ['move_scenario_deck', handleMoveScenarioDeck],
    ['move_train', handleMoveTrain],
    // ['deck_shuffled', handleDeckShuffled],
    ['show_card', handleShowCard],
    ['hide_card', handleHideCard],
    ['tap_card', handleTapCard],
    // ['flash_card', handleFlashCard],
    // ['short_pause', handleShortPause],
    ['player_add', handlePlayerAdd],
    ['player_order', handlePlayerOrder],
    ['player_hp', handlePlayerHp],
    ['player_gold', handlePlayerGold],
    ['player_show_role', handlePlayerShowRole],
    ['player_status', handlePlayerStatus],
    // ['switch_turn', handleSwitchTurn],
    // ['request_status', handleRequestStatus],
    // ['status_ready', handleStatusReady],
    ['game_flags', handleGameFlags],
    // ['play_sound', handlePlaySound]
    // ['status_clear', handleStatusClear]
]);

export function gameTableHandleUpdate(table: GameTable, update: GameUpdate) {
    let handler = gameUpdateHandlers.get(update.updateType);
    if (handler) {
        return handler(table, update.updateValue);
    } else {
        return table;
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

function handlePlayerAdd(table: GameTable, { players }: PlayerAddUpdate): GameTable {
    return {
        ... table,
        players: table.players.concat(players.map(({player_id, user_id}) => newPlayer(player_id, user_id))).sort(sortById),
        alive_players: table.alive_players.concat(players.map(({player_id}) => player_id))
    };
}

function handlePlayerOrder(table: GameTable, { players }: PlayerOrderUpdate): GameTable {
    return { ... table, alive_players: players };
}

function handlePlayerHp(table: GameTable, { player, hp }: PlayerHpUpdate): GameTable {
    return {
        ... table,
        players: editById(table.players, p => ({ ... p, status: { ... p.status, hp }}), player)
    };
}

function handlePlayerGold(table: GameTable, { player, gold }: PlayerGoldUpdate): GameTable {
    return {
        ... table,
        players: editById(table.players, p => ({ ... p, status: { ... p.status, gold }}), player)
    };
}

function handlePlayerShowRole(table: GameTable, { player, role }: PlayerShowRoleUpdate): GameTable {
    return {
        ... table,
        players: editById(table.players, p => ({ ... p, status: { ... p.status, role }}), player)
    };
}

function handlePlayerStatus(table: GameTable, { player, flags, range_mod, weapon_range, distance_mod }: PlayerStatusUpdate): GameTable {
    return {
        ... table,
        players: editById(table.players, p => ({ ... p, status: {
            ... p.status,
            flags, range_mod, weapon_range, distance_mod
        }}), player)
    };
}

function handleMoveCard(table: GameTable, { card, player, pocket }: MoveCardUpdate): GameTable {
    const cardObj = getCard(table, card);
    if (!cardObj) return table;

    const cardList = [card];
    const oldPocket = cardObj.pocket?.pocket_type || 'none';

    let newPlayers = editById(table.players, player => ({ ... player, pockets: removeFromPocket(player.pockets, oldPocket, cardList) }), cardObj.pocket?.player);
    newPlayers = editById(newPlayers, player => ({ ... player, pockets: addToPocket(player.pockets, pocket, cardList) }), player);

    let newPockets = removeFromPocket(table.pockets, oldPocket, cardList);
    newPockets = addToPocket(newPockets, pocket, cardList);

    return {
        ... table,
        cards: editById(table.cards, card => ({ ... card, pocket: { pocket_type: pocket, player }}), card),
        players: newPlayers,
        pockets: newPockets
    };
}

function handleShowCard(table: GameTable, { card, info }: ShowCardUpdate): GameTable {
    return {
        ... table,
        cards: editById(table.cards, card => ({ ... card, cardData: info }), card)
    };
}

function handleHideCard(table: GameTable, { card }: HideCardUpdate): GameTable {
    return {
        ... table,
        cards: editById(table.cards, card => ({ ... card, cardData: undefined }), card)
    };
}

function handleTapCard(table: GameTable, { card, inactive }: TapCardUpdate): GameTable {
    return {
        ... table,
        cards: editById(table.cards, card => ({ ... card, inactive }), card)
    };
}

function handleAddCubes(table: GameTable, { num_cubes, target_card }: AddCubesUpdate): GameTable {
    return {
        ... table,
        status: {
            ... table.status,
            num_cubes: table.status.num_cubes + (target_card ? 0 : num_cubes)
        },
        cards: editById(table.cards, card => ({
            ... card,
            num_cubes: card.num_cubes + num_cubes
        }), target_card)
    };
}

function handleMoveCubes(table: GameTable, { num_cubes, origin_card, target_card }: MoveCubesUpdate): GameTable {
    let tableCubes = table.status.num_cubes;
    if (!origin_card) tableCubes -= num_cubes;
    else if (!target_card) tableCubes += num_cubes;

    let tableCards = editById(table.cards, card => ({ ... card, num_cubes: card.num_cubes - num_cubes }), origin_card);
    tableCards = editById(table.cards, card => ({ ... card, num_cubes: card.num_cubes + num_cubes}), target_card);
    return {
        ... table,
        status: {
            ... table.status,
            num_cubes: tableCubes
        },
        cards: tableCards
    };
}

function handleMoveScenarioDeck(table: GameTable, { player, pocket }: MoveScenarioDeckUpdate): GameTable {
    if (pocket == 'scenario_deck') {
        return {
            ... table,
            status: {
                ... table.status,
                scenario_deck_holder: player
            }
        }
    } else if (pocket == 'wws_scenario_deck') {
        return {
            ... table,
            status: {
                ... table.status,
                wws_scenario_deck_holder: player
            }
        }
    } else {
        return table;
    }
}

function handleMoveTrain(table: GameTable, { position }: MoveTrainUpdate): GameTable {
    return {
        ... table,
        status: {
            ... table.status,
            train_position: position
        }
    };
}

function handleGameFlags(table: GameTable, flags: string[]): GameTable {
    return {
        ... table,
        status: {
            ... table.status,
            flags
        }
    };
}