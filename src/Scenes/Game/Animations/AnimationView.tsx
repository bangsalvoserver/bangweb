import { useContext } from "react";
import { GameTableContext } from "../GameScene";
import { getCard, newPocketRef } from "../Model/GameTable";
import DeckShuffleAnimation from "./DeckShuffleAnimation";
import MoveCardAnimation from "./MoveCardAnimation";
import MoveCubeAnimation from "./MoveCubeAnimations";
import { CardTracker } from "../Model/CardTracker";

export interface AnimationProps {
    tracker: CardTracker;
}

export default function AnimationView({ tracker }: AnimationProps) {
    const table = useContext(GameTableContext);
    if (table.animation) {
        if ('move_card' in table.animation) {
            const animation = table.animation.move_card;
            return <MoveCardAnimation
                key={table.animationKey}
                tracker={tracker}
                card={getCard(table, animation.card)}
                destPocket={newPocketRef(animation.pocket, animation.player)}
                duration={animation.duration}
            />;
        } else if ('move_cubes' in table.animation) {
            const animation = table.animation.move_cubes;
            return <MoveCubeAnimation
                key={table.animationKey}
                tracker={tracker}
                num_cubes={animation.num_cubes}
                origin_card={animation.origin_card ? getCard(table, animation.origin_card) : null}
                target_card={animation.target_card ? getCard(table, animation.target_card) : null}
                duration={animation.duration}
            />;
        } else if ('deck_shuffle' in table.animation) {
            const animation = table.animation.deck_shuffle;
            return <DeckShuffleAnimation
                key={table.animationKey}
                tracker={tracker}
                cards={animation.cards}
                pocket={animation.pocket}
                duration={animation.duration}
            />;
        }
    }
    return null;
}