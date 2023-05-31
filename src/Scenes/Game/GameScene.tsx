import { useEffect } from "react";
import { Connection } from "../../Messages/Connection";
import { GameString, PlayerId } from "../../Messages/GameUpdate";
import { UserId } from "../../Messages/ServerMessage";
import { UserValue } from "../Lobby/LobbyUser";
import { GameStringComponent } from "../../Locale/Locale";
import CardView from "./Components/CardView";
import PlayerView from "./Components/PlayerView";
import { Game } from "./Game";
import { Card, GameTable, Player, getCard, getPlayer } from "./GameTable";

const FRAMERATE = 60;

export interface GameSceneProps {
  connection: Connection;
  game: Game;
  table: GameTable;
  logs: GameString[];
  users: UserValue[];
  lobbyOwner?: UserId;
}

export default function GameScene({ connection, game, table, logs, users, lobbyOwner }: GameSceneProps) {
  useEffect(() => {
    let startTime = Date.now();
    const interval = setInterval(() => {
      let endTime = Date.now();
      game.tick(endTime - startTime);
      startTime = endTime;
    }, 1000 / FRAMERATE);
    return () => clearInterval(interval);
  }, []);

  const newPlayerView = (player_id: PlayerId) => {
    const player = getPlayer(table, player_id);
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

  const newGameStringComponent = (message: GameString, key?: number) => {
    return <GameStringComponent key={key} table={table} users={users} message={message} />
  };

  return (
    <>
      { showReturnButton() ? <button onClick={handleReturnLobby}>Return</button> : null }
      { table.status.request && 'status_text' in table.status.request ? newGameStringComponent(table.status.request.status_text) : null }
      { table.pockets.discard_pile.slice(-1).map(id => <CardView key={id} card={getCard(table, id)} /> )}
      <div>{table.pockets.main_deck.length} cards in deck</div>
      { table.alive_players.map(newPlayerView) }
    </>
  );
}