import { createContext } from 'react';
import useEvent from 'react-use-event-hook';
import Button from '../../Components/Button';
import getLabel from '../../Locale/GetLabel';
import { LobbyState, isLobbyOwner, newLobbyState } from '../../Model/SceneState';
import { UserId, UserValue } from '../../Model/ServerMessage';
import { BangConnection } from '../../Model/UseBangConnection';
import { GameOptions } from '../Game/Model/GameUpdate';
import GameOptionsEditor from './GameOptionsEditor';
import LobbyUser from './LobbyUser';

export function getUser(users: UserValue[], id: UserId): UserValue {
  const user = users.find(user => user.user_id === id);
  if (!user) {
    throw new Error('cannot find user ' + id);
  }
  return user;
}

export type SetGameOptions = (value: GameOptions) => void;

export interface LobbyProps {
  gameOptions: GameOptions;
  setGameOptions: SetGameOptions;
  connection: BangConnection;
  lobbyState: LobbyState;
}

export const LobbyContext = createContext<LobbyState>(newLobbyState(0, 0));

export default function LobbyScene({ gameOptions, setGameOptions, connection, lobbyState }: LobbyProps) {
  const handleStartGame = useEvent(() => connection.sendMessage({ game_start: {} }));

  return (
    <LobbyContext.Provider value={lobbyState}>
      <div className='flex flex-col'>
        { isLobbyOwner(lobbyState) && <div className='status-bar'>
          <Button color='green' onClick={handleStartGame}>{getLabel('ui', 'BUTTON_START_GAME')}</Button>
        </div> }
        <div className='flex flex-col md:flex-row items-center md:items-start mb-24'>
          <GameOptionsEditor gameOptions={gameOptions} setGameOptions={setGameOptions} readOnly={!isLobbyOwner(lobbyState)} />
          <div className='flex flex-col -order-1 md:order-none'>
            {lobbyState.users.flatMap(user => {
              if (user.flags.includes('disconnected')) {
                return [];
              }
              return <LobbyUser align='vertical' key={user.user_id} user={user} isSelf={user.user_id === lobbyState.myUserId} />;
            })}
          </div>
        </div>
      </div>
    </LobbyContext.Provider>
  );
}