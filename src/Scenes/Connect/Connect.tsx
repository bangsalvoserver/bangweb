import React, { ChangeEvent, MutableRefObject, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { ClientAccepted } from '../../Messages/ServerMessage';
import { GameManager } from '../../Messages/GameManager';
import WaitingArea from '../WaitingArea/WaitingArea';

type ConnectProps = {
  gameManager: GameManager
}

export default function ConnectScene({ gameManager }: ConnectProps) {
  const [username, setUsername] = useState(localStorage.getItem('username'));

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }, [username]);

  useEffect(() => gameManager.addHandlers([
    ['client_accepted', ({ user_id }: ClientAccepted) => {
      gameManager.changeScene(<WaitingArea gameManager={gameManager} myUserId={user_id} />);
    }]
  ]));

  const handleConnect = function(event: SyntheticEvent) {
    event.preventDefault();
    if (!gameManager.isConnected() && username) {
      gameManager.connect(process.env.REACT_APP_BANG_SERVER_URL || '');
    }
  };

  return (
    <form onSubmit={handleConnect} className="flex flex-col items-center">
    <label htmlFor="username" className="text-lg font-medium mb-2">User Name:</label>
    <input
      className="
      border-2
      border-gray-300
      rounded-md
      p-2
      w-64
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      "
      type="text"
      id="username"
      value={username || ''}
      onChange={e => setUsername(e.target.value)}
    />
    <button
      type="submit"
      className="
      mt-4
      bg-blue-500
      hover:bg-blue-600
      text-white
      py-2
      px-4
      rounded-md
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      "
    >
      Connect
    </button>
  </form>
  )
}