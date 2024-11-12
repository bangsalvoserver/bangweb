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
    
    switch (animation.type) {
    case 'move_card':
        return <MoveCardAnimation
            key={animation.key}
            tracker={tracker}
            card={getCard(table, animation.card)}
            destPocket={newPocketId(animation.pocket, animation.player)}
            duration={animation.duration}
        />;
    case 'move_tokens':
        return <MoveTokensAnimation
            key={animation.key}
            tracker={tracker}
            token_type={animation.token_type}
            num_tokens={animation.num_tokens}
            origin_card={animation.origin_card ? getCard(table, animation.origin_card) : null}
            target_card={animation.target_card ? getCard(table, animation.target_card) : null}
            duration={animation.duration}
        />;
    case 'deck_shuffle':
        return <DeckShuffleAnimation
            key={animation.key}
            tracker={tracker}
            cards={animation.cards}
            pocket={animation.pocket}
            duration={animation.duration}
        />;
    case 'move_players':
        return <MovePlayersAnimation
            key={animation.key}
            tracker={tracker}
            players={animation.players}
            duration={animation.duration}
        />;
    }
    
    return null;
}