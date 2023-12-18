import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Button from '../../Components/Button';
import getLabel from '../../Locale/GetLabel';
import { ClientMessage } from '../../Messages/ClientMessage';
import { ChatMessage, LobbyId, LobbyInfo, ServerMessage, UserId } from '../../Messages/ServerMessage';
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
  lastMessage: ServerMessage | null;
  sendMessage: (message: ClientMessage) => void;
}

export const LobbyContext = createContext<LobbyState>({ users: [] });

export default function LobbyScene({ myUserId, myLobbyId, lobbyInfo, setGameOptions, lastMessage, sendMessage }: LobbyProps) {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const gameUpdates = useRef<GameUpdate[]>([]);

  const [users, setUsers] = useState<UserValue[]>([]);
  const [lobbyOwner, setLobbyOwner] = useState<UserId>();

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!lastMessage) return;

    if ('lobby_add_user' in lastMessage) {
      const { user_id, user: { name, profile_image }, is_read } = lastMessage.lobby_add_user;
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
    }

    if ('lobby_remove_user' in lastMessage) {
      const { user_id } = lastMessage.lobby_remove_user;
      const user = getUser(users, user_id);
      if (user) {
        setChatMessages(chatMessages => chatMessages.concat({
          user_id: 0,
          message: getLabel('lobby', 'USER_LEFT_LOBBY', user.name),
          is_read: false
        }));
      }
      setUsers(users.filter(user => user.id !== user_id));
    }

    if ('lobby_owner' in lastMessage) {
      setLobbyOwner(lastMessage.lobby_owner.user_id);
    }

    if ('lobby_chat' in lastMessage) {
      setChatMessages(messages => messages.concat(lastMessage.lobby_chat));
    }

    if ('lobby_entered' in lastMessage) {
      if (lastMessage.lobby_entered.lobby_id === myLobbyId) {
        gameUpdates.current = [];
        setIsGameStarted(false);
        setUsers([]);
      }
    }

    if ('game_started' in lastMessage) {
      setIsGameStarted(true);
    }

    if ('game_update' in lastMessage) {
      gameUpdates.current.push(lastMessage.game_update);
    }
  }, [lastMessage, myLobbyId, myUserId, users]);

  const channel = useMemo(() => ({
    hasUpdates: () => gameUpdates.current.length !== 0,
    getNextUpdate: () => gameUpdates.current.shift(),
    sendGameAction: (action: GameAction) => sendMessage({ game_action: action })
  }), [sendMessage]);

  const handleStartGame = useCallback(() => sendMessage({ game_start: {} }), [sendMessage]);

  const handleEditGameOptions = useCallback((gameOptions: GameOptions) => {
    sendMessage({ lobby_edit: { name: lobbyInfo.name, options: gameOptions }});
    setGameOptions(gameOptions);
  }, [sendMessage, lobbyInfo.name, setGameOptions]);

  const handleReturnLobby = useCallback(() => {
    sendMessage({ lobby_return: {} });
  }, [sendMessage]);

  return (
    <LobbyContext.Provider value={{ myUserId, users, lobbyOwner }}>
      { isGameStarted ?
        (
          <GameScene
            channel={channel}
            handleReturnLobby={handleReturnLobby}
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
      <LobbyChat messages={chatMessages} sendMessage={sendMessage} />
    </LobbyContext.Provider>
  );
}