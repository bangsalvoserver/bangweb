import { CardData } from "../../Messages/CardData";

export interface CardPocket {
    addCard(card: Card): void;
    removeCard(card: Card): void;
}

export class CardPocketBase implements CardPocket {
    addCard(card: Card) {
        // TODO
    }

    removeCard(card: Card) {
        // TODO
    }
}

export class Card {
    id: number;
    deck: string;

    pocket: CardPocket | null = null;
    cardData: CardData | null = null;

    constructor(id: number, deck: string) {
        this.id = id;
        this.deck = deck;
    }
}

export class Player {
    // TODO
}

export class GameTable {
    private players = new Map<number, Player>();
    private cards = new Map<number, Card>();

    getPocket(pocketType: string, player_id?: number): CardPocket {
        // TODO
        throw new Error("unimplemented");
    }

    getPlayer(player_id: number): Player {
        return this.players.get(player_id) as Player;
    }

    getCard(card_id: number): Card {
        return this.cards.get(card_id) as Card;
    }

    addCard(card_id: number, deck: string): Card {
        let card = new Card(card_id, deck);
        this.cards.set(card_id, card);
        return card;
    }

    removeCard(card_id: number) {
        let card = this.cards.get(card_id);
        if (card && card.pocket) {
            card.pocket.removeCard(card);
        }
        this.cards.delete(card_id);
    }
}