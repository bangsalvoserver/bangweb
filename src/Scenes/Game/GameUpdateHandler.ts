import { AddCardsUpdate, AddCubesUpdate, CardId, DeckShuffledUpdate, HideCardUpdate, MoveCardUpdate, MoveCubesUpdate, MoveScenarioDeckUpdate, MoveTrainUpdate, PlayerAddUpdate, PlayerGoldUpdate, PlayerHpUpdate, PlayerId, PlayerOrderUpdate, PlayerShowRoleUpdate, PlayerStatusUpdate, RemoveCardsUpdate, ShowCardUpdate, TapCardUpdate } from "../../Messages/GameUpdate";
import { GameTable, Id, getCard, newCard, newGameTable, newPlayer, searchById } from "./GameTable";

export interface GameUpdate {
    updateType: string,
    updateValue?: any
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
    ['reset', newGameTable],
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
    ['switch_turn', handleSwitchTurn],
    // ['request_status', handleRequestStatus],
    // ['status_ready', handleStatusReady],
    ['game_flags', handleGameFlags],
    // ['play_sound', handlePlaySound]
    // ['status_clear', handleStatusClear]
]);

/// GameTable.players and GameTable.cards are sorted by id
/// So that finding an object in those arrays is O(log n)
function sortById(lhs: Id, rhs: Id) {
    return lhs.id - rhs.id;
}

