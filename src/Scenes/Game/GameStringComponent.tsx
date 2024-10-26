import { useContext } from "react";
import getLabel from "../../Locale/GetLabel";
import { cardRegistry, gameStringRegistry } from "../../Locale/Registry";
import { createUnionDispatch } from "../../Utils/UnionUtils";
import { LobbyContext, getUser } from "../Lobby/Lobby";
import { clipUsername } from "../Lobby/LobbyUser";
import CardSignView from "./CardSignView";
import { GameStateContext } from "./GameScene";
import { CardSign } from "./Model/CardData";
import { getPlayer } from "./Model/GameTable";
import { FormatArg, GameString, PlayerId } from "./Model/GameUpdate";
import "./Style/GameStringComponent.css";

export interface CardNameProps {
    name: string;
    sign?: CardSign;
}

export function getLocalizedCardName(name: string): string {
    return name in cardRegistry ? cardRegistry[name] : name;
}

export function LocalizedCardName({ name, sign }: CardNameProps): JSX.Element {
    const localizedName = getLocalizedCardName(name);
    if (sign && sign.rank !== 'none' && sign.suit !== 'none') {
        return <span className="card-name">{localizedName} <span className="inline-block">(<CardSignView sign={sign} />)</span></span>;
    } else {
        return <span className="card-name">{localizedName}</span>;
    }
}

export interface PlayerNameProps {
    id: PlayerId;
}

export function PlayerNameView({ id }: PlayerNameProps) {
    const { table } = useContext(GameStateContext);
    const { users } = useContext(LobbyContext);

    const player = getPlayer(table, id);
    const user = getUser(users, player.user_id);
    const username = clipUsername(user.username);
    
    return <span className="player-name">{username}</span>;
}

export interface GameStringProps {
    message: GameString;
}

const transformFormatArg = createUnionDispatch<FormatArg, number | JSX.Element>({
    integer: value => value,
    card: value => {
        if (value.name) {
            return <LocalizedCardName name={value.name} sign={value.sign} />
        } else {
            return <span className="card-name unknown-name">{getLabel('ui', 'UNKNOWN_CARD')}</span>
        }
    },
    player: value => {
        if (value) {
            return <PlayerNameView id={value} />
        } else {
            return <span className="player-name unknown-name">{getLabel('ui', 'UNKNOWN_PLAYER')}</span>
        }
    }
});

export default function GameStringComponent({ message }: GameStringProps) {
    if (message.format_str in gameStringRegistry) {
        const value = gameStringRegistry[message.format_str];
        if (typeof value === 'function') {
            return value(...message.format_args.map(transformFormatArg))
        } else {
            return value;
        }
    } else {
        return <>{message.format_str}</>;
    }
}
