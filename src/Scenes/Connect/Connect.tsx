import React, { ChangeEvent, MutableRefObject, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { ClientAccepted } from '../../Messages/ServerMessage';
import { GameManager } from '../../Messages/GameManager';
import WaitingArea from '../WaitingArea/WaitingArea';
import { serializeImage } from '../../Messages/ImageSerial';

type ConnectProps = {
  gameManager: GameManager
}

export default function ConnectScene({ gameManager }: ConnectProps) {
  const [propic, setPropic] = useState<string>();
  const username = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => gameManager.addHandlers([
    ['connect', () => {
      gameManager.sendMessage('connect', {
        user_name: username.current.value,
        profile_image: propic ? serializeImage(propic, 50) : {},
        commit_hash: process.env.REACT_APP_BANG_SERVER_COMMIT_HASH || ''
      });
    }],
    ['client_accepted', ({ user_id }: ClientAccepted) => {
      gameManager.changeScene(<WaitingArea gameManager={gameManager} myUserId={user_id} />);
    }]
  ]));

  const handlePropicChange = function(event: ChangeEvent<HTMLInputElement>) {
    let file = event.target.files && event.target.files[0] || null;
    if (file) {
      let reader = new FileReader();
      reader.onload = () => {
        setPropic(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPropic(undefined);
    }
  };

  const handleConnect = function(event: SyntheticEvent) {
    event.preventDefault();
    if (!gameManager.isConnected() && username.current.value) {
      gameManager.connect(process.env.REACT_APP_BANG_SERVER_URL || '');
    }
  };

  return (
    <form onSubmit={handleConnect}>
      <div>
          <label htmlFor='propic_file'>Profile picture:</label>
          {propic ? <img src={propic} /> : null}
          <input type='file' id='propic_file' accept="image/*" onChange={handlePropicChange} />
      </div>
      <div>
        <label htmlFor='username'>User Name:</label><input type='text' id='username' ref={username}></input>
      </div>
      <div>
        <button type='submit'>Connect</button>
      </div>
    </form>
  )
}