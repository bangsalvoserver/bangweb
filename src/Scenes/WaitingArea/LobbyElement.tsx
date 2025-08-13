import { Ref, SyntheticEvent, useCallback, useRef, useState } from "react";
import Button from "../../Components/Button";
import PasswordInput from "../../Components/PasswordInput";
import getLabel from "../../Locale/GetLabel";
import { LobbyId, LobbyStateEnum, LobbyValue } from "../../Model/ServerMessage";
import useCloseOnLoseFocus from "../../Utils/UseCloseOnLoseFocus";

interface LobbyPasswordProps {
  passwordInputRef?: Ref<HTMLInputElement>;
  lobby_id: LobbyId;
  isPasswordOpen: boolean;
  handleJoinLobby: (lobby_id: LobbyId, password: string) => void;
}

function LobbyPasswordInput({ passwordInputRef, lobby_id, isPasswordOpen, handleJoinLobby }: LobbyPasswordProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback((event: SyntheticEvent) => {
    event.preventDefault();
    if (password) {
      handleJoinLobby(lobby_id, password);
      setPassword('');
    }
  }, [lobby_id, password, handleJoinLobby]);

  return <div className={`lobby-password-input ${isPasswordOpen ? 'lobby-password-open' : 'lobby-password-closed'}`}>
    <form onSubmit={handleSubmit}>
      <label htmlFor='lobby_elem_password' className='font-bold'>{getLabel('ui', 'LABEL_LOBBY_PASSWORD')}</label>
      <PasswordInput inputRef={passwordInputRef} id="lobby_elem_password" password={password} setPassword={setPassword}/>
      <Button color='green' type='submit'>{getLabel('ui', 'BUTTON_OK')}</Button>
    </form>
  </div>
}

export interface LobbyElementProps {
  lobby: LobbyValue;
  handleJoinLobby: (lobby_id: LobbyId, password: string) => void;
}

const LOBBY_STATE_ICONS: Record<LobbyStateEnum, string> = {
  'waiting': '🟢',
  'playing': '🟡',
  'finished': '🔴'
};

function LobbyElement({ lobby: { lobby_id, name, num_players, num_bots, num_spectators, security, state }, handleJoinLobby }: LobbyElementProps) {
  const [isPasswordOpen, setIsPasswodOpen, elemRef] = useCloseOnLoseFocus<HTMLDivElement>();
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleClickJoin = useCallback(() => {
    if (security === 'locked') {
      setIsPasswodOpen(true);
      passwordInputRef?.current?.focus();
    } else {
      handleJoinLobby(lobby_id, '');
    }
  }, [lobby_id, security, handleJoinLobby, setIsPasswodOpen]);
  
  return (
    <div ref={elemRef} className={`lobby-element-wrapper ${isPasswordOpen ? 'lobby-element-wrapper-expanded' : ''}`}>
      <div className="lobby-element">
        <div className='lobby-name' title={name}>{name}</div>
        <div className='player-count'>{num_players}</div>
        <div className='player-count'>{num_bots > 0 ? num_bots : null}</div>
        <div className='player-count'>{num_spectators > 0 ? num_spectators : null}</div>
        <div className='lobby-state' title={getLabel('LobbyState', state)}>{LOBBY_STATE_ICONS[state]}</div>
        <Button color='green' onClick={handleClickJoin}>
          {getLabel('ui', 'BUTTON_JOIN')}
          {security === 'locked' ? ' 🔒' : security === 'unlocked' ? ' 🔓' : null}
        </Button>
      </div>
      { security === 'locked' && <LobbyPasswordInput passwordInputRef={passwordInputRef} lobby_id={lobby_id} isPasswordOpen={isPasswordOpen} handleJoinLobby={handleJoinLobby} />}
    </div>
  )
}

export default LobbyElement