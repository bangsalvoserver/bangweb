import './App.css';
import WaitingArea from './Components/WaitingArea';
import { useState, useEffect } from 'react';
import Play from './Components/Buttons/Play';
import {createGameManager} from './socketConnection';
//file system


function App() {
  const [connected, setConnected] = useState(false);
  const [gameManager, setGameManager] = useState(null);

  const onClickConnect = () => {
    if(gameManager !== null){
      return;
    }
    const mgr = createGameManager();
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
  }


  function checkLobbyes() {
    console.log(commitHash);
  }

  return (
    <div className="App">
      <h1>React App</h1>

      <Play onClick={onClickConnect} />
      {connected ? <WaitingArea gameManager={gameManager} /> : null}
    </div>
  );
}

export default App;



