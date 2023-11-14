import { CardTarget } from "./CardEnums";
import { CardId } from "./GameUpdate";

export interface PickCard {
    card: CardId;
    bypass_prompt: boolean;
    timer_id: number | null;
}

export interface PlayCard {
    card: CardId;
    modifiers: {
        card: CardId;
        targets: CardTarget[];
    }[],
    targets: CardTarget[];
    bypass_prompt: boolean;
    timer_id: number | null;
}

export type GameAction =
    { pick_card: PickCard } |
    { play_card: PlayCard };