import { useCallback, useEffect, useMemo, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './App.css';
import Header from './Components/Header';
import getLabel from './Locale/GetLabel';
import { ServerMessage, UserInfo } from './Messages/ServerMessage';
import { useSettings } from './Model/AppSettings';
import Env from './Model/Env';
import CurrentScene, { SceneType } from './Scenes/CurrentScene';
import { ImageSrc, serializeImage } from './Utils/ImageSerial';
import { ClientMessage } from './Messages/ClientMessage';

export async function makeUserInfo (username?: string, propic?: ImageSrc): Promise<UserInfo> {
  return {
    name: username ?? '',
    profile_image: await serializeImage(propic, 50)
  };
}

export default function App() {
  const [scene, setScene] = useState<SceneType>({ type: 'connect' });
  const settings = useSettings();
  
  const [socketUrl, setSocketUrl] = useState<string | null>(null);
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl);

  const sendMessage = useCallback((message: ClientMessage) => sendJsonMessage(message), [sendJsonMessage]);
  const lastMessage = useMemo(() => lastJsonMessage ? lastJsonMessage as ServerMessage : null, [lastJsonMessage]);

  const connect = useCallback(() => {
    if (readyState !== ReadyState.OPEN) {
      setSocketUrl(Env.bangServerUrl ?? `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/server`);
    }
  }, [readyState]);

  useEffect(() => {
    if (settings.myUserId) {
      connect();
    }
  }, [settings.myUserId, connect]);

  const disconnect = useCallback(() => {
    settings.setMyUserId(undefined);
    settings.setMyLobbyId(undefined);
    setSocketUrl(null);
  }, [settings]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      (async () => {
        sendMessage({connect: {
          user: await makeUserInfo(settings.username, settings.propic),
          user_id: settings.myUserId,
          commit_hash: Env.commitHash
        }});
      })();
    } else if (scene.type !== 'connect') {
      setScene({ type:'connect' });
    }
  }, [settings.myUserId, settings.username, settings.propic, scene.type, sendMessage, readyState]);

  useEffect(() => {
    if (!lastMessage) return;

    if ('client_accepted' in lastMessage) {
      if (settings.myLobbyId) {
        sendMessage({ lobby_join: { lobby_id: settings.myLobbyId }});
      }
      settings.setMyUserId(lastMessage.client_accepted.user_id);
      setScene({ type: 'waiting_area' });
    }
    
    if ('ping' in lastMessage) {
      sendMessage({ pong: {} });
    }

    if ('lobby_error' in lastMessage) {
      console.error('Lobby error: ', getLabel('lobby', lastMessage.lobby_error));
    }

    if ('lobby_remove_user' in lastMessage) {
      settings.setMyLobbyId(undefined);
      setScene({ type: 'waiting_area' });
    }

    if ('lobby_entered' in lastMessage) {
      const { lobby_id, name, options } = lastMessage.lobby_entered;
      if (scene.type !== 'lobby' || (settings.myLobbyId !== lobby_id)) {
        settings.setMyLobbyId(lobby_id);
        setScene({ type: 'lobby', lobbyInfo: { name, options } });
      }
    }
    
    if ('lobby_edited' in lastMessage) {
      if (scene.type === 'lobby') {
        setScene({ type: 'lobby', lobbyInfo: lastMessage.lobby_edited });
      }
    }
  }, [settings, scene.type, lastMessage, sendMessage]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header scene={scene} settings={settings} sendMessage={sendMessage} disconnect={disconnect} />
      <div className="current-scene">
        <CurrentScene scene={scene} setScene={setScene} settings={settings} lastMessage={lastMessage} sendMessage={sendMessage} connect={connect} />
      </div>
    </div>
  );
}