export interface LobbyValue {
  id: number;
  name: string;
  num_players: number;
  state: string;
}

export interface LobbyElementProps {
  lobby: LobbyValue;
  onClickJoin: (lobby_id: number) => void;
}

function LobbyElement({ lobby, onClickJoin }: LobbyElementProps) {
  return (
    <div>
    <span>{lobby.name}</span>
    <span>{lobby.num_players}/8</span>
    <span>{lobby.state}</span>
    <button onClick={() => onClickJoin(lobby.id)}>Join</button>
    </div>
  )
}

export default LobbyElement