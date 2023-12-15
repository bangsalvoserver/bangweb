import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { ConnectionContext } from '../../App';
import Button from '../../Components/Button';
import getLabel from '../../Locale/GetLabel';
import { useHandler } from '../../Messages/Connection';
import { ChatMessage, LobbyAddUser, LobbyEntered, LobbyId, LobbyInfo, LobbyOwner, LobbyRemoveUser, UserId } from '../../Messages/ServerMessage';
import { deserializeImage } from '../../Utils/ImageSerial';
import GameScene from '../Game/GameScene';
import { GameAction } from '../Game/Model/GameAction';
import { GameOptions, GameUpdate } from '../Game/Model/GameUpdate';
import GameOptionsEditor from './GameOptionsEditor';
import LobbyChat from './LobbyChat';
import LobbyUser, { UserValue } from './LobbyUser';

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

  useHandler(connection, 'lobby_add_user', useCallback(({ user_id, user: { name, profile_image }, is_read }: LobbyAddUser) => {
    setUsers(users => {
      let copy = [...users];
      const newUser: UserValue = { id: user_id, name, propic: deserializeImage(profile_image) };
      let index = copy.findIndex(user => user.id === user_id);
      if (index >= 0) {
        copy[index] = newUser;
      } else {
        setChatMessages(chatMessages => chatMessages.concat({
          user_id: 0,
          message: getLabel('lobby', 'USER_JOINED_LOBBY', name),
          is_read: is_read || user_id === myUserId
        }));
        copy.push(newUser);
      }
      return copy;
    });
  }, [myUserId]));

  useHandler(connection, 'lobby_remove_user', useCallback(({ user_id }: LobbyRemoveUser) => {
    const user = getUser(users, user_id);
    if (user) {
      setChatMessages(chatMessages => chatMessages.concat({
        user_id: 0,
        message: getLabel('lobby', 'USER_LEFT_LOBBY', user.name),
        is_read: false
      }));
    }
    setUsers(users.filter(user => user.id !== user_id));
  }, [users]));

  useHandler(connection, 'lobby_owner', useCallback(({ user_id }: LobbyOwner) => {
    setLobbyOwner(user_id);
  }, []));

  useHandler(connection, 'lobby_chat', useCallback((message: ChatMessage) => {
    setChatMessages(messages => messages.concat(message));
  }, []));

  useHandler(connection, 'lobby_entered', useCallback(({ lobby_id }: LobbyEntered) => {
    if (lobby_id === myLobbyId) {
      gameUpdates.current = [];
      setIsGameStarted(false);
      setUsers([]);
    }
  }, [myLobbyId]));
  
  useHandler(connection, 'game_started', useCallback(() => {
    setIsGameStarted(true);
  }, []));

  useHandler(connection, 'game_update', useCallback((update: GameUpdate) => {
    gameUpdates.current.push(update);
  }, []));

  const channel = useMemo(() => ({
    hasUpdates: () => gameUpdates.current.length !== 0,
    getNextUpdate: () => gameUpdates.current.shift(),
    sendGameAction: (action: GameAction) => connection.sendMessage({ game_action: action })
  }), [connection]);

  const handleStartGame = useCallback(() => connection.sendMessage({game_start: {}}), [connection]);

  const handleEditGameOptions = useCallback((gameOptions: GameOptions) => {
    connection.sendMessage({ lobby_edit: { name: lobbyInfo.name, options: gameOptions }});
    setGameOptions(gameOptions);
  }, [connection, lobbyInfo.name, setGameOptions]);

  return (
    <LobbyContext.Provider value={{ myUserId, users, lobbyOwner }}>
      { isGameStarted ?
        (
          <GameScene
            channel={channel}
            handleReturnLobby={() => connection.sendMessage({ lobby_return: {}})}
          />
        )
      :
        (
          <div className='flex flex-col'>
            { myUserId === lobbyOwner && <div className='status-bar'>
              <Button color='green' onClick={handleStartGame}>{getLabel('ui', 'BUTTON_START_GAME')}</Button>
            </div> }
            <div className='flex flex-col md:flex-row items-center md:items-start mb-24'>
              <GameOptionsEditor gameOptions={lobbyInfo.options} setGameOptions={handleEditGameOptions} readOnly={myUserId !== lobbyOwner} />
              <div className='flex flex-col -order-1 md:order-none'>
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