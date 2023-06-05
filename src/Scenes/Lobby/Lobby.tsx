import { createContext, useContext, useRef, useState } from 'react';
import { ConnectionContext } from '../../App';
import { useHandlers } from '../../Messages/Connection';
import { deserializeImage } from '../../Utils/ImageSerial';
import { ChatMessage, LobbyAddUser, LobbyEntered, LobbyId, LobbyOwner, LobbyRemoveUser, UserId } from '../../Messages/ServerMessage';
import GameScene from '../Game/GameScene';
import GameOptionsEditor from './GameOptionsEditor';
import LobbyChat from './LobbyChat';
import LobbyUser, { UserValue } from './LobbyUser';
import { GameOptions, GameUpdate } from '../Game/Model/GameUpdate';

export interface LobbyProps {
  myLobbyId: LobbyId;
  myUserId?: UserId;
  name: string;
  options: GameOptions;
}

export interface LobbyState {
  users: UserValue[];
  myUserId?: UserId;
  lobbyOwner?: UserId;
}

export const LobbyContext = createContext<LobbyState>({ users:[] });

export default function LobbyScene({ myLobbyId, myUserId, name, options }: LobbyProps) {
  const connection = useContext(ConnectionContext);

  const [isGameStarted, setIsGameStarted] = useState(false);
  const gameUpdates = useRef([] as GameUpdate[]);

  const [users, setUsers] = useState([] as UserValue[]);
  const [lobbyOwner, setLobbyOwner] = useState<UserId>();

  const [lobbyName, setLobbyName] = useState(name);
  const [gameOptions, setGameOptions] = useState(options);

  const [chatMessages, setChatMessages] = useState([] as ChatMessage[]);

  useHandlers(connection, [],
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
        gameUpdates.current = [];
        setIsGameStarted(false);
        setUsers([]);
      }
    }],
    ['game_started', () => {
      setIsGameStarted(true);
    }],
    ['game_update', (update: any) => {
      const updateType = Object.keys(update)[0];
      const updateValue = update[updateType];
      gameUpdates.current.push({ updateType, updateValue });
    }]
  );

  const handleLeaveLobby = () => connection?.sendMessage('lobby_leave');
  const handleStartGame = () => connection?.sendMessage('game_start');

  const getGameScene = () => {
    return (
      <GameScene channel={{
        getNextUpdate: () => gameUpdates.current.shift(),
        sendGameAction: () => (messageType: string, messageValue: any = {}) => {
          connection?.sendMessage('game_action', { [messageType]: messageValue });
        },
        handleReturnLobby: () => connection?.sendMessage('lobby_return')
      }}/>
    );
  };

  const getLobbyScene = () => {
    const handleEditGameOptions = (gameOptions: GameOptions) => {
      if (myUserId == lobbyOwner) {
        localStorage.setItem('lobbyName', lobbyName);
        localStorage.setItem('gameOptions', JSON.stringify(gameOptions));
        connection?.sendMessage('lobby_edit', { name: lobbyName, options: gameOptions });
        setGameOptions(gameOptions);
      }
    };

    return (
      <>
        {myUserId == lobbyOwner ? <button onClick={handleStartGame}>Start Game</button> : null}
        <GameOptionsEditor gameOptions={gameOptions} setGameOptions={handleEditGameOptions} readOnly={myUserId != lobbyOwner} />
        {users.map(user => (
          <LobbyUser key={user.id} user={user} isOwner={user.id === lobbyOwner} />
        ))}
      </>
    )
  }

  const handleSendMessage = (message: string) => {
    connection?.sendMessage('lobby_chat', { message: message });
  }

  return (
    <div>
      <h1 className='
        text-3xl
        text-white
        font-bold
        '>{lobbyName}</h1>
      <div>
        <button onClick={handleLeaveLobby}>Leave Lobby</button>
      </div>
      <LobbyContext.Provider value={{ users, myUserId, lobbyOwner }}>
        {isGameStarted ? getGameScene() : getLobbyScene()}
        <LobbyChat messages={chatMessages} handleSendMessage={handleSendMessage} />
      </LobbyContext.Provider>
    </div>
  );
}