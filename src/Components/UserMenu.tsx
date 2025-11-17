import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { clipUsername } from "../Scenes/Lobby/LobbyUser";
import "./Style/UserMenu.css";
import { MAX_USERNAME_LENGTH } from "../Model/AppSettings";
import getLabel from "../Locale/GetLabel";
import { useLanguage } from "../Locale/Registry";

export interface UserMenuItemProps {
  onClick: () => void;
  children: ReactNode;
}

export function UserMenuItem({ onClick, children }: UserMenuItemProps) {
  return <li><button onClick={onClick} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">{children}</button></li>;
}

export interface UserMenuProps {
  username?: string;
  setUsername: (value: string) => void;
  clearPropic?: () => void;
  children: ReactNode;
}

export default function UserMenu({ username, setUsername, clearPropic, children }: UserMenuProps) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const [showInput, setShowInput] = useState(false);
  const language = useLanguage();

  useLayoutEffect(() => {
    if (showInput) {
      usernameRef.current?.focus();
    }
  }, [showInput]);

  return (
    <div className='user-menu z-50
    absolute top-10 right-0
    text-base list-none divide-y rounded-lg shadow bg-gray-700 divide-gray-600'
    >
      <div className="px-4 py-3">
        <div className={showInput ? 'username-input' : 'username-span'}
          onClick={() => setShowInput(true)}>
          <span className="block text-sm text-white w-max h-5">{clipUsername(language, username ?? '')}</span>
          <input ref={usernameRef} value={username}
            maxLength={MAX_USERNAME_LENGTH}
            onChange={e => setUsername(e.target.value)}
            onBlur={() => setShowInput(false)}
          />
        </div>
      </div>
      <ul className="py-2" aria-labelledby="user-menu-button">
        {clearPropic && <UserMenuItem onClick={clearPropic}>{getLabel(language, 'ui', 'BUTTON_CLEAR_PROPIC')}</UserMenuItem>}
        {children}
      </ul>
    </div>
  )
}