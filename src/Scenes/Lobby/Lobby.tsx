import { createContext } from 'react';
import useEvent from 'react-use-event-hook';
import Button from '../../Components/Button';
import getLabel from '../../Locale/GetLabel';
import { LobbyState, newLobbyState } from '../../Model/SceneState';
import { LobbyInfo, UserId } from '../../Model/ServerMessage';
import { BangConnection } from '../../Model/UseBangConnection';
import { GameOptions } from '../Game/Model/GameUpdate';
import GameOptionsEditor from './GameOptionsEditor';
import LobbyUser, { UserValue } from './LobbyUser';

export function getUser(users: UserValue[], id: UserId): UserValue | undefined {
  return users.find(user => user.id === id);
}

export type SetGameOptions = (value: GameOptions) => void;

export interface LobbyProps {
  lobbyInfo: LobbyInfo;
  setGameOptions: SetGameOptions;
  connection: BangConnection;
  lobbyState: LobbyState;
}

export const LobbyContext = createContext<LobbyState>(newLobbyState(0, 0));

export default function LobbyScene({ lobbyInfo, setGameOptions, connection, lobbyState }: LobbyProps) {
  const handleStartGame = useEvent(() => connection.sendMessage({ game_start: {} }));

  return (
    <LobbyContext.Provider value={lobbyState}>
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
    </LobbyContext.Provider>
  );
}