import { MutableRefObject, SyntheticEvent, useEffect, useRef, useState } from "react";
import LobbyElement from "./LobbyElement";
import { LobbyEntered, LobbyRemoved, LobbyUpdate } from "../../Messages/ServerMessage";
import { SceneProps } from "../SceneProps";

function WaitingArea({ gameManager }: SceneProps) {
  const [lobbies, setLobbies] = useState<Array<LobbyUpdate>>([]);
  const lobby_name = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    gameManager.sendMessage("lobby_list", {});

    let handlers = [
      gameManager.onMessage("lobby_update", (message: LobbyUpdate) => {
        setLobbies((lobbies) =>
          lobbies
            .filter((lobby) => lobby.lobby_id !== message.lobby_id)
            .concat(message)
        );
      }),
      gameManager.onMessage("lobby_removed", ({ lobby_id }: LobbyRemoved) => {
        setLobbies((lobbies) =>
          lobbies.filter((lobby) => lobby.lobby_id !== lobby_id)
        );
      }),
      gameManager.onMessage('lobby_entered', ({ name }: LobbyEntered) => {
        console.log("Entered lobby " + name);
        // TODO go to lobby scene
      })
    ];

    return () => gameManager.removeHandlers(handlers);
  });

  const handleDisconnect = () => {
    gameManager.disconnect();
  };

  const handleCreateLobby = function(event: SyntheticEvent) {
    event.preventDefault();
    if (lobby_name.current.value) {
      gameManager.sendMessage('lobby_make', {name: lobby_name.current.value});
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
          key={lobby.lobby_id}
          lobby={lobby}
          gameManager={gameManager}
        />
      ))}</div>
    </div>
  );
}

export default WaitingArea;
