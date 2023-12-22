import { createContext, useCallback } from 'react';
import Button from '../../Components/Button';
import getLabel from '../../Locale/GetLabel';
import { Connection } from '../../Messages/Connection';
import { LobbyInfo, UserId } from '../../Messages/ServerMessage';
import { LobbyState, newLobbyState } from '../../Model/SceneState';
import GameScene from '../Game/GameScene';
import { GameOptions } from '../Game/Model/GameUpdate';
import { GameChannel } from '../Game/Model/UseGameState';
import GameOptionsEditor from './GameOptionsEditor';
import LobbyChat from './LobbyChat';
import LobbyUser, { UserValue } from './LobbyUser';

export function getUser(users: UserValue[], id: UserId): UserValue | undefined {
  return users.find(user => user.id === id);
}

export interface LobbyProps {
  lobbyInfo: LobbyInfo;
  setGameOptions: (value: GameOptions) => void;
  connection: Connection;
  lobbyState: LobbyState;
  channel: GameChannel;
}

export const LobbyContext = createContext<LobbyState>(newLobbyState());

export default function LobbyScene({ lobbyInfo, setGameOptions, connection, lobbyState, channel }: LobbyProps) {
  const handleReturnLobby = useCallback(() => connection.sendMessage({ lobby_return: {} }), [connection]);
  const handleStartGame = useCallback(() => connection.sendMessage({ game_start: {} }), [connection]);

  return (
    <LobbyContext.Provider value={lobbyState}>
      { lobbyState.isGameStarted ?
        <GameScene channel={channel} handleReturnLobby={handleReturnLobby} />
      :
        <div className='flex flex-col'>
          { lobbyState.myUserId === lobbyState.lobbyOwner && <div className='status-bar'>
            <Button color='green' onClick={handleStartGame}>{getLabel('ui', 'BUTTON_START_GAME')}</Button>
          </div> }
          <div className='flex flex-col md:flex-row items-center md:items-start mb-24'>
            <GameOptionsEditor gameOptions={lobbyInfo.options} setGameOptions={setGameOptions} readOnly={lobbyState.myUserId !== lobbyState.lobbyOwner} />
            <div className='flex flex-col -order-1 md:order-none'>
              {lobbyState.users.map(user => (
                <LobbyUser align='vertical' key={user.id} user={user} isOwner={user.id === lobbyState.lobbyOwner} />
              ))}
            </div>
          </div>
        </div>
      }
      <LobbyChat messages={lobbyState.chatMessages} connection={connection} />
    </LobbyContext.Provider>
  );
}