import { SyntheticEvent, useCallback } from "react";
import BangLogo from "../../Components/BangLogo";
import Button from "../../Components/Button";
import getLabel from "../../Locale/GetLabel";
import AppSettings, { MAX_LOBBY_NAME_LENGTH } from "../../Model/AppSettings";
import { LobbyId, LobbyValue } from "../../Model/ServerMessage";
import { BangConnection } from "../../Model/UseBangConnection";
import LobbyElement from "./LobbyElement";
import './Style/WaitingArea.css';
import PasswordInput from "../../Components/PasswordInput";

export interface WaitingAreaProps {
  lobbies: LobbyValue[];
  connection: BangConnection;
  settings: AppSettings;
}

function getLobbyPassword(settings: AppSettings) {
  return (settings.expandLobbyOptions && settings.lobbyPassword) || '';
}

function WaitingArea({ lobbies, connection, settings }: WaitingAreaProps) {
  const handleCreateLobby = useCallback((event: SyntheticEvent) => {
    event.preventDefault();
    if (settings.lobbyName) {
      connection.sendMessage({ lobby_make: {
        name: settings.lobbyName,
        options: settings.gameOptions ?? null,
        password: getLobbyPassword(settings),
      }});
    }
  }, [connection, settings]);

  const handleJoinLobby = useCallback((lobby_id: LobbyId, password: string) => {
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
            w-44
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          '
          maxLength={MAX_LOBBY_NAME_LENGTH}
          value={settings.lobbyName} onChange={e => settings.setLobbyName(e.target.value)}></input>
          <button type="button"
            className="w-8 h-8 rounded-full focus:outline-none font-bold focus:ring-2 text-gray-400 bg-gray-600 hover:bg-gray-700 focus:ring-gray-800"
            onClick={() => settings.setExpandLobbyOptions(value => !value)}>
            {settings.expandLobbyOptions ? '+' : '-'}
          </button>
          </p>
        <p className={settings.expandLobbyOptions ? 'lobby-options-visible' : 'lobby-options-collapsed'}>
          <label htmlFor='lobby_password' className='font-bold text-xl'>{getLabel('ui', 'LABEL_LOBBY_PASSWORD')}</label>
          <PasswordInput id="lobby_password" password={settings.lobbyPassword} setPassword={settings.setLobbyPassword} />
        </p>
        <Button color='green' type='submit'>
          {getLabel('ui', 'BUTTON_CREATE_LOBBY')}
          {getLobbyPassword(settings) && <div className='lobby-secure-icon' />}
        </Button>
      </form>
      <div className='lobby-list'>
        {lobbies.toReversed().map((lobby) => (
          <LobbyElement key={lobby.lobby_id} lobby={lobby} handleJoinLobby={handleJoinLobby} />
        ))}
      </div>
    </div>
  );
}

export default WaitingArea;
