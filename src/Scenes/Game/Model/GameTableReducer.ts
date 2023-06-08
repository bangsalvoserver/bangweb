import { group, maybeIndexOf, rotate } from "../../../Utils/ArrayUtils";
import { CARD_SLOT_ID } from "../CardSlot";
import { GameFlag } from "./CardEnums";
import { addToPocket, editPocketMap, removeFromPocket, rotatePlayers } from "./EditPocketMap";
import { GameTable, editById, getCard, getCardImage, newCard, newPlayer, newPocketRef, sortById } from "./GameTable";
import { AddCardsUpdate, AddCubesUpdate, CardIdUpdate, DeckShuffledUpdate, FlashCardUpdate, GameString, GameUpdate, HideCardUpdate, MoveCardUpdate, MoveCubesUpdate, MoveScenarioDeckUpdate, MoveTrainUpdate, PlayerAddUpdate, PlayerGoldUpdate, PlayerHpUpdate, PlayerId, PlayerIdUpdate, PlayerOrderUpdate, PlayerShowRoleUpdate, PlayerStatusUpdate, RemoveCardsUpdate, ShortPauseUpdate, ShowCardUpdate, TapCardUpdate } from "./GameUpdate";

const reducers: Record<string, (table: GameTable, update: any) => GameTable> = {

    /// Creates new cards and adds them in the specified pocket
    add_cards: (table: GameTable, { card_ids, pocket, player }: AddCardsUpdate): GameTable => {
        const pocketRef = newPocketRef(pocket, player);
        const [pockets, players] = addToPocket(table.pockets, table.players, pocketRef, card_ids.map(card => card.id));
        return {
            ...table,
            cards: table.cards.concat(card_ids.map(({ id, deck }) => newCard(id, deck, pocketRef))).sort(sortById),
            pockets, players
        };
    },

    /// Removes the specified cards
    remove_cards: (table: GameTable, { cards }: RemoveCardsUpdate): GameTable => {
        // Groups cards by pocket
        // NOTE pockets are compared by identity in the map, this could be optimized
        const pocketCards = group(cards, id => getCard(table, id).pocket);

        let [pockets, players] = [table.pockets, table.players];

        // For each pocket remove all the cards in the array
        pocketCards.forEach((cards, pocket) => {
            [pockets, players] = removeFromPocket(pockets, players, pocket, cards);
        });

        // ... and remove the cards themselves
        return {
            ...table,
            cards: table.cards.filter(card => !cards.includes(card.id)),
            pockets, players
        };
    },

    // Creates new players with specified player_id and user_id
    player_add: (table: GameTable, { players }: PlayerAddUpdate): GameTable => {
        const newPlayers = table.players.concat(players.map(({ player_id, user_id }) => newPlayer(player_id, user_id))).sort(sortById);
        const selfPlayer = newPlayers.find(p => p.userid === table.myUserId)?.id;
        return {
            ...table,
            players: newPlayers,
            alive_players: rotatePlayers(table.alive_players.concat(players.map(player => player.player_id)), selfPlayer),
            self_player: selfPlayer
        };
    },

    // Changes the order of how players are seated
    player_order: (table: GameTable, { players }: PlayerOrderUpdate): GameTable => {
        return { ...table, alive_players: rotatePlayers(players, table.self_player, table.alive_players.at(0)) };
    },

    // Changes a player's hp
    player_hp: (table: GameTable, { player, hp, duration }: PlayerHpUpdate): GameTable => {
        return {
            ...table,
            players: editById(table.players, player, p => ({
                ...p,
                status: { ...p.status, hp },
                animation: { player_hp: { hp: p.status.hp, duration } }
            }))
        };
    },

    // Changes a player's gold
    player_gold: (table: GameTable, { player, gold }: PlayerGoldUpdate): GameTable => {
        return {
            ...table,
            players: editById(table.players, player, p => ({ ...p, status: { ...p.status, gold } }))
        };
    },

    // Changes a player's role
    player_show_role: (table: GameTable, { player, role, duration }: PlayerShowRoleUpdate): GameTable => {
        return {
            ...table,
            players: editById(table.players, player, p => ({ ...p, animation: { flipping_role: { role: p.status.role, duration } }, status: { ...p.status, role } }))
        };
    },

    player_animation_end: (table: GameTable, { player }: PlayerIdUpdate): GameTable => {
        if (!player) return table;
        return {
            ...table,
            players: editById(table.players, player, p => ({ ...p, animation: undefined }))
        }
    },

    // Changes a player's status
    player_status: (table: GameTable, { player, flags, range_mod, weapon_range, distance_mod }: PlayerStatusUpdate): GameTable => {
        let newAlivePlayers = table.alive_players;
        let newDeadPlayers = table.dead_players;
        if (flags.includes('removed') && newAlivePlayers.includes(player)) {
            newAlivePlayers = newAlivePlayers.filter(id => id !== player);
            newDeadPlayers = newDeadPlayers.concat(player);
        }

        return {
            ...table,
            players: editById(table.players, player, p => ({
                ...p, status: {
                    ...p.status,
                    flags, range_mod, weapon_range, distance_mod
                }
            })),
            alive_players: newAlivePlayers,
            dead_players: newDeadPlayers
        };
    },

    /// Changes the current_turn field
    switch_turn: (table: GameTable, player: PlayerId): GameTable => {
        return {
            ...table,
            status: {
                ...table.status,
                current_turn: player
            }
        };
    },

    // Adds a card to another pocket
    move_card: (table: GameTable, { card, player, pocket, duration }: MoveCardUpdate): GameTable => {
        let [pockets, players] = addToPocket(table.pockets, table.players, newPocketRef(pocket, player), [card]);
        [pockets, players] = editPocketMap(pockets, players, getCard(table, card).pocket, cards => cards.map(id => id == card ? CARD_SLOT_ID : id));

        return {
            ...table,
            cards: editById(table.cards, card, card => ({ ...card, animation: { move_card: { duration } } })),
            players, pockets,
            animation: { move_card: { card, player, pocket, duration } }
        };
    },

    // Removes a card from its pocket
    move_card_end: (table: GameTable, { card, player, pocket }: MoveCardUpdate): GameTable => {
        const [pockets, players] = removeFromPocket(table.pockets, table.players, getCard(table, card).pocket, [CARD_SLOT_ID]);

        return {
            ...table,
            cards: editById(table.cards, card, card => ({ ...card, pocket: newPocketRef(pocket, player), animation: undefined })),
            players, pockets,
            animation: undefined
        };
    },

    // Moves all cards from discard_pile to main_deck or from shop_discard to shop_deck
    deck_shuffled: (table: GameTable, { pocket, duration }: DeckShuffledUpdate): GameTable => {
        const fromPocket = pocket === 'main_deck' ? 'discard_pile' : 'shop_discard';
        return {
            ...table,
            pockets: {
                ...table.pockets,
                [fromPocket]: [],
                [pocket]: [],
            },
            animation: { deck_shuffle: { pocket, duration, cards: table.pockets[fromPocket] } }
        };
    },

    deck_shuffled_end: (table: GameTable, { pocket }: DeckShuffledUpdate): GameTable => {
        const fromPocket = pocket === 'main_deck' ? 'discard_pile' : 'shop_discard';
        let animationCards = table.animation && 'deck_shuffle' in table.animation ? table.animation.deck_shuffle.cards : [];
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
                [pocket]: animationCards
            },
            animation: undefined
        };
    },

    // Sets the cardData field
    show_card: (table: GameTable, { card, info, duration }: ShowCardUpdate): GameTable => {
        return {
            ...table,
            cards: editById(table.cards, card, card => ({ ...card, animation: { flipping: { duration } }, cardData: info }))
        };
    },

    // Resets the cardData field
    hide_card: (table: GameTable, { card, duration }: HideCardUpdate): GameTable => {
        return {
            ...table,
            cards: editById(table.cards, card, card => ({
                ...card,
                animation: { flipping: { cardImage: getCardImage(card), duration } },
                cardData: { deck: card.cardData.deck }
            }))
        };
    },

    // Sets the inactive field
    tap_card: (table: GameTable, { card, inactive, duration }: TapCardUpdate): GameTable => {
        return {
            ...table,
            cards: editById(table.cards, card, card => ({ ...card, inactive, animation: { turning: { duration } } }))
        };
    },

    flash_card: (table: GameTable, { card, duration }: FlashCardUpdate): GameTable => {
        return {
            ...table,
            cards: editById(table.cards, card, card => ({ ...card, animation: { flash: { duration } } }))
        };
    },

    short_pause: (table: GameTable, { card, duration }: ShortPauseUpdate): GameTable => {
        if (!card) return table;
        return {
            ...table,
            cards: editById(table.cards, card, card => ({ ...card, animation: { short_pause: {} } }))
        };
    },

    card_animation_end: (table: GameTable, { card }: CardIdUpdate): GameTable => {
        if (!card) return table;
        return {
            ...table,
            cards: editById(table.cards, card, card => ({ ...card, animation: undefined }))
        };
    },

    // Adds cubes to a target_card (or the table if not set)
    add_cubes: (table: GameTable, { num_cubes, target_card }: AddCubesUpdate): GameTable => {
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
    },

    // Moves `num_cubes` from origin_card (or the table if not set) to target_card (or the table if not set)
    move_cubes: (table: GameTable, { num_cubes, origin_card, target_card, duration }: MoveCubesUpdate): GameTable => {
        let tableCubes = table.status.num_cubes;
        let tableCards = table.cards;

        if (origin_card) {
            tableCards = editById(tableCards, origin_card, card => ({ ...card, num_cubes: card.num_cubes - num_cubes }));
        } else {
            tableCubes -= num_cubes;
        }
        return {
            ...table,
            status: {
                ...table.status,
                num_cubes: tableCubes
            },
            cards: tableCards,
            animation: { move_cubes: { num_cubes, origin_card, target_card, duration } }
        };
    },

    move_cubes_end: (table: GameTable, { num_cubes, target_card }: MoveCubesUpdate): GameTable => {
        let tableCubes = table.status.num_cubes;
        let tableCards = table.cards;
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
            cards: tableCards,
            animation: undefined
        };
    },

    move_scenario_deck: (table: GameTable, { player, pocket, duration }: MoveScenarioDeckUpdate): GameTable => {
        return {
            ...table,
            pockets: {
                ...table.pockets,
                [pocket]: [],
            },
            animation: {
                move_scenario_deck: {
                    player, pocket, duration,
                    cards: table.pockets[pocket]
                }
            }
        }
    },

    // Changes the scenario_holder field
    move_scenario_deck_end: (table: GameTable, { player, pocket }: MoveScenarioDeckUpdate): GameTable => {
        const cards = table.animation && 'move_scenario_deck' in table.animation ? table.animation.move_scenario_deck.cards : [];
        return {
            ...table,
            status: {
                ...table.status,
                scenario_holders: {
                    ...table.status.scenario_holders,
                    [pocket]: player
                }
            },
            pockets: {
                ...table.pockets,
                [pocket]: cards
            },
            animation: undefined
        };
    },

    // Changes the train_position field
    move_train: (table: GameTable, { position }: MoveTrainUpdate): GameTable => {
        return {
            ...table,
            status: {
                ...table.status,
                train_position: position
            }
        };
    },

    // Changes the status.flags field
    game_flags: (table: GameTable, flags: GameFlag[]): GameTable => {
        return {
            ...table,
            status: {
                ...table.status,
                flags
            }
        };
    },

};

export function gameTableReduce(table: GameTable, { updateType, updateValue }: GameUpdate): GameTable {
    if (updateType in reducers) {
        return reducers[updateType](table, updateValue);
    } else {
        return table;
    }
}