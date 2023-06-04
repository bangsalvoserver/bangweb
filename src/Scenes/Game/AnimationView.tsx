import { GameTable, getCard, newPocketRef } from "./Model/GameTable";
import MoveCardAnimation from "./MoveCardAnimation";
import MoveCubeAnimation from "./MoveCubeAnimations";
import { CardTracker } from "./PocketView";

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
            />;
        }
        if ('move_cubes' in animation) {
            return <MoveCubeAnimation
                tracker={tracker}
                num_cubes={animation.move_cubes.num_cubes}
                origin_card={animation.move_cubes.origin_card ? getCard(table, animation.move_cubes.origin_card) : undefined}
                target_card={animation.move_cubes.target_card ? getCard(table, animation.move_cubes.target_card) : undefined}
                duration={animation.move_cubes.duration}
            />;
        }
    }
    return null;
}