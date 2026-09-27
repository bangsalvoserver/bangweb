import { useLayoutEffect, useRef, useState } from "react";
import { getLabel, useLanguage } from "../../Locale/Registry";
import AppSettings, { MAX_USERNAME_LENGTH } from "../../Model/AppSettings";
import { BangConnection } from "../../Model/UseBangConnection";
import { clipUsername } from "../../Scenes/Lobby/LobbyUser";
import "./Style/UserMenu.css";
import { UserMenuItem } from "./UserMenu";

export interface ProfileMenuProps {
    settings: AppSettings;
    connection: BangConnection;
    handleClickPropic: () => void;
    closeMenu: () => void;
}

export default function ProfileMenu({ settings, connection, handleClickPropic, closeMenu }: ProfileMenuProps) {
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

    const doChangePropic = () => {
        closeMenu();
        handleClickPropic();
    };

    const handleClearPropic = () => {
        closeMenu();
        settings.setPropic(undefined);
        connection.sendMessage({ user_set_propic: null });
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
        </div>
        <div className="py-2">
            <UserMenuItem onClick={doChangePropic}>{getLabel(language, 'ui', 'BUTTON_CHANGE_PROPIC')}</UserMenuItem>
            { settings.propic && <UserMenuItem onClick={handleClearPropic}>{getLabel(language, 'ui', 'BUTTON_CLEAR_PROPIC')}</UserMenuItem>}
        </div>
    </div>
  )
}