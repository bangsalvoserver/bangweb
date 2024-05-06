import Button from "../../Components/Button";
import getLabel from "../../Locale/GetLabel";
import { LobbyId } from "../../Model/ServerMessage";

export interface LobbyValue {
  id: LobbyId;
  name: string;
  num_players: number;
  num_spectators: number;
  max_players: number;
  state: string;
}

export interface LobbyElementProps {
  lobby: LobbyValue;
  onClickJoin: (lobby_id: LobbyId) => void;
}

function LobbyElement({ lobby: { id, name, num_players, num_spectators, max_players, state }, onClickJoin }: LobbyElementProps) {
  const numPlayersStatus = `${num_players}/${max_players}` + (num_spectators > 0 ? `+${num_spectators}` : '');
  return (
    <div className="lobby-element">
      <div>{name}</div>
      <div>{numPlayersStatus}</div>
      <div>{getLabel('LobbyState', state)}</div>
      <div><Button color='green' onClick={() => onClickJoin(id)}>{getLabel('ui', 'BUTTON_JOIN')}</Button></div>
    </div>
  )
}

export default LobbyElement