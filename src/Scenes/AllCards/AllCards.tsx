import { useMemo, useRef, useState } from "react";
import Env from "../../Model/Env";
import { isMobileDevice } from "../../Utils/MobileCheck";
import useFetch from "../../Utils/UseFetch";
import CardOverlayView from "../Game/CardOverlayView";
import CardView from "../Game/CardView";
import { CardData } from "../Game/Model/CardData";
import { Card, getCardImage, isCardKnown } from "../Game/Model/GameTable";
import { OverlayState } from "../Game/Model/UseCardOverlay";
import { useMapRef } from "../../Utils/UseMapRef";
import { getCardRegistryEntry } from "../Game/GameStringComponent";
import { CardRef } from "../Game/Model/CardTracker";
import { SelectorConfirm, SelectorConfirmContext } from "../Game/Model/SelectorConfirm";
import '../../App.css';

function buildCard(cardData: CardData, index: number): Card {
    return {
        id: index,
        cardData,
        pocket: null,
        inactive: false,
        tokens: {},
        animation: { type: 'none' },
        animationKey: 0
    };
}

export default function AllCards() {
    const params = new URLSearchParams(window.location.search);
    const deck = params.get('deck') || 'main_deck';
    const url = Env.bangCardsUrl + '/' + deck;

    const cardDataList = useFetch<CardData[]>(url);
    const cards = useMemo(() => (cardDataList ?? []).filter(card => card.image.length !== 0).map(buildCard), [cardDataList]);

    const cardRefs = useMapRef<number, CardRef>();

    const [overlayState, setOverlayState] = useState<OverlayState>();
    const selected = useRef<number>();

    const selectorConfirm: SelectorConfirm = useMemo(() => ({
        handleClickCard: card => () => {
            if (selected.current === card.id) {
                setOverlayState(undefined);
                selected.current = undefined;
            } else {
                if (!isCardKnown(card)) throw new Error('All cards are known');
                setOverlayState({
                    cardImage: getCardImage(card)!,
                    entry: getCardRegistryEntry(card.cardData.name),
                    cardRef: cardRefs.get(card.id)!
                });
                selected.current = card.id;
            }
        },
        handleClickPlayer: player => undefined,
        handleConfirm: undefined,
        handleUndo: undefined,
    }), [cardRefs]);

    return <div>
        <SelectorConfirmContext.Provider value={selectorConfirm}>
            <div className={deck === 'feats' ? 'feats-cards' : ''}>{ cards.map(card =>
                <CardView key={card.id} card={card} cardRef={ref => cardRefs.set(card.id, ref)} />
            )}</div>
        </SelectorConfirmContext.Provider>
        { isMobileDevice() || <CardOverlayView overlayState={overlayState} /> }
    </div>
}