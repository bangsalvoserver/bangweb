import { GameFlag, PlayerPocketType, PocketType, TablePocketType } from "../../Messages/CardEnums";
import { AddCardsUpdate, AddCubesUpdate, CardId, DeckShuffledUpdate, GameString, HideCardUpdate, MoveCardUpdate, MoveCubesUpdate, MoveScenarioDeckUpdate, MoveTrainUpdate, PlayerAddUpdate, PlayerGoldUpdate, PlayerHpUpdate, PlayerId, PlayerOrderUpdate, PlayerShowRoleUpdate, PlayerStatusUpdate, RemoveCardsUpdate, RequestStatusArgs, ShowCardUpdate, StatusReadyArgs, TapCardUpdate } from "../../Messages/GameUpdate";
import { UserId } from "../../Messages/ServerMessage";
import { GameTable, Id, Player, PocketRef, TablePockets, getCard, newCard, newGameTable, newPlayer, newPocketRef, searchById } from "./GameTable";

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
    ['reset', handleReset],
    // ['game_error', handleGameError],
    ['game_log', handleGameLog],
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
    ['request_status', handleRequestStatus],
    ['status_ready', handleRequestStatus],
    ['game_flags', handleGameFlags],
    // ['play_sound', handlePlaySound]
    ['status_clear', handleStatusClear]
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

function addToPockets(pockets: TablePockets, players: Player[], cards: CardId[], pocket?: PocketRef): [TablePockets, Player[]] {
    /// If `pockets` contains a pocket named `pocketName`, adds `cards` to that pocket
    function addToPocket<T extends Pockets>(pockets: T, pocketName: keyof T, cards: CardId[]): T {
        return {
            ...pockets,
            [pocketName]: pockets[pocketName].concat(cards)
        };
    }

    if (pocket) {
        if ('player' in pocket) {
            players = editById(players, pocket.player, player => ({ ...player, pockets: addToPocket(player.pockets, pocket.name, cards) }));
        } else {
            pockets = addToPocket(pockets, pocket.name, cards);
        }
    }
    return [pockets, players];
}

function removeFromPockets(pockets: TablePockets, players: Player[], cards: CardId[], pocket?: PocketRef): [TablePockets, Player[]] {
    /// If `pockets` contains a pocket named `pocketName`, removes `cards` to that pocket
    function removeFromPocket<T extends Pockets> (pockets: T, pocketName: keyof T, cards: CardId[]): T {
        return {
            ...pockets,
            [pocketName]: pockets[pocketName].filter(id => !cards.includes(id))
        }
    }

    if (pocket) {
        if ('player' in pocket) {
            players = editById(players, pocket.player, p => ({ ...p, pockets: removeFromPocket(p.pockets, pocket.name, cards)}));
        } else {
            pockets = removeFromPocket(pockets, pocket.name, cards);
        }
    }
    return [pockets, players];
}

/// Handles the 'reset' update, recreating the game table
function handleReset(table: GameTable, userId?: UserId): GameTable {
    return newGameTable(userId || table.myUserId);
}

/// Handles the 'add_cards' update, creates new cards and adds them in the specified pocket
function handleAddCards(table: GameTable, { card_ids, pocket, player }: AddCardsUpdate): GameTable {
    const pocketRef = newPocketRef(pocket, player);
    const [pockets, players] = addToPockets(table.pockets, table.players, card_ids.map(card => card.id), pocketRef);
    return {
        ...table,
        cards: table.cards.concat(card_ids.map(({ id, deck }) => newCard(id, deck, pocketRef))).sort(sortById),
        pockets, players
    };
}

/// Handles the 'remove_cards' update, removes the specified cards
function handleRemoveCards(table: GameTable, { cards }: RemoveCardsUpdate): GameTable {
    // Groups cards by pocket
    let pocketCards = new Map<PocketRef, CardId[]>();
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

    let players = table.players;
    let pockets = table.pockets;

    // For each pocket remove all the cards in the array
    pocketCards.forEach((cards, pocket) => {
        [pockets, players] = removeFromPockets(pockets, players, cards, pocket);
    });

    // ... and remove the cards themselves
    return {
        ...table,
        cards: table.cards.filter(card => !cards.includes(card.id)),
        pockets, players
    };
}

