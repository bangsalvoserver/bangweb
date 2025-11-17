import getLabel from "../Locale/GetLabel";
import { useLanguage } from "../Locale/Registry";
import { ErrorState } from "../Model/SceneState";
import Button from "./Button";

export interface LobbyErrorProps {
    error?: ErrorState;
    clearError: () => void;
}

export default function ErrorPopup({ error, clearError }: LobbyErrorProps) {
    const language = useLanguage();
    if (error) {
        return <div className="status-bar status-bar-error">
            {getLabel(language, error.type, error.message)}
            {error.type === 'server' && error.code !== null && <> {getLabel(language, 'server', 'ERROR_CODE', error.code.toString())}</>}
            <Button color='red' onClick={clearError}>{getLabel(language, 'ui', 'BUTTON_OK')}</Button>
        </div>
    }
}