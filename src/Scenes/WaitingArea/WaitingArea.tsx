import { MutableRefObject, SyntheticEvent, useEffect, useRef, useState } from "react";
import LobbyElement, { LobbyValue } from "./LobbyElement";
import { LobbyEntered, LobbyRemoved, LobbyUpdate } from "../../Messages/ServerMessage";
import { GameManager } from "../../Messages/GameManager";
import LobbyScene from "../Lobby/Lobby";

type WaitingAreaProps = {
  gameManager: GameManager,
  myUserId: number
};

function WaitingArea({ gameManager, myUserId }: WaitingAreaProps) {
  const [lobbies, setLobbies] = useState([] as LobbyValue[]);
  const lobby_name = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    gameManager.sendMessage("lobby_list");

    return gameManager.addHandlers([
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
      }],
      ['lobby_entered', ({ name, options }: LobbyEntered) => {
        gameManager.changeScene(<LobbyScene gameManager={gameManager} name={name} options={options} myUserId={myUserId} />);
      }]
    ]);
  });

  const handleDisconnect = () => {
    gameManager.disconnect();
  };

  const handleCreateLobby = function (event: SyntheticEvent) {
    event.preventDefault();
    if (lobby_name.current.value) {
      gameManager.sendMessage('lobby_make', { name: lobby_name.current.value });
    }
  };

  const handleClickJoin = (lobby_id: number) => {
    gameManager.sendMessage('lobby_join', { lobby_id });
  };

  return (
    <div>
      <h1>Welcome To The Waiting Area</h1>
      <div>
        <button onClick={handleDisconnect}>Disconnect</button>
      </div>
      <div>
        <form onSubmit={handleCreateLobby}>
          <label htmlFor="lobby_name">Lobby Name:</label>
          <input type="text" id="lobby_name" ref={lobby_name}></input>
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
