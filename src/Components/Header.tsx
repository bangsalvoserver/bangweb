import { ChangeEvent, useRef } from 'react';
import { getLabel, Language, useLanguage } from "../Locale/Registry";
import AppSettings from '../Model/AppSettings';
import { SceneState } from '../Model/SceneState';
import { BangConnection } from '../Model/UseBangConnection';
import { DEFAULT_USER_PROPIC } from '../Scenes/Lobby/LobbyUser';
import { loadFile } from '../Utils/FileUtils';
import { PROPIC_SIZE, serializeImage } from '../Utils/ImageSerial';
import useCloseOnLoseFocus from '../Utils/UseCloseOnLoseFocus';
import { GLOBE_ICON } from './Icons/GlobeIcon';
import { MENU_ICON } from './Icons/MenuIcon';
import { MUTED_SOUND_ICON, SOUND_ICON } from './Icons/SoundIcon';
import LanguageMenu from './LanguageMenu';
import UserMenu from './UserMenu';

export interface HeaderProps {
  scene: SceneState;
  settings: AppSettings;
  connection: BangConnection;
}

function Header({ scene, settings, connection }: HeaderProps) {
  const inputFile = useRef<HTMLInputElement>(null);
  
  const [isLanguageMenuOpen, setIsLanguageMenuOpen, languageMenuRef] = useCloseOnLoseFocus<HTMLDivElement>();
  const [isMenuOpen, setIsMenuOpen, menuRef] = useCloseOnLoseFocus<HTMLDivElement>();

  const language = useLanguage();

  const handleClickPropic = () => inputFile.current?.click();

  const handlePropicChange = async (event: ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const propic = await loadFile(file);
      const image = await serializeImage(propic, PROPIC_SIZE);
      settings.setPropic(propic);
      connection.sendMessage({ user_set_propic: image });
    }
  };

  const handleToggleSounds = () => {
    settings.setMuteSounds(value => !value);
  };

  const handleSetLanguage = (value: Language) => {
    setIsLanguageMenuOpen(false);
    settings.setLanguage(value);
  };

  return (
    <nav className="border-gray-200 bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-1.5 md:p-4">
        <div className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">{getLabel(language, 'ui', 'APP_TITLE')}</span>
        </div>
        { (scene.type === 'lobby' || scene.type === 'game') && <div className="text-blue-500 font-medium whitespace-nowrap overflow-x-hidden text-ellipsis">
          { scene.lobbyName }
        </div>}
        <div className="flex items-center">
          <button type="button" className="flex mr-2 text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-600">
            <div className='w-8 h-8 grid place-items-center' onClick={handleClickPropic}>
              <img className="max-w-8 max-h-8" src={settings.propic ?? DEFAULT_USER_PROPIC} alt="" />
            </div>
            <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={handlePropicChange} />
          </button>

          <button onClick={handleToggleSounds}
            type="button" className="inline-flex items-center p-1 ml-1 text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
            { settings.muteSounds ? MUTED_SOUND_ICON : SOUND_ICON }
          </button>

          <div className='flex relative' ref={languageMenuRef}>
            <button onClick={() => setIsLanguageMenuOpen(value => !value)}
              type="button" className="inline-flex items-center p-1 ml-1 text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
              { GLOBE_ICON }
            </button>
            { isLanguageMenuOpen && <LanguageMenu setLanguage={handleSetLanguage} /> }
          </div>

          <div className='flex relative' ref={menuRef}>
            <button onClick={() => setIsMenuOpen(value => !value)}
              type="button" className="inline-flex items-center p-1 ml-1 text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
              { MENU_ICON }
            </button>
            { isMenuOpen && <UserMenu scene={scene} settings={settings} connection={connection} closeMenu={() => setIsMenuOpen(false)} /> }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header