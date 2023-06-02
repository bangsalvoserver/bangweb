import './App.css';
import { useEffect, useState, useRef } from 'react';
import { Connection, useHandlers } from './Messages/Connection';
import Header from './components/Header';
import UserMenu from './components/UserMenu';
import { serializeImage } from './Messages/ImageSerial';
import { ClientAccepted, LobbyEntered, LobbyRemoveUser, UserId } from './Messages/ServerMessage';
import CurrentScene, { CurrentSceneUnion } from './Scenes/CurrentScene';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const connection = useRef<Connection>();
  if (!connection.current) {
    connection.current = new Connection();
  }

  const [scene, setScene] = useState<CurrentSceneUnion>({ connect: { connection : connection.current }});

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
      setScene({ waiting_area: { connection: connection.current as Connection }});
    }],
    ['disconnect', () => {
      setScene({ connect: { connection: connection.current as Connection }})
    }],
    ['lobby_error', (message: string) => {
      console.error("Lobby error: " + message);
    }],
    ['lobby_remove_user', ({ user_id }: LobbyRemoveUser) => {
      if (user_id === myUserId.current) {
        localStorage.removeItem('lobby_id');
        connection.current?.setLocked(true);
        setScene({waiting_area: { connection: connection.current as Connection }});
      }
    }]
  );

  useHandlers(connection.current, [scene],
    ['lobby_entered', ({ lobby_id, name, options }: LobbyEntered) => {
      if (!('lobby' in scene) || (scene.lobby.myLobbyId != lobby_id)) {
        localStorage.setItem('lobby_id', lobby_id.toString());
        connection.current?.setLocked(true);
        setScene({ lobby: { connection: connection.current as Connection, myLobbyId: lobby_id, myUserId: myUserId.current as UserId, name, options }});
      }
    }]
  );

  return (
<>
    <Header
      connection={connection.current}
      onClickToggleMenu={() => setIsMenuOpen(value => !value)}
    />
<div className="home-page
min-h-screen
">
    <div className="
    home-page-login
    min-h-screen
    flex
    flex-col
    ">
      <UserMenu isMenuOpen={isMenuOpen}/>
      <CurrentScene scene={scene} />
    </div>

</div>
    </>
  );
}

export default App;
