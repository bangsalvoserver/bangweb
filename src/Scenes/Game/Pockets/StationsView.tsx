import { useContext, useRef } from "react";
import { useLanguage } from "../../../Locale/Registry";
import { CardProps, getCardUrl, getSelectorCardClass } from "../CardView";
import { GameStateContext } from "../GameScene";
import { getCardRegistryEntry } from "../GameStringComponent";
import { getCard, getCardImage } from "../Model/GameTable";
import { useSelectorConfirm } from "../Model/SelectorConfirm";
import useCardOverlay from "../Model/UseCardOverlay";
import { PocketProps } from "./PocketView";
import "./Style/StationsView.css";

function StationCardView({ card }: CardProps) {
    const { table, selector } = useContext(GameStateContext);
    const { handleClickCard } = useSelectorConfirm();
    const language = useLanguage();

    const divRef = useRef<HTMLDivElement>(null);
    const cardImage = getCardImage(card) ?? { image: 'backface/station' };
    const entry = cardImage.name ? getCardRegistryEntry(language, cardImage.name) : undefined;
    
    useCardOverlay(cardImage, divRef);
    
    const selectorCardClass = getSelectorCardClass(table, selector, card);
    return (
        <div ref={divRef} className={`station-card ${selectorCardClass ?? ''}`} onClick={handleClickCard(card)}>
            <img className='station-card-img' src={getCardUrl(cardImage.image)} alt={entry?.name} />
        </div>
    );
}

export default function StationsView({ cards }: PocketProps) {
    const { table } = useContext(GameStateContext);
    return <div className='stations-view'>
        { cards.map(id => <StationCardView key={id} card={getCard(table, id)} /> ) }
    </div>;
}