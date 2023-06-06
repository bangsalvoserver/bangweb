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
        if ('deck_shuffle' in animation) {
            return <DeckShuffleAnimation
                tracker={tracker}
                cards={animation.deck_shuffle.cards}
                pocket={animation.deck_shuffle.pocket}
                duration={animation.deck_shuffle.duration}
            />;
        }
        if ('move_scenario_deck' in animation) {
            const holder = table.status[animation.move_scenario_deck.pocket == 'scenario_deck' ? 'scenario_deck_holder' : 'wws_scenario_deck_holder'];
            if (animation.move_scenario_deck.cards.length != 0) {
                const card = getCard(table, animation.move_scenario_deck.cards[animation.move_scenario_deck.cards.length - 1]);
                return <MoveScenarioDeckAnimation
                    tracker={tracker}
                    card={card}
                    pocket={animation.move_scenario_deck.pocket}
                    startPlayer={holder}
                    endPlayer={animation.move_scenario_deck.player}
                    duration={animation.move_scenario_deck.duration}
                />;
            }
        }
    }
    return null;
}