function tryRotate<T>(values: T[], value?: T): boolean {
    if (value) {
        const index = values.indexOf(value);
        if (index > 0) {
            values.unshift(...values.splice(index, values.length));
            return true;
        }
    }
    return false;
}

// Moves the player which the user is controlling to the first element of the array
function rotatePlayers(players: PlayerId[], selfPlayer?: PlayerId, firstPlayer?: PlayerId) {
    tryRotate(players, selfPlayer) || tryRotate(players, firstPlayer);
    return players;
};

// Handles the 'player_add' update, creates new players with specified player_id and user_id
function handlePlayerAdd(table: GameTable, { players }: PlayerAddUpdate): GameTable {
    const newPlayers = table.players.concat(players.map(({player_id, user_id}) => newPlayer(player_id, user_id))).sort(sortById);
    const selfPlayer = newPlayers.find(p => p.userid === table.myUserId)?.id;
    return {
        ...table,
        players: newPlayers,
        alive_players: rotatePlayers(table.alive_players.concat(players.map(player => player.player_id)), selfPlayer),
        self_player: selfPlayer
    };
}

// Handles the 'player_order' update, changing the order of how players are seated
function handlePlayerOrder(table: GameTable, { players }: PlayerOrderUpdate): GameTable {
    return { ...table, alive_players: rotatePlayers(players, table.self_player, table.alive_players.at(0)) };
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
    let newAlivePlayers = table.alive_players;
    let newDeadPlayers = table.dead_players;
    if (flags.includes('removed') && newAlivePlayers.includes(player)) {
        newAlivePlayers = newAlivePlayers.filter(id => id !== player);
        newDeadPlayers = newDeadPlayers.concat(player);
    }

    return {
        ...table,
        players: editById(table.players, player, p => ({ ...p, status: {
            ...p.status,
            flags, range_mod, weapon_range, distance_mod
        }})),
        alive_players: newAlivePlayers,
        dead_players: newDeadPlayers
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
    if (!cardObj) {
        throw new Error("Card not found in MoveCardUpdate");
    }

    const pocketRef = newPocketRef(pocket, player);
    
    let [pockets, players] = removeFromPockets(table.pockets, table.players, [card], cardObj.pocket);
    [pockets, players] = addToPockets(pockets, players, [card], pocketRef);

    return {
        ...table,
        cards: editById(table.cards, card, card => ({ ...card, pocket: pocketRef })),
        players: players,
        pockets: pockets
    };
}

// Handles the 'deck_shuffled' update
// This moves all cards from discard_pile to main_deck or from shop_discard to shop_deck
function handleDeckShuffled(table: GameTable, { pocket }: DeckShuffledUpdate): GameTable {
    const fromPocket = pocket === 'main_deck' ? 'discard_pile' : 'shop_discard';
    return {
        ...table,
        cards: table.cards.map(card => {
            if (card.pocket?.name === pocket) {
                return { ...card, cardData: { deck: card.cardData.deck }, pocket: { name: pocket } };
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
        cards: editById(table.cards, card, card => ({ ...card, cardData: { deck: card.cardData.deck } }))
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
    return {
        ...table,
        status: {
            ...table.status,
            [pocket + '_holder']: player
        }
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
function handleGameFlags(table: GameTable, flags: GameFlag[]): GameTable {
    return {
        ...table,
        status: {
            ...table.status,
            flags
        }
    };
}

// Handles the 'request_status' and the 'status_ready' updates, changes the status.request field
function handleRequestStatus(table: GameTable, status: RequestStatusArgs | StatusReadyArgs): GameTable {
    return {
        ...table,
        status: {
            ...table.status,
            request: status
        }
    };
}

// Handles the 'status_clear' update, clearing the status.request field
function handleStatusClear(table: GameTable): GameTable {
    return {
        ...table,
        status: {
            ...table.status,
            request: undefined
        }
    };
}

// Handles the 'game_log' update, pushing a log to the list
function handleGameLog(table: GameTable, message: GameString): GameTable {
    return {
        ...table,
        status: {
            ...table.status,
            logs: table.status.logs.concat(message)
        }
    };
}