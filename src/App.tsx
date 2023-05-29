import './App.css';
import { useEffect, useState, useRef } from 'react';
import { Connection, useHandlers } from './Messages/Connection';
import ConnectScene from './Scenes/Connect/Connect';
import Header from './components/Header';
import UserMenu from './components/UserMenu';
import { serializeImage } from './Messages/ImageSerial';
import { ClientAccepted, LobbyEntered, LobbyRemoveUser } from './Messages/ServerMessage';
import WaitingArea from './Scenes/WaitingArea/WaitingArea';
import CurrentScene, { CurrentSceneProps, CurrentSceneUnion } from './Scenes/CurrentScene';
import { connect } from 'http2';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const connection = useRef<Connection>();
  if (!connection.current) {
    connection.current = new Connection();
  }

  const [scene, setScene] = useState<CurrentSceneUnion>({ connect: { connection : connection.current }});

  const myUserId = parseInt(localStorage.getItem('user_id') as string) || 0;

  useEffect(() => {
    if (myUserId && !connection.current?.isConnected()) {
      connection.current?.connect();
    }
  }, [connection]);

  useHandlers(connection.current, [connection], 
    ['connect', async () => {
      connection.current?.sendMessage('connect', {
        user: {
          name: localStorage.getItem('username'),
          profile_image: await serializeImage(localStorage.getItem('propic'), 50)
        },
        user_id: myUserId,
        commit_hash: process.env.REACT_APP_BANG_SERVER_COMMIT_HASH || ''
      });
    }],
    ['client_accepted', ({ user_id }: ClientAccepted) => {
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
    ['lobby_entered', ({ lobby_id, name, options }: LobbyEntered) => {
      localStorage.setItem('lobby_id', lobby_id.toString());
      connection.current?.setLocked(true);
      setScene({ lobby: { connection: connection.current as Connection, myLobbyId: lobby_id, name, options }});
    }],
    ['lobby_remove_user', ({ user_id }: LobbyRemoveUser) => {
      if (user_id === myUserId) {
        localStorage.removeItem('lobby_id');
        connection.current?.setLocked(true);
        setScene({waiting_area: { connection: connection.current as Connection }});
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
      <h1
      className='
      text-6xl
      text-center
      text-white
      font-bold
      p-4
      ' 
      > Bang!</h1>
      <UserMenu isMenuOpen={isMenuOpen}/>
      <CurrentScene scene={scene} />
    </div>

</div>
    </>
  );
}

export default App;
