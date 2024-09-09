import { ChangeEvent, useRef } from 'react';
import getLabel from '../Locale/GetLabel';
import AppSettings from '../Model/AppSettings';
import { isLobbyOwner, SceneState } from '../Model/SceneState';
import { BangConnection } from '../Model/UseBangConnection';
import { getUser } from '../Scenes/Lobby/Lobby';
import { DEFAULT_USER_PROPIC } from '../Scenes/Lobby/LobbyUser';
import { loadFile, PROPIC_SIZE, serializeImage } from '../Utils/ImageSerial';
import useCloseOnLoseFocus from '../Utils/UseCloseOnLoseFocus';
import UserMenu, { UserMenuItem } from './UserMenu';
import Env from '../Model/Env';

export interface HeaderProps {
  scene: SceneState;
  settings: AppSettings;
  connection: BangConnection;
}

function Header({ scene, settings, connection }: HeaderProps) {
  const inputFile = useRef<HTMLInputElement>(null);
  
  const [isMenuOpen, setIsMenuOpen, menuRef] = useCloseOnLoseFocus<HTMLDivElement>();

  const handleSetUsername = (username?: string) => {
    settings.setUsername(username);
    connection.sendMessage({ user_set_name: username ?? '' });
  };

  const handleClickPropic = () => inputFile.current?.click();

  const handleLeaveLobby = () => connection.sendMessage({ lobby_leave: {}});
  const handleReturnLobby = () => connection.sendMessage({ lobby_return: {}});

  const isSpectator = 'lobbyState' in scene && getUser(scene.lobbyState.users, scene.lobbyState.myUserId)?.team === 'game_spectator';
  const handleToggleSpectate = () => connection.sendMessage({ user_set_team: isSpectator ? 'game_player' : 'game_spectator' });

  const handleDisconnect = () => {
    settings.setSessionId(undefined);
    connection.disconnect();
  };

  const handlePropicChange = function (event: ChangeEvent<HTMLInputElement>) {
    let file = event.target.files ? event.target.files[0] : null;
    if (file) {
      (async () => {
        const propic = await loadFile(file);
        const image = await serializeImage(propic, PROPIC_SIZE);
        settings.setPropic(propic);
        connection.sendMessage({ user_set_propic: image });
      })();
    }
  };

  const handleToggleSounds = () => {
    settings.setMuteSounds(value => !value);
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
        <div className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">{getLabel('ui', 'APP_TITLE')}</span>
          {Env.discordLink && <a className='text-white ml-2 w-6 h-6' href={Env.discordLink} target='_blank' rel='noreferrer' title={getLabel('ui', 'DISCORD_LINK')}>
            <svg viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
              <g>
                <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="currentColor" fill-rule="nonzero"/>
              </g>
            </svg>
          </a>}
        </div>
        <div className="flex items-center order-2">
          <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-600">
            <span className="sr-only">Open user menu</span>
            <div className='w-8 h-8 grid place-items-center' onClick={handleClickPropic}>
              <img className="max-w-8 max-h-8" src={settings.propic ?? DEFAULT_USER_PROPIC} alt="" />
            </div>
            <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={handlePropicChange} />
          </button>

          { 'lobbies' in scene && <div className='flex relative' ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(value => !value)}
            type="button" className="inline-flex items-center p-0.5 md:p-2 ml-1 text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
          { isMenuOpen &&
            <UserMenu username={settings.username} setUsername={handleSetUsername}>
              <UserMenuItem onClick={handleToggleSounds}>{getLabel('ui', settings.muteSounds ? 'BUTTON_ENABLE_SOUNDS' : 'BUTTON_DISABLE_SOUNDS')}</UserMenuItem>
              { scene.type === 'game' && isLobbyOwner(scene.lobbyState) && <UserMenuItem onClick={closeMenuAnd(handleReturnLobby)}>{getLabel('ui', 'BUTTON_RETURN_LOBBY')}</UserMenuItem>}
              { scene.type === 'lobby' && <UserMenuItem onClick={handleToggleSpectate}>{getLabel('ui', isSpectator ? 'BUTTON_SPECTATE_OFF' : 'BUTTON_SPECTATE_ON')}</UserMenuItem> }
              { 'lobbyInfo' in scene
                ? <UserMenuItem onClick={closeMenuAnd(handleLeaveLobby)}>{getLabel('ui', 'BUTTON_LEAVE_LOBBY')}</UserMenuItem>
                : <UserMenuItem onClick={closeMenuAnd(handleDisconnect)}>{getLabel('ui', 'BUTTON_DISCONNECT')}</UserMenuItem> }
            </UserMenu> }
          </div>}
        </div>
        <div className="items-center justify-between flex w-auto order-1">
          <ul className="flex font-medium p-0 border-gray-100 rounded-lg flex-row space-x-8 mt-0 ">
            {'lobbyInfo' in scene && <li className="block py-2 pl-3 pr-4 text-blue-500">{scene.lobbyInfo.name}</li>}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header