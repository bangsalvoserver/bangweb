import { MutableRefObject, SyntheticEvent, useEffect, useRef, useState } from "react";
import LobbyElement, { LobbyValue } from "./LobbyElement";
import { LobbyEntered, LobbyRemoved, LobbyUpdate } from "../../Messages/ServerMessage";
import { GameManager } from "../../Messages/GameManager";
import { SceneType } from "../SceneType";

type WaitingAreaProps = {
  gameManager: GameManager,
  myUserId: number
};

function WaitingArea({ gameManager, myUserId }: WaitingAreaProps) {
  const [lobbies, setLobbies] = useState([] as LobbyValue[]);
  const lobby_name = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    gameManager.sendMessage("lobby_list", {});

    let handlers = [
      gameManager.onMessage("lobby_update", ({ lobby_id, name, num_players, state }: LobbyUpdate) => {
        setLobbies(lobbies =>
          lobbies
            .filter((lobby) => lobby.id !== lobby_id)
            .concat({ id: lobby_id, name: name, num_players: num_players, state: state })
        );
      }),
      gameManager.onMessage("lobby_removed", ({ lobby_id }: LobbyRemoved) => {
        setLobbies(lobbies =>
          lobbies.filter((lobby) => lobby.id !== lobby_id)
        );
      }),
      gameManager.onMessage('lobby_entered', ({ name }: LobbyEntered) => {
        gameManager.changeScene(SceneType.Lobby, { lobbyName: name, myUserId: myUserId });
      })
    ];

    return () => gameManager.removeHandlers(handlers);
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
        <LobbyElement
          key={lobby.id}
          lobby={lobby}
          gameManager={gameManager}
        />
      ))}</div>
    </div>
  );
}

export default WaitingArea;
