import { ReactNode } from "react";
import { getLabel, useLanguage } from "../../Locale/Registry";
import { checkMyUserFlag } from "../../Model/SceneState";
import { HeaderProps } from "../Header";
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
  const language = useLanguage();
  
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
      { (scene.type === 'game' || scene.type === 'lobby') && <div className="py-2">

        { scene.type === 'game' && checkMyUserFlag(scene.lobbyState, 'lobby_owner') &&
          <UserMenuItem onClick={handleReturnLobby}>{getLabel(language, 'ui', 'BUTTON_RETURN_LOBBY')}</UserMenuItem>}
        
        { scene.type === 'lobby' &&
          <UserMenuItem onClick={handleToggleSpectate}>{getLabel(language, 'ui', isSpectator ? 'BUTTON_SPECTATE_OFF' : 'BUTTON_SPECTATE_ON')}</UserMenuItem> }

        <UserMenuItem onClick={handleLeaveLobby}>{getLabel(language, 'ui', 'BUTTON_LEAVE_LOBBY')}</UserMenuItem>
        
      </div> }

      <div className="py-2">
        <UserMenuItem onClick={handleDisconnect}>{getLabel(language, 'ui', 'BUTTON_DISCONNECT')}</UserMenuItem>
      </div>
    </div>
  )
}