import { AddCardsUpdate, AddCubesUpdate, DeckShuffledUpdate, HideCardUpdate, MoveCardUpdate, MoveCubesUpdate, MoveScenarioDeckUpdate, MoveTrainUpdate, PlayerAddUpdate, PlayerGoldUpdate, PlayerHpUpdate, PlayerOrderUpdate, PlayerShowRoleUpdate, PlayerStatusUpdate, RemoveCardsUpdate, ShowCardUpdate, TapCardUpdate } from "../../Messages/GameUpdate";
import { GameTable, Id, getCard, newCard, newPlayer, searchById } from "./GameTable";

export interface GameUpdate {
    updateType: string,
    updateValue: any
}

export function handleGameUpdate(table: GameTable, update: GameUpdate): GameTable {
    let handler = gameUpdateHandlers.get(update.updateType);
    if (handler) {
        return handler(table, update.updateValue);
    } else {
        return table;
    }
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
    ['deck_shuffled', handleDeckShuffled],
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

function sortById(lhs: Id, rhs: Id) {
    return lhs.id - rhs.id;
}

function editById<T extends Id>(values: T[], mapper: (value: T) => T, id?: number): T[] {
    if (id && searchById(values, id)) {
        return values.map(value => {
            if (value.id === id) {
                return mapper(value);
            } else {
                return value;
            }
        });
    } else {
        return values;
    }
}

type Pockets = {
    [key: string]: number[]
};

function addToPocket<T extends Pockets>(pockets: T, pocketName: string, cards: number[]): T {
    if (pocketName in pockets) {
        return {
            ...pockets,
            [pocketName]: pockets[pocketName].concat(cards)
        };
    } else {
        return pockets;
    }
}

function removeFromPocket<T extends Pockets>(pockets: T, pocketName: string, cards: number[]): T {
    if (pocketName in pockets) {
        return {
            ...pockets,
            [pocketName]: pockets[pocketName].filter(id => !cards.includes(id))
        }
    } else {
        return pockets;
    }
}

function handleAddCards(table: GameTable, { card_ids, pocket, player }: AddCardsUpdate): GameTable {
    const addedCards = card_ids.map(({id}) => id);
    const ret = {
        ...table,
        cards: table.cards.concat(card_ids.map(({ id, deck }) => newCard(id, deck, pocket, player))).sort(sortById),
        players: editById(table.players, p => ({ ...p, pockets: addToPocket(p.pockets, pocket, addedCards) }), player),
        pockets: addToPocket(table.pockets, pocket, addedCards)
    };

    return ret;
}

function handleRemoveCards(table: GameTable, { cards }: RemoveCardsUpdate): GameTable {
    let pocketCards = new Map<{pocketName: string, player?: number}, number[]>();
    cards.forEach(id => {
        let pocket = getCard(table, id)?.pocket;
        if (pocket) {
            if (pocketCards.has(pocket)) {
                pocketCards.get(pocket)?.push(id);
            } else {
                pocketCards.set(pocket, [id]);
            }
        }
    });

    let newTable = { ...table, cards: table.cards.filter(({id}) => !cards.includes(id))};
    pocketCards.forEach((cards, {pocketName, player}) => {
        newTable = {
            ...newTable,
            players: editById(table.players, p => ({ ...p, pockets: removeFromPocket(p.pockets, pocketName, cards)}), player),
            pockets: removeFromPocket(table.pockets, pocketName, cards)
        };
    });
    return newTable;
}

function handlePlayerAdd(table: GameTable, { players }: PlayerAddUpdate): GameTable {
    return {
        ...table,
        players: table.players.concat(players.map(({player_id, user_id}) => newPlayer(player_id, user_id))).sort(sortById),
        alive_players: table.alive_players.concat(players.map(({player_id}) => player_id))
    };
}

function handlePlayerOrder(table: GameTable, { players }: PlayerOrderUpdate): GameTable {
    return { ...table, alive_players: players };
}

function handlePlayerHp(table: GameTable, { player, hp }: PlayerHpUpdate): GameTable {
    return {
        ...table,
        players: editById(table.players, p => ({ ...p, status: { ...p.status, hp }}), player)
    };
}

function handlePlayerGold(table: GameTable, { player, gold }: PlayerGoldUpdate): GameTable {
    return {
        ...table,
        players: editById(table.players, p => ({ ...p, status: { ...p.status, gold }}), player)
    };
}

function handlePlayerShowRole(table: GameTable, { player, role }: PlayerShowRoleUpdate): GameTable {
    return {
        ...table,
        players: editById(table.players, p => ({ ...p, status: { ...p.status, role }}), player)
    };
}

function handlePlayerStatus(table: GameTable, { player, flags, range_mod, weapon_range, distance_mod }: PlayerStatusUpdate): GameTable {
    return {
        ...table,
        players: editById(table.players, p => ({ ...p, status: {
            ...p.status,
            flags, range_mod, weapon_range, distance_mod
        }}), player)
    };
}

function handleMoveCard(table: GameTable, { card, player, pocket }: MoveCardUpdate): GameTable {
    const cardObj = getCard(table, card);
    if (!cardObj) return table;

    const cardList = [card];
    const oldPocket = cardObj.pocket?.pocketName || 'none';

    let newPlayers = editById(table.players, player => ({ ...player, pockets: removeFromPocket(player.pockets, oldPocket, cardList) }), cardObj.pocket?.player);
    newPlayers = editById(newPlayers, player => ({ ...player, pockets: addToPocket(player.pockets, pocket, cardList) }), player);

    let newPockets = removeFromPocket(table.pockets, oldPocket, cardList);
    newPockets = addToPocket(newPockets, pocket, cardList);

    return {
        ...table,
        cards: editById(table.cards, card => ({ ...card, pocket: { pocketName: pocket, player }}), card),
        players: newPlayers,
        pockets: newPockets
    };
}

function handleDeckShuffled(table: GameTable, { pocket }: DeckShuffledUpdate): GameTable {
    if (pocket === 'main_deck' || pocket === 'shop_deck') {
        const fromPocket = pocket === 'main_deck' ? 'discard_pile' : 'shop_discard';
        return {
            ...table,
            cards: table.cards.map(card => {
                if (card.pocket?.pocketName === pocket) {
                    return { ...card, cardData: undefined, pocket: { pocketName: pocket } };
                } else {
                    return card;
                }
            }),
            pockets: {
                ...table.pockets,
                [fromPocket]: [],
                [pocket]: table.pockets[fromPocket]
            }
        };
    } else {
        throw new Error('invalid pocket in DeckShuffledUpdate');
    }
}

function handleShowCard(table: GameTable, { card, info }: ShowCardUpdate): GameTable {
    return {
        ...table,
        cards: editById(table.cards, card => ({ ...card, cardData: info }), card)
    };
}

function handleHideCard(table: GameTable, { card }: HideCardUpdate): GameTable {
    return {
        ...table,
        cards: editById(table.cards, card => ({ ...card, cardData: undefined }), card)
    };
}

function handleTapCard(table: GameTable, { card, inactive }: TapCardUpdate): GameTable {
    return {
        ...table,
        cards: editById(table.cards, card => ({ ...card, inactive }), card)
    };
}

function handleAddCubes(table: GameTable, { num_cubes, target_card }: AddCubesUpdate): GameTable {
    return {
        ...table,
        status: {
            ...table.status,
            num_cubes: table.status.num_cubes + (target_card ? 0 : num_cubes)
        },
        cards: editById(table.cards, card => ({
            ...card,
            num_cubes: card.num_cubes + num_cubes
        }), target_card)
    };
}

function handleMoveCubes(table: GameTable, { num_cubes, origin_card, target_card }: MoveCubesUpdate): GameTable {
    let tableCubes = table.status.num_cubes;
    if (!origin_card) tableCubes -= num_cubes;
    else if (!target_card) tableCubes += num_cubes;

    let tableCards = editById(table.cards, card => ({ ...card, num_cubes: card.num_cubes - num_cubes }), origin_card);
    tableCards = editById(table.cards, card => ({ ...card, num_cubes: card.num_cubes + num_cubes}), target_card);
    return {
        ...table,
        status: {
            ...table.status,
            num_cubes: tableCubes
        },
        cards: tableCards
    };
}

function handleMoveScenarioDeck(table: GameTable, { player, pocket }: MoveScenarioDeckUpdate): GameTable {
    if (pocket === 'scenario_deck' || pocket === 'wws_scenario_deck') {
        return {
            ...table,
            status: {
                ...table.status,
                [pocket + '_holder']: player
            }
        }
    } else {
        throw new Error("invalid pocket in MoveScenarioDeckUpdate");
    }
}

function handleMoveTrain(table: GameTable, { position }: MoveTrainUpdate): GameTable {
    return {
        ...table,
        status: {
            ...table.status,
            train_position: position
        }
    };
}

function handleGameFlags(table: GameTable, flags: string[]): GameTable {
    return {
        ...table,
        status: {
            ...table.status,
            flags
        }
    };
}