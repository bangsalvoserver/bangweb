import { Language } from "../Model/Env";
import { UserMenuItem } from "./UserMenu";

export interface LanguageProps {
    language: Language | undefined;
    setLanguage: (value: Language) => void;
}

export default function LanguageMenu({ language, setLanguage }: LanguageProps) {
    return (
    <div className='user-menu z-50
    absolute top-10 right-0
    text-base list-none divide-y rounded-lg shadow bg-gray-700 divide-gray-600'
    >
        <ul className="py-2">
            <UserMenuItem onClick={() => setLanguage('en')}>English</UserMenuItem>
            <UserMenuItem onClick={() => setLanguage('it')}>Italian</UserMenuItem>
            <UserMenuItem onClick={() => setLanguage('cs')}>Czech</UserMenuItem>
        </ul>
    </div>
    )
}