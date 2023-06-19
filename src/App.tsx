import { createContext, useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import { Connection, SocketConnection, useHandler } from './Messages/Connection';
import { useSettings } from './Model/AppSettings';
import CurrentScene, { SceneType } from './Scenes/CurrentScene';
import { GameOptions } from './Scenes/Game/Model/GameUpdate';
import { serializeImage } from './Utils/ImageSerial';
import { useRefLazy } from './Utils/LazyRef';

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

function App() {
  const connection = useRefLazy<Connection>(() => new SocketConnection());

  const [scene, setScene] = useState<SceneType>({ type: 'connect' });

  const [settings, settingsDispatch] = useSettings();

  useEffect(() => {
    if (settings.myUserId && !connection.current.isConnected()) {
      connection.current.connect();
    }
  }, []);

  useHandler(connection.current, {

    connected: async () => {
      connection.current.sendMessage({connect: {
        user: {
          name: settings.username,
          profile_image: await serializeImage(settings.propic, 50)
        },
        user_id: settings.myUserId,
        commit_hash: import.meta.env.VITE_BANG_SERVER_COMMIT_HASH || ''
      }});
    },

    client_accepted: ({ user_id }) => {
      settingsDispatch({ setMyUserId: user_id });
      connection.current.setLocked(true);
      setScene({ type: 'waiting_area' });
    },

    disconnected: () => setScene({ type: 'connect' }),

    lobby_error: message => console.error("Lobby error: " + message), // TODO

    lobby_remove_user: ({ user_id }) => {
      if (user_id === settings.myUserId) {
        settingsDispatch({ setMyLobbyId: undefined });
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
        settingsDispatch({ setMyLobbyId: lobby_id });
        setScene({ type: 'lobby', lobbyName: name, gameOptions: options, editLobby });
      }
    },

    lobby_edited: ({ name, options }) => editLobby(name, options),
  
  }, [scene]);

  const handleEditUser = async (username: string, propic: string | null) => {
    settingsDispatch({ setUsername: username });
    settingsDispatch({ setPropic: propic });
    connection.current.sendMessage({user_edit: {
      name: username,
      profile_image: await serializeImage(propic, 50)
    }});
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
          <CurrentScene scene={scene} settings={settings} settingsDispatch={settingsDispatch} />
        </div>
      </ConnectionContext.Provider>
    </div>
  );
}

export default App;
