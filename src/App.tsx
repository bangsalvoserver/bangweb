import './App.css';
import WaitingArea from './Components/WaitingArea';
import { useEffect, useState, useRef } from 'react';
import Play from './Components/Buttons/Play';
import { GameManager } from './Messages/GameManager';

function ConnectScene(mgr: GameManager) {
  const onClickConnect = () => {
    console.log(process.env.REACT_APP_BANG_SERVER_COMMIT_HASH);

    if (!mgr.isConnected()) {
      mgr.connect(process.env.REACT_APP_BANG_SERVER_URL || '');
    }
  };

  return (
    <Play onClick={onClickConnect} />
  )
}

function App() {
  const gameManager = useRef(new GameManager());
  const mgr = gameManager.current;

  const [scene, setScene] = useState(ConnectScene(mgr));
  
  useEffect(() => {
    let handlers = [
      mgr.onMessage('connect', () => {
        mgr.sendMessage('connect',
          { user_name: 'Tizio', profile_image: '', commit_hash: process.env.REACT_APP_BANG_SERVER_COMMIT_HASH || '' });
      }),
      mgr.onMessage('disconnect', () => {
        setScene(ConnectScene(mgr));
      }),
      mgr.onMessage('client_accepted', () => {
        setScene(<WaitingArea gameManager={mgr} />);
      })
    ];

    return () => mgr.removeHandlers(handlers);
  });

  return (
    <div className="App">
      <h1>Bang! Web</h1>
      {scene}
    </div>
  );
}

export default App;



