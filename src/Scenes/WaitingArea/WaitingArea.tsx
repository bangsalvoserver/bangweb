import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import Button from "../../Components/Button";
import getLabel from "../../Locale/GetLabel";
import { ClientMessage } from "../../Messages/ClientMessage";
import { LobbyId, ServerMessage } from "../../Messages/ServerMessage";
import { GameOptions } from "../Game/Model/GameUpdate";
import LobbyElement, { LobbyValue } from "./LobbyElement";
import './Style/WaitingArea.css';

export interface WaitingAreaProps {
  lobbyName?: string;
  setLobbyName: (value: string) => void;
  gameOptions?: GameOptions;
  lastMessage: ServerMessage | null;
  sendMessage: (message: ClientMessage) => void;
}

function WaitingArea({ lobbyName, setLobbyName, gameOptions, lastMessage, sendMessage }: WaitingAreaProps) {
  const [lobbies, setLobbies] = useState<LobbyValue[]>([]);

  useEffect(() => sendMessage({ lobby_list: {}}), [sendMessage]);

  useEffect(() => {
    if (!lastMessage) return;

    if ('lobby_update' in lastMessage) {
      const { lobby_id, name, num_players, state } = lastMessage.lobby_update;
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
    }

    if ('lobby_removed' in lastMessage) {
      setLobbies(lobbies => lobbies.filter((lobby) => lobby.id !== lastMessage.lobby_removed.lobby_id));
    }
  }, [lastMessage]);

  const handleCreateLobby = useCallback((event: SyntheticEvent) => {
    event.preventDefault();
    if (lobbyName) {
      sendMessage({ lobby_make: { name: lobbyName, options: gameOptions }});
    }
  }, [sendMessage, gameOptions, lobbyName]);

  const handleClickJoin = useCallback((lobby_id: LobbyId) => {
    sendMessage({ lobby_join: { lobby_id }});
  }, [sendMessage]);

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
