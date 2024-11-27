import { useRef } from 'react';
import './App.css';
import ErrorPopup from './Components/ErrorPopup';
import Header from './Components/Header';
import OverlayButtons from './Components/OverlayButtons';
import useBangConnection from './Model/UseBangConnection';
import GameScene from './Scenes/Game/GameScene';
import HomeScene from './Scenes/Home/Home';
import LoadingScene from './Scenes/Loading/Loading';
import LobbyScene from './Scenes/Lobby/Lobby';
import WaitingArea from './Scenes/WaitingArea/WaitingArea';

export default function App() {
  const { scene, settings, connection, gameChannel, handleConnect, setGameOptions, clearError } = useBangConnection();

  const overlayRef = useRef<HTMLDivElement>(null);

  const currentScene = () => {
    switch (scene.type) {
      case 'home':
        return <HomeScene
          username={settings.username}
          setUsername={settings.setUsername}
          handleConnect={handleConnect}
        />;
      case 'loading':
        return <LoadingScene 
          message={scene.message}
        />;
      case 'waiting_area':
        return <WaitingArea
          lobbies={scene.lobbies}
          connection={connection}
          settings={settings}
        />;
      case 'lobby':
        return <LobbyScene
          gameOptions={scene.gameOptions}
          setGameOptions={setGameOptions}
          lobbyState={scene.lobbyState}
          connection={connection}
        />;
      case 'game':
        return <GameScene
          connection={connection}
          lobbyState={scene.lobbyState}
          gameChannel={gameChannel}
          overlayRef={overlayRef}
          muteSounds={settings.muteSounds}
        />
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header scene={scene} settings={settings} connection={connection} />
      <div className="current-scene">{currentScene()}</div>
      <OverlayButtons scene={scene} settings={settings} connection={connection} overlayRef={overlayRef} />
      <ErrorPopup error={scene.error} clearError={clearError} />
    </div>
  );
}