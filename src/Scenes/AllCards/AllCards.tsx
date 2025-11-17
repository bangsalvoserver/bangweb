import { useMemo, useState } from "react";
import '../../App.css';
import Env from "../../Model/Env";
import useFetch from "../../Utils/UseFetch";
import { useMapRef } from "../../Utils/UseMapRef";
import CardOverlayView from "../Game/CardOverlayView";
import CardView from "../Game/CardView";
import { getCardRegistryEntry } from "../Game/GameStringComponent";
import { CardData } from "../Game/Model/CardData";
import { CardRef } from "../Game/Model/CardTracker";
import { Card, getCardImage, KnownCard } from "../Game/Model/GameTable";
import { SelectorConfirm, SelectorConfirmContext } from "../Game/Model/SelectorConfirm";
import { OverlayState } from "../Game/Model/UseCardOverlay";
import { useLanguage } from "../../Locale/Registry";

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
    const language = useLanguage();

    const params = new URLSearchParams(window.location.search);
    const deck = params.get('deck') || 'main_deck';
    const url = Env.bangCardsUrl + '/' + deck;

    const cardDataList = useFetch<CardData[]>(url);
    const cards = useMemo(() => (cardDataList ?? []).filter(card => card.image.length !== 0).map(buildCard), [cardDataList]);

    const cardRefs = useMapRef<number, CardRef>();

    const [overlayState, setOverlayState] = useState<OverlayState>();

    const selectorConfirm: SelectorConfirm = useMemo(() => ({
        handleClickCard: card => () => setOverlayState(overlayState => {
            if (!overlayState || overlayState.cardRef.cardId !== card.id) {
                return {
                    cardImage: getCardImage(card)!,
                    entry: getCardRegistryEntry(language, (card as KnownCard).cardData.name),
                    cardRef: cardRefs.get(card.id)!
                };
            }
        }),
        handleClickPlayer: player => undefined,
        handleConfirm: undefined,
        handleUndo: undefined,
    }), [language, cardRefs]);

    return <div>
        <SelectorConfirmContext.Provider value={selectorConfirm}>
            <div className={deck === 'feats' ? 'feats-cards' : ''}>{ cards.map(card =>
                <CardView key={card.id} card={card} cardRef={ref => cardRefs.set(card.id, ref)} />
            )}</div>
        </SelectorConfirmContext.Provider>
        <CardOverlayView overlayState={overlayState} />
    </div>
}