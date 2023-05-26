import { useEffect, useState } from 'react';
import { GameManager } from '../../Messages/GameManager';
import { LobbyAddUser, LobbyRemoveUser } from '../../Messages/ServerMessage';
import LobbyUser, { UserValue } from './LobbyUser';
import WaitingArea from '../WaitingArea/WaitingArea';

type LobbyProps = {
  gameManager: GameManager,
  lobbyName: string,
  myUserId: number
};

export default function LobbyScene({ gameManager, lobbyName, myUserId }: LobbyProps) {
  const [users, setUsers] = useState([] as UserValue[]);

  useEffect(() => gameManager.addHandlers([
    ['lobby_add_user', ({ user_id, name }: LobbyAddUser) => {
      setUsers(users =>
        users.filter(user => user.id !== user_id).concat({ id: user_id, name })
      );
    }],
    ['lobby_remove_user', ({ user_id }: LobbyRemoveUser) => {
      setUsers(users =>
        users.filter(user => user.id !== user_id)
      );
      if (user_id === myUserId) {
        gameManager.changeScene(<WaitingArea gameManager={gameManager} myUserId={user_id} />);
      }
    }]
  ]));

  const handleLeaveLobby = () => {
    gameManager.sendMessage('lobby_leave');
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