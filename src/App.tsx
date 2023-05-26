import './App.css';
import { useEffect, useState, useRef } from 'react';
import { GameManager } from './Messages/GameManager';
import ConnectScene from './Scenes/Connect/Connect';
import Header from './components/Header';
import UserMenu from './components/UserMenu';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [propic, setPropic] = useState<string>();

  const gameManager = useRef<GameManager>();
  if (!gameManager.current) {
    gameManager.current = new GameManager();
  }

  const gameMgr = gameManager.current;

  const [scene, setScene] = useState(<ConnectScene gameManager={gameMgr} propic={propic} />);

  useEffect(() => {
    gameMgr.setSceneCallback(scene => setScene(scene));

    return gameMgr.addHandlers([
      ['lobby_error', (message: string) => {
        console.error("Lobby error: " + message);
      }],
      ['disconnect', () => gameMgr.changeScene(<ConnectScene gameManager={gameMgr} propic={propic} />)]
    ]);
  });

  return (
<>
    <Header
    onClickToggleMenu={() => setIsMenuOpen(value => !value)}
    propic = {propic} setPropic = {setPropic}
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
