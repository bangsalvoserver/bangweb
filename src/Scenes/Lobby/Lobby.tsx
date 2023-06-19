import { createContext, useContext, useRef, useState } from 'react';
import { ConnectionContext } from '../../App';
import Button from '../../Components/Button';
import getLabel from '../../Locale/GetLabel';
import { useHandler } from '../../Messages/Connection';
import { ChatMessage, UserId } from '../../Messages/ServerMessage';
import { deserializeImage } from '../../Utils/ImageSerial';
import { SettingsProps } from '../CurrentScene';
import GameScene from '../Game/GameScene';
import { GameAction } from '../Game/Model/GameAction';
import { GameOptions, GameUpdate } from '../Game/Model/GameUpdate';
import GameOptionsEditor from './GameOptionsEditor';
import LobbyChat from './LobbyChat';
import LobbyUser, { UserValue } from './LobbyUser';

export interface LobbyState {
  lobbyName: string;
  users: UserValue[];
  lobbyOwner?: UserId;
}

export interface LobbyProps {
  lobbyName: string;
  gameOptions: GameOptions;
  editLobby: (lobbyName: string, gameOptions: GameOptions) => void;
}

export const LobbyContext = createContext<LobbyState>({ lobbyName: 'Bang!', users: [] });

export default function LobbyScene({ settings, settingsDispatch, lobbyName, gameOptions, editLobby }: SettingsProps & LobbyProps) {
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
      if (lobby_id == settings.myLobbyId) {
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
      }}
      settings={settings} />
    );
  };

  const getLobbyScene = () => {
    const handleStartGame = () => connection.sendMessage({game_start: {}});

    const handleEditGameOptions = (gameOptions: GameOptions) => {
      connection.sendMessage({ lobby_edit: { name: lobbyName, options: gameOptions }});
      settingsDispatch({ setGameOptions: gameOptions });
      editLobby(lobbyName, gameOptions);
    };

    return <div className='flex flex-col'>
      <div className='flex flex-row justify-center h-12'>
        { settings.myUserId == lobbyOwner && <Button color='green' onClick={handleStartGame}>{getLabel('ui', 'BUTTON_START_GAME')}</Button> }
      </div>
      <div className='flex flex-row'>
        <GameOptionsEditor gameOptions={gameOptions} setGameOptions={handleEditGameOptions} readOnly={settings.myUserId != lobbyOwner} />
        <div className='flex flex-col'>
          {users.map(user => (
            <LobbyUser key={user.id} user={user} isOwner={user.id === lobbyOwner} />
          ))}
        </div>
      </div>
    </div>
  }

  const handleSendMessage = (message: string) => {
    connection.sendMessage({ lobby_chat: { message: message }});
  }

  return (
    <LobbyContext.Provider value={{ lobbyName, users, lobbyOwner }}>
      {isGameStarted ? getGameScene() : getLobbyScene()}
      <LobbyChat messages={chatMessages} handleSendMessage={handleSendMessage} />
    </LobbyContext.Provider>
  );
}