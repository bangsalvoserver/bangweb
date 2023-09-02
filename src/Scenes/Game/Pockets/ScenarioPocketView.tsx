import { MutableRefObject, forwardRef, useImperativeHandle, useRef } from "react";
import { CardId } from "../Model/GameUpdate";
import { PocketPosition } from "../Model/CardTracker";
import StackPocket from "./StackPocket";
import { Card } from "../Model/GameTable";

export interface ScenarioPocketProps {
    deckCards: CardId[];
    activeCards: CardId[];
    onClickCard?: (card: Card) => void;
}

export interface ScenarioPocketRef {
    deckRef: MutableRefObject<PocketPosition | null>;
    activeRef: MutableRefObject<PocketPosition | null>;
}

const ScenarioPocketView = forwardRef<ScenarioPocketRef, ScenarioPocketProps>(({ deckCards, activeCards, onClickCard }, ref) => {
    const scenarioRef = {
        deckRef: useRef<PocketPosition>(null),
        activeRef: useRef<PocketPosition>(null)
    };

    useImperativeHandle(ref, () => scenarioRef);

    if (deckCards.length == 0 && activeCards.length == 0) {
        return null;
    }

    return <div className="scenario-pocket-view">
        <StackPocket ref={scenarioRef.deckRef} cards={deckCards} slice={2} />
        <StackPocket ref={scenarioRef.activeRef} cards={activeCards} slice={2} onClickCard={onClickCard} />
    </div>
});

export default ScenarioPocketView;