import { useContext, useImperativeHandle, useRef } from "react";
import { Milliseconds } from "../../../Model/ServerMessage";
import { getDivRect } from "../../../Utils/Rect";
import { useMapRef } from "../../../Utils/UseMapRef";
import CardView from "../CardView";
import { GameStateContext } from "../GameScene";
import { CardRef } from "../Model/CardTracker";
import { getCard } from "../Model/GameTable";
import { CardId } from "../Model/GameUpdate";
import CardSlot, { CARD_SLOT_ID_FROM, CARD_SLOT_ID_TO, StretchDirection } from "./CardSlot";
import { PocketProps } from "./PocketView";
import "./Style/FeatsPocket.css";

export default function FeatsPocket({ pocketRef, cards }: PocketProps) {
    const { table } = useContext(GameStateContext);
    const divRef = useRef<HTMLDivElement>(null);
    const cardRefs = useMapRef<CardId, CardRef>();
    const setPos = (key: CardId) => (value: CardRef | null) => cardRefs.set(key, value);

    useImperativeHandle(pocketRef, () => ({
        getPocketRect: () => getDivRect(divRef.current),
        getCardRect: (card: CardId) => cardRefs.get(card)?.getRect() ?? null
    }), [cardRefs]);

    return <div ref={divRef} className='feats-pocket'>
        { cards.map((id, index) => {
            if (id === CARD_SLOT_ID_FROM || id === CARD_SLOT_ID_TO) {
                const key = `${id} ${table.animationKey}`;
                let stretch: StretchDirection | undefined;
                let duration: Milliseconds | undefined;
                if (table.animation.type === 'move_card' && id === CARD_SLOT_ID_TO && index + 1 === cards.length && index % 2 === 0) {
                    stretch = 'out';
                    duration = table.animation.duration;
                }
                return <CardSlot cardRef={setPos(id)} key={key} stretch={stretch} duration={duration} />
            } else {
                const card = getCard(table, id);
                const key = `${id} ${card.animationKey}`;
                return <CardView cardRef={setPos(id)} key={key} card={card} />
            }
        }) }
    </div>;
}