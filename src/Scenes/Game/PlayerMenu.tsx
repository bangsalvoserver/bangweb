import { MENU_ICON } from "../../Components/Icons/MenuIcon";
import { UserMenuItem } from "../../Components/Menu/UserMenu";
import { getLabel, useLanguage } from "../../Locale/Registry";
import useCloseOnLoseFocus from "../../Utils/UseCloseOnLoseFocus";


export interface PlayerMenuProps {
    handleRejoin?: () => void;
    handleReplaceBot?: () => void;
};

export default function PlayerMenu({ handleRejoin, handleReplaceBot }: PlayerMenuProps) {
    const [isMenuOpen, setIsMenuOpen, menuRef] = useCloseOnLoseFocus<HTMLDivElement>();
    const language = useLanguage();
    
    const doRejoin = (handleRejoin !== undefined) ? (() => { setIsMenuOpen(false); handleRejoin(); }) : undefined;
    const doReplaceBot = (handleReplaceBot !== undefined) ? (() => { setIsMenuOpen(false); handleReplaceBot(); }) : undefined;

    return (doRejoin || doReplaceBot) && (
        <div className='relative' ref={menuRef}>
            <button onClick={() => setIsMenuOpen(value => !value)}
                type="button" className="inline-flex items-center p-1 ml-1 text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-400 bg-gray-900 hover:bg-gray-700 focus:ring-gray-600">
                { MENU_ICON }
            </button>
            { isMenuOpen && <div className='z-50 py-2
                absolute top-10 right-0
                text-base list-none rounded-lg shadow bg-gray-700 divide-gray-600'>
                    { doRejoin && <UserMenuItem onClick={doRejoin}>{getLabel(language, 'ui','BUTTON_REJOIN')}</UserMenuItem> }
                    { doReplaceBot && <UserMenuItem onClick={doReplaceBot}>{getLabel(language, 'ui','BUTTON_REPLACE_BOT')}</UserMenuItem> }
                </div> }
        </div>
    );
}