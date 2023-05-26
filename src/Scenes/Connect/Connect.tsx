import React, { MutableRefObject, SyntheticEvent, useEffect, useRef } from 'react'
import { SceneType } from '../SceneType';
import { ClientAccepted } from '../../Messages/ServerMessage';
import { GameManager } from '../../Messages/GameManager';

type ConnectProps = {
  gameManager: GameManager
}

export default function ConnectScene({ gameManager }: ConnectProps) {
  const username = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    let handlers = gameManager.addHandlers([
      ['connect', () => {
        // TODO add profile_image
        gameManager.sendMessage('connect', { user_name: username.current.value, commit_hash: process.env.REACT_APP_BANG_SERVER_COMMIT_HASH || '' });
      }],
      ['client_accepted', ({ user_id }: ClientAccepted) => {
        gameManager.changeScene(SceneType.WaitingArea, { myUserId: user_id });
      }]
    ]);

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