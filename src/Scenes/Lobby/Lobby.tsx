import { useEffect, useReducer, useRef, useState } from 'react';
import { Connection, useHandlers } from '../../Messages/Connection';
import { LobbyAddUser, LobbyRemoveUser, LobbyEntered, LobbyOwner, LobbyId, UserId, ChatMessage } from '../../Messages/ServerMessage';
import LobbyUser, { UserValue } from './LobbyUser';
import { GameOptions, GameString } from '../../Messages/GameUpdate';
import GameScene from '../Game/GameScene';
import { deserializeImage } from '../../Messages/ImageSerial';
import { Game } from '../Game/Game';
import { handleGameUpdate } from '../Game/GameUpdateHandler';
import { newGameTable } from '../Game/GameTable';
import GameOptionsEditor from './GameOptionsEditor';
import LobbyChat from './LobbyChat';

export interface LobbyProps {
  myLobbyId: LobbyId;
  myUserId: UserId;
  connection: Connection;
  name: string;
  options: GameOptions;
}

export default function LobbyScene({ myLobbyId, myUserId, connection, name, options }: LobbyProps) {
  const [table, tableDispatch] = useReducer(handleGameUpdate, myUserId, newGameTable);
  const [gameLogs, setGameLogs] = useState<GameString[]>([]);
  const game = useRef<Game>();

  const [users, setUsers] = useState<UserValue[]>([]);
  const [lobbyOwner, setLobbyOwner] = useState<UserId>();

  const [lobbyName, setLobbyName] = useState(name);
  const [gameOptions, setGameOptions] = useState(options);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useHandlers(connection, [game],
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
      setUsers(users =>
        users.filter(user => user.id !== user_id)
      );
    }],
    ['lobby_edited', ({ name, options }: LobbyEntered) => {
      setLobbyName(name);
      setGameOptions(options);
    }],
    ['lobby_owner', ({ user_id }: LobbyOwner) => {
      setLobbyOwner(user_id);
    }],
    ['lobby_chat', (message: ChatMessage) => {
      setChatMessages(messages => messages.concat(message));
    }],
    ['lobby_entered', ({ lobby_id }: LobbyEntered) => {
      if (lobby_id == myLobbyId) {
        game.current = undefined;
        setUsers([]);
      }
    }],
    ['game_started', () => {
      game.current = new Game(tableDispatch, setGameLogs);
      tableDispatch({ updateType: 'reset' });
    }],
    ['game_update', (update: any) => {
      game.current?.pushUpdate(update);
    }]
  );

  useEffect(() => {
    if (myUserId == lobbyOwner) {
      localStorage.setItem('lobbyName', lobbyName);
      localStorage.setItem('gameOptions', JSON.stringify(gameOptions));
      connection.sendMessage('lobby_edit', { name: lobbyName, options: gameOptions });
    }
  }, [lobbyOwner, lobbyName, gameOptions]);

  const handleLeaveLobby = () => connection.sendMessage('lobby_leave');
  const handleStartGame = () => connection.sendMessage('game_start');

  const getGameScene = () => {
    return (
      <GameScene connection={connection} game={game.current as Game} table={table} logs={gameLogs} users={users} lobbyOwner={lobbyOwner} />
    );
  };

  const getLobbyScene = () => {
    return (
      <>
      { myUserId == lobbyOwner ? <button onClick={handleStartGame}>Start Game</button> : null}
      <GameOptionsEditor gameOptions={gameOptions} setGameOptions={setGameOptions} readOnly={myUserId != lobbyOwner} />
      {users.map(user => (
        <LobbyUser key={user.id} user={user} isOwner={user.id === lobbyOwner} />
      ))}
      </>
    )
  }

  return (
    <div>
      <h1>Welcome To {lobbyName}</h1>
      <div>
        <button onClick={handleLeaveLobby}>Leave Lobby</button>
      </div>
      <LobbyChat connection={connection} myUserId={myUserId} users={users} messages={chatMessages} />
      <div>
        { game.current ? getGameScene() : getLobbyScene() }
      </div>
    </div>
  );
}