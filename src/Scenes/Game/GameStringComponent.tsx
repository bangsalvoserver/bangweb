import { useContext, useMemo } from "react";
import getLabel from "../../Locale/GetLabel";
import { cardRegistry, gameStringRegistry } from "../../Locale/Registry";
import { LobbyContext, getUser } from "../Lobby/Lobby";
import { getUsername } from "../Lobby/LobbyUser";
import CardSignView from "./CardSignView";
import { GameTableContext } from "./GameScene";
import { CardSign } from "./Model/CardData";
import { findPlayer } from "./Model/GameTable";
import { FormatCardName, GameString } from "./Model/GameUpdate";
import "./Style/GameStringComponent.css";

export interface CardNameProps {
    name: string;
    sign?: CardSign;
}

export function LocalizedCardName({ name, sign }: CardNameProps): JSX.Element {
    const localizedName = name in cardRegistry ? cardRegistry[name] : name;
    if (sign && sign.rank !== 'none' && sign.suit !== 'none') {
        return (<span className="card-name">{localizedName} <span className="inline-block">(<CardSignView sign={sign} />)</span></span>);
    } else {
        return (<span className="card-name">{localizedName}</span>);
    }
}

export interface GameStringProps {
    message: GameString;
}

type GameStringFormatArg =
    { type: 'integer', value: number} |
    { type: 'card', value: FormatCardName | null } |
    { type: 'player', value: string | null };

export default function GameStringComponent({ message }: GameStringProps): JSX.Element {
    const table = useContext(GameTableContext);
    const { users } = useContext(LobbyContext);

    const formatArgs = useMemo<GameStringFormatArg[]>(() => message.format_args.map(arg => {
        if ('integer' in arg) {
            return { type: 'integer', value: arg.integer };
        } else if ('card' in arg) {
            if ('name' in arg.card) {
                return { type: 'card', value: arg.card as FormatCardName };
            } else {
                return { type: 'card', value: null };
            }
        } else if ('player' in arg) {
            if (arg.player) {
                const player = findPlayer(table.players, arg.player);
                const user = getUser(users, player.userid);
                return { type: 'player', value: getUsername(user) };
            } else {
                return { type: 'player', value: null }
            }
        }
        throw new Error('Invalid argument in format_args');
    }), [message, users, table.players]);

    if (message.format_str in gameStringRegistry) {
        const value = gameStringRegistry[message.format_str];
        if (typeof value === 'function') {
            return value(...formatArgs.map(arg => {
                switch (arg.type) {
                case 'integer':
                    return arg.value;
                case 'card':
                    if (arg.value) {
                        return <LocalizedCardName name={arg.value.name} sign={arg.value.sign} />
                    } else {
                        return <span className="card-name unknown-name">{getLabel('ui', 'UNKNOWN_CARD')}</span>
                    }
                case 'player':
                    if (arg.value) {
                        return <span className="player-name">{arg.value}</span>;
                    } else {
                        return <span className="player-name unknown-name">{getLabel('ui', 'UNKNOWN_PLAYER')}</span>
                    }
                default:
                    throw Error('Invalid formatArg type');
                }
            }));
        } else {
            return value;
        }
    } else {
        return <>{message.format_str}</>;
    }
}
