import { useEffect, useState } from 'react';
import { GameManager } from '../../Messages/GameManager';
import { SceneType } from '../SceneType';
import { LobbyAddUser, LobbyRemoveUser } from '../../Messages/ServerMessage';
import LobbyUser, { LobbyUserProps, UserValue } from './LobbyUser';

type LobbyProps = {
  gameManager: GameManager,
  lobbyName: string,
  myUserId: number
};

export default function LobbyScene({ gameManager, lobbyName, myUserId }: LobbyProps) {
  const [users, setUsers] = useState([] as UserValue[]);

  useEffect(() => {
    let handlers = [
      gameManager.onMessage('lobby_add_user', ({ user_id, name }: LobbyAddUser) => {
        setUsers(users => 
          users.filter(user => user.id !== user_id).concat({id:user_id, name})
        );
      }),
      gameManager.onMessage('lobby_remove_user', ({ user_id }: LobbyRemoveUser) => {
        setUsers(users => 
          users.filter(user => user.id !== user_id)
        );
        if (user_id === myUserId) {
          gameManager.changeScene(SceneType.WaitingArea, { myUserId });
        }
      })
    ];

    return () => gameManager.removeHandlers(handlers);
  });

  const handleLeaveLobby = () => {
    gameManager.sendMessage('lobby_leave', {});
  };

  return (
    <div>
      <h1>Welcome To {lobbyName}</h1>
      <div>
        <button onClick={handleLeaveLobby}>Leave Lobby</button>
      </div>
      <div>{users.map(user => (
        <LobbyUser key={user.id} user={user} />
      ))}</div>
    </div>
  );
}