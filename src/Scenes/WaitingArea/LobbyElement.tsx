import Button from "../../Components/Button";
import getLabel from "../../Locale/GetLabel";
import { LobbyId } from "../../Model/ServerMessage";

export interface LobbyValue {
  id: LobbyId;
  name: string;
  num_players: number;
  state: string;
}

export interface LobbyElementProps {
  lobby: LobbyValue;
  onClickJoin: (lobby_id: LobbyId) => void;
}

function LobbyElement({ lobby, onClickJoin }: LobbyElementProps) {
  return (
    <div className="lobby-element">
      <div>{lobby.name}</div>
      <div>{lobby.num_players}/8</div>
      <div>{getLabel('LobbyState', lobby.state)}</div>
      <div><Button color='green' onClick={() => onClickJoin(lobby.id)}>{getLabel('ui', 'BUTTON_JOIN')}</Button></div>
    </div>
  )
}

export default LobbyElement