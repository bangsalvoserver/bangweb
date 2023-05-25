import React, { useEffect, useState } from 'react'
import LobbyElement from './LobbyElement';

function WaitingArea({ gameManager: gameManager }) {
  const [lobbies, setLobbies] = useState([]);
  

  useEffect(() => {
    if (!gameManager) return;
    let lobbyupdateHandler = gameManager.onMessage('lobby_update', (message) => {
      setLobbies(lobbies => lobbies.filter((lobby) => lobby.lobby_id !== message.lobby_id).concat(message));
    });
    let lobbyremoveHandler = gameManager.onMessage('lobby_removed', ({ lobby_id: lobby_id }) => {
      setLobbies(lobbies => lobbies.filter((lobby) => lobby.lobby_id !== lobby_id));
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
      {lobbies.map((lobby_data) => ( // Map over the lobbies array and render a Lobby component for each lobby
        <LobbyElement key={lobby_data.lobby_id} lobby={lobby_data} />
      ))}
    </div>
  )
}

export default WaitingArea