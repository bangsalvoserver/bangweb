import React, { useEffect, useState } from 'react'
import LobbyElement from './LobbyElement';

function WaitingArea(gameManager: any) {
  const [lobbies, setLobbies] = useState([]);
  

  useEffect(() => {
    if (!gameManager) return;
    let lobbyupdateHandler = gameManager.onMessage('lobby_update', (message: any) => {
      setLobbies(lobbies => lobbies.filter((lobby: any) => lobby.lobby_id !== message.lobby_id).concat(message));
    });
    let lobbyremoveHandler = gameManager.onMessage('lobby_removed', (lobby_id: any ) => {
      setLobbies(lobbies => lobbies.filter((lobby: any) => lobby.lobby_id !== lobby_id));
    });

    //cleanup
    return () => {
      gameManager.removeHandler(lobbyremoveHandler)
      gameManager.removeHandler(lobbyupdateHandler)
    }
  }, [gameManager]);

  return (
    <div>

      <h1> WELCOME TO WaitingArea</h1>
      {lobbies.map((lobby_data: any) => ( // Map over the lobbies array and render a Lobby component for each lobby

      //to typescritp
        <LobbyElement key={lobby_data.lobby_id} lobby={lobby_data} gameManager={gameManager} />
      ))}
    </div>
  )
}

export default WaitingArea