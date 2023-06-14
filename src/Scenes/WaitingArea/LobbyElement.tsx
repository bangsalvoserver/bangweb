import Button from "../../Components/Button";
import getLabel from "../../Locale/GetLabel";
import { LobbyId } from "../../Messages/ServerMessage";

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
    <div>
    <span>{lobby.name}</span>
    <span>{lobby.num_players}/8</span>
    <span>{getLabel('LobbyState', lobby.state)}</span>
    <Button color='green' onClick={() => onClickJoin(lobby.id)}>{getLabel('ui', 'BUTTON_JOIN')}</Button>
    </div>
  )
}

export default LobbyElement