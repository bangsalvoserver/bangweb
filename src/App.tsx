import { createContext, useCallback, useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import getLabel from './Locale/GetLabel';
import { Connection, useHandler, useSocketConnection } from './Messages/Connection';
import { ClientAccepted, LobbyEntered, LobbyInfo, LobbyRemoveUser, UserInfo } from './Messages/ServerMessage';
import { useSettings } from './Model/AppSettings';
import Env from './Model/Env';
import CurrentScene, { SceneType } from './Scenes/CurrentScene';
import { ImageSrc, serializeImage } from './Utils/ImageSerial';

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

export async function makeUserInfo (username?: string, propic?: ImageSrc): Promise<UserInfo> {
  return {
    name: username ?? '',
    profile_image: await serializeImage(propic, 50)
  };
}

export default function App() {
  const [scene, setScene] = useState<SceneType>({ type: 'connect' });
  const settings = useSettings();
  
  const connection = useSocketConnection();

  useEffect(() => {
    if (settings.myUserId && !connection.isConnected()) {
      connection.connect();
    }
  }, [settings.myUserId, connection]);

  useHandler(connection, 'connected', useCallback(async () => {
    connection.sendMessage({connect: {
      user: await makeUserInfo(settings.username, settings.propic),
      user_id: settings.myUserId,
      commit_hash: Env.commitHash
    }});
  }, [connection, settings]));

  useHandler(connection, 'client_accepted', useCallback(({ user_id }: ClientAccepted) => {
    if (settings.myLobbyId) {
      connection.sendMessage({ lobby_join: { lobby_id: settings.myLobbyId }});
    }
    settings.setMyUserId(user_id);
    connection.setLocked(true);
    setScene({ type: 'waiting_area' });
  }, [connection, settings]));

  useHandler(connection, 'disconnected', useCallback(() => {
    setScene({ type: 'connect' });
  }, []));

  useHandler(connection, 'ping', useCallback(() => {
    connection.sendMessage({ pong: {} });
  }, [connection]));

  useHandler(connection, 'lobby_error', useCallback((message: string) => {
    console.error('Lobby error: ', getLabel('lobby', message));
  }, []));

  useHandler(connection, 'lobby_remove_user', useCallback(({ user_id }: LobbyRemoveUser) => {
    if (user_id === settings.myUserId) {
      settings.setMyLobbyId(undefined);
      connection.setLocked(true);
      setScene({ type: 'waiting_area' });
    }
  }, [connection, settings]));
  
  useHandler(connection, 'lobby_entered', useCallback(({ lobby_id, name, options }: LobbyEntered) => {
    if (scene.type !== 'lobby' || (settings.myLobbyId !== lobby_id)) {
      connection.setLocked(true);
      settings.setMyLobbyId(lobby_id);
      setScene({ type: 'lobby', lobbyInfo: { name, options } });
    }
  }, [connection, settings, scene.type]));

  useHandler(connection, 'lobby_edited', useCallback((lobbyInfo: LobbyInfo) => {
    if (scene.type === 'lobby') {
      setScene({ type: 'lobby', lobbyInfo });
    }
  }, [scene.type]));
  
  return (
    <div className="flex flex-col min-h-screen">
      <ConnectionContext.Provider value={connection}>
        <Header scene={scene} settings={settings} />
        <div className="current-scene">
          <CurrentScene scene={scene} setScene={setScene} settings={settings} />
        </div>
      </ConnectionContext.Provider>
    </div>
  );
}