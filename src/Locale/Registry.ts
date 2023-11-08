import Env, { Language } from "../Model/Env";
import { CARDS_ENGLISH } from "./English/Cards";
import { GAME_STRINGS_ENGLISH } from "./English/GameStrings";
import { LABELS_ENGLISH } from "./English/Labels";
import { CARDS_ITALIAN } from "./Italian/Cards";
import { GAME_STRINGS_ITALIAN } from "./Italian/GameStrings";
import { LABELS_ITALIAN } from "./Italian/Labels";

export type Format<T, U> = U | ((...formatArgs: T[]) => U);

export type CardRegistry = Record<string, string>;

export type LabelGroupRegistry = Record<string, Format<string, string>>;
export type LabelRegistry = Record<string, LabelGroupRegistry>;

export type GameStringRegistry = Record<string, Format<number | JSX.Element, JSX.Element>>;

export type Registry = [CardRegistry, LabelRegistry, GameStringRegistry];

const registries: Record<Language, Registry> = {
    'it': [CARDS_ITALIAN, LABELS_ITALIAN, GAME_STRINGS_ITALIAN],
    'en': [CARDS_ENGLISH, LABELS_ENGLISH, GAME_STRINGS_ENGLISH],
};

export function getSystemLanguage(): Language {
    if (Env.language) {
        return Env.language;
    }

    const locale = navigator.languages
        ? navigator.languages[0] : navigator.language;
        
    switch (locale.toLowerCase()) {
        case 'it-it':
        case 'it': return 'it';
        default: return 'en';
    }
}

export const [cardRegistry, labelRegistry, gameStringRegistry] = registries[getSystemLanguage()];