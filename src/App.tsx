import './App.css';
import { useEffect, useState, useRef } from 'react';
import { GameManager } from './Messages/GameManager';
import { GuiManager } from './Managers/GuiManager';
import { GetCurrentScene, SceneType } from './Scenes/SceneType';
import Header from './components/Header';
import UserMenu from './components/UserMenu';

function App() {
  const [[scene, args], setScene] = useState([SceneType.Connect, null] as [SceneType, any]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);





  const gameManager = useRef(new GameManager(setScene));
  const guiManager = useRef(new GuiManager(setIsMenuOpen));
  const mgr = gameManager.current;

  useEffect(() => mgr.addHandlers([
    ['disconnect', () => mgr.changeScene(SceneType.Connect)]
  ]));
  
 

  return (
<>
    <Header guiManager={guiManager.current}/>
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
      <GetCurrentScene scene={scene} args={args} gameManager={gameManager.current} />
    </div>


</div>
    </>
  );
}

export default App;
