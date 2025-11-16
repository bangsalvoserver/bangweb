import { useContext, useMemo, useRef } from "react";
import { CardProps, getCardUrl, getSelectorCardClass } from "../CardView";
import { GameStateContext } from "../GameScene";
import { getCardRegistryEntry } from "../GameStringComponent";
import { getCard, getCardFrontface, isCardKnown } from "../Model/GameTable";
import { useSelectorConfirm } from "../Model/SelectorConfirm";
import useCardOverlay from "../Model/UseCardOverlay";
import { PocketProps } from "./PocketView";
import "./Style/StationsView.css";

function StationCardView({ card }: CardProps) {
    const { table, selector } = useContext(GameStateContext);
    const { handleClickCard } = useSelectorConfirm();

    const divRef = useRef<HTMLDivElement>(null);
    const image = getCardFrontface(card) ?? 'backface/station';
    const cardName = isCardKnown(card) ? card.cardData.name : undefined;
    const entry = useMemo(() => cardName ? getCardRegistryEntry(cardName) : undefined, [cardName]);

    useCardOverlay(image, entry, divRef);
    
    const selectorCardClass = getSelectorCardClass(table, selector, card);
    return (
        <div ref={divRef} className={`station-card ${selectorCardClass ?? ''}`} onClick={handleClickCard(card)}>
            <img className='station-card-img' src={getCardUrl(image)} alt={entry?.name} />
        </div>
    );
}

export default function StationsView({ cards }: PocketProps) {
    const { table } = useContext(GameStateContext);
    return <div className='stations-view'>
        { cards.map(id => <StationCardView key={id} card={getCard(table, id)} /> ) }
    </div>;
}