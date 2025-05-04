import getLabel from "../Locale/GetLabel";
import "./Style/PlayerIcon.css";

export interface PlayerIconProps {
    name: string;
}

export default function PlayerIcon({ name }: PlayerIconProps) {
    return <div className="player-icon-outer" title={getLabel('PlayerIcon', name)}>
        <div className={'player-icon ' + name} />
    </div>;
}