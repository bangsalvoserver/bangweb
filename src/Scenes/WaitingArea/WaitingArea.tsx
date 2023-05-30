import { SyntheticEvent, useEffect, useState } from "react";
import LobbyElement, { LobbyValue } from "./LobbyElement";
import { LobbyId, LobbyRemoved, LobbyUpdate } from "../../Messages/ServerMessage";
import { Connection, useHandlers } from "../../Messages/Connection";

export interface WaitingAreaProps {
  connection: Connection;
}

function WaitingArea({ connection }: WaitingAreaProps) {
  const [lobbies, setLobbies] = useState([] as LobbyValue[]);
  const [lobbyName, setLobbyName] = useState(localStorage.getItem('lobbyName'));

  useEffect(() => {
    if (lobbyName) {
      localStorage.setItem('lobbyName', lobbyName);
    } else {
      localStorage.removeItem('lobbyName');
    }
  }, [lobbyName]);

  useEffect(() => {
    connection.sendMessage('lobby_list');

    let cachedLobbyId = localStorage.getItem('lobby_id');
    if (cachedLobbyId) {
      connection.sendMessage('lobby_join', { lobby_id: parseInt(cachedLobbyId) });
    }
  }, []);

  useHandlers(connection, [],
    ['lobby_update', ({ lobby_id, name, num_players, state }: LobbyUpdate) => {
      setLobbies(lobbies =>
        lobbies
          .filter((lobby) => lobby.id !== lobby_id)
          .concat({ id: lobby_id, name: name, num_players: num_players, state: state })
      );
    }],
    ['lobby_removed', ({ lobby_id }: LobbyRemoved) => {
      setLobbies(lobbies =>
        lobbies.filter((lobby) => lobby.id !== lobby_id)
      );
    }]
  );

  const handleDisconnect = () => {
    connection.disconnect();
  };

  const handleCreateLobby = function (event: SyntheticEvent) {
    event.preventDefault();
    if (lobbyName) {
      connection.sendMessage('lobby_make', { name: lobbyName });
    }
  };

  const handleClickJoin = (lobby_id: LobbyId) => {
    connection.sendMessage('lobby_join', { lobby_id });
  };

  return (
    <div>
      <h1>Welcome To The Waiting Area</h1>
      <div>
        <button onClick={handleDisconnect}>Disconnect</button>
      </div>
      <div>
        <form onSubmit={handleCreateLobby}>
          <label htmlFor="lobbyName">Lobby Name:</label>
          <input type="text" id="lobbyName" value={lobbyName || ''} onChange={e => setLobbyName(e.target.value)}></input>
          <button type="submit">Create Lobby</button>
        </form>
      </div>
      <div>{lobbies.map((lobby) => (
        <LobbyElement key={lobby.id} lobby={lobby} onClickJoin={handleClickJoin} />
      ))}</div>
    </div>
  );
}

export default WaitingArea;
