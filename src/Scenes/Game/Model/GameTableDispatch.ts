import { GameFlag, PocketType } from "../../../Messages/CardEnums";
import { AddCardsUpdate, AddCubesUpdate, CardId, CardIdUpdate, DeckShuffledUpdate, FlashCardUpdate, GameString, HideCardUpdate, MoveCardUpdate, MoveCubesUpdate, MoveScenarioDeckUpdate, MoveTrainUpdate, PlayerAddUpdate, PlayerGoldUpdate, PlayerHpUpdate, PlayerId, PlayerIdUpdate, PlayerOrderUpdate, PlayerShowRoleUpdate, PlayerStatusUpdate, RemoveCardsUpdate, RequestStatusArgs, ShortPauseUpdate, ShowCardUpdate, StatusReadyArgs, TapCardUpdate } from "../../../Messages/GameUpdate";
import { UserId } from "../../../Messages/ServerMessage";
import { GameTable, Id, Player, PocketRef, TablePockets, getCard, getCardImage, newCard, newGameTable, newPlayer, newPocketRef } from "./GameTable";
import { GameUpdateHandler } from "./GameUpdateHandler";

export interface GameUpdate {
    updateType: string,
    updateValue?: any
}

/// GameTable.players and GameTable.cards are sorted by id
/// So that finding an object in those arrays is O(log n)
function sortById(lhs: Id, rhs: Id) {
    return lhs.id - rhs.id;
}

/// Takes as arguments an array of values, an id and a mapping function
/// This function finds the element with the specified id and returns a new array of values
/// with the found object modified according to the mapper function
function editById<T extends Id>(values: T[], id: number, mapper: (value: T) => T): T[] {
    return values.map(value => {
        if (value.id === id) {
            return mapper(value);
        } else {
            return value;
        }
    });
}

function editPocketMap(
    pockets: TablePockets, players: Player[], pocket: PocketRef,
    cardMapper: (cards: CardId[]) => CardId[]): [TablePockets, Player[]]
{
    const mapper = <Key extends PocketType, T extends Record<Key, CardId[]>>(pocketMap: T, pocketName: Key): T => {
        return { ...pocketMap, [pocketName]: cardMapper(pocketMap[pocketName]) };
    };
    if (pocket) {
        if ('player' in pocket) {
            players = editById(players, pocket.player, player => ({ ...player, pockets: mapper(player.pockets, pocket.name)}));
        } else {
            pockets = mapper(pockets, pocket.name);
        }
    }
    return [pockets, players];
}

/// Adds a list of cards to a pocket
function addToPocket(pockets: TablePockets, players: Player[], cardsToAdd: CardId[], pocket: PocketRef) {
    return editPocketMap(pockets, players, pocket, cards => cards.concat(cardsToAdd));
}

/// Removes a list of cards from a pocket
function removeFromPocket(pockets: TablePockets, players: Player[], cardsToRemove: CardId[], pocket: PocketRef) {
    return editPocketMap(pockets, players, pocket, cards => cards.filter(id => !cardsToRemove.includes(id)));
}

const gameUpdateHandlers: Record<string, (table: GameTable, update: any) => GameTable> = {};

/// Recreates the game table
gameUpdateHandlers.reset = (table: GameTable, userId?: UserId): GameTable => {
    return newGameTable(userId ?? table.myUserId);
};

/// Creates new cards and adds them in the specified pocket
gameUpdateHandlers.add_cards = (table: GameTable, { card_ids, pocket, player }: AddCardsUpdate): GameTable => {
    const pocketRef = newPocketRef(pocket, player);
    const [pockets, players] = addToPocket(table.pockets, table.players, card_ids.map(card => card.id), pocketRef);
    return {
        ...table,
        cards: table.cards.concat(card_ids.map(({ id, deck }) => newCard(id, deck, pocketRef))).sort(sortById),
        pockets, players
    };
};

function group<Key, Value>(values: Value[], mapper: (value: Value) => Key): Map<Key, Value[]> {
    let map = new Map<Key, Value[]>();
    values.forEach(value => {
        const key = mapper(value);
        map.set(key, (map.get(key) ?? []).concat(value));
    });
    return map;
}

/// Removes the specified cards
gameUpdateHandlers.remove_cards = (table: GameTable, { cards }: RemoveCardsUpdate): GameTable => {
    // Groups cards by pocket
    // NOTE pockets are compared by identity in the map, this could be optimized
    const pocketCards = group(cards, id => getCard(table, id).pocket);

    let [pockets, players] = [table.pockets, table.players];

    // For each pocket remove all the cards in the array
    pocketCards.forEach((cards, pocket) => {
        [pockets, players] = removeFromPocket(pockets, players, cards, pocket);
    });

    // ... and remove the cards themselves
    return {
        ...table,
        cards: table.cards.filter(card => !cards.includes(card.id)),
        pockets, players
    };
};

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

