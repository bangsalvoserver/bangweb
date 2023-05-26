import './App.css';
import { useEffect, useState, useRef } from 'react';
import { GameManager } from './Messages/GameManager';
import { GetCurrentScene, SceneType } from './Scenes/SceneType';

function App() {
  const [[scene, args], setScene] = useState([SceneType.Connect, null] as [SceneType, any]);
  const gameManager = useRef(new GameManager(setScene));

  useEffect(() => {
    const mgr = gameManager.current;
    let handlers = mgr.addHandlers([
      ['disconnect', () => {
        mgr.changeScene(SceneType.Connect);
      }]
    ]);

    return () => mgr.removeHandlers(handlers);
  });

  return (
    <div className="App">
      <h1>Bang! Web</h1>
      <GetCurrentScene scene={scene} args={args} gameManager={gameManager.current} />
    </div>
  );
}

export default App;
