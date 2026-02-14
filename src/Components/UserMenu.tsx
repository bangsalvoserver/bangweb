import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { getLabel, useLanguage } from "../Locale/Registry";
import { MAX_USERNAME_LENGTH } from "../Model/AppSettings";
import { checkMyUserFlag } from "../Model/SceneState";
import { clipUsername } from "../Scenes/Lobby/LobbyUser";
import { HeaderProps } from "./Header";
import "./Style/UserMenu.css";

export interface UserMenuItemProps {
  onClick: () => void;
  children: ReactNode;
}

export function UserMenuItem({ onClick, children }: UserMenuItemProps) {
  return <button onClick={onClick} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">{children}</button>;
}

export interface UserMenuProps extends HeaderProps {
  closeMenu: () => void;
}

export default function UserMenu({ scene, settings, connection, closeMenu }: UserMenuProps) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const [showInput, setShowInput] = useState(false);
  const language = useLanguage();

  useLayoutEffect(() => {
    if (showInput) {
      usernameRef.current?.focus();
    }
  }, [showInput]);

  const handleSetUsername = (username?: string) => {
    settings.setUsername(username);
    connection.sendMessage({ user_set_name: username ?? '' });
  };

  const handleClearPropic = () => {
    closeMenu();
    settings.setPropic(undefined);
    connection.sendMessage({ user_set_propic: null });
  };
  
  const handleLeaveLobby = () => {
    closeMenu();
    connection.sendMessage({ lobby_leave: {}});
  };

  const handleReturnLobby = () => {
    closeMenu();
    connection.sendMessage({ lobby_return: {}});
  };
  
  const isSpectator = scene.type === 'lobby' && checkMyUserFlag(scene.lobbyState, 'spectator');

  const handleToggleSpectate = () => {
    // closeMenu();
    connection.sendMessage({ user_spectate: !isSpectator });
  };

  const handleDisconnect = () => {
    closeMenu();
    settings.setSessionId(undefined);
    connection.disconnect();
  };

  return (
    <div className='user-menu z-50
      absolute top-10 right-0
      text-base list-none divide-y rounded-lg shadow bg-gray-700 divide-gray-600'
    >
      <div className="py-2">
        <div className={(showInput ? 'username-input' : 'username-span') + ' px-4 py-2'}
          onClick={() => setShowInput(true)}>
          <span className="block text-sm text-white w-max h-5">{clipUsername(language, settings.username ?? '')}</span>
          <input ref={usernameRef} value={settings.username}
            maxLength={MAX_USERNAME_LENGTH}
            onChange={e => handleSetUsername(e.target.value)}
            onBlur={() => setShowInput(false)}
          />
        </div>
        { settings.propic &&
          <UserMenuItem onClick={handleClearPropic}>{getLabel(language, 'ui', 'BUTTON_CLEAR_PROPIC')}</UserMenuItem>}
      </div>
      { (scene.type !== 'home' && scene.type !== 'loading') && <div className="py-2">

        { scene.type === 'game' && checkMyUserFlag(scene.lobbyState, 'lobby_owner') &&
          <UserMenuItem onClick={handleReturnLobby}>{getLabel(language, 'ui', 'BUTTON_RETURN_LOBBY')}</UserMenuItem>}
        
        { scene.type === 'lobby' &&
          <UserMenuItem onClick={handleToggleSpectate}>{getLabel(language, 'ui', isSpectator ? 'BUTTON_SPECTATE_OFF' : 'BUTTON_SPECTATE_ON')}</UserMenuItem> }

        { (scene.type === 'game' || scene.type === 'lobby') &&
          <UserMenuItem onClick={handleLeaveLobby}>{getLabel(language, 'ui', 'BUTTON_LEAVE_LOBBY')}</UserMenuItem> }
          
        { scene.type === 'waiting_area' &&
          <UserMenuItem onClick={handleDisconnect}>{getLabel(language, 'ui', 'BUTTON_DISCONNECT')}</UserMenuItem> }

      </div> }
    </div>
  )
}