import { useContext, useImperativeHandle, useRef } from "react";
import { getDivRect } from "../../../Utils/Rect";
import { useMapRef } from "../../../Utils/UseMapRef";
import { CardProps, getCardUrl, getSelectorCardClass } from "../CardView";
import { GameTableContext } from "../GameScene";
import { getLocalizedCardName } from "../GameStringComponent";
import { CardRef } from "../Model/CardTracker";
import { getCard, getCardImage, isCardKnown } from "../Model/GameTable";
import { CardId } from "../Model/GameUpdate";
import { SelectorConfirmContext } from "../Model/TargetSelectorManager";
import useCardOverlay from "../Model/UseCardOverlay";
import { PocketProps } from "./PocketView";
import "./Style/StationsView.css";

function StationCardView({ card, cardRef }: CardProps) {
    const table = useContext(GameTableContext);
    const { handleClickCard } = useContext(SelectorConfirmContext);

    const divRef = useRef<HTMLDivElement>(null);
    const cardImage = getCardImage(card);
    const selectorCardClass = getSelectorCardClass(table, card);

    useImperativeHandle(cardRef, () => ({
        getRect: () => divRef.current ? getDivRect(divRef.current) : null
    }));

    useCardOverlay('card', card.id, divRef);

    if (!cardImage) return null;
    const imageSrc = getCardUrl(cardImage.image);

    return (
        <div ref={divRef} className={`station-card ${selectorCardClass ?? ''}`} onClick={handleClickCard(card)}>
            <img className='station-card-img' src={imageSrc} alt={isCardKnown(card) ? getLocalizedCardName(card.cardData.name) : ""} />
        </div>
    );
}

export default function StationsView({ cards, pocketRef }: PocketProps) {
    const table = useContext(GameTableContext);
    const cardRefs = useMapRef<CardId, CardRef>();
    
    useImperativeHandle(pocketRef, () => ({
        getPocketRect: () => null,
        getCardRect: (card: CardId) => cardRefs.get(card)?.getRect() ?? null
    }));

    return <div className='stations-view'>
        { cards.map(id => <StationCardView key={id} card={getCard(table, id)} cardRef={ref => cardRefs.set(id, ref)} /> ) }
    </div>;
}