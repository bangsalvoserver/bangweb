import { ChangeEvent, useRef } from 'react';
import getLabel from '../Locale/GetLabel';
import { Connection } from '../Model/UseConnection';
import AppSettings from '../Model/AppSettings';
import { SceneState } from '../Model/SceneState';
import { DEFAULT_USER_PROPIC } from '../Scenes/Lobby/LobbyUser';
import { ImageSrc } from '../Utils/ImageSerial';
import { useFocusRefState } from '../Utils/UseEventListener';
import UserMenu, { UserMenuItem } from './UserMenu';
import { makeUserInfo } from '../Model/UseBangConnection';

export interface HeaderProps {
  scene: SceneState;
  settings: AppSettings;
  connection: Connection;
}

function Header({ scene, settings, connection }: HeaderProps) {
  const inputFile = useRef<HTMLInputElement>(null);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useFocusRefState(menuRef);

  const handleEditUser = async (username?: string, propic?: ImageSrc) => {
    settings.setUsername(username);
    settings.setPropic(propic);
    connection.sendMessage({ user_edit: await makeUserInfo(username, propic) });
  };

  const handleClickPropic = () => inputFile.current?.click();

  const handleLeaveLobby = () => connection.sendMessage({ lobby_leave: {}});
  const handleReturnLobby = () => connection.sendMessage({ lobby_return: {}});

  const handleDisconnect = () => {
    settings.setMyUserId(undefined);
    settings.setMyLobbyId(undefined);
    connection.disconnect();
  };

  const handlePropicChange = function (event: ChangeEvent<HTMLInputElement>) {
    let file = event.target.files ? event.target.files[0] : null;
    if (file) {
      let reader = new FileReader();
      reader.onload = () => {
        handleEditUser(settings.username, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const closeMenuAnd = (fn: () => void) => {
    return () => {
      setIsMenuOpen(false);
      fn();
    };
  };

  return (
    <nav className="border-gray-200 bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1.5 md:p-4">
        <button className="flex items-center">
          <img src="" className="h-8 mr-3" alt="" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">{getLabel('ui', 'APP_TITLE')}</span>
        </button>
        <div className="flex items-center order-2">
          <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-600">
            <span className="sr-only">Open user menu</span>
            <div className='w-8 h-8 grid place-items-center' onClick={handleClickPropic}>
              <img className="max-w-8 max-h-8" src={settings.propic ?? DEFAULT_USER_PROPIC} alt="" />
            </div>
            <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={handlePropicChange} />
          </button>

          { scene.type !== 'connect' && <div className='flex relative' ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(value => !value)}
            type="button" className="inline-flex items-center p-0.5 md:p-2 ml-1 text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
          { isMenuOpen &&
            <UserMenu username={settings.username} setUsername={username => handleEditUser(username, settings.propic)}>
              { scene.type === 'game' && settings.myUserId === scene.lobbyState.lobbyOwner &&
                <UserMenuItem onClick={closeMenuAnd(handleReturnLobby)}>{getLabel('ui', 'BUTTON_RETURN_LOBBY')}</UserMenuItem>}
              { scene.type === 'lobby' || scene.type === 'game'
                ? <UserMenuItem onClick={closeMenuAnd(handleLeaveLobby)}>{getLabel('ui', 'BUTTON_LEAVE_LOBBY')}</UserMenuItem>
                : <UserMenuItem onClick={closeMenuAnd(handleDisconnect)}>{getLabel('ui', 'BUTTON_DISCONNECT')}</UserMenuItem> }
            </UserMenu> }
          </div>}
        </div>
        <div className="items-center justify-between flex w-auto order-1">
          <ul className="flex font-medium p-0 border-gray-100 rounded-lg flex-row space-x-8 mt-0 ">
            {scene.type === 'lobby' && <li className="block py-2 pl-3 pr-4 text-blue-500">{scene.lobbyInfo.name}</li>}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header