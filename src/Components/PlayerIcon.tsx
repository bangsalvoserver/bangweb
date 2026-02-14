import { getLabel, useLanguage } from "../Locale/Registry";
import "./Style/PlayerIcon.css";

export interface PlayerIconProps {
    name: string;
}

export default function PlayerIcon({ name }: PlayerIconProps) {
    const language = useLanguage();
    return <div className="player-icon-outer" title={getLabel(language, 'PlayerIcon', name)}>
        <div className={'player-icon ' + name} />
    </div>;
}