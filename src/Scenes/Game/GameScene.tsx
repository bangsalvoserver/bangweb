import { useEffect } from "react";
import { UserValue } from "../Lobby/LobbyUser";
import { Game } from "./Game";
import { getPlayer, Player, GameTable, getCard, Card } from "./GameTable";
import PlayerView from "./Components/PlayerView";
import { GameString, PlayerId } from "../../Messages/GameUpdate";
import { UserId } from "../../Messages/ServerMessage";
import { Connection } from "../../Messages/Connection";
import { GameStringComponent } from "./Locale";
import CardView from "./Components/CardView";

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
    let startTime = Date.now();
    const interval = setInterval(() => {
      let endTime = Date.now();
      game.tick(endTime - startTime);
      startTime = endTime;
    }, 1000 / FRAMERATE);
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

  const newGameStringComponent = (message: GameString, key?: number) => {
    return <GameStringComponent key={key} table={table} users={users} message={message} />
  };

  return (
    <>
      { showReturnButton() ? <button onClick={handleReturnLobby}>Return</button> : null }
      { table.status.request && 'status_text' in table.status.request ? newGameStringComponent(table.status.request.status_text) : null }
      { table.pockets.discard_pile.slice(-1).map(id => <CardView key={id} card={getCard(table, id) as Card} /> )}
      <div>{table.pockets.main_deck.length} cards in deck</div>
      { table.alive_players.map(newPlayerView) }
    </>
  );
}