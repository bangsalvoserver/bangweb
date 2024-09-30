import { SyntheticEvent, useCallback } from "react";
import BangLogo from "../../Components/BangLogo";
import Button from "../../Components/Button";
import getLabel from "../../Locale/GetLabel";
import AppSettings, { MAX_LOBBY_NAME_LENGTH } from "../../Model/AppSettings";
import { LobbyId } from "../../Model/ServerMessage";
import { BangConnection } from "../../Model/UseBangConnection";
import LobbyElement, { LobbyValue } from "./LobbyElement";
import './Style/WaitingArea.css';

export interface WaitingAreaProps {
  lobbies: LobbyValue[];
  connection: BangConnection;
  settings: AppSettings;
}

function WaitingArea({ lobbies, connection, settings }: WaitingAreaProps) {
  const handleCreateLobby = useCallback((event: SyntheticEvent) => {
    event.preventDefault();
    if (settings.lobbyName) {
      connection.sendMessage({ lobby_make: { name: settings.lobbyName, options: settings.gameOptions ?? null, password: settings.lobbyPassword ?? '' }});
    }
  }, [connection, settings]);

  const handleClickJoin = useCallback((lobby_id: LobbyId, secure: boolean) => {
    let password = '';
    if (secure) {
      let result = window.prompt(getLabel('ui','PROMPT_LOBBY_PASSWORD'));
      if (result) {
        password = result;
      } else {
        return;
      }
    }
    connection.sendMessage({ lobby_join: { lobby_id, password }});
  }, [connection]);

  return (
    <div className="w-full">
      <form className='flex flex-col items-center' onSubmit={handleCreateLobby}>
        <BangLogo />
        <p><label htmlFor='lobby_name' className='font-bold text-xl'>{getLabel('ui', 'LABEL_LOBBY_NAME')}</label>
        <input type='text' id='lobby_name'
          className='
            border-2
            border-gray-300
            rounded-md
            m-2
            p-1
            w-48
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          '
          maxLength={MAX_LOBBY_NAME_LENGTH}
          value={settings.lobbyName} onChange={e => settings.setLobbyName(e.target.value)}></input></p>
        <p><label htmlFor='lobby_password' className='font-bold text-xl'>{getLabel('ui', 'LABEL_LOBBY_PASSWORD')}</label>
        <input type='text' id='lobby_password'
          className='
            border-2
            border-gray-300
            rounded-md
            m-2
            p-1
            w-48
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          '
          value={settings.lobbyPassword} onChange={e => settings.setLobbyPassword(e.target.value)}></input></p>
        <Button color='green' type='submit'>{getLabel('ui', 'BUTTON_CREATE_LOBBY')}</Button>
      </form>
      <div className='lobby-list'>
        {lobbies.map((lobby) => (
          <LobbyElement key={lobby.id} lobby={lobby} onClickJoin={handleClickJoin} />
        ))}
      </div>
    </div>
  );
}

export default WaitingArea;
