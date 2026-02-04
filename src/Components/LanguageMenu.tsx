import getLabel from "../Locale/GetLabel";
import { Language, LANGUAGES, useLanguage } from "../Locale/Registry";
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
        {Object.keys(LANGUAGES).map(lang =>
            <UserMenuItem key={lang} onClick={() => setLanguage(lang as Language)}>
                {lang === language && <>● </>}
                {getLabel(lang as Language, 'ui', 'LANGUAGE_NAME')}
            </UserMenuItem>
        )}
    </div>
}