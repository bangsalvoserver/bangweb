import './App.css';
import Header from './Components/Header';
import useBangConnection from './Messages/UseBangConnection';
import ConnectScene from './Scenes/Connect/Connect';
import LobbyScene from './Scenes/Lobby/Lobby';
import WaitingArea from './Scenes/WaitingArea/WaitingArea';

export default function App() {
  const { scene, sceneDispatch, settings, connection, channel } = useBangConnection();

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
              lobbyInfo={scene.lobbyInfo}
              lobbyState={scene.lobbyState}
              connection={connection}
              channel={channel}
              setGameOptions={gameOptions => {
                  connection.sendMessage({ lobby_edit: { name: scene.lobbyInfo.name, options: gameOptions }});
                  sceneDispatch({ updateLobbyInfo: lobbyInfo => ({ ...lobbyInfo, options: gameOptions }) });
                  settings.setGameOptions(gameOptions);
              }}
          />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header scene={scene} settings={settings} connection={connection} />
      <div className="current-scene">{ currentScene() }</div>
    </div>
  );
}