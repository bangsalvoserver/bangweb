import { EffectListType } from "./CardData";
import { CardTargetGenerated } from "./CardTarget";
import { CardId } from "./GameUpdate";

export interface GameActionSelection {
    card: CardId;
    effect_list: EffectListType;
    targets: CardTargetGenerated[];
}

export interface GameAction extends GameActionSelection {
    modifiers: GameActionSelection[];
    bypass_prompt: boolean;
    timer_id?: number;
}