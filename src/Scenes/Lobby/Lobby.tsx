import { useEffect, useReducer, useRef, useState } from 'react';
import { GameManager, useHandlers } from '../../Messages/GameManager';
import { LobbyAddUser, LobbyRemoveUser, LobbyEntered, LobbyOwner } from '../../Messages/ServerMessage';
import LobbyUser, { UserValue } from './LobbyUser';
import WaitingArea from '../WaitingArea/WaitingArea';
import { GameOptions } from '../../Messages/GameUpdate';
import GameScene from '../Game/GameScene';
import { deserializeImage } from '../../Messages/ImageSerial';
import { Game } from '../Game/Game';
import { handleGameUpdate } from '../Game/GameUpdateHandler';
import { newGameTable } from '../Game/GameTable';

export interface LobbyProps {
  myLobbyId: number,
  gameManager: GameManager;
  name: string;
  options: GameOptions;
}

export default function LobbyScene({ myLobbyId, gameManager, name, options }: LobbyProps) {
  const [table, tableDispatch] = useReducer(handleGameUpdate, null, newGameTable);
  const game = useRef<Game>();

  const [users, setUsers] = useState([] as UserValue[]);
  const [owner, setOwner] = useState<number>();

  const [lobbyName, setLobbyName] = useState(name);
  const [lobbyOptions, setLobbyOptions] = useState(options);

  const myUserId = parseInt(localStorage.getItem('user_id') as string);

  useHandlers(gameManager, [],
    ['lobby_add_user', ({ user_id, user: { name, profile_image } }: LobbyAddUser) => {
      setUsers(users => {
        let copy = [...users];
        const newUser = { id: user_id, name, propic: deserializeImage(profile_image) };
        let index = copy.findIndex(user => user.id === user_id);
        if (index >= 0) {
          copy[index] = newUser;
        } else {
          copy.push(newUser);
        }
        return copy;
      });
    }],
    ['lobby_remove_user', ({ user_id }: LobbyRemoveUser) => {
      if (user_id === myUserId) {
        localStorage.removeItem('lobby_id');
        gameManager.changeScene(<WaitingArea gameManager={gameManager} />);
      } else {
        setUsers(users =>
          users.filter(user => user.id !== user_id)
        );
      }
    }],
    ['lobby_edited', ({ name, options }: LobbyEntered) => {
      setLobbyName(name);
      setLobbyOptions(options);
    }],
    ['lobby_owner', ({ id }: LobbyOwner) => {
      setOwner(id);
    }],
    ['game_started', () => {
      game.current = new Game(tableDispatch);
      tableDispatch({ updateType: 'reset' });
    }],
    ['lobby_entered', ({ lobby_id }: LobbyEntered) => {
      if (lobby_id == myLobbyId) {
        game.current = undefined;
        tableDispatch({ updateType: 'reset' });
      }
    }],
    ['game_update', (update: any) => {
      game.current?.pushUpdate(update);
    }]
  );

  const handleLeaveLobby = () => {
    gameManager.sendMessage('lobby_leave');
  };

  return (
    <div>
      <h1>Welcome To {lobbyName}</h1>
      <div>
        <button onClick={handleLeaveLobby}>Leave Lobby</button>
      </div>
      <div>
      {game.current ?
      <GameScene game={game.current} table={table} users={users} />
      : users.map(user => (
        <LobbyUser key={user.id} user={user} isOwner={user.id === owner} />
      ))}
      </div>
    </div>
  );
}