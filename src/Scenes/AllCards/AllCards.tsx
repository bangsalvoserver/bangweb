import { ChangeEvent, useMemo, useState } from "react";
import '../../App.css';
import { LanguageProvider } from "../../Locale/Registry";
import Env, { Language } from "../../Model/Env";
import useFetch from "../../Utils/UseFetch";
import { useMapRef } from "../../Utils/UseMapRef";
import CardOverlayView from "../Game/CardOverlayView";
import CardView from "../Game/CardView";
import { CardData } from "../Game/Model/CardData";
import { DeckType } from "../Game/Model/CardEnums";
import { CardRef } from "../Game/Model/CardTracker";
import { Card, getCardImage, KnownCard } from "../Game/Model/GameTable";
import { SelectorConfirm, SelectorConfirmContext } from "../Game/Model/SelectorConfirm";
import { OverlayState } from "../Game/Model/UseCardOverlay";

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

function AllCardsInner({ deck }: { deck: DeckType }) {
    const cardDataList = useFetch<CardData[]>(Env.bangCardsUrl + '/' + deck);
    const cards = useMemo(() => (cardDataList ?? []).filter(card => card.image.length !== 0).map(buildCard), [cardDataList]);

    const cardRefs = useMapRef<number, CardRef>();

    const [overlayState, setOverlayState] = useState<OverlayState>();

    const selectorConfirm: SelectorConfirm = useMemo(() => ({
        handleClickCard: card => () => setOverlayState(overlayState => {
            if (!overlayState || overlayState.cardRef.cardId !== card.id) {
                return {
                    cardImage: getCardImage(card)!,
                    cardName: (card as KnownCard).cardData.name,
                    cardRef: cardRefs.get(card.id)!
                };
            }
        }),
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
        <CardOverlayView overlayState={overlayState} />
    </div>
}

function getDefaultDeck(): DeckType {
    const params = new URLSearchParams(window.location.search);
    const deck = params.get('deck');
    return deck ? deck as DeckType : 'main_deck';
}

export default function AllCards() {
    const [deck, setDeck] = useState(getDefaultDeck);
    const [language, setLanguage] = useState('en' as Language);

    const handleChangeDeck = (event: ChangeEvent<HTMLSelectElement>) => {
        setDeck(event.target.value as DeckType);
    };

    const handleChangeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value as Language);
    };

    return <LanguageProvider selected={language}>
        <div>
            <select onChange={handleChangeDeck} className="m-2 p-1">
                <option value='main_deck' selected={deck === 'main_deck'}>Main Deck</option>
                <option value='character' selected={deck === 'character'}>Characters</option>
                <option value='goldrush' selected={deck === 'goldrush'}>Gold Rush</option>
                <option value='highnoon' selected={deck === 'highnoon'}>High Noon</option>
                <option value='fistfulofcards' selected={deck === 'fistfulofcards'}>Fistful of Cards</option>
                <option value='wildwestshow' selected={deck === 'wildwestshow'}>Wild West Show</option>
                <option value='locomotive' selected={deck === 'locomotive'}>Locomotive</option>
                <option value='train' selected={deck === 'train'}>Train Cards</option>
                <option value='legends' selected={deck === 'legends'}>Legends</option>
                <option value='feats' selected={deck === 'feats'}>Feats</option>
                <option value='none' selected={deck === 'none'}>Hidden Deck</option>
            </select>
            <select onChange={handleChangeLanguage} className="m-2 p-1">
                <option value='en' selected={language === 'en'}>English</option>
                <option value='it' selected={language === 'it'}>Italian</option>
                <option value='cs' selected={language === 'cs'}>Czech</option>
            </select>
        </div>
        <AllCardsInner deck={deck} />
    </LanguageProvider>
}