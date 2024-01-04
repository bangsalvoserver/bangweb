import { useContext, useImperativeHandle, useRef } from "react";
import { CardProps, getCardUrl, getSelectorCardClass, useCardOverlay } from "../CardView";
import { GameTableContext } from "../GameScene";
import { getCard, getCardImage, isCardKnown } from "../Model/GameTable";
import { PocketProps } from "./PocketView";
import "./Style/StationsView.css";
import { CardId } from "../Model/GameUpdate";
import { useMapRef } from "../../../Utils/UseMapRef";
import { CardRef } from "../Model/CardTracker";
import { getDivRect } from "../../../Utils/Rect";

function StationCardView({ card, onClickCard, cardOverlayTracker, cardRef }: CardProps) {
    const table = useContext(GameTableContext);

    const divRef = useRef<HTMLDivElement>(null);
    const cardImage = getCardImage(card);
    const selectorCardClass = getSelectorCardClass(table, card);

    useImperativeHandle(cardRef, () => ({
        getRect: () => divRef.current ? getDivRect(divRef.current) : null
    }));

    useCardOverlay(card.id, divRef, cardOverlayTracker);

    if (!cardImage) return null;
    const imageSrc = getCardUrl(cardImage.image);

    return (
        <div ref={divRef} className={`station-card ${selectorCardClass ?? ''}`} onClick={onClickCard ? () => onClickCard(card) : undefined}>
            <img className='station-card-img' src={imageSrc} alt={isCardKnown(card) ? card.cardData.name : ""} />
        </div>
    );
}

export default function StationsView({ cards, onClickCard, cardOverlayTracker, pocketRef }: PocketProps) {
    const table = useContext(GameTableContext);
    const cardRefs = useMapRef<CardId, CardRef>();
    
    useImperativeHandle(pocketRef, () => ({
        getPocketRect: () => null,
        getCardRect: (card: CardId) => cardRefs.get(card)?.getRect() ?? null
    }));

    const setPos = (id: CardId) => {
        return (value: CardRef | null) => {
            cardRefs.set(id, value);
        };
    };

    return <div className='stations-view'>
        { cards.map(id => {
            const card = getCard(table, id);
            return <StationCardView
                key={id}
                card={card}
                cardRef={setPos(id)}
                onClickCard={onClickCard}
                cardOverlayTracker={cardOverlayTracker} />
        }) }
    </div>;
}