import { group, intersect, rotateToFirstOf, subtract } from "../../../Utils/ArrayUtils";
import { createUnionReducer } from "../../../Utils/UnionUtils";
import { CARD_SLOT_ID_FROM, CARD_SLOT_ID_TO } from "../Pockets/CardSlot";
import { GameFlag } from "./CardEnums";
import { addToPocket, editPocketMap, removeFromPocket } from "./EditPocketMap";
import { getCardPocket } from "./Filters";
import { AnimationKey, GameTable, Player, editById, getCard, getCardBackface, getCardImage, newCard, newPlayer, newPocketId, searchIndexById } from "./GameTable";
import { getShuffleOrigin, TableUpdate } from "./GameUpdate";

function setAnimation<T extends { animation: U }, U extends AnimationKey>(value: T, animation: Omit<U, 'key'>): T {
    return {
        ...value,
        animation: { ...animation, key: value.animation.key + 1 }
    };
}

function clearAnimation<T extends { animation: U }, U extends AnimationKey>(value: T): T {
    return {
        ...value,
        animation: { type: 'none', key: value.animation.key }
    };
}

const gameTableReducer = createUnionReducer<GameTable, TableUpdate>({
    
    /// Creates new cards and adds them in the specified pocket
    add_cards ({ card_ids, pocket, player }) {
        const pocketRef = newPocketId(pocket, player);
        const [pockets, players] = addToPocket(this.pockets, this.players, pocketRef, card_ids.map(card => card.id));
        let cards = this.cards.slice();
        for (const { id, deck } of card_ids) {
            cards.splice(searchIndexById(cards, id), 0, newCard(id, deck, pocketRef));
        }
        return { ...this, cards, pockets, players };
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

    // Creates new players or updates existing players with specified player_id and user_id
    player_add ({ players }) {
        let newPlayers: Player[] = this.players.slice();
        let newAlivePlayers = this.alive_players;
        for (const { player_id, user_id } of players) {
            const playerIndex = searchIndexById(newPlayers, player_id);
            if (newPlayers.at(playerIndex)?.id === player_id) {
                newPlayers[playerIndex] = { ...newPlayers[playerIndex], user_id };
            } else {
                newPlayers.splice(playerIndex, 0, newPlayer(player_id, user_id));
                newAlivePlayers = newAlivePlayers.concat(player_id);
            }
        }
        const selfPlayer = newPlayers.find(p => p.user_id === this.myUserId)?.id;
        return {
            ...this,
            players: newPlayers,
            alive_players: rotateToFirstOf(newAlivePlayers, selfPlayer),
            self_player: selfPlayer
        };
    },

    // Sets the player_death animation and/or the player_move animation
    player_order ({ players, duration }) {
        const filteredPlayers = intersect(this.alive_players, players);
        const rotatedPlayers = rotateToFirstOf(players, this.self_player, filteredPlayers.at(0));
        const removedPlayers = subtract(this.alive_players, players);

        let newPlayers = this.players;
        if (removedPlayers.length !== 0) {
            newPlayers = editById(newPlayers, removedPlayers, player => setAnimation(player, { type: 'player_death', duration }))
        }

        const movedPlayers = filteredPlayers.flatMap(( player_id, i) => {
            if (rotatedPlayers[i] === player_id) {
                return [];
            } else {
                const rotatedIndex = rotatedPlayers.indexOf(player_id);
                return [{ from: player_id, to: filteredPlayers[rotatedIndex] }];
            }
        });

        const newTable: GameTable = { ...this, players: newPlayers };
        if (movedPlayers.length === 0) {
            return clearAnimation(newTable);
        } else {
            return setAnimation(newTable, { type: 'move_players', players: movedPlayers, duration });
        }
    },
    
    // Changes the order of how players are seated
    player_order_end ({ players }) {
        const filteredPlayers = intersect(this.alive_players, players);
        const rotatedPlayers = rotateToFirstOf(players, this.self_player, filteredPlayers.at(0));
        const removedPlayers = subtract(this.alive_players, players);

        let newPlayers = this.players;
        if (removedPlayers.length !== 0) {
            newPlayers = editById(newPlayers, removedPlayers, clearAnimation)
        }

        return clearAnimation({
            ...this,
            players: newPlayers,
            alive_players: rotatedPlayers
        })
    },

    // Changes a player's hp
    player_hp ({ player, hp, duration }) {
        return {
            ...this,
            players: editById(this.players, player, p => setAnimation(
                { ...p, status: { ...p.status, hp } },
                { type: 'player_hp', hp: p.status.hp, duration }
            ))
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
            players: editById(this.players, player, p => setAnimation(
                { ...p, status: { ...p.status, role } },
                { type: 'flipping_role', role: p.status.role, duration }
            ))
        };
    },

    player_animation_end (player) {
        return {
            ...this,
            players: editById(this.players, player, clearAnimation)
        }
    },

    // Changes a player's flags
    player_flags ({ player, flags }) {
        return {
            ...this,
            players: editById(this.players, player, p => ({
                ...p, status: { ...p.status, flags }
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
    move_card ({ card, player, pocket, position, duration }) {
        const fromPocket = getCard(this, card).pocket;
        let [pockets, players] = editPocketMap(this.pockets, this.players, fromPocket, cards => cards.map(id => id === card ? CARD_SLOT_ID_FROM : id));

        const toPocket = newPocketId(pocket, player);
        [pockets, players] = addToPocket(pockets, players, toPocket, [CARD_SLOT_ID_TO], position);

        return setAnimation(
            { ...this, players, pockets },
            { type: 'move_card', card, player, pocket, position, duration }
        );
    },

    // Removes a card from its pocket
    move_card_end ({ card, player, pocket }) {
        const fromPocket = getCard(this, card).pocket;
        let [pockets, players] = removeFromPocket(this.pockets, this.players, fromPocket, [CARD_SLOT_ID_FROM]);

        const toPocket = newPocketId(pocket, player);
        [pockets, players] = editPocketMap(pockets, players, toPocket, cards => cards.map(id => id === CARD_SLOT_ID_TO ? card: id));

        return clearAnimation({
            ...this,
            cards: editById(this.cards, card, card => clearAnimation({ ...card, pocket: toPocket })),
            players, pockets
        });
    },

    // Moves all cards from discard_pile to main_deck or from shop_discard to shop_deck
    deck_shuffled ({ pocket, duration }) {
        const fromPocket = getShuffleOrigin(pocket);
        return setAnimation({
            ...this,
            pockets: {
                ...this.pockets,
                [fromPocket]: [],
                [pocket]: [],
            }
        }, { type: 'deck_shuffle', pocket, duration, cards: this.pockets[fromPocket] });
    },

    deck_shuffled_end ({ pocket }) {
        const fromPocket = getShuffleOrigin(pocket);
        let animationCards = this.animation.type === 'deck_shuffle' ? this.animation.cards : [];
        return clearAnimation({
            ...this,
            cards: this.cards.map(card => {
                if (getCardPocket(card) === fromPocket) {
                    return { ...card, cardData: { deck: card.cardData.deck }, pocket: { name: pocket } };
                } else {
                    return card;
                }
            }),
            pockets: {
                ...this.pockets,
                [pocket]: animationCards
            }
        });
    },

    // Sets the cardData field
    show_card ({ card, info, duration }) {
        let [pockets, players] = [this.pockets, this.players];

        const cardObj = getCard(this, card);
        switch (cardObj.pocket?.name) {
        case 'main_deck':
        case 'discard_pile':
            [pockets, players] = editPocketMap(pockets, players, cardObj.pocket, cards => cards.filter(id => id !== card).concat(card));
        }
        return {
            ...this, pockets, players,
            cards: editById(this.cards, card, card => setAnimation(
                { ...card, cardData: info },
                { type: 'flipping', duration }
            ))
        };
    },

    // Resets the cardData field
    hide_card ({ card, duration }) {
        return {
            ...this,
            cards: editById(this.cards, card, card => setAnimation(
                { ...card, cardData: { deck: card.cardData.deck }},
                { type: 'flipping', cardImage: getCardImage(card), backface: getCardBackface(card), duration },
            ))
        };
    },

    // Sets the inactive field
    tap_card ({ card, inactive, duration }) {
        return {
            ...this,
            cards: editById(this.cards, card, card => setAnimation(
                { ...card, inactive },
                { type: 'turning', duration },
            ))
        };
    },

    flash_card ({ card, duration }) {
        return {
            ...this,
            cards: editById(this.cards, card, card => setAnimation(card,
                { type: 'flash', duration }
            ))
        };
    },

    short_pause ({ card }) {
        if (!card) return this;
        return {
            ...this,
            cards: editById(this.cards, card, card => setAnimation(card,
                { type: 'short_pause' },
            ))
        };
    },

    card_animation_end (card) {
        return {
            ...this,
            cards: editById(this.cards, card, clearAnimation)
        };
    },

    // Adds tokens to a target_card (or the table if not set)
    add_tokens ({ token_type, num_tokens, target_card }) {
        let tableCards = this.cards;
        let tableTokens = this.status.tokens[token_type];
        if (target_card) {
            tableCards = editById(this.cards, target_card, card => ({ ...card, tokens: { ...card.tokens, [token_type]: card.tokens[token_type] + num_tokens }}));
        } else {
            tableTokens += num_tokens;
        }
        return {
            ...this,
            status: { ...this.status, tokens: { ...this.status.tokens, [token_type]: tableTokens }},
            cards: tableCards
        };
    },

    // Moves `num_tokens` from origin_card (or the table if not set) to target_card (or the table if not set)
    move_tokens ({ token_type, num_tokens, origin_card, target_card, duration }) {
        let tableTokens = this.status.tokens[token_type];
        let tableCards = this.cards;

        if (origin_card) {
            tableCards = editById(tableCards, origin_card, card => ({ ...card, tokens: { ...card.tokens, [token_type]: card.tokens[token_type] - num_tokens }}));
        } else {
            tableTokens -= num_tokens;
        }
        return setAnimation({
            ...this,
            status: {
                ...this.status,
                tokens: { ...this.status.tokens, [token_type]: tableTokens }
            },
            cards: tableCards
        }, { type: 'move_tokens', token_type, num_tokens, origin_card, target_card, duration });
    },

    move_tokens_end ({ token_type, num_tokens, target_card }) {
        let tableTokens = this.status.tokens[token_type];
        let tableCards = this.cards;
        if (target_card) {
            tableCards = editById(tableCards, target_card, card => ({ ...card, tokens: { ...card.tokens, [token_type]: card.tokens[token_type] + num_tokens }}));
        } else {
            tableTokens += num_tokens;
        }
        return clearAnimation({
            ...this,
            status: {
                ...this.status,
                tokens: { ...this.status.tokens, [token_type]: tableTokens }
            },
            cards: tableCards
        });
    },

    // Changes the train_position field
    move_train ({ position, duration }) {
        return setAnimation(this, { type: 'move_train', position, duration })
    },

    move_train_end({ position }) {
        return clearAnimation({
            ...this,
            status: {
                ...this.status,
                train_position: position
            }
        });
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
    }

});

export default gameTableReducer;