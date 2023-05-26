import './App.css';
import WaitingArea from './Components/WaitingArea';
import { useEffect, useState, useRef } from 'react';
import Play from './Components/Buttons/Play';
import { GameManager } from './Messages/GameManager';

function App() {
  const [scene, setScene] = useState<JSX.Element | null>(null);

  const gameManager = useRef(new GameManager());
  const mgr = gameManager.current;
  
  useEffect(() => {
    let handlers = [
      mgr.onMessage('connect', () => {
        mgr.sendMessage('connect',
          { user_name: 'Tizio', profile_image: '', commit_hash: process.env.REACT_APP_BANG_SERVER_COMMIT_HASH || '' });
      }),
      mgr.onMessage('disconnect', () => {
        setScene(null);
      }),
      mgr.onMessage('client_accepted', () => {
        setScene(<WaitingArea gameManager={mgr} />);
      })
    ];

    return () => mgr.removeHandlers(handlers);
  });

  const onClickConnect = () => {
    console.log(process.env.REACT_APP_BANG_SERVER_COMMIT_HASH);
    
    if (!mgr.isConnected()) {
      mgr.connect(process.env.REACT_APP_BANG_SERVER_URL || '');
    }
  };

  return (
    <div className="App">
      <h1>React App</h1>
      <Play onClick={onClickConnect} />
      {scene || null}
    </div>
  );
}

export default App;



