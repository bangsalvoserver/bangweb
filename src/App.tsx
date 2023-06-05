import './App.css';
import { useEffect, useState, useRef, createContext } from 'react';
import { Connection, useHandlers } from './Messages/Connection';
import Header from './Components/Header';
import UserMenu from './Components/UserMenu';
import { serializeImage } from './Utils/ImageSerial';
import { ClientAccepted, LobbyEntered, LobbyRemoveUser, UserId } from './Messages/ServerMessage';
import CurrentScene, { CurrentSceneUnion } from './Scenes/CurrentScene';

export const ConnectionContext = createContext<Connection | null>(null);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const connection = useRef<Connection>();
  if (!connection.current) {
    connection.current = new Connection();
  }

  const [scene, setScene] = useState<CurrentSceneUnion>({ connect: {} });

  let myUserId = useRef<UserId>();
  if (!myUserId.current) {
    myUserId.current = parseInt(localStorage.getItem('user_id') as string) || undefined;
  }

  useEffect(() => {
    if (myUserId && !connection.current?.isConnected()) {
      connection.current?.connect();
    }
  }, []);

  useHandlers(connection.current, [],
    ['connect', async () => {
      connection.current?.sendMessage('connect', {
        user: {
          name: localStorage.getItem('username'),
          profile_image: await serializeImage(localStorage.getItem('propic'), 50)
        },
        user_id: myUserId.current,
        commit_hash: process.env.REACT_APP_BANG_SERVER_COMMIT_HASH || ''
      });
    }],
    ['client_accepted', ({ user_id }: ClientAccepted) => {
      myUserId.current = user_id;
      localStorage.setItem('user_id', user_id.toString());
      connection.current?.setLocked(true);
      setScene({ waiting_area: {} });
    }],
    ['disconnect', () => {
      setScene({ connect: {} })
    }],
    ['lobby_error', (message: string) => {
      console.error("Lobby error: " + message);
    }],
    ['lobby_remove_user', ({ user_id }: LobbyRemoveUser) => {
      if (user_id === myUserId.current) {
        localStorage.removeItem('lobby_id');
        connection.current?.setLocked(true);
        setScene({ waiting_area: {} });
      }
    }]
  );

  useHandlers(connection.current, [scene],
    ['lobby_entered', ({ lobby_id, name, options }: LobbyEntered) => {
      if (!('lobby' in scene) || (scene.lobby.myLobbyId != lobby_id)) {
        localStorage.setItem('lobby_id', lobby_id.toString());
        connection.current?.setLocked(true);
        setScene({ lobby: { myLobbyId: lobby_id, myUserId: myUserId.current, name, options }});
      }
    }]
  );

  const handleEditPropic = async (propic: string | null) => {
    connection.current?.sendMessage('user_edit', {
      name: localStorage.getItem('username'),
      profile_image: await serializeImage(propic, 50)
    });
  }

  return (
  <div className="background">
    <div className="background-inner min-h-screen flex flex-col">
      <ConnectionContext.Provider value={connection.current}>
        <Header onEditPropic={handleEditPropic} onClickToggleMenu={() => setIsMenuOpen(value => !value)} />
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
