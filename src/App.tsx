import './App.css';
import WaitingArea from './Components/WaitingArea';
import { useEffect, useState } from 'react';
import Play from './Components/Buttons/Play';
import { GameManager } from './Messages/GameManager';

function App() {
  const [scene, setScene] = useState<JSX.Element | null>(null);
  const [gameManager, setGameManager] = useState(new GameManager());
  
  useEffect(() => {
    let handlers = [
      gameManager.onMessage('connect', () => {
        gameManager.sendMessage('connect', { user_name: 'Tizio', profile_image: '', commit_hash: 'ad5640ec0932ed743c21ca3a1c7186672ca49d31' });
      }),
      gameManager.onMessage('disconnect', () => {
        setScene(null);
      }),
      gameManager.onMessage('client_accepted', () => {
        setScene(<WaitingArea gameManager={gameManager} />);
      })
    ];

    return () => gameManager.removeHandlers(handlers);
  });

  const onClickConnect = () => {
    if (!gameManager.isConnected()) {
      gameManager.connect('ws://salvoserver.my.to:47654');
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



