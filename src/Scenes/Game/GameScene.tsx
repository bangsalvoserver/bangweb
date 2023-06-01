import { useEffect } from "react";
import { Connection } from "../../Messages/Connection";
import { GameString, PlayerId } from "../../Messages/GameUpdate";
import { UserId } from "../../Messages/ServerMessage";
import { UserValue } from "../Lobby/LobbyUser";
import { GameStringComponent } from "../../Locale/Locale";
import PlayerView from "./Components/PlayerView";
import { Game } from "./Game";
import {  GameTable, Player, getCard, getPlayer } from "./GameTable";
import TableView from "./Components/TableView";
import { AnimationState } from "./GameAnimation";

const FRAMERATE = 60;

export interface GameSceneProps {
  connection: Connection;
  game: Game;
  table: GameTable;
  animation?: AnimationState;
  logs: GameString[];
  users: UserValue[];
  lobbyOwner?: UserId;
}

export default function GameScene({ connection, game, table, animation, logs, users, lobbyOwner }: GameSceneProps) {
  useEffect(() => {
    let startTime = Date.now();
    const interval = setInterval(() => {
      let endTime = Date.now();
      game.tick(endTime - startTime);
      startTime = endTime;
    }, 1000 / FRAMERATE);
    return () => clearInterval(interval);
  }, []);

  const showReturnButton = () => {
    return table.myUserId == lobbyOwner
      && table.status.flags.includes('game_over');
  };

  const handleReturnLobby = () => connection.sendMessage('lobby_return');

  return (
    <div>
      { showReturnButton() ? <button onClick={handleReturnLobby}>Return</button> : null }
      <TableView table={table} animation={animation} users={users} />
    </div>
  );
}