import { createContext, useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import { Connection, SocketConnection, useHandler } from './Messages/Connection';
import { UserInfo } from './Messages/ServerMessage';
import { useSettings } from './Model/AppSettings';
import CurrentScene, { SceneType } from './Scenes/CurrentScene';
import { GameOptions } from './Scenes/Game/Model/GameUpdate';
import { ImageSrc, serializeImage } from './Utils/ImageSerial';
import { useRefLazy } from './Utils/LazyRef';
import Env from './Model/Env';

export const ConnectionContext = createContext<Connection>({
  isConnected: () => false,
  isLocked: () => true,
  setLocked: () => {},
  connect: () => {},
  disconnect: () => {},
  addHandler: () => {},
  removeHandler: () => {},
  sendMessage: () => {},
});

async function makeUserInfo (username?: string, propic?: ImageSrc): Promise<UserInfo> {
  return {
    name: username ?? '',
    profile_image: await serializeImage(propic, 50)
  };
}

function App() {
  const connection = useRefLazy<Connection>(() => new SocketConnection());

  const [scene, setScene] = useState<SceneType>({ type: 'connect' });

  const settings = useSettings();

  useEffect(() => {
    if (settings.isConnected && !connection.current.isConnected()) {
      connection.current.connect();
    }
  }, []);

  useHandler(connection.current, {

    connected: async () => {
      connection.current.sendMessage({connect: {
        user: await makeUserInfo(settings.username, settings.propic),
        user_id: settings.myUserId,
        commit_hash: Env.commitHash
      }});
    },

    client_accepted: ({ user_id }) => {
      settings.setMyUserId(user_id);
      settings.setIsConnected(true);
      connection.current.setLocked(true);
      setScene({ type: 'waiting_area' });
    },

    disconnected: () => {
      settings.setIsConnected(undefined);
      setScene({ type: 'connect' });
    },

    lobby_error: message => console.error("Lobby error: " + message), // TODO

    lobby_remove_user: ({ user_id }) => {
      if (user_id === settings.myUserId) {
        settings.setMyLobbyId(undefined);
        connection.current.setLocked(true);
        setScene({ type: 'waiting_area' });
      }
    }

  }, [settings]);

  const editLobby = (lobbyName: string, gameOptions: GameOptions) => {
    setScene(scene => {
      if (scene.type == 'lobby') {
        return { ...scene, lobbyName, gameOptions };
      } else {
        return scene;
      }
    });
  };

  useHandler(connection.current, {

    lobby_entered: ({ lobby_id, name, options }) => {
      if (scene.type != 'lobby' || (settings.myLobbyId != lobby_id)) {
        connection.current.setLocked(true);
        settings.setMyLobbyId(lobby_id);
        setScene({ type: 'lobby', lobbyName: name, gameOptions: options, editLobby });
      }
    },

    lobby_edited: ({ name, options }) => editLobby(name, options),
  
  }, [scene]);

  const handleEditUser = async (username?: string, propic?: ImageSrc) => {
    settings.setUsername(username);
    settings.setPropic(propic);
    connection.current.sendMessage({ user_edit: await makeUserInfo(username, propic) });
  }

  const handleLeaveLobby = () => connection.current.sendMessage({ lobby_leave: {}});

  const handleDisconnect = () => connection.current.disconnect();

  return (
    <div className="flex flex-col min-h-screen">
      <ConnectionContext.Provider value={connection.current}>
        <Header
          title={scene.type == 'lobby' ? scene.lobbyName : undefined}
          username={settings.username}
          propic={settings.propic}
          editUser={handleEditUser}
          handleLeaveLobby={scene.type == 'lobby' ? handleLeaveLobby : undefined }
          handleDisconnect={scene.type != 'connect' ? handleDisconnect : undefined }
        />
        <div className="current-scene">
          <CurrentScene scene={scene} settings={settings} />
        </div>
      </ConnectionContext.Provider>
    </div>
  );
}

export default App;
