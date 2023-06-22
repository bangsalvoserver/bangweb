import { Dispatch, SetStateAction, createContext, useContext, useRef, useState } from 'react';
import { ConnectionContext } from '../../App';
import Button from '../../Components/Button';
import getLabel from '../../Locale/GetLabel';
import { useHandler } from '../../Messages/Connection';
import { ChatMessage, LobbyId, LobbyInfo, UserId } from '../../Messages/ServerMessage';
import { deserializeImage } from '../../Utils/ImageSerial';
import GameScene from '../Game/GameScene';
import { GameAction } from '../Game/Model/GameAction';
import { GameOptions, GameUpdate, PlayerId } from '../Game/Model/GameUpdate';
import GameOptionsEditor from './GameOptionsEditor';
import LobbyChat from './LobbyChat';
import LobbyUser, { UserValue } from './LobbyUser';
import { GameTable, getPlayer } from '../Game/Model/GameTable';

export interface LobbyState {
  myUserId?: UserId;
  users: UserValue[];
  lobbyOwner?: UserId;
}

export function getUser(users: UserValue[], id: UserId): UserValue | undefined {
  return users.find(user => user.id === id);
}

export interface LobbyProps {
  myUserId?: UserId;
  myLobbyId?: LobbyId;
  lobbyInfo: LobbyInfo;
  setGameOptions: (value: GameOptions) => void;
}

export const LobbyContext = createContext<LobbyState>({ users: [] });

export default function LobbyScene({ myUserId, myLobbyId, lobbyInfo, setGameOptions }: LobbyProps) {
  const connection = useContext(ConnectionContext);

  const [isGameStarted, setIsGameStarted] = useState(false);
  const gameUpdates = useRef<GameUpdate[]>([]);

  const [users, setUsers] = useState<UserValue[]>([]);
  const [lobbyOwner, setLobbyOwner] = useState<UserId>();

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useHandler(connection, {

    lobby_add_user: ({ user_id, user: { name, profile_image }, is_read }) => {
      setUsers(users => {
        let copy = [...users];
        const newUser: UserValue = { id: user_id, name, propic: deserializeImage(profile_image) };
        let index = copy.findIndex(user => user.id === user_id);
        if (index >= 0) {
          copy[index] = newUser;
        } else {
          setChatMessages(chatMessages => chatMessages.concat({
            user_id: 0,
            message: getLabel('notify', 'USER_JOINED_LOBBY', name),
            is_read: is_read || user_id == myUserId
          }));
          copy.push(newUser);
        }
        return copy;
      });
    },

    lobby_remove_user: ({ user_id }) => {
      const user = getUser(users, user_id);
      if (user) {
        setChatMessages(chatMessages => chatMessages.concat({
          user_id: 0,
          message: getLabel('notify', 'USER_LEFT_LOBBY', user.name),
          is_read: false
        }));
      }
      setUsers(users => users.filter(user => user.id !== user_id));
    },

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
  
  }, [users]);

  const handleStartGame = () => connection.sendMessage({game_start: {}});

  const handleEditGameOptions = (gameOptions: GameOptions) => {
    connection.sendMessage({ lobby_edit: { name: lobbyInfo.name, options: gameOptions }});
    setGameOptions(gameOptions);
  };

  return (
    <LobbyContext.Provider value={{ myUserId, users, lobbyOwner }}>
      { isGameStarted ?
        (
          <GameScene
            channel={{
              getNextUpdate: () => gameUpdates.current.shift(),
              pendingUpdates: () => gameUpdates.current.length != 0,
              sendGameAction: (action: GameAction) => connection.sendMessage({ game_action: action })
            }}
            handleReturnLobby={() => connection.sendMessage({ lobby_return: {}})}
          />
        )
      :
        (
          <div className='flex flex-col'>
            <div className='flex flex-row justify-center h-12'>
              { myUserId == lobbyOwner && <Button color='green' onClick={handleStartGame}>{getLabel('ui', 'BUTTON_START_GAME')}</Button> }
            </div>
            <div className='flex flex-row'>
              <GameOptionsEditor gameOptions={lobbyInfo.options} setGameOptions={handleEditGameOptions} readOnly={myUserId != lobbyOwner} />
              <div className='flex flex-col'>
                {users.map(user => (
                  <LobbyUser align='vertical' key={user.id} user={user} isOwner={user.id === lobbyOwner} />
                ))}
              </div>
            </div>
          </div>
        )
      }
      <LobbyChat messages={chatMessages} />
    </LobbyContext.Provider>
  );
}