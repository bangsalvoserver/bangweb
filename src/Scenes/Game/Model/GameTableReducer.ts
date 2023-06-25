import { group, subtract } from "../../../Utils/ArrayUtils";
import { createUnionReducer } from "../../../Utils/UnionUtils";
import { CARD_SLOT_ID } from "../Pockets/CardSlot";
import { GameFlag } from "./CardEnums";
import { addToPocket, editPocketMap, removeFromPocket, rotatePlayers } from "./EditPocketMap";
import { GameTable, editById, getCard, getCardImage, newCard, newPlayer, newPocketRef, sortById } from "./GameTable";
import { GameUpdate } from "./GameUpdate";

const gameTableReducer = createUnionReducer<GameTable, GameUpdate>({
    
    /// Creates new cards and adds them in the specified pocket
    add_cards ({ card_ids, pocket, player }) {
        const pocketRef = newPocketRef(pocket, player);
        const [pockets, players] = addToPocket(this.pockets, this.players, pocketRef, card_ids.map(card => card.id));
        return {
            ...this,
            cards: this.cards.concat(card_ids.map(({ id, deck }) => newCard(id, deck, pocketRef))).sort(sortById),
            pockets, players
        };
    },

    /// Removes the specified cards
    remove_cards ({ cards }) {
        // Groups cards by pocket
        // NOTE pockets are compared by identity in the map, this could be optimized
        const pocketCards = group(cards, id => getCard(this, id).pocket);

        let [pockets, players] = [this.pockets, this.players];

        // For each pocket remove all the cards in the array
        pocketCards.forEach((cards, pocket) => {
            [pockets, players] = removeFromPocket(pockets, players, pocket, cards);
        });

        // ... and remove the cards themselves
        return {
            ...this,
            cards: this.cards.filter(card => !cards.includes(card.id)),
            pockets, players
        };
    },

    // Creates new players with specified player_id and user_id
    player_add ({ players }) {
        const newPlayers = this.players.concat(players.map(({ player_id, user_id }) => newPlayer(player_id, user_id))).sort(sortById);
        const selfPlayer = newPlayers.find(p => p.userid === this.myUserId)?.id;
        return {
            ...this,
            players: newPlayers,
            alive_players: rotatePlayers(this.alive_players.concat(players.map(player => player.player_id)), selfPlayer),
            self_player: selfPlayer
        };
    },

    // Adds the removed players to the dead_players array, sets the player_death animation
    player_order ({ players, duration }) {
        const removedPlayers = subtract(this.alive_players, players);
        console.log(removedPlayers);
        if (removedPlayers.length !== 0) {
            let newPlayers = this.players;
            for (const player of removedPlayers) {
                newPlayers = editById(newPlayers, player, player => ({ ...player, animation: { player_death: { duration } } }));
            }
            return { ...this, players: newPlayers };
        } else {
            return this;
        }
    },
    
    // Changes the order of how players are seated
    player_order_end ({ players }) {
        const removedPlayers = subtract(this.alive_players, players);
        let newPlayers = this.players;
        for (const player of removedPlayers) {
            newPlayers = editById(newPlayers, player, player => ({ ...player, animation: undefined }));
        }
        return {
            ...this,
            players: newPlayers,
            alive_players: rotatePlayers(players, this.self_player, this.alive_players.at(0)),
            dead_players: removedPlayers.length == 0 ? this.dead_players : this.dead_players.concat(removedPlayers)
        };
    },

    // Changes a player's hp
    player_hp ({ player, hp, duration }) {
        return {
            ...this,
            players: editById(this.players, player, p => ({
                ...p,
                status: { ...p.status, hp },
                animation: { player_hp: { hp: p.status.hp, duration } }
            }))
        };
    },

    // Changes a player's gold
    player_gold ({ player, gold }) {
        return {
            ...this,
            players: editById(this.players, player, p => ({ ...p, status: { ...p.status, gold } }))
        };
    },

    // Changes a player's role
    player_show_role ({ player, role, duration }) {
        return {
            ...this,
            players: editById(this.players, player, p => ({ ...p, animation: { flipping_role: { role: p.status.role, duration } }, status: { ...p.status, role } }))
        };
    },

    player_animation_end (player) {
        return {
            ...this,
            players: editById(this.players, player, p => ({ ...p, animation: undefined }))
        }
    },

    // Changes a player's status
    player_status ({ player, flags, range_mod, weapon_range, distance_mod }) {
        return {
            ...this,
            players: editById(this.players, player, p => ({
                ...p, status: {
                    ...p.status,
                    flags, range_mod, weapon_range, distance_mod
                }
            }))
        };
    },

    /// Changes the current_turn field
    switch_turn (player) {
        return {
            ...this,
            status: {
                ...this.status,
                current_turn: player
            }
        };
    },

    // Adds a card to another pocket
    move_card ({ card, player, pocket, duration }) {
        let [pockets, players] = addToPocket(this.pockets, this.players, newPocketRef(pocket, player), [card]);
        [pockets, players] = editPocketMap(pockets, players, getCard(this, card).pocket, cards => cards.map(id => id == card ? CARD_SLOT_ID : id));

        return {
            ...this,
            cards: editById(this.cards, card, card => ({ ...card, animation: { move_card: { duration } } })),
            players, pockets,
            animation: { move_card: { card, player, pocket, duration } }
        };
    },

    // Removes a card from its pocket
    move_card_end ({ card, player, pocket }) {
        const [pockets, players] = removeFromPocket(this.pockets, this.players, getCard(this, card).pocket, [CARD_SLOT_ID]);

        return {
            ...this,
            cards: editById(this.cards, card, card => ({ ...card, pocket: newPocketRef(pocket, player), animation: undefined })),
            players, pockets,
            animation: undefined
        };
    },

    // Moves all cards from discard_pile to main_deck or from shop_discard to shop_deck
    deck_shuffled ({ pocket, duration }) {
        const fromPocket = pocket === 'main_deck' ? 'discard_pile' : 'shop_discard';
        return {
            ...this,
            pockets: {
                ...this.pockets,
                [fromPocket]: [],
                [pocket]: [],
            },
            animation: { deck_shuffle: { pocket, duration, cards: this.pockets[fromPocket] } }
        };
    },

    deck_shuffled_end ({ pocket }) {
        const fromPocket = pocket === 'main_deck' ? 'discard_pile' : 'shop_discard';
        let animationCards = this.animation && 'deck_shuffle' in this.animation ? this.animation.deck_shuffle.cards : [];
        return {
            ...this,
            cards: this.cards.map(card => {
                if (card.pocket?.name === fromPocket) {
                    return { ...card, cardData: { deck: card.cardData.deck }, pocket: { name: pocket } };
                } else {
                    return card;
                }
            }),
            pockets: {
                ...this.pockets,
                [pocket]: animationCards
            },
            animation: undefined
        };
    },

    // Sets the cardData field
    show_card ({ card, info, duration }) {
        return {
            ...this,
            cards: editById(this.cards, card, card => ({ ...card, animation: { flipping: { duration } }, cardData: info }))
        };
    },

    // Resets the cardData field
    hide_card ({ card, duration }) {
        return {
            ...this,
            cards: editById(this.cards, card, card => ({
                ...card,
                animation: { flipping: { cardImage: getCardImage(card), duration } },
                cardData: { deck: card.cardData.deck }
            }))
        };
    },

    // Sets the inactive field
    tap_card ({ card, inactive, duration }) {
        return {
            ...this,
            cards: editById(this.cards, card, card => ({ ...card, inactive, animation: { turning: { duration } } }))
        };
    },

    flash_card ({ card, duration }) {
        return {
            ...this,
            cards: editById(this.cards, card, card => ({ ...card, animation: { flash: { duration } } }))
        };
    },

    short_pause ({ card }) {
        if (!card) return this;
        return {
            ...this,
            cards: editById(this.cards, card, card => ({ ...card, animation: { short_pause: {} } }))
        };
    },

    card_animation_end (card) {
        return {
            ...this,
            cards: editById(this.cards, card, card => ({ ...card, animation: undefined }))
        };
    },

    // Adds cubes to a target_card (or the table if not set)
    add_cubes ({ num_cubes, target_card }) {
        let tableCards = this.cards;
        let tableCubes = this.status.num_cubes;
        if (target_card) {
            tableCards = editById(this.cards, target_card, card => ({ ...card, num_cubes: card.num_cubes + num_cubes }));
        } else {
            tableCubes += num_cubes;
        }
        return {
            ...this,
            status: { ...this.status, num_cubes: tableCubes },
            cards: tableCards
        };
    },

    // Moves `num_cubes` from origin_card (or the table if not set) to target_card (or the table if not set)
    move_cubes ({ num_cubes, origin_card, target_card, duration }) {
        let tableCubes = this.status.num_cubes;
        let tableCards = this.cards;

        if (origin_card) {
            tableCards = editById(tableCards, origin_card, card => ({ ...card, num_cubes: card.num_cubes - num_cubes }));
        } else {
            tableCubes -= num_cubes;
        }
        return {
            ...this,
            status: {
                ...this.status,
                num_cubes: tableCubes
            },
            cards: tableCards,
            animation: { move_cubes: { num_cubes, origin_card, target_card, duration } }
        };
    },

    move_cubes_end ({ num_cubes, target_card }) {
        let tableCubes = this.status.num_cubes;
        let tableCards = this.cards;
        if (target_card) {
            tableCards = editById(tableCards, target_card, card => ({ ...card, num_cubes: card.num_cubes + num_cubes }));
        } else {
            tableCubes += num_cubes;
        }
        return {
            ...this,
            status: {
                ...this.status,
                num_cubes: tableCubes
            },
            cards: tableCards,
            animation: undefined
        };
    },

    move_scenario_deck ({ player, pocket, duration }) {
        return {
            ...this,
            pockets: {
                ...this.pockets,
                [pocket]: [],
            },
            animation: {
                move_scenario_deck: {
                    player, pocket, duration,
                    cards: this.pockets[pocket]
                }
            }
        }
    },

    // Changes the scenario_holder field
    move_scenario_deck_end ({ player, pocket }) {
        const cards = this.animation && 'move_scenario_deck' in this.animation ? this.animation.move_scenario_deck.cards : [];
        return {
            ...this,
            status: {
                ...this.status,
                scenario_holders: {
                    ...this.status.scenario_holders,
                    [pocket]: player
                }
            },
            pockets: {
                ...this.pockets,
                [pocket]: cards
            },
            animation: undefined
        };
    },

    // Changes the train_position field
    move_train ({ position, duration }) {
        return {
            ...this,
            animation: { move_train: { position, duration }}
        };
    },

    move_train_end({ position }) {
        return {
            ...this,
            status: {
                ...this.status,
                train_position: position
            },
            animation: undefined
        };
    },

    // Changes the status.flags field
    game_flags (flags: GameFlag[]) {
        return {
            ...this,
            status: {
                ...this.status,
                flags
            }
        };
    },

});

export default gameTableReducer;