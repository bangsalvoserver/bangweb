import { ReactNode } from "react";
import useCloseOnLoseFocus from "../../Utils/UseCloseOnLoseFocus";


export interface PlayerMenuProps {
    children: ReactNode;
};

export default function PlayerMenu({ children }: PlayerMenuProps) {
  const [isMenuOpen, setIsMenuOpen, menuRef] = useCloseOnLoseFocus<HTMLDivElement>();

    return <div className='relative' ref={menuRef}>
    <button onClick={() => setIsMenuOpen(value => !value)}
        type="button" className="inline-flex items-center p-1 ml-1 text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-400 bg-gray-900 hover:bg-gray-700 focus:ring-gray-600">
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
        </svg>
    </button>
    { isMenuOpen && <div className='user-menu z-50 py-2
        absolute top-10 right-0
        text-base list-none rounded-lg shadow bg-gray-700 divide-gray-600'>
            { children }
        </div> }
    </div>
}