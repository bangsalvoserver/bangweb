import { useContext } from "react";
import { GameStateContext } from "../GameScene";
import { getCard, newPocketId } from "../Model/GameTable";
import DeckShuffleAnimation from "./DeckShuffleAnimation";
import MoveCardAnimation from "./MoveCardAnimation";
import MoveTokensAnimation from "./MoveTokensAnimation";
import { CardTracker } from "../Model/CardTracker";
import MovePlayersAnimation from "./MovePlayersAnimation";

export interface AnimationProps {
    tracker: CardTracker;
}

export default function AnimationView({ tracker }: AnimationProps) {
    const { table } = useContext(GameStateContext);
    const animation = table.animation;
    const animationKey = table.animationKey;
    
    switch (animation.type) {
    case 'move_card':
        return <MoveCardAnimation
            key={animationKey}
            tracker={tracker}
            card={getCard(table, animation.card)}
            destPocket={newPocketId(animation.pocket, animation.player)}
            duration={animation.duration}
        />;
    case 'move_tokens':
        return <MoveTokensAnimation
            key={animationKey}
            tracker={tracker}
            token_type={animation.token_type}
            num_tokens={animation.num_tokens}
            origin={animation.origin}
            target={animation.target}
            duration={animation.duration}
        />;
    case 'deck_shuffle':
        return <DeckShuffleAnimation
            key={animationKey}
            tracker={tracker}
            cards={animation.cards}
            fromPocket={animation.fromPocket}
            pocket={animation.pocket}
            duration={animation.duration}
        />;
    case 'move_players':
        return <MovePlayersAnimation
            key={animationKey}
            tracker={tracker}
            players={animation.players}
            duration={animation.duration}
        />;
    }
    
    return null;
}