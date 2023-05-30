import { useEffect } from "react";
import { UserValue } from "../Lobby/LobbyUser";
import { Game } from "./Game";
import { getPlayer, Player, GameTable } from "./GameTable";
import PlayerView from "./Components/PlayerView";
import { PlayerId } from "../../Messages/GameUpdate";
import { UserId } from "../../Messages/ServerMessage";
import { Connection } from "../../Messages/Connection";
import { evaluateGameString, localizeMessage } from "./Locale";

const FRAMERATE = 60;

export interface GameSceneProps {
  connection: Connection;
  game: Game;
  table: GameTable;
  users: UserValue[];
  lobbyOwner?: UserId;
}

export default function GameScene({ connection, game, table, users, lobbyOwner }: GameSceneProps) {
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

  const showReturnButton = () => {
    return table.myUserId == lobbyOwner
      && table.status.flags.includes('game_over');
  };

  const handleReturnLobby = () => connection.sendMessage('lobby_return');

  return (
    <>
      { showReturnButton() ? <button onClick={handleReturnLobby}>Return</button> : null }
      { table.status.request && 'status_text' in table.status.request ?
        <div>{evaluateGameString(table, users, table.status.request.status_text)}</div> : null}
      { table.alive_players.map(newPlayerView) }
    </>
  );
}