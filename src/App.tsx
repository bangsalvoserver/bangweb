import './App.css';
import { useEffect, useState, useRef } from 'react';
import { GameManager } from './Messages/GameManager';
import { GetCurrentScene, SceneType } from './Scenes/SceneType';

function App() {
  const [[scene, args], setScene] = useState([SceneType.Connect, null] as [SceneType, any]);
  const gameManager = useRef(new GameManager(setScene));

  const mgr = gameManager.current;

  useEffect(() => mgr.addHandlers([
    ['disconnect', () => mgr.changeScene(SceneType.Connect)]
  ]));

  return (
    <div className="App">
      <h1>Bang! Web</h1>
      <GetCurrentScene scene={scene} args={args} gameManager={gameManager.current} />
    </div>
  );
}

export default App;
