import { ReactNode } from "react";
import useCloseOnLoseFocus from "../../Utils/UseCloseOnLoseFocus";
import { MENU_ICON } from "../../Components/Icons/MenuIcon";


export interface PlayerMenuProps {
    children: ReactNode;
};

export default function PlayerMenu({ children }: PlayerMenuProps) {
  const [isMenuOpen, setIsMenuOpen, menuRef] = useCloseOnLoseFocus<HTMLDivElement>();

    return <div className='relative' ref={menuRef}>
    <button onClick={() => setIsMenuOpen(value => !value)}
        type="button" className="inline-flex items-center p-1 ml-1 text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-400 bg-gray-900 hover:bg-gray-700 focus:ring-gray-600">
        { MENU_ICON }
    </button>
    { isMenuOpen && <div className='z-50 py-2
        absolute top-10 right-0
        text-base list-none rounded-lg shadow bg-gray-700 divide-gray-600'>
            { children }
        </div> }
    </div>
}