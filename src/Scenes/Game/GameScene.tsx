import { useEffect, useRef, useState } from "react";
import { GameManager } from "../../Messages/GameManager"
import { UserValue } from "../Lobby/LobbyUser"
import { LobbyAddUser, LobbyEntered, LobbyOwner, LobbyRemoveUser } from "../../Messages/ServerMessage";
import LobbyScene from "../Lobby/Lobby";
import WaitingArea from "../WaitingArea/WaitingArea";
import { deserializeImage } from "../../Messages/ImageSerial";
import { Game } from "./Game";

export interface GameSceneProps {
  gameManager: GameManager;
  users: UserValue[];
  owner?: number;
}

export default function GameScene({ gameManager, users, owner }: GameSceneProps) {
  const [lobbyUsers, setLobbyUsers] = useState(users);
  const [lobbyOwner, setLobbyOwner] = useState(owner);
  const myUserId = parseInt(localStorage.getItem('user_id') as string);

  const game = useRef<Game>();
  if (!game.current) {
    console.log('Created new Game instance');
    game.current = new Game(myUserId);
  }

  const gameUpdateHandlers = new Map<string, (message: any) => void>([
    ['game_error', game.current.handleGameError],
    ['game_log', game.current.handleGameLog],
    ['game_prompt', game.current.handleGamePrompt],
    ['add_cards', game.current.handleAddCards],
    ['remove_cards', game.current.handleRemoveCards],
    ['move_card', game.current.handleMoveCard],
    ['add_cubes', game.current.handleAddCubes],
    ['move_cubes', game.current.handleMoveCubes],
    ['move_scenario_deck', game.current.handleMoveScenarioDeck],
    ['move_train', game.current.handleMoveTrain],
    ['deck_shuffled', game.current.handleDeckShuffled],
    ['show_card', game.current.handleShowCard],
    ['hide_card', game.current.handleHideCard],
    ['tap_card', game.current.handleTapCard],
    ['flash_card', game.current.handleFlashCard],
    ['short_pause', game.current.handleShortPause],
    ['player_add', game.current.handlePlayerAdd],
    ['player_order', game.current.handlePlayerOrder],
    ['player_hp', game.current.handlePlayerHp],
    ['player_gold', game.current.handlePlayerGold],
    ['player_show_role', game.current.handlePlayerShowRole],
    ['player_status', game.current.handlePlayerStatus],
    ['switch_turn', game.current.handleSwitchTurn],
    ['request_status', game.current.handleRequestStatus],
    ['status_ready', game.current.handleStatusReady],
    ['game_flags', game.current.handleGameFlags],
    ['play_sound', game.current.handlePlaySound],
    ['status_clear', game.current.handleStatusClear],
  ]);

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
    ['game_update', (update: any) => {
      const updateType = Object.keys(update)[0];
      const handler = gameUpdateHandlers.get(updateType);
      if (handler) {
        console.log("Received game update type " + updateType);
        handler(update[updateType]);
      } else {
        console.warn("Received unknown game update type " + updateType);
      }
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