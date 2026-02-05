import { createContext, ReactNode, useContext, useLayoutEffect, useMemo, useState } from "react";
import Env from "../Model/Env";

export const LANGUAGES = {
    'it': 'Italian',
    'en': 'English',
    'es': 'Spanish',
    'cs': 'Czech',
    'hu': 'Hungarian'
} as const;

export type Language = keyof typeof LANGUAGES;

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

let registries: Partial<Record<Language, LanguageRegistries>> = {};

const EMPTY_REGISTRIES: LanguageRegistries = {
    cardRegistry: {},
    labelRegistry: {},
    gameStringRegistry: {}
};

export function getRegistries(language: Language) {
    return registries[language] ?? EMPTY_REGISTRIES;
}

async function loadRegistries(language: Language): Promise<LanguageRegistries> {
    const languageName = LANGUAGES[language];
    
    const [cardRegistry, labelRegistry, gameStringRegistry] = await Promise.all([
        import(`./${languageName}/Cards.tsx`).then(value => value.CARDS as CardRegistry),
        import(`./${languageName}/Labels.ts`).then(value => value.LABELS as LabelRegistry),
        import(`./${languageName}/GameStrings.tsx`).then(value => value.GAME_STRINGS as GameStringRegistry)
    ]);

    return { cardRegistry, labelRegistry, gameStringRegistry };
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
        case 'es-es':
        case 'es': return 'es';
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

    const [loadedLanguage, setLoadedLanguage] = useState<Language>();
    
    useLayoutEffect(() => {
        document.documentElement.lang = language;
        if (language in registries) {
            setLoadedLanguage(language);
        } else {
            loadRegistries(language).then(value => {
                registries[language] = value;
                setLoadedLanguage(language);
            });
        }
    }, [language]);

    return <LanguageContext.Provider value={loadedLanguage!}>
        {children}
    </LanguageContext.Provider>
}