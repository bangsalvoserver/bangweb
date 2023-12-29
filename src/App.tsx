import { useRef } from 'react';
import './App.css';
import Header from './Components/Header';
import OverlayButtons from './Components/OverlayButtons';
import useBangConnection from './Model/UseBangConnection';
import ConnectScene from './Scenes/Connect/Connect';
import GameScene from './Scenes/Game/GameScene';
import LobbyScene from './Scenes/Lobby/Lobby';
import WaitingArea from './Scenes/WaitingArea/WaitingArea';

export default function App() {
  const { scene, settings, connection, observer, setGameOptions } = useBangConnection();

  const overlayRef = useRef<HTMLDivElement>(null);

  const currentScene = () => {
    switch (scene.type) {
      case 'connect':
        return <ConnectScene
          username={settings.username}
          setUsername={settings.setUsername}
          connection={connection}
        />;
      case 'waiting_area':
        return <WaitingArea
          lobbies={scene.lobbies}
          connection={connection}
          lobbyName={settings.lobbyName}
          setLobbyName={settings.setLobbyName}
          gameOptions={settings.gameOptions}
        />;
      case 'lobby':
        return <LobbyScene
          myUserId={settings.myUserId}
          lobbyInfo={scene.lobbyInfo}
          lobbyState={scene.lobbyState}
          connection={connection}
          setGameOptions={setGameOptions}
        />;
      case 'game':
        return <GameScene
          myUserId={settings.myUserId}
          connection={connection}
          lobbyState={scene.lobbyState}
          observer={observer}
          overlayRef={overlayRef}
        />
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header scene={scene} settings={settings} connection={connection} />
      <div className="current-scene">{currentScene()}</div>
      <OverlayButtons scene={scene} settings={settings} connection={connection} overlayRef={overlayRef} />
    </div>
  );
}