import './App.css';
import { useEffect, useState, useRef } from 'react';
import { GameManager } from './Messages/GameManager';
import ConnectScene from './Scenes/Connect/Connect';

function App() {
  const gameManager = useRef(new GameManager());
  const [scene, setScene] = useState(<ConnectScene gameManager={gameManager.current} />);

  const mgr = gameManager.current;

  useEffect(() => {
    mgr.setSceneCallback(scene => setScene(scene));

    return mgr.addHandlers([
      ['disconnect', () => mgr.changeScene(<ConnectScene gameManager={mgr} />)]
    ]);
  });

  return (
    <div className="App">
      <h1>Bang! Web</h1>
      {scene}
    </div>
  );
}

export default App;
