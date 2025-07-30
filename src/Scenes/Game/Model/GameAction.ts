import { CardTargetGenerated } from "./CardTarget";
import { CardId } from "./GameUpdate";

export interface GameAction {
    card: CardId;
    modifiers: {
        card: CardId;
        targets: CardTargetGenerated[];
    }[],
    targets: CardTargetGenerated[];
    bypass_prompt: boolean;
    timer_id?: number;
}