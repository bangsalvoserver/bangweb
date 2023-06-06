import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import CardSlot from "./CardSlot";
import { CardRef } from "./CardView";
import { GameTableContext } from "./GameScene";
import { ScenarioDeckPocket } from "./Model/CardEnums";
import { CardId, PlayerId } from "./Model/GameUpdate";
import PocketView, { PocketPosition } from "./PocketView";

export interface ScenarioDeckProps {
    pocket: ScenarioDeckPocket,
    player: PlayerId   
}

const ScenarioDeckView = forwardRef<PocketPosition, ScenarioDeckProps>(({ pocket, player }, ref) => {
    const table = useContext(GameTableContext);

    const holder = table.status[pocket == 'scenario_deck' ? 'scenario_deck_holder' : 'wws_scenario_deck_holder'];

    const deckPosition = useRef<PocketPosition>(null);
    const slotRef = useRef<CardRef>(null);

    useImperativeHandle(ref, () => {
        if (deckPosition.current) return deckPosition.current;
        return {
            getPocketRect: () => slotRef.current?.getRect(),
            getCardRect: (card: CardId) => undefined,
            scrollToEnd: () => {}
        };
    });

    if (table.animation && 'move_scenario_deck' in table.animation) {
        const animation = table.animation.move_scenario_deck;
        if (animation.pocket == pocket) {
            if (animation.player == player) {
                return <div className="pocket-view-height">
                    <CardSlot ref={slotRef} stretch='out' duration={animation.duration} />
                </div>;
            } else if (holder == player) {
                return <div className="pocket-view-height">
                    <CardSlot ref={slotRef} stretch='in' duration={animation.duration} />
                </div>;
            }
        }
    }
    
    if (holder == player && table.pockets[pocket].length != 0) {
        return (
            <div className="single-card-pocket">
                <PocketView ref={deckPosition} cards={table.pockets[pocket].slice(-2)} />
            </div>
        );
    }
    
    return null;
});

export default ScenarioDeckView;