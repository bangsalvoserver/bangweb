import { CSSProperties, Ref, useContext, useImperativeHandle, useMemo } from "react";
import { getRectCenter } from "../../Utils/Rect";
import { useMapRef } from "../../Utils/UseMapRef";
import useUpdateEveryFrame from "../../Utils/UseUpdateEveryFrame";
import CardView from "./CardView";
import { GameTableContext } from "./GameScene";
import { CardRef, CardTracker, PocketRef } from "./Model/CardTracker";
import { Card, getCard } from "./Model/GameTable";
import { CardId } from "./Model/GameUpdate";
import { getPlayableCards, isSelectionPlaying } from "./Model/TargetSelector";
import "./Style/CardChoiceView.css";

export interface CardChoiceProps {
    tracker: CardTracker;
    pocketRef?: Ref<PocketRef>;
}

interface CardChoiceInnerProps {
    cards: Card[];
    anchor: Card;
    tracker: CardTracker;
    pocketRef?: Ref<PocketRef>;
}

function CardChoiceInner({ cards, anchor, tracker, pocketRef }: CardChoiceInnerProps) {
    const anchorRect = useUpdateEveryFrame(() => tracker.getTablePocket(anchor.pocket)?.getCardRect(anchor.id));
    
    const cardRefs = useMapRef<CardId, CardRef>();

    useImperativeHandle(pocketRef, () => ({
        getPocketRect: () => null,
        getCardRect: (card: CardId) => cardRefs.get(card)?.getRect() ?? null
    }));

    if (anchorRect) {
        const anchorCenter = getRectCenter(anchorRect);

        const cardChoiceStyle = {
            '--card-anchor-x': anchorCenter.x + 'px',
            '--card-anchor-y': anchorCenter.y + 'px'
        } as CSSProperties;

        return (
            <div className="card-choice" style={cardChoiceStyle}>
                <div className="card-choice-inner">
                    { cards.map(card => <CardView key={card.id} cardRef={ref => cardRefs.set(card.id, ref)} card={card} />) }
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default function CardChoiceView({ tracker, pocketRef }: CardChoiceProps) {
    const table = useContext(GameTableContext);
    const selector = table.selector;

    const choiceCards = useMemo((): [CardId, CardId[]] | undefined => {
        if (isSelectionPlaying(selector)) {
            const anchor = selector.selection.context.card_choice;
            if (anchor) {
                return [anchor, getPlayableCards({
                    ...selector,
                    selection: {
                        ...selector.selection,
                        playing_card: null
                    }
                })];
            }
        }
    }, [selector]);

    if (choiceCards) {
        const [anchor, cards] = choiceCards;
        return <CardChoiceInner 
            cards={cards.map(id => getCard(table, id))}
            anchor={getCard(table, anchor)}
            tracker={tracker}
            pocketRef={pocketRef}
        />
    } else {
        return null;
    }
}