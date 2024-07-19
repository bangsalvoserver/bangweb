import getLabel from "../Locale/GetLabel";
import { ErrorState } from "../Model/SceneState";
import Button from "./Button";

export interface LobbyErrorProps {
    error?: ErrorState;
    clearError: () => void;
}

export default function ErrorPopup({ error, clearError }: LobbyErrorProps) {
    if (error) {
        return <div className="status-bar status-bar-error">
            {getLabel(error.type, error.message)}
            <Button color='red' onClick={clearError}>{getLabel('ui', 'BUTTON_OK')}</Button>
        </div>
    }
}