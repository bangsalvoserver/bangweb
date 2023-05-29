import { useEffect, useReducer, useRef, useState } from "react";
import { Connection, useHandlers } from "../../Messages/Connection"
import { UserValue } from "../Lobby/LobbyUser"
import { LobbyAddUser, LobbyEntered, LobbyOwner, LobbyRemoveUser } from "../../Messages/ServerMessage";
import LobbyScene from "../Lobby/Lobby";
import WaitingArea from "../WaitingArea/WaitingArea";
import { deserializeImage } from "../../Messages/ImageSerial";
import { Game } from "./Game";
import { newGameTable, getPlayer, Player, GameTable } from "./GameTable";
import PlayerView from "./Components/PlayerView";
import { handleGameUpdate } from "./GameUpdateHandler";

const FRAMERATE = 60;

export interface GameSceneProps {
  game: Game;
  table: GameTable;
  users: UserValue[];
}

export default function GameScene({ game, table, users }: GameSceneProps) {
  const myUserId = parseInt(localStorage.getItem('user_id') as string);

  useEffect(() => {
    const tickTime = 1000 / FRAMERATE;
    const interval = setInterval(() => game.tick(tickTime), tickTime);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {table.alive_players.map(player_id => (
        <PlayerView key={player_id} table={table} users={users} player={getPlayer(table, player_id) as Player} />
      ))}
    </>
  );
}