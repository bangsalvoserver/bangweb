import { createContext, useContext, useRef, useState } from 'react';
import { ConnectionContext } from '../../App';
import { useHandler } from '../../Messages/Connection';
import { ChatMessage, LobbyId, UserId } from '../../Messages/ServerMessage';
import { deserializeImage } from '../../Utils/ImageSerial';
import GameScene from '../Game/GameScene';
import { GameAction } from '../Game/Model/GameAction';
import { GameOptions, GameUpdate } from '../Game/Model/GameUpdate';
import GameOptionsEditor from './GameOptionsEditor';
import LobbyChat from './LobbyChat';
import LobbyUser, { UserValue } from './LobbyUser';
import Button from '../../Components/Button';

export interface LobbyProps {
  myLobbyId: LobbyId;
  myUserId?: UserId;
  lobbyName: string;
  gameOptions: GameOptions;
  editLobby: (lobbyName: string, gameOptions: GameOptions) => void;
}

export interface LobbyState {
  lobbyName: string;
  users: UserValue[];
  myUserId?: UserId;
  lobbyOwner?: UserId;
}

export const LobbyContext = createContext<LobbyState>({ lobbyName: 'Bang!', users: [] });

export default function LobbyScene({ myLobbyId, myUserId, lobbyName, gameOptions, editLobby }: LobbyProps) {
  const connection = useContext(ConnectionContext);

  const [isGameStarted, setIsGameStarted] = useState(false);
  const gameUpdates = useRef<GameUpdate[]>([]);

  const [users, setUsers] = useState<UserValue[]>([]);
  const [lobbyOwner, setLobbyOwner] = useState<UserId>();

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useHandler(connection, {

    lobby_add_user: ({ user_id, user: { name, profile_image } }) => {
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
    },

    lobby_remove_user: ({ user_id }) => setUsers(users => users.filter(user => user.id !== user_id)),

    lobby_owner: ({ user_id }) => setLobbyOwner(user_id),

    lobby_chat: message => setChatMessages(messages => messages.concat(message)),

    lobby_entered: ({ lobby_id }) => {
      if (lobby_id == myLobbyId) {
        gameUpdates.current = [];
        setIsGameStarted(false);
        setUsers([]);
      }
    },
    
    game_started: () => setIsGameStarted(true),
    game_update: (update) => gameUpdates.current.push(update),
  
  });

  const getGameScene = () => {
    return (
      <GameScene channel={{
        getNextUpdate: () => gameUpdates.current.shift(),
        pendingUpdates: () => gameUpdates.current.length != 0,
        sendGameAction: (action: GameAction) => {
          connection.sendMessage({ game_action: action });
        },
        handleReturnLobby: () => connection.sendMessage({ lobby_return: {}})
      }} />
    );
  };

  const getLobbyScene = () => {
    const handleStartGame = () => connection.sendMessage({game_start: {}});

    const handleEditGameOptions = (gameOptions: GameOptions) => {
      localStorage.setItem('lobbyName', lobbyName);
      localStorage.setItem('gameOptions', JSON.stringify(gameOptions));
      connection.sendMessage({ lobby_edit: { name: lobbyName, options: gameOptions }});
      editLobby(lobbyName, gameOptions);
    };

    return <div>
      { myUserId == lobbyOwner && <Button color='blue' onClick={handleStartGame}>Start Game</Button> }
      <GameOptionsEditor gameOptions={gameOptions} setGameOptions={handleEditGameOptions} readOnly={myUserId != lobbyOwner} />
      {users.map(user => (
        <LobbyUser key={user.id} user={user} isOwner={user.id === lobbyOwner} />
      ))}
    </div>
  }

  const handleSendMessage = (message: string) => {
    connection.sendMessage({ lobby_chat: { message: message }});
  }

  return (
    <LobbyContext.Provider value={{ lobbyName, users, myUserId, lobbyOwner }}>
      {isGameStarted ? getGameScene() : getLobbyScene()}
      <LobbyChat messages={chatMessages} handleSendMessage={handleSendMessage} />
    </LobbyContext.Provider>
  );
}