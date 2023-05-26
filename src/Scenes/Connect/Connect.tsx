import React, { ChangeEvent, MutableRefObject, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { ClientAccepted } from '../../Messages/ServerMessage';
import { GameManager } from '../../Messages/GameManager';
import WaitingArea from '../WaitingArea/WaitingArea';
import { serializeImage } from '../../Messages/ImageSerial';

type ConnectProps = {
  gameManager: GameManager,
  propic?: string
}

export default function ConnectScene({ gameManager, propic }: ConnectProps) {
  const username = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => gameManager.addHandlers([
    ['connect', () => {
      gameManager.sendMessage('connect', {
        user_name: username.current.value,
        profile_image: serializeImage(propic, 50),
        commit_hash: process.env.REACT_APP_BANG_SERVER_COMMIT_HASH || ''
      });
    }],
    ['client_accepted', ({ user_id }: ClientAccepted) => {
      gameManager.changeScene(<WaitingArea gameManager={gameManager} myUserId={user_id} />);
    }]
  ]));

  const handleConnect = function(event: SyntheticEvent) {
    event.preventDefault();
    if (!gameManager.isConnected() && username.current.value) {
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
      ref={username}
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