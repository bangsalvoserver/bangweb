import React, { MutableRefObject, SyntheticEvent, useEffect, useRef } from 'react'
import { SceneProps, SceneType } from '../SceneProps';
import { ClientAccepted } from '../../Messages/ServerMessage';

export default function ConnectScene({ gameManager }: SceneProps) {
  const username = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    let handlers = [
      gameManager.onMessage('connect', () => {
        // TODO add profile_image
        gameManager.sendMessage('connect', { user_name: username.current.value, commit_hash: process.env.REACT_APP_BANG_SERVER_COMMIT_HASH || '' });
      }),
      gameManager.onMessage('client_accepted', ({ user_id }: ClientAccepted) => {
        console.log("Client Accepted: user_id = " + user_id);
        gameManager.changeScene(SceneType.WaitingArea);
      })
    ];

    return () => gameManager.removeHandlers(handlers);
  });

  const handleConnect = function(event: SyntheticEvent) {
    event.preventDefault();
    if (!gameManager.isConnected() && username.current.value) {
      gameManager.connect(process.env.REACT_APP_BANG_SERVER_URL || '');
    }
  };

  return (
    <form onSubmit={handleConnect}>
    <label htmlFor='username'>User Name:</label><input type='text' id='username' ref={username}></input>
    <button type='submit'>Connect</button>
    </form>
  )
}