/// Takes as arguments an array of values, an id and a mapping function
/// This function finds the element with the specified id and returns a new array of values
/// with the found object modified according to the mapper function
function editById<T extends Id>(values: T[], id: number | undefined, mapper: (value: T) => T): T[] {
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

/// This type is a generic constraint to make sure all pockets are an array of card ids
type Pockets = {
    [key: string]: CardId[]
};

/// If `pockets` contains a pocket named `pocketName`, adds `cards` to that pocket
function addToPocket<T extends Pockets>(pockets: T, pocketName: string, cards: CardId[]): T {
    if (pocketName in pockets) {
        return {
            ...pockets,
            [pocketName]: pockets[pocketName].concat(cards)
        };
    } else {
        return pockets;
    }
}

/// If `pockets` contains a pocket named `pocketName`, removes `cards` to that pocket
function removeFromPocket<T extends Pockets>(pockets: T, pocketName: string, cards: CardId[]): T {
    if (pocketName in pockets) {
        return {
            ...pockets,
            [pocketName]: pockets[pocketName].filter(id => !cards.includes(id))
        }
    } else {
        return pockets;
    }
}

/// Handles the 'add_cards' update, creates new cards and adds them in the specified pocket
function handleAddCards(table: GameTable, { card_ids, pocket, player }: AddCardsUpdate): GameTable {
    const addedCards = card_ids.map(({id}) => id);
    const ret = {
        ...table,
        cards: table.cards.concat(card_ids.map(({ id, deck }) => newCard(id, deck, pocket, player))).sort(sortById),
        players: editById(table.players, player, p => ({ ...p, pockets: addToPocket(p.pockets, pocket, addedCards) })),
        pockets: addToPocket(table.pockets, pocket, addedCards)
    };

    return ret;
}

/// Handles the 'remove_cards' update, removes the specified cards
function handleRemoveCards(table: GameTable, { cards }: RemoveCardsUpdate): GameTable {
    // Groups cards by pocket
    let pocketCards = new Map<{pocketName: string, player?: PlayerId}, CardId[]>();
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

    // Removes the cards themselves
    let newTable = { ...table, cards: table.cards.filter(({id}) => !cards.includes(id))};

    // For each pocket remove all the cards in the array
    pocketCards.forEach((cards, {pocketName, player}) => {
        newTable = {
            ...newTable,
            players: editById(table.players, player, p => ({ ...p, pockets: removeFromPocket(p.pockets, pocketName, cards)})),
            pockets: removeFromPocket(table.pockets, pocketName, cards)
        };
    });
    return newTable;
}

// Handles the 'player_add' update, creates new players with specified player_id and user_id
function handlePlayerAdd(table: GameTable, { players }: PlayerAddUpdate): GameTable {
    return {
        ...table,
        players: table.players.concat(players.map(({player_id, user_id}) => newPlayer(player_id, user_id))).sort(sortById),
        alive_players: table.alive_players.concat(players.map(({player_id}) => player_id))
    };
}

// Handles the 'player_order' update, changing the order of how players are seated
function handlePlayerOrder(table: GameTable, { players }: PlayerOrderUpdate): GameTable {
    return { ...table, alive_players: players };
}

// Handles the 'player_hp' update, changes a player's hp
function handlePlayerHp(table: GameTable, { player, hp }: PlayerHpUpdate): GameTable {
    return {
        ...table,
        players: editById(table.players, player, p => ({ ...p, status: { ...p.status, hp }}))
    };
}

// Handles the 'player_hp' update, changes a player's gold
function handlePlayerGold(table: GameTable, { player, gold }: PlayerGoldUpdate): GameTable {
    return {
        ...table,
        players: editById(table.players, player, p => ({ ...p, status: { ...p.status, gold }}))
    };
}

// Handles the 'player_hp' update, changes a player's role
function handlePlayerShowRole(table: GameTable, { player, role }: PlayerShowRoleUpdate): GameTable {
    return {
        ...table,
        players: editById(table.players, player, p => ({ ...p, status: { ...p.status, role }}))
    };
}

// Handles the 'player_hp' update, changes a player's status
function handlePlayerStatus(table: GameTable, { player, flags, range_mod, weapon_range, distance_mod }: PlayerStatusUpdate): GameTable {
    return {
        ...table,
        players: editById(table.players, player, p => ({ ...p, status: {
            ...p.status,
            flags, range_mod, weapon_range, distance_mod
        }}))
    };
}

/// Handles the 'switch_turn' update, changes the current_turn field
function handleSwitchTurn(table: GameTable, player: PlayerId): GameTable {
    return {
        ...table,
        status: {
            ...table.status,
            current_turn: player
        }
    };
}

// Handles the 'move_card' update, removing a card from its pocket and moving it to another
function handleMoveCard(table: GameTable, { card, player, pocket }: MoveCardUpdate): GameTable {
    const cardObj = getCard(table, card);
    if (!cardObj) return table;

    const cardList = [card];
    const oldPocket = cardObj.pocket?.pocketName || 'none';

    let newPlayers = editById(table.players, cardObj.pocket?.player, player => ({ ...player, pockets: removeFromPocket(player.pockets, oldPocket, cardList) }));
    newPlayers = editById(newPlayers, player, player => ({ ...player, pockets: addToPocket(player.pockets, pocket, cardList) }));

    let newPockets = removeFromPocket(table.pockets, oldPocket, cardList);
    newPockets = addToPocket(newPockets, pocket, cardList);

    return {
        ...table,
        cards: editById(table.cards, card, card => ({ ...card, pocket: { pocketName: pocket, player }})),
        players: newPlayers,
        pockets: newPockets
    };
}

// Handles the 'deck_shuffled' update
// This moves all cards from discard_pile to main_deck or from shop_discard to shop_deck
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

// Handles the 'show_card' update, sets the cardData field
function handleShowCard(table: GameTable, { card, info }: ShowCardUpdate): GameTable {
    return {
        ...table,
        cards: editById(table.cards, card, card => ({ ...card, cardData: info }))
    };
}

// Handles the 'hide_card' update, clears the cardData field
function handleHideCard(table: GameTable, { card }: HideCardUpdate): GameTable {
    return {
        ...table,
        cards: editById(table.cards, card, card => ({ ...card, cardData: undefined }))
    };
}

// Handles the 'tap_card' update, sets the inactive field
function handleTapCard(table: GameTable, { card, inactive }: TapCardUpdate): GameTable {
    return {
        ...table,
        cards: editById(table.cards, card, card => ({ ...card, inactive }))
    };
}

// Handles the 'add_cubes' update, adding cubes to a target_card (or the table if not set)
function handleAddCubes(table: GameTable, { num_cubes, target_card }: AddCubesUpdate): GameTable {
    return {
        ...table,
        status: {
            ...table.status,
            num_cubes: table.status.num_cubes + (target_card ? 0 : num_cubes)
        },
        cards: editById(table.cards, target_card, card => ({
            ...card,
            num_cubes: card.num_cubes + num_cubes
        }))
    };
}

// Handles the 'move_cubes' update, moving `num_cubes` from origin_card (or the table if not set) to target_card (or the table if not set)
function handleMoveCubes(table: GameTable, { num_cubes, origin_card, target_card }: MoveCubesUpdate): GameTable {
    let tableCubes = table.status.num_cubes;
    if (!origin_card) tableCubes -= num_cubes;
    else if (!target_card) tableCubes += num_cubes;

    let tableCards = editById(table.cards, origin_card, card => ({ ...card, num_cubes: card.num_cubes - num_cubes }));
    tableCards = editById(table.cards, target_card, card => ({ ...card, num_cubes: card.num_cubes + num_cubes}));
    return {
        ...table,
        status: {
            ...table.status,
            num_cubes: tableCubes
        },
        cards: tableCards
    };
}

// Handles the 'move_scenario_deck' update, changes the scenario_deck_holder or wws_scenario_deck_holder field
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

// Handles the 'move_train' update, changes the train_position field
function handleMoveTrain(table: GameTable, { position }: MoveTrainUpdate): GameTable {
    return {
        ...table,
        status: {
            ...table.status,
            train_position: position
        }
    };
}

// Handles the 'game_flags' update, changes the status.flags field
function handleGameFlags(table: GameTable, flags: string[]): GameTable {
    return {
        ...table,
        status: {
            ...table.status,
            flags
        }
    };
}