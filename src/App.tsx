import './App.css';
import { useEffect, useState, useRef } from 'react';
import { GameManager } from './Messages/GameManager';
import ConnectScene from './Scenes/Connect/Connect';
import Header from './components/Header';
import UserMenu from './components/UserMenu';
import { serializeImage } from './Messages/ImageSerial';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const gameManager = useRef<GameManager>();
  if (!gameManager.current) {
    gameManager.current = new GameManager();
  }

  const gameMgr = gameManager.current;
  const [scene, setScene] = useState(<ConnectScene gameManager={gameMgr} />);

  useEffect(() => {
    gameMgr.setSceneCallback(scene => setScene(scene));

    return gameMgr.addHandlers([
      ['connect', () => {
        let name = gameMgr.getConfig('username');
        serializeImage(gameMgr.getConfig('propic'), 50)
          .then(profile_image => {
            gameMgr.sendMessage('connect', {
              user: { name, profile_image },
              commit_hash: process.env.REACT_APP_BANG_SERVER_COMMIT_HASH || ''
            });
          });
      }],
      ['disconnect', () => {
        gameMgr.changeScene(<ConnectScene gameManager={gameMgr} />);
      }],
      ['lobby_error', (message: string) => {
        console.error("Lobby error: " + message);
      }]
    ]);
  });

  return (
<>
    <Header
      gameManager={gameMgr}
      onClickToggleMenu={() => setIsMenuOpen(value => !value)}
    />
<div className="home-page
min-h-screen
">
    <div className="
    home-page-login
    min-h-screen
    flex
    flex-col
    ">
      <h1
      className='
      text-6xl
      text-center
      text-white
      font-bold
      p-4
      ' 
      > Bang!</h1>
      <UserMenu isMenuOpen={isMenuOpen}/>
      {scene}
    </div>

</div>
    </>
  );
}

export default App;
