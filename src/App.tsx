import './App.css';
import WaitingArea from './Components/WaitingArea';
import { useState, useEffect } from 'react';
import Play from './Components/Buttons/Play';
import { GameManager } from './GameManager';
import React from 'react';
//file system


function App() {
  const [connected, setConnected] = useState<boolean>(false);
  const [gameManager, setGameManager] = useState<GameManager | null>(null);

  const onClickConnect = () => {
    if(gameManager !== null){
      return;
    }
    const mgr = new GameManager();
    mgr.onMessage('connect', ({}) => {
      mgr.sendMessage('connect', { user_name: 'Tizio', profile_image: '', commit_hash: 'ad5640ec0932ed743c21ca3a1c7186672ca49d31' });
      mgr.sendMessage('lobby_list', {});
      setConnected(true);
    });
    mgr.onMessage('disconnect', ({}) => {
      setConnected(false);
      setGameManager(null);
    });

    setGameManager(mgr);
  };




  return (
    <div className="App">
      <h1>React App</h1>
      <Play onClick={onClickConnect} />
      {connected ? <WaitingArea GameManager={gameManager} /> : null}
    </div>
  );
}

export default App;



