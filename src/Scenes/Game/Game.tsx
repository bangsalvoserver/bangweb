import { useEffect, useState } from "react";
import { GameManager } from "../../Messages/GameManager"
import { UserValue } from "../Lobby/LobbyUser"
import { LobbyAddUser, LobbyEntered, LobbyOwner, LobbyRemoveUser } from "../../Messages/ServerMessage";
import LobbyScene from "../Lobby/Lobby";
import WaitingArea from "../WaitingArea/WaitingArea";
import { GameUpdate } from "../../Messages/GameUpdate";
import { deserializeImage } from "../../Messages/ImageSerial";

type GameSceneProps = {
  gameManager: GameManager,
  users: UserValue[],
  owner?: number
};

export default function GameScene({ gameManager, users, owner }: GameSceneProps) {
  const [lobbyUsers, setLobbyUsers] = useState(users);
  const [lobbyOwner, setLobbyOwner] = useState(owner);
  const myUserId = parseInt(localStorage.getItem('user_id') as string);

  const handleGameUpdate = (update: GameUpdate) => {
    // TODO
    console.log(update);
  };

  useEffect(() => gameManager.addHandlers([
    ['lobby_entered', ({ name, options}: LobbyEntered) => {
      gameManager.changeScene(<LobbyScene gameManager={gameManager} name={name} options={options} />);
    }],
    ['lobby_add_user', ({ user_id, user: {name, profile_image} }: LobbyAddUser) => {
      setLobbyUsers(users =>
        users.filter(user => user.id !== user_id).concat({ id: user_id, name, propic: deserializeImage(profile_image) })
      );
    }],
    ['lobby_remove_user', ({ user_id }: LobbyRemoveUser) => {
      if (user_id === myUserId) {
        localStorage.removeItem('lobby_id');
        gameManager.changeScene(<WaitingArea gameManager={gameManager} />);
      } else {
        setLobbyUsers(users =>
          users.filter(user => user.id !== user_id)
        );
      }
    }],
    ['lobby_owner', ({ id }: LobbyOwner) => {
      setLobbyOwner(id);
    }],
    ['game_update', (update: GameUpdate) => {
      handleGameUpdate(update);
    }]
  ]), [gameManager]);

  const handleLeaveLobby = () => {
    gameManager.sendMessage('lobby_leave');
  };

  return (
    <div>
      <h1>Game Scene</h1>
      <div>
        <button onClick={handleLeaveLobby}>Exit Game</button>
      </div>
    </div>
  );
}