import { GameManager } from '../../Messages/GameManager'
import { LobbyState } from '../../Messages/ServerMessage'

export type LobbyValue = {
  id: number,
  name: string,
  num_players: number,
  state: LobbyState
}

export type LobbyElementProps = {
  lobby: LobbyValue,
  gameManager: GameManager
}

function LobbyElement({ lobby, gameManager }: LobbyElementProps) {
  const handleJoin = () => {
    gameManager.sendMessage('lobby_join', {lobby_id: lobby.id});
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