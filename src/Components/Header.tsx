import { ChangeEvent, useRef } from 'react';
import getLabel from '../Locale/GetLabel';
import { Language, useLanguage } from '../Locale/Registry';
import AppSettings from '../Model/AppSettings';
import { SceneState } from '../Model/SceneState';
import { BangConnection } from '../Model/UseBangConnection';
import { DEFAULT_USER_PROPIC } from '../Scenes/Lobby/LobbyUser';
import { loadFile } from '../Utils/FileUtils';
import { PROPIC_SIZE, serializeImage } from '../Utils/ImageSerial';
import useCloseOnLoseFocus from '../Utils/UseCloseOnLoseFocus';
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
            {settings.muteSounds ? <>
              <svg className='w-6 h-6' stroke="currentColor" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <g id="Free-Icons" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                  <g transform="translate(-1043.000000, -304.000000)" id="Group" strokeWidth="2">
                    <g transform="translate(1041.000000, 302.000000)" id="Shape">
                      <path d="M17,16.9590334 L17,20.9958147 L16,21 L10,15 L8.00491634,15 C6.90034684,15 6.00491634,14.1045695 6.00491634,13 L6.00491634,11 C6.00491634,9.8954305 6.90034684,9 8.00491634,9 L9.05605361,9 L9.05605361,9"/>
                      <polyline points="12.584864 6.78440227 16 3 17 3 17 11.0419196"/>
                      <line x1="3.07751425" y1="3.04297451" x2="21" y2="21"/>
                    </g>
                  </g>
                </g>
              </svg>
            </> : <>
              <svg className='w-6 h-6' stroke="currentColor" fill="none" viewBox="-1 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <g id="Free-Icons" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                  <g transform="translate(-896.000000, -304.000000)" id="Group" strokeWidth="2">
                    <g transform="translate(893.000000, 302.000000)" id="Shape">
                      <path d="M18,16.5 C19.184,15.6838509 20,13.984472 20,12.0055901 C20,10.0267081 19.184,8.32732919 18,7.5"/>
                      <path d="M6.00491634,9 L8,9 L13,3 L15,3 L15,20.9958147 L13,20.9958147 L8,15 L6.00491634,15 C4.90034684,15 4.00491634,14.1045695 4.00491634,13 L4.00491634,11 C4.00491634,9.8954305 4.90034684,9 6.00491634,9 Z"/>
                    </g>
                  </g>
                </g>
              </svg>
            </>}
          </button>

          <div className='flex relative' ref={languageMenuRef}>
            <button onClick={() => setIsLanguageMenuOpen(value => !value)}
              type="button" className="inline-flex items-center p-1 ml-1 text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
              <svg className="w-6 h-6" aria-hidden="true" stroke="currentColor" fill="none" viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg">
                <path strokeWidth="26" d="M209,15a195,195 0 1,0 2,0z"/>
                <path strokeWidth="18" d="m210,15v390m195-195H15M59,90a260,260 0 0,0 302,0 m0,240 a260,260 0 0,0-302,0M195,20a250,250 0 0,0 0,382 m30,0 a250,250 0 0,0 0-382"/>
              </svg>
            </button>
            { isLanguageMenuOpen && <LanguageMenu setLanguage={handleSetLanguage} /> }
          </div>

          <div className='flex relative' ref={menuRef}>
            <button onClick={() => setIsMenuOpen(value => !value)}
              type="button" className="inline-flex items-center p-1 ml-1 text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </button>
            { isMenuOpen && <UserMenu scene={scene} settings={settings} connection={connection} closeMenu={() => setIsMenuOpen(false)} /> }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header