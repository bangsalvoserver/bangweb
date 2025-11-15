import { useMemo, useState } from "react";
import Env from "../../Model/Env";
import { isMobileDevice } from "../../Utils/MobileCheck";
import useFetch from "../../Utils/UseFetch";
import CardOverlayView from "../Game/CardOverlayView";
import CardView from "../Game/CardView";
import { CardData } from "../Game/Model/CardData";
import { Card } from "../Game/Model/GameTable";
import { OverlayState, SetCardOverlayContext } from "../Game/Model/UseCardOverlay";

import '../../App.css'

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

    const [overlayState, setCardOverlayState] = useState<OverlayState>();

    return <div>
        <SetCardOverlayContext.Provider value={setCardOverlayState}>
            <div>{ cards.map(card => <CardView key={card.id} card={card} />) }</div>
        </SetCardOverlayContext.Provider>
        { isMobileDevice() || <CardOverlayView overlayState={overlayState} /> }
    </div>
}