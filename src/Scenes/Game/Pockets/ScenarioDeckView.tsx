import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { CardRef } from "../CardView";
import { GameTableContext } from "../GameScene";
import { ScenarioDeckPocket } from "../Model/CardEnums";
import { CardId, PlayerId } from "../Model/GameUpdate";
import CardSlot from "./CardSlot";
import PocketView, { PocketPosition } from "./PocketView";
import CountPocket from "./CountPocket";

export interface ScenarioDeckProps {
    pocket: ScenarioDeckPocket;
    player: PlayerId;
}

const ScenarioDeckView = forwardRef<PocketPosition, ScenarioDeckProps>(({ pocket, player }, ref) => {
    const table = useContext(GameTableContext);

    const holder = table.status.scenario_holders[pocket];

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
        return <CountPocket noCount ref={deckPosition} cards={table.pockets[pocket]} />;
    }
    
    return null;
});

export default ScenarioDeckView;