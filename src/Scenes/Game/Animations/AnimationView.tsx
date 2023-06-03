import { GameTable, TableAnimation, getCard, newPocketRef } from "../Model/GameTable";
import { CardTracker } from "../PocketView";
import MoveCardAnimation from "./MoveCardAnimation";

export interface AnimationProps {
    table: GameTable;
    tracker: CardTracker;
};

export default function AnimationView({ table, tracker}: AnimationProps) {
    const animation = table.animation;
    if (animation) {
        if ('move_card' in animation) {
            return <MoveCardAnimation
                tracker={tracker}
                card={getCard(table, animation.move_card.card)}
                destPocket={newPocketRef(animation.move_card.pocket, animation.move_card.player)}
                duration={animation.move_card.duration}
            />
        }
    }
    return null;
}