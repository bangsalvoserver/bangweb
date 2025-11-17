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

export type Registry = [CardRegistry, LabelRegistry, GameStringRegistry];

const registries: Record<Language, Registry> = {
    'it': [CARDS_ITALIAN, LABELS_ITALIAN, GAME_STRINGS_ITALIAN],
    'en': [CARDS_ENGLISH, LABELS_ENGLISH, GAME_STRINGS_ENGLISH],
    'cs': [CARDS_CZECH, LABELS_CZECH, GAME_STRINGS_CZECH],
};

export function getSystemLanguage(): Language {
    let language: string | undefined = Env.language;

    if (!language) {
        language = new URLSearchParams(window.location.search).get('language') || '';
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
        default: return 'en';
    }
}

export const [cardRegistry, labelRegistry, gameStringRegistry] = registries[getSystemLanguage()];