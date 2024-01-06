import { useContext, useRef } from "react";
import { CardProps, getCardUrl, getSelectorCardClass } from "../CardView";
import { GameTableContext } from "../GameScene";
import { getLocalizedCardName } from "../GameStringComponent";
import { getCard, getCardImage, isCardKnown } from "../Model/GameTable";
import { SelectorConfirmContext } from "../Model/TargetSelectorManager";
import useCardOverlay from "../Model/UseCardOverlay";
import { PocketProps } from "./PocketView";
import "./Style/StationsView.css";

function StationCardView({ card }: CardProps) {
    const table = useContext(GameTableContext);
    const { handleClickCard } = useContext(SelectorConfirmContext);

    const divRef = useRef<HTMLDivElement>(null);
    const cardImage = getCardImage(card);
    const selectorCardClass = getSelectorCardClass(table, card);

    useCardOverlay('card', card, divRef);

    if (!cardImage) return null;
    const imageSrc = getCardUrl(cardImage.image);

    return (
        <div ref={divRef} className={`station-card ${selectorCardClass ?? ''}`} onClick={handleClickCard(card)}>
            <img className='station-card-img' src={imageSrc} alt={isCardKnown(card) ? getLocalizedCardName(card.cardData.name) : ""} />
        </div>
    );
}

export default function StationsView({ cards }: PocketProps) {
    const table = useContext(GameTableContext);
    return <div className='stations-view'>
        { cards.map(id => <StationCardView key={id} card={getCard(table, id)} /> ) }
    </div>;
}