import getLabel from "../Locale/GetLabel";
import Button from "./Button";

export interface LobbyErrorProps {
    message?: string;
    clearLobbyError: () => void;
}

export default function LobbyError({ message, clearLobbyError }: LobbyErrorProps) {
    if (message) {
        return <div className="status-bar status-bar-error">
            {getLabel('lobby', message)}
            <Button color='red' onClick={clearLobbyError}>{getLabel('ui', 'BUTTON_OK')}</Button>
        </div>
    }
}