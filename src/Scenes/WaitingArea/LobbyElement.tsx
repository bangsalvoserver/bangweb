import { Ref, SyntheticEvent, useCallback, useImperativeHandle, useRef, useState } from "react";
import Button from "../../Components/Button";
import getLabel from "../../Locale/GetLabel";
import { LobbyId, LobbyValue } from "../../Model/ServerMessage";
import useCloseOnLoseFocus from "../../Utils/UseCloseOnLoseFocus";
import PasswordInput from "../../Components/PasswordInput";

interface LobbyPasswordHandle {
  focusPassword: () => void;
}

interface LobbyPasswordProps {
  handleRef?: Ref<LobbyPasswordHandle>;
  lobby_id: LobbyId;
  isPasswordOpen: boolean;
  handleJoinLobby: (lobby_id: LobbyId, password: string) => void;
}

function LobbyPasswordInput({ handleRef, lobby_id, isPasswordOpen, handleJoinLobby }: LobbyPasswordProps) {
  const [password, setPassword] = useState('');
  const passwordInput = useRef<HTMLInputElement>(null);

  useImperativeHandle(handleRef, () => ({
    focusPassword: () => {
      passwordInput.current?.focus();
    }
  }));

  const handleSubmit = useCallback((event: SyntheticEvent) => {
    event.preventDefault();
    if (password) {
      handleJoinLobby(lobby_id, password);
    }
  }, [lobby_id, password, handleJoinLobby]);

  return <div className={`lobby-password-input ${isPasswordOpen ? 'lobby-password-open' : 'lobby-password-closed'}`}>
    <form onSubmit={handleSubmit}>
      <label htmlFor='lobby_elem_password' className='font-bold'>{getLabel('ui', 'LABEL_LOBBY_PASSWORD')}</label>
      <PasswordInput inputRef={passwordInput} id="lobby_elem_password" password={password} setPassword={setPassword}/>
      <Button color='green' type='submit'>{getLabel('ui', 'BUTTON_OK')}</Button>
    </form>
  </div>
}

export interface LobbyElementProps {
  lobby: LobbyValue;
  handleJoinLobby: (lobby_id: LobbyId, password: string) => void;
}

function LobbyElement({ lobby: { lobby_id, name, num_players, num_spectators, max_players, secure, state }, handleJoinLobby }: LobbyElementProps) {
  const [isPasswordOpen, setIsPasswodOpen, elemRef] = useCloseOnLoseFocus<HTMLDivElement>();
  const passwordRef = useRef<LobbyPasswordHandle>(null);

  const handleClickJoin = useCallback(() => {
    if (secure) {
      if (!isPasswordOpen) {
        setIsPasswodOpen(true);
        passwordRef?.current?.focusPassword();
      } else {
        setIsPasswodOpen(false);
      }
    } else {
      handleJoinLobby(lobby_id, '');
    }
  }, [lobby_id, secure, handleJoinLobby, isPasswordOpen, setIsPasswodOpen]);

  const numPlayersStatus = `${num_players}/${max_players}` + (num_spectators > 0 ? `+${num_spectators}` : '');
  return (
    <div ref={elemRef} className="lobby-element-wrapper">
      <div className="lobby-element">
        <div id='lobby-name'>{name}</div>
        <div id='num-players'>{numPlayersStatus}</div>
        <div id='lobby-state'>{getLabel('LobbyState', state)}</div>
        <div id='lobby-button-join'>
          <Button color='green' onClick={handleClickJoin}>
            {getLabel('ui', 'BUTTON_JOIN')}{secure && <div className='lobby-secure-icon' />}
          </Button>
        </div>
      </div>
      { secure && <LobbyPasswordInput handleRef={passwordRef} lobby_id={lobby_id} isPasswordOpen={isPasswordOpen} handleJoinLobby={handleJoinLobby} />}
    </div>
  )
}

export default LobbyElement