// Adds a message to the logs
gameUpdateHandlers.game_log = (table: GameTable, message: GameString): GameTable => {
    return {
        ...table,
        logs: table.logs.concat(message)
    };
}

// Creates new players with specified player_id and user_id
gameUpdateHandlers.player_add = (table: GameTable, { players }: PlayerAddUpdate): GameTable => {
    const newPlayers = table.players.concat(players.map(({player_id, user_id}) => newPlayer(player_id, user_id))).sort(sortById);
    const selfPlayer = newPlayers.find(p => p.userid === table.myUserId)?.id;
    return {
        ...table,
        players: newPlayers,
        alive_players: rotatePlayers(table.alive_players.concat(players.map(player => player.player_id)), selfPlayer),
        self_player: selfPlayer
    };
};

// Changes the order of how players are seated
gameUpdateHandlers.player_order = (table: GameTable, { players }: PlayerOrderUpdate): GameTable => {
    return { ...table, alive_players: rotatePlayers(players, table.self_player, table.alive_players.at(0)) };
};

// Changes a player's hp
gameUpdateHandlers.player_hp = (table: GameTable, { player, hp, duration }: PlayerHpUpdate): GameTable => {
    return {
        ...table,
        players: editById(table.players, player, p => ({ ...p,
            status: { ...p.status, hp },
            animation: {player_hp: { hp: p.status.hp, duration }}}))
    };
};

// Changes a player's gold
gameUpdateHandlers.player_gold = (table: GameTable, { player, gold }: PlayerGoldUpdate): GameTable => {
    return {
        ...table,
        players: editById(table.players, player, p => ({ ...p, status: { ...p.status, gold }}))
    };
};

// Changes a player's role
gameUpdateHandlers.player_show_role = (table: GameTable, { player, role, duration }: PlayerShowRoleUpdate): GameTable => {
    return {
        ...table,
        players: editById(table.players, player, p => ({ ...p, animation: {flipping_role:{role: p.status.role, duration}}, status: { ...p.status, role }}))
    };
};

gameUpdateHandlers.player_animation_end = (table: GameTable, { player }: PlayerIdUpdate): GameTable => {
    if (!player) return table;
    return {
        ...table,
        players: editById(table.players, player, p => ({ ...p, animation: undefined }))
    }
}

// Changes a player's status
gameUpdateHandlers.player_status = (table: GameTable, { player, flags, range_mod, weapon_range, distance_mod }: PlayerStatusUpdate): GameTable => {
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
};

/// Changes the current_turn field
gameUpdateHandlers.switch_turn = (table: GameTable, player: PlayerId): GameTable => {
    return {
        ...table,
        status: {
            ...table.status,
            current_turn: player
        }
    };
};

// Adds a card to another pocket
gameUpdateHandlers.move_card = (table: GameTable, { card, player, pocket, duration }: MoveCardUpdate): GameTable => {
    const [pockets, players] = addToPocket(table.pockets, table.players, [card], newPocketRef(pocket, player));
    return {
        ... table,
        cards: editById(table.cards, card, card => ({ ...card, animation: {move_card:{}}})),
        players, pockets,
        animation: {move_card: {card, player, pocket, duration }}
    };
};

// Removes a card from its pocket
gameUpdateHandlers.move_card_end = (table: GameTable, { card, player, pocket }: MoveCardUpdate): GameTable => {
    const [pockets, players] = removeFromPocket(table.pockets, table.players, [card], getCard(table, card).pocket);
    return {
        ...table,
        cards: editById(table.cards, card, card => ({ ...card, pocket: newPocketRef(pocket, player), animation: undefined })),
        players, pockets,
        animation: undefined
    };
};

