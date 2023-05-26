import React, { useEffect } from 'react'
import { SceneProps, SceneType } from '../SceneProps';

export default function ConnectScene({ gameManager }: SceneProps) {
  useEffect(() => {
    let handlers = [
      gameManager.onMessage('connect', () => {
        gameManager.sendMessage('connect', { user_name: 'Tizio', profile_image: '', commit_hash: process.env.REACT_APP_BANG_SERVER_COMMIT_HASH || '' });
      }),
      gameManager.onMessage('client_accepted', () => {
        gameManager.changeScene(SceneType.WaitingArea);
      })
    ];

    return () => gameManager.removeHandlers(handlers);
  });

  const onClickConnect = () => {
    if (!gameManager.isConnected()) {
      gameManager.connect(process.env.REACT_APP_BANG_SERVER_URL || '');
    }
  };

  return (
    <button onClick={onClickConnect}>PLAY</button>
  )
}