import { CardTarget } from "./CardEnums";
import { CardId } from "./GameUpdate";

export interface GameAction {
    card: CardId;
    modifiers: {
        card: CardId;
        targets: CardTarget[];
    }[],
    targets: CardTarget[];
    bypass_prompt: boolean;
    timer_id: number | null;
}