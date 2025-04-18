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
  'waiting': "\uD83D\uDFE2", // green circle
  'playing': "\uD83D\uDFE1", // yellow circle
  'finished': "\uD83D\uDD34" // red circle
};

function LobbyElement({ lobby: { lobby_id, name, num_players, num_spectators, max_players, secure, state }, handleJoinLobby }: LobbyElementProps) {
  const [isPasswordOpen, setIsPasswodOpen, elemRef] = useCloseOnLoseFocus<HTMLDivElement>();
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleClickJoin = useCallback(() => {
    if (secure) {
      setIsPasswodOpen(true);
      passwordInputRef?.current?.focus();
    } else {
      handleJoinLobby(lobby_id, '');
    }
  }, [lobby_id, secure, handleJoinLobby, setIsPasswodOpen]);

  const numPlayersStatus = `${num_players}/${max_players}` + (num_spectators > 0 ? `+${num_spectators}` : '');
  return (
    <div ref={elemRef} className={`lobby-element-wrapper ${isPasswordOpen ? 'lobby-element-wrapper-expanded' : ''}`}>
      <div className="lobby-element">
        <div className='lobby-name' title={name}>{name}</div>
        <div className='num-players'>{numPlayersStatus}</div>
        <div className='lobby-state' title={getLabel('LobbyState', state)}>{LOBBY_STATE_ICONS[state]}</div>
        <Button color='green' onClick={handleClickJoin}>{getLabel('ui', 'BUTTON_JOIN')}</Button>
        {secure && <div className='lobby-secure-icon' />}
      </div>
      { secure && <LobbyPasswordInput passwordInputRef={passwordInputRef} lobby_id={lobby_id} isPasswordOpen={isPasswordOpen} handleJoinLobby={handleJoinLobby} />}
    </div>
  )
}

export default LobbyElement