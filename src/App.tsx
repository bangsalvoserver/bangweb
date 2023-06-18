import { createContext, useEffect, useRef, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import UserMenu from './Components/UserMenu';
import { Connection, SocketConnection, useHandler } from './Messages/Connection';
import { UserId } from './Messages/ServerMessage';
import CurrentScene, { CurrentSceneUnion } from './Scenes/CurrentScene';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const connection = useRefLazy<Connection>(() => new SocketConnection());

  const [scene, setScene] = useState<CurrentSceneUnion>({ connect: {} });

  const myUserId = useRef<UserId>();
  if (!myUserId.current) {
    const userIdString = localStorage.getItem('user_id');
    if (userIdString) {
      myUserId.current = parseInt(userIdString);
    }
  }

  useEffect(() => {
    if (myUserId.current && !connection.current.isConnected()) {
      connection.current.connect();
    }
  }, []);

  useHandler(connection.current, {

    connected: async () => {
      connection.current.sendMessage({connect: {
        user: {
          name: localStorage.getItem('username') ?? '',
          profile_image: await serializeImage(localStorage.getItem('propic'), 50)
        },
        user_id: myUserId.current,
        commit_hash: import.meta.env.VITE_BANG_SERVER_COMMIT_HASH || ''
      }});
    },

    client_accepted: ({ user_id }) => {
      myUserId.current = user_id;
      localStorage.setItem('user_id', user_id.toString());
      connection.current.setLocked(true);
      setScene({ waiting_area: {} });
    },

    disconnected: () => setScene({ connect: {}}),

    lobby_error: message => console.error("Lobby error: " + message), // TODO

    lobby_remove_user: ({ user_id }) => {
      if (user_id === myUserId.current) {
        localStorage.removeItem('lobby_id');
        connection.current.setLocked(true);
        setScene({ waiting_area: {} });
      }
    }

  });

  const editLobby = (lobbyName: string, gameOptions: GameOptions) => {
    setScene(scene => {
      if ('lobby' in scene) {
        return { lobby: { ...scene.lobby, lobbyName, gameOptions }};
      } else {
        return scene;
      }
    });
  };

  useHandler(connection.current, {

    lobby_entered: ({ lobby_id, name, options }) => {
      if (!('lobby' in scene) || (scene.lobby.myLobbyId != lobby_id)) {
        localStorage.setItem('lobby_id', lobby_id.toString());
        connection.current.setLocked(true);
        setScene({ lobby: { myLobbyId: lobby_id, myUserId: myUserId.current, lobbyName: name, gameOptions: options, editLobby }});
      }
    },

    lobby_edited: ({ name, options }) => editLobby(name, options),
  
  }, [scene]);

  const handleEditPropic = async (propic: string | null) => {
    connection.current.sendMessage({user_edit: {
      name: localStorage.getItem('username') ?? '',
      profile_image: await serializeImage(propic, 50)
    }});
  }

  const handleLeaveLobby = () => connection.current.sendMessage({ lobby_leave: {}});

  return (
  <div className="background">
    <div className="background-inner min-h-screen flex flex-col">
      <ConnectionContext.Provider value={connection.current}>
        <Header
          scene={scene}
          onEditPropic={handleEditPropic}
          onClickToggleMenu={() => setIsMenuOpen(value => !value)}
          onClickLeaveLobby={handleLeaveLobby}
        />
        <UserMenu isMenuOpen={isMenuOpen}/>
        <div className="current-scene">
          <CurrentScene scene={scene} />
        </div>
      </ConnectionContext.Provider>
    </div>
  </div>
  );
}

export default App;
