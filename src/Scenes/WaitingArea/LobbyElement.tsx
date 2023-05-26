import { GameManager } from '../../Messages/GameManager'
import { LobbyUpdate } from '../../Messages/ServerMessage'

export type LobbyElementProps = {
  lobby: LobbyUpdate,
  gameManager: GameManager
}

function LobbyElement({ lobby, gameManager }: LobbyElementProps) {
  return (
    <div>
    <div>{lobby.name}</div>
    <div>{lobby.lobby_id}</div>
    <div>{lobby.num_players}/8</div>
    <div>{lobby.state}</div>
    <button>join</button>
    </div>
  )
}

export default LobbyElement