import { useEffect, useReducer, useRef, useState } from "react";
import { GameManager, useHandlers } from "../../Messages/GameManager"
import { UserValue } from "../Lobby/LobbyUser"
import { LobbyAddUser, LobbyEntered, LobbyOwner, LobbyRemoveUser } from "../../Messages/ServerMessage";
import LobbyScene from "../Lobby/Lobby";
import WaitingArea from "../WaitingArea/WaitingArea";
import { deserializeImage } from "../../Messages/ImageSerial";
import { Game } from "./Game";
import { newGameTable, getPlayer, Player } from "./GameTable";
import PlayerView from "./Components/PlayerView";
import { handleGameUpdate } from "./GameUpdateHandler";

const FRAMERATE = 60;

export interface GameSceneProps {
  gameManager: GameManager;
  users: UserValue[];
  owner?: number;
}

export default function GameScene({ gameManager, users, owner }: GameSceneProps) {
  const [lobbyUsers, setLobbyUsers] = useState(users);
  const [lobbyOwner, setLobbyOwner] = useState(owner);
  const myUserId = parseInt(localStorage.getItem('user_id') as string);

  const [table, tableDispatch] = useReducer(handleGameUpdate, null, newGameTable);

  const game = useRef<Game>();
  if (!game.current) {
    game.current = new Game(tableDispatch);
  }

  useEffect(() => {
    const tickTime = 1000 / FRAMERATE;
    const interval = setInterval(() => game.current?.tick(tickTime), tickTime);
    return () => clearInterval(interval);
  }, []);

  useHandlers(gameManager, [],
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
    ['game_update', (update: any) => {
      game.current?.pushUpdate(update);
    }]
  );

  const handleLeaveLobby = () => {
    gameManager.sendMessage('lobby_leave');
  };

  return (
    <div>
      <h1>Game Scene</h1>
      <div>
        <button onClick={handleLeaveLobby}>Exit Game</button>
      </div>
      <div>
        {table.alive_players.map(player_id => (
          <PlayerView key={player_id} table={table} users={lobbyUsers} player={getPlayer(table, player_id) as Player} />
        ))}
      </div>
    </div>
  );
}