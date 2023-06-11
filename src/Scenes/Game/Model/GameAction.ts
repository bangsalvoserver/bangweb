import { CardTarget } from "./CardEnums";
import { CardId } from "./GameUpdate";

export interface PickCard {
    card: CardId;
    bypass_prompt: boolean;
}

export interface PlayCard {
    card: CardId;
    modifiers: {
        card: CardId;
        targets: CardTarget[];
    }[],
    targets: CardTarget[];
    bypass_prompt: boolean;
}

export type GameAction =
    { pick_card: PickCard } |
    { play_card: PlayCard };