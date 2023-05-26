import { useEffect, useState } from "react";
import LobbyElement from "./LobbyElement";
import { LobbyRemoved, LobbyUpdate } from "../../Messages/ServerMessage";
import { SceneProps } from "../SceneProps";

function WaitingArea({ gameManager }: SceneProps) {
  const [lobbies, setLobbies] = useState<Array<LobbyUpdate>>([]);

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
    ];

    return () => gameManager.removeHandlers(handlers);
  });

  return (
    <div>
      <h1>Welcome To The Waiting Area</h1>
      {lobbies.map((lobby) => (
        <LobbyElement
          key={lobby.lobby_id}
          lobby={lobby}
          gameManager={gameManager}
        />
      ))}
    </div>
  );
}

export default WaitingArea;
