import { createContext, ReactNode, useContext, useLayoutEffect, useMemo, useState } from "react";
import Env from "../Model/Env";
import LANGUAGES from "./Languages";

export type Language = keyof typeof LANGUAGES;

export function getLanguages() {
    return Object.entries(LANGUAGES).map(([language, [, name]]) => [ language as Language, name ]);
}

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

const EMPTY_REGISTRIES: LanguageRegistries = { cardRegistry: {}, labelRegistry: {}, gameStringRegistry: {} };

export function getRegistries(language: Language) {
    return registries[language] ?? EMPTY_REGISTRIES;
}

export function hasLabel(language: Language, group: string, name: string) {
    const { labelRegistry } = getRegistries(language);
    if (group in labelRegistry) {
        return name in labelRegistry[group];
    }
    return false;
}

export function getLabel(language: Language, group: string, name: string, ...formatArgs: string[]): string {
    const { labelRegistry } = getRegistries(language);
    if (group in labelRegistry) {
        const labelGroup = labelRegistry[group];
        if (name in labelGroup) {
            const value = labelGroup[name];
            if (typeof value === 'function') {
                return value(...formatArgs);
            } else {
                return value;
            }
        }
    }
    return group + '.' + name;
}

async function loadRegistries(language: Language): Promise<LanguageRegistries> {
    const folder = LANGUAGES[language][0];
    
    const [cardRegistry, labelRegistry, gameStringRegistry] = await Promise.all([
        import(`./${folder}/Cards.tsx`).then(value => value.CARDS as CardRegistry),
        import(`./${folder}/Labels.ts`).then(value => value.LABELS as LabelRegistry),
        import(`./${folder}/GameStrings.tsx`).then(value => value.GAME_STRINGS as GameStringRegistry)
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

    language = language.toLowerCase();

    const dashIndex = language.indexOf('-');
    if (dashIndex > 0) {
        language = language.substring(0, dashIndex);
    }

    if (language in LANGUAGES) {
        return language as Language;
    } else {
        return 'en';
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

    return loadedLanguage && (
        <LanguageContext.Provider value={loadedLanguage}>
            {children}
        </LanguageContext.Provider>
    );
}