import { SyntheticEvent, useCallback, useContext, useEffect, useState } from "react";
import { ConnectionContext } from "../../App";
import Button from "../../Components/Button";
import getLabel from "../../Locale/GetLabel";
import { useHandler } from "../../Messages/Connection";
import { LobbyId, LobbyRemoved, LobbyUpdate } from "../../Messages/ServerMessage";
import LobbyElement, { LobbyValue } from "./LobbyElement";
import './Style/WaitingArea.css';
import { GameOptions } from "../Game/Model/GameUpdate";

export interface WaitingAreaProps {
  lobbyName?: string;
  setLobbyName: (value: string) => void;
  gameOptions?: GameOptions;
}

function WaitingArea({ lobbyName, setLobbyName, gameOptions }: WaitingAreaProps) {
  const connection = useContext(ConnectionContext);
  const [lobbies, setLobbies] = useState<LobbyValue[]>([]);

  useEffect(() => connection.sendMessage({ lobby_list: {}}), [connection]);

  useHandler(connection, 'lobby_update', useCallback(({ lobby_id, name, num_players, state }: LobbyUpdate) => {
    setLobbies(lobbies => {
      let copy = [...lobbies];
      const newLobby = { id: lobby_id, name, num_players, state };
      let index = copy.findIndex(lobby => lobby.id === lobby_id);
      if (index >= 0) {
        copy[index] = newLobby;
      } else {
        copy.push(newLobby);
      }
      return copy;
    });
  }, []));

  useHandler(connection, 'lobby_removed', useCallback(({ lobby_id }: LobbyRemoved) => {
    setLobbies(lobbies => lobbies.filter((lobby) => lobby.id !== lobby_id));
  }, []));

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
