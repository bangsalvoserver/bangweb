import { useEffect } from "react";
import { UserValue } from "../Lobby/LobbyUser";
import { Game } from "./Game";
import { getPlayer, Player, GameTable } from "./GameTable";
import PlayerView from "./Components/PlayerView";
import { PlayerId } from "../../Messages/GameUpdate";

const FRAMERATE = 60;

export interface GameSceneProps {
  game: Game;
  table: GameTable;
  users: UserValue[];
}

export default function GameScene({ game, table, users }: GameSceneProps) {
  useEffect(() => {
    const tickTime = 1000 / FRAMERATE;
    const interval = setInterval(() => game.tick(tickTime), tickTime);
    return () => clearInterval(interval);
  }, []);

  const newPlayerView = (player_id: PlayerId) => {
    const player = getPlayer(table, player_id) as Player;
    const user = users.find(user => user.id === player.userid);
    
    return (
      <PlayerView key={player_id} table={table} user={user} player={player} />
    );
  };

  return (
    <>
      {table.alive_players.map(newPlayerView)}
    </>
  );
}