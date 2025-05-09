import { useContext, useRef } from "react";
import { CardProps, getCardUrl, getSelectorCardClass } from "../CardView";
import { GameStateContext } from "../GameScene";
import { getLocalizedCardName } from "../GameStringComponent";
import { getCard, getCardFrontface, isCardKnown } from "../Model/GameTable";
import useCardOverlay from "../Model/UseCardOverlay";
import { useSelectorConfirm } from "../Model/SelectorConfirm";
import { PocketProps } from "./PocketView";
import "./Style/StationsView.css";

function StationCardView({ card }: CardProps) {
    const { table, selector } = useContext(GameStateContext);
    const { handleClickCard } = useSelectorConfirm();

    const divRef = useRef<HTMLDivElement>(null);
    const image = getCardFrontface(card) ?? 'backface/station';
    const cardAlt = isCardKnown(card) ? getLocalizedCardName(card.cardData.name) : "";

    useCardOverlay(image, cardAlt, divRef);
    
    const selectorCardClass = getSelectorCardClass(table, selector, card);
    return (
        <div ref={divRef} className={`station-card ${selectorCardClass ?? ''}`} onClick={handleClickCard(card)}>
            <img className='station-card-img' src={getCardUrl(image)} alt={cardAlt} />
        </div>
    );
}

export default function StationsView({ cards }: PocketProps) {
    const { table } = useContext(GameStateContext);
    return <div className='stations-view'>
        { cards.map(id => <StationCardView key={id} card={getCard(table, id)} /> ) }
    </div>;
}