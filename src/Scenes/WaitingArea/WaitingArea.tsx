import { SyntheticEvent } from "react";
import Button from "../../Components/Button";
import getLabel from "../../Locale/GetLabel";
import { LobbyId } from "../../Model/ServerMessage";
import { BangConnection } from "../../Model/UseBangConnection";
import { GameOptions } from "../Game/Model/GameUpdate";
import LobbyElement, { LobbyValue } from "./LobbyElement";
import './Style/WaitingArea.css';

export interface WaitingAreaProps {
  lobbies: LobbyValue[];
  connection: BangConnection;
  lobbyName?: string;
  setLobbyName: (value: string) => void;
  gameOptions?: GameOptions;
}

function WaitingArea({ lobbies, connection, lobbyName, setLobbyName, gameOptions }: WaitingAreaProps) {
  const handleCreateLobby = function (event: SyntheticEvent) {
    event.preventDefault();
    if (lobbyName) {
      connection.sendMessage({ lobby_make: { name: lobbyName, options: gameOptions }});
    }
  };

  const handleClickJoin = (lobby_id: LobbyId) => {
    connection.sendMessage({ lobby_join: { lobby_id }});
  };

  return (
    <div className="w-full">
      <form className='flex flex-col items-center' onSubmit={handleCreateLobby}>
        <label htmlFor='lobby_name' className='font-bold text-xl'>{getLabel('ui', 'LABEL_LOBBY_NAME')}</label>
        <input type='text' id='lobby_name'
          className='
            border-2
            border-gray-300
            rounded-md
            m-2
            p-1
            w-64
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          '
          value={lobbyName} onChange={e => setLobbyName(e.target.value)}></input>
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
