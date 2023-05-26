import './App.css';
import { useEffect, useState, useRef } from 'react';
import { GameManager } from './Messages/GameManager';
import { GetCurrentScene, SceneType } from './Scenes/SceneProps';

function App() {
  const [scene, setScene] = useState(SceneType.Connect);
  const gameManager = useRef(new GameManager(setScene));

  useEffect(() => {
    const mgr = gameManager.current;
    let handlers = [
      mgr.onMessage('disconnect', () => {
        mgr.changeScene(SceneType.Connect);
      }),
    ];

    return () => mgr.removeHandlers(handlers);
  });

  return (
    <div className="App">
      <h1>Bang! Web</h1>
      <GetCurrentScene scene={scene} gameManager={gameManager.current} />
    </div>
  );
}

export default App;
