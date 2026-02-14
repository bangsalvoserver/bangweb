import { getLanguages, Language, useLanguage } from "../Locale/Registry";
import { UserMenuItem } from "./UserMenu";

export interface LanguageProps {
    setLanguage: (value: Language) => void;
}

export default function LanguageMenu({ setLanguage }: LanguageProps) {
    const language = useLanguage();
    return <div className='user-menu z-50 py-2
        absolute top-10 right-0
        text-base list-none rounded-lg shadow bg-gray-700 divide-gray-600'
    >
        {getLanguages().map(([lang, name]) =>
            <UserMenuItem key={lang} onClick={() => setLanguage(lang as Language)}>
                {lang === language && <>● </>}{name}
            </UserMenuItem>
        )}
    </div>
}