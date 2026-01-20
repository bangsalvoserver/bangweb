import { createContext, ReactNode, useContext, useLayoutEffect, useMemo } from "react";
import Env, { Language } from "../Model/Env";
import { CARDS_CZECH } from "./Czech/Cards";
import { GAME_STRINGS_CZECH } from "./Czech/GameStrings";
import { LABELS_CZECH } from "./Czech/Labels";
import { CARDS_ENGLISH } from "./English/Cards";
import { GAME_STRINGS_ENGLISH } from "./English/GameStrings";
import { LABELS_ENGLISH } from "./English/Labels";
import { CARDS_ITALIAN } from "./Italian/Cards";
import { GAME_STRINGS_ITALIAN } from "./Italian/GameStrings";
import { LABELS_ITALIAN } from "./Italian/Labels";
import { CARDS_HUNGARIAN } from "./Hungarian/Cards";
import { GAME_STRINGS_HUNGARIAN } from "./Hungarian/GameStrings";
import { LABELS_HUNGARIAN } from "./Hungarian/Labels";

export type Format<T, U> = U | ((...formatArgs: T[]) => U);

export interface CardRegistryEntry {
    name: string;
    hideTitle?: boolean;
    description?: JSX.Element | JSX.Element[];
    titleClass?: string;
    descriptionClass?: string;
}

export type CardRegistry = Record<string, CardRegistryEntry>;

export type LabelGroupRegistry = Record<string, Format<string, string>>;
export type LabelRegistry = Record<string, LabelGroupRegistry>;

export type GameStringRegistry = Record<string, Format<number | JSX.Element, JSX.Element>>;

export interface LanguageRegistries {
    cardRegistry: CardRegistry;
    labelRegistry: LabelRegistry;
    gameStringRegistry: GameStringRegistry;
}

const registries: Record<Language, LanguageRegistries> = {
    'it': { cardRegistry: CARDS_ITALIAN, labelRegistry: LABELS_ITALIAN, gameStringRegistry: GAME_STRINGS_ITALIAN},
    'en': { cardRegistry: CARDS_ENGLISH, labelRegistry: LABELS_ENGLISH, gameStringRegistry: GAME_STRINGS_ENGLISH},
    'cs': { cardRegistry: CARDS_CZECH, labelRegistry: LABELS_CZECH, gameStringRegistry: GAME_STRINGS_CZECH},
    'hu': { cardRegistry: CARDS_HUNGARIAN, labelRegistry: LABELS_HUNGARIAN, gameStringRegistry: GAME_STRINGS_HUNGARIAN},
};

export function getRegistries(language: Language) {
    return registries[language];
}

function getSystemLanguage(selectedLanguage: Language | undefined): Language {
    let language: string | undefined = Env.language;

    if (!language) {
        language = new URLSearchParams(window.location.search).get('language') || '';
    }

    if (!language && selectedLanguage) {
        language = selectedLanguage;
    }

    if (!language && navigator.languages) {
        language = navigator.languages[0];
    }

    if (!language) {
        language = navigator.language;
    }

    switch (language.toLowerCase()) {
        case 'it-it':
        case 'it': return 'it';
        case 'cs-cz':
        case 'cs': return 'cs';
        case 'hu-hu':
        case 'hu': return 'hu'
        default: return 'en';
    }
}

const LanguageContext = createContext<Language>('en');

export function useLanguage() {
    return useContext(LanguageContext);
}

export function LanguageProvider({ selected, children }: { selected?: Language, children: ReactNode }) {
    const language = useMemo(() => getSystemLanguage(selected), [selected]);
    
    useLayoutEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    return <LanguageContext.Provider value={language}>
        {children}
    </LanguageContext.Provider>
}