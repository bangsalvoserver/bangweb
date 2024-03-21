import { useContext, useMemo, useRef } from "react";
import { CardProps, getCardUrl, getSelectorCardClass } from "../CardView";
import { GameTableContext } from "../GameScene";
import { getLocalizedCardName } from "../GameStringComponent";
import { getCard, getCardImage, isCardKnown } from "../Model/GameTable";
import { SelectorConfirmContext } from "../Model/UseSelectorConfirm";
import useCardOverlay from "../Model/UseCardOverlay";
import { PocketProps } from "./PocketView";
import "./Style/StationsView.css";

function StationCardView({ card }: CardProps) {
    const table = useContext(GameTableContext);
    const { handleClickCard } = useContext(SelectorConfirmContext);

    const divRef = useRef<HTMLDivElement>(null);
    const [cardImage, cardAlt] = useMemo(() => [
        getCardImage(card) ?? { image: 'backface/station' },
        isCardKnown(card) ? getLocalizedCardName(card.cardData.name) : ""
    ] as const, [card]);

    useCardOverlay(cardImage, cardAlt, divRef);
    
    const selectorCardClass = getSelectorCardClass(table, card);
    return (
        <div ref={divRef} className={`station-card ${selectorCardClass ?? ''}`} onClick={handleClickCard(card)}>
            <img className='station-card-img' src={getCardUrl(cardImage.image)} alt={cardAlt} />
        </div>
    );
}

export default function StationsView({ cards }: PocketProps) {
    const table = useContext(GameTableContext);
    return <div className='stations-view'>
        { cards.map(id => <StationCardView key={id} card={getCard(table, id)} /> ) }
    </div>;
}