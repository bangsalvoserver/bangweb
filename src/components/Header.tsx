import React, { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import { GameManager } from '../Messages/GameManager';
import { serializeImage } from '../Messages/ImageSerial';

type HeaderProps = {
  gameManager: GameManager,
  onClickToggleMenu: () => void,
}

function Header({ gameManager, onClickToggleMenu }: HeaderProps) {
  const inputFile = useRef() as MutableRefObject<HTMLInputElement>;
  const [propic, setPropic] = useState<string>();
  
  useEffect(() => {
    gameManager.setConfig('propic', propic);

    let name = gameManager.getConfig('username');
    serializeImage(gameManager.getConfig('propic'), 50)
      .then(profile_image => gameManager.sendMessage('user_edit', { name, profile_image }));
  }, [propic]);

  const handlePropicClick = () => {
    inputFile.current.click();
  };

  const handlePropicChange = function(event: ChangeEvent<HTMLInputElement>) {
    let file = event.target.files && event.target.files[0] || null;
    if (file) {
      let reader = new FileReader();
      reader.onload = () => {
        setPropic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="" className="flex items-center">
      <img src="" className="h-8 mr-3" alt="" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Bang!</span>
  </a>
  <div className="flex items-center md:order-2">
      <button
       
      type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full" src={propic ?? "/docs/images/people/profile-picture-3.jpg"} onClick={handlePropicClick}/>
        <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={handlePropicChange} />
      </button>
      {/* <!-- Dropdown menu --> */}
     
      <button 
      onClick={onClickToggleMenu}
      
      data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
      </li>
      <li>
        <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">How To play</a>
      </li>
    </ul>
    <div className="flex items-right justify-right md:justify-start">
    
    </div>
  </div>
  </div>
</nav>
  )
}

export default Header