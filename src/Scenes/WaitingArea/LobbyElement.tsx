import { GameManager } from '../../Messages/GameManager'
import { LobbyUpdate } from '../../Messages/ServerMessage'

export type LobbyElementProps = {
  lobby: LobbyUpdate,
  gameManager: GameManager
}

function LobbyElement({ lobby, gameManager }: LobbyElementProps) {
  const handleJoin = () => {
    gameManager.sendMessage('lobby_join', {lobby_id: lobby.lobby_id});
  };

  return (
    <div>
    <span>{lobby.name}</span>
    <span>{lobby.num_players}/8</span>
    <span>{lobby.state}</span>
    <button onClick={handleJoin}>Join</button>
    </div>
  )
}

export default LobbyElement