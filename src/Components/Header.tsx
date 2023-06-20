import { ChangeEvent, useRef, useState } from 'react';
import getLabel from '../Locale/GetLabel';
import { DEFAULT_USER_PROPIC } from '../Scenes/Lobby/LobbyUser';
import UserMenu, { UserMenuItem } from './UserMenu';
import { useEventListener } from '../Utils/UseEventListener';
import { ImageSrc } from '../Utils/ImageSerial';

export interface HeaderProps {
  title?: string;
  username?: string;
  propic?: ImageSrc;
  editUser: (username?: string, propic?: ImageSrc) => void;
  handleLeaveLobby?: () => void;
  handleDisconnect?: () => void;
}

function Header({ title, username, propic, editUser, handleLeaveLobby, handleDisconnect }: HeaderProps) {
  const inputFile = useRef<HTMLInputElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const handlePropicClick = () => {
    inputFile.current?.click();
  };

  const handlePropicChange = function (event: ChangeEvent<HTMLInputElement>) {
    let file = event.target.files ? event.target.files[0] : null;
    if (file) {
      let reader = new FileReader();
      reader.onload = () => {
        editUser(username, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEventListener('click', ev => {
    if (!menuRef.current?.contains(ev.target as Node)) {
      setIsMenuOpen(false);
    }
  }, []);

  const closeMenuAnd = (fn: () => void) => {
    return () => {
      setIsMenuOpen(false);
      fn();
    };
  };

  return (
    <>
      <nav className="border-gray-200 bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="" className="flex items-center">
            <img src="" className="h-8 mr-3" alt="" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">{getLabel('ui', 'APP_TITLE')}</span>
          </a>
          <div className="flex items-center order-2">
            <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-600">
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src={propic ?? DEFAULT_USER_PROPIC} onClick={handlePropicClick} />
              <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={handlePropicChange} />
            </button>

            { handleDisconnect && <div className='relative' ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(value => !value)}
              type="button" className="inline-flex items-center p-2 ml-1 text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            </button>
            { isMenuOpen &&
              <UserMenu username={username} setUsername={username => editUser(username, propic)}>
                { handleLeaveLobby && <UserMenuItem onClick={closeMenuAnd(handleLeaveLobby)}>{getLabel('ui', 'BUTTON_LEAVE_LOBBY')}</UserMenuItem> }
                <UserMenuItem onClick={closeMenuAnd(handleDisconnect)}>{getLabel('ui', 'BUTTON_DISCONNECT')}</UserMenuItem>
              </UserMenu> }
            </div>}
          </div>
          <div className="items-center justify-between flex w-auto order-1">
            <ul className="flex font-medium p-0 border-gray-100 rounded-lg flex-row space-x-8 mt-0 ">
              {title && <li className="block py-2 pl-3 pr-4 text-blue-500">{title}</li>}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header