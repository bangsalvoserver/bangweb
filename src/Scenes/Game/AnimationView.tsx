import { useContext } from "react";
import DeckShuffleAnimation from "./DeckShuffleAnimation";
import { GameTableContext } from "./GameScene";
import { getCard, newPocketRef } from "./Model/GameTable";
import MoveCardAnimation from "./MoveCardAnimation";
import MoveCubeAnimation from "./MoveCubeAnimations";
import { CardTracker } from "./PocketView";
import MoveScenarioDeckAnimation from "./MoveScenarioDeckAnimation";

export interface AnimationProps {
    tracker: CardTracker;
};

export default function AnimationView({ tracker}: AnimationProps) {
    const table = useContext(GameTableContext);
    if (table.animation) {
        if ('move_card' in table.animation) {
            const animation = table.animation.move_card;
            return <MoveCardAnimation
                tracker={tracker}
                card={getCard(table, animation.card)}
                destPocket={newPocketRef(animation.pocket, animation.player)}
                duration={animation.duration}
            />;
        } else if ('move_cubes' in table.animation) {
            const animation = table.animation.move_cubes;
            return <MoveCubeAnimation
                tracker={tracker}
                num_cubes={animation.num_cubes}
                origin_card={animation.origin_card ? getCard(table, animation.origin_card) : undefined}
                target_card={animation.target_card ? getCard(table, animation.target_card) : undefined}
                duration={animation.duration}
            />;
        } else if ('deck_shuffle' in table.animation) {
            const animation = table.animation.deck_shuffle;
            return <DeckShuffleAnimation
                tracker={tracker}
                cards={animation.cards}
                pocket={animation.pocket}
                duration={animation.duration}
            />;
        } else if ('move_scenario_deck' in table.animation) {
            const animation = table.animation.move_scenario_deck;
            const card = animation.cards.at(-1);
            if (card) {
                return <MoveScenarioDeckAnimation
                    tracker={tracker}
                    card={getCard(table, card)}
                    pocket={animation.pocket}
                    startPlayer={table.status.scenario_holders[animation.pocket]}
                    endPlayer={animation.player}
                    duration={animation.duration}
                />;
            }
        }
    }
    return null;
}