// Moves all cards from discard_pile to main_deck or from shop_discard to shop_deck
gameUpdateHandlers.deck_shuffled = (table: GameTable, { pocket }: DeckShuffledUpdate): GameTable => {
    const fromPocket = pocket === 'main_deck' ? 'discard_pile' : 'shop_discard';
    return {
        ...table,
        cards: table.cards.map(card => {
            if (card.pocket?.name === fromPocket) {
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
};

// Sets the cardData field
gameUpdateHandlers.show_card = (table: GameTable, { card, info, duration }: ShowCardUpdate): GameTable => {
    return {
        ...table,
        cards: editById(table.cards, card, card => ({ ...card, animation: {flipping:{duration}}, cardData: info }))
    };
};

// Resets the cardData field
gameUpdateHandlers.hide_card = (table: GameTable, { card, duration }: HideCardUpdate): GameTable => {
    return {
        ...table,
        cards: editById(table.cards, card, card => ({
            ...card,
            animation: { flipping: { cardImage: getCardImage(card), duration }},
            cardData: { deck: card.cardData.deck } }))
    };
}

// Sets the inactive field
gameUpdateHandlers.tap_card = (table: GameTable, { card, inactive, duration }: TapCardUpdate): GameTable => {
    return {
        ...table,
        cards: editById(table.cards, card, card => ({ ...card, inactive, animation: {turning:{duration}} }))
    };
}

gameUpdateHandlers.flash_card = (table: GameTable, { card, duration }: FlashCardUpdate): GameTable => {
    return {
        ...table,
        cards: editById(table.cards, card, card => ({ ...card, animation: {flash:{duration}}}))
    };
}

gameUpdateHandlers.short_pause = (table: GameTable, { card, duration }: ShortPauseUpdate): GameTable => {
    if (!card) return table;
    return {
        ...table,
        cards: editById(table.cards, card, card => ({ ...card, animation: {short_pause:{}}}))
    };
}

gameUpdateHandlers.card_animation_end = (table: GameTable, { card }: CardIdUpdate): GameTable => {
    if (!card) return table;
    return {
        ...table,
        cards: editById(table.cards, card, card => ({ ...card, animation: undefined }))
    };
}

// Adds cubes to a target_card (or the table if not set)
gameUpdateHandlers.add_cubes = (table: GameTable, { num_cubes, target_card }: AddCubesUpdate): GameTable => {
    let tableCards = table.cards;
    let tableCubes = table.status.num_cubes;
    if (target_card) {
        tableCards = editById(table.cards, target_card, card => ({ ...card, num_cubes: card.num_cubes + num_cubes }));
    } else {
        tableCubes += num_cubes;
    }
    return {
        ...table,
        status: { ...table.status, num_cubes: tableCubes },
        cards: tableCards
    };
};

// Moves `num_cubes` from origin_card (or the table if not set) to target_card (or the table if not set)
gameUpdateHandlers.move_cubes = (table: GameTable, { num_cubes, origin_card, target_card }: MoveCubesUpdate): GameTable => {
    let tableCubes = table.status.num_cubes;
    let tableCards = table.cards;
    
    if (origin_card) {
        tableCards = editById(tableCards, origin_card, card => ({ ...card, num_cubes: card.num_cubes - num_cubes }));
    } else {
        tableCubes -= num_cubes;
    }
    if (target_card) {
        tableCards = editById(tableCards, target_card, card => ({ ...card, num_cubes: card.num_cubes + num_cubes }));
    } else {
        tableCubes += num_cubes;
    }
    return {
        ...table,
        status: {
            ...table.status,
            num_cubes: tableCubes
        },
        cards: tableCards
    };
};

// Changes the scenario_deck_holder or wws_scenario_deck_holder field
gameUpdateHandlers.move_scenario_deck = (table: GameTable, { player, pocket }: MoveScenarioDeckUpdate): GameTable => {
    return {
        ...table,
        status: {
            ...table.status,
            [pocket + '_holder']: player
        }
    }
};

// Changes the train_position field
gameUpdateHandlers.move_train = (table: GameTable, { position }: MoveTrainUpdate): GameTable => {
    return {
        ...table,
        status: {
            ...table.status,
            train_position: position
        }
    };
};

// Changes the status.flags field
gameUpdateHandlers.game_flags = (table: GameTable, flags: GameFlag[]): GameTable => {
    return {
        ...table,
        status: {
            ...table.status,
            flags
        }
    };
};

// Changes the status.request field
gameUpdateHandlers.request_status = gameUpdateHandlers.status_ready = (table: GameTable, status: RequestStatusArgs | StatusReadyArgs): GameTable => {
    return {
        ...table,
        status: {
            ...table.status,
            request: status
        }
    };
};

// Clears the status.request field
gameUpdateHandlers.status_clear = (table: GameTable): GameTable => {
    return {
        ...table,
        status: {
            ...table.status,
            request: {}
        }
    };
};

export function gameTableDispatch(table: GameTable, {updateType, updateValue}: GameUpdate): GameTable {
    if (updateType in gameUpdateHandlers) {
        return gameUpdateHandlers[updateType](table, updateValue);
    } else {
        return table;
    }
}