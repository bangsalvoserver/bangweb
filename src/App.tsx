import './App.css';
import Header from './Components/Header';
import useBangConnection from './Model/UseBangConnection';
import ConnectScene from './Scenes/Connect/Connect';
import GameScene from './Scenes/Game/GameScene';
import LobbyScene from './Scenes/Lobby/Lobby';
import WaitingArea from './Scenes/WaitingArea/WaitingArea';

export default function App() {
  const { scene, sceneDispatch, settings, connection, getNextUpdate } = useBangConnection();

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
          setGameOptions={gameOptions => {
            connection.sendMessage({ lobby_edit: { name: scene.lobbyInfo.name, options: gameOptions } });
            sceneDispatch({ updateLobbyInfo: lobbyInfo => ({ ...lobbyInfo, options: gameOptions }) });
            settings.setGameOptions(gameOptions);
          }}
        />;
      case 'game':
        return <GameScene
          myUserId={settings.myUserId}
          connection={connection}
          lobbyState={scene.lobbyState}
          getNextUpdate={getNextUpdate}
        />
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header scene={scene} settings={settings} connection={connection} />
      <div className="current-scene">{currentScene()}</div>
    </div>
  );
}