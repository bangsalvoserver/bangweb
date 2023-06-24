import { useContext, useMemo } from "react";
import { CardProps, getCardUrl, getSelectorCardClass } from "../CardView";
import { GameTableContext, TargetSelectorContext } from "../GameScene";
import { getCard, getCardImage } from "../Model/GameTable";
import { PocketProps } from "./PocketView";
import "./Style/StationsView.css";

function StationCardView({ card, onClickCard }: CardProps) {
    const table = useContext(GameTableContext);
    const selector = useContext(TargetSelectorContext);

    const cardImage = getCardImage(card);
    if (!cardImage) return null;
    const imageSrc = getCardUrl(card.cardData.deck + '/' + cardImage.image);
    
    const selectorCardClass = useMemo(() => getSelectorCardClass(table, selector, card), [selector]);

    return (
        <div className={`station-card ${selectorCardClass ?? ''}`} onClick={onClickCard ? () => onClickCard(card) : undefined}>
            <img className='station-card-img' src={imageSrc}/>
        </div>
    );
}

export default function StationsView({ cards, onClickCard }: PocketProps) {
    const table = useContext(GameTableContext);

    return <div className='stations-view'>
        { cards.map(id => {
            const card = getCard(table, id);
            return <StationCardView key={id} card={card} onClickCard={onClickCard} />
        }) }
    </div>;
}