import React, { ChangeEvent, MutableRefObject, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { ClientAccepted } from '../../Messages/ServerMessage';
import { Connection } from '../../Messages/Connection';
import WaitingArea from '../WaitingArea/WaitingArea';

export interface ConnectProps {
  connection: Connection;
}

export default function ConnectScene({ connection }: ConnectProps) {
  const [username, setUsername] = useState(localStorage.getItem('username'));

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }, [username]);

  const handleConnect = function(event: SyntheticEvent) {
    event.preventDefault();
    if (!connection.isConnected() && username) {
      connection.connect();
    }
  };

  return (
    <form onSubmit={handleConnect} className="flex flex-col items-center">
    <h1
    className='
    text-6xl
    text-center
    text-white
    font-bold
    p-4
    ' 
    > Bang!</h1>
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