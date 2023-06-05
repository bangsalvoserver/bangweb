import { useContext } from "react";
import getLabel from "../../Locale/GetLabel";
import { cardRegistry, gameStringRegistry } from "../../Locale/Registry";
import { CardSign } from "./Model/CardData";
import { GameString } from "./Model/GameUpdate";
import { LobbyContext } from "../Lobby/Lobby";
import { getUsername } from "../Lobby/LobbyUser";
import CardSignView from "./CardSignView";
import { GameTableContext } from "./GameScene";
import { getPlayer } from "./Model/GameTable";
import "./Style/GameStringComponent.css"

export interface CardNameProps {
    name: string;
    sign?: CardSign;
}

export function LocalizedCardName({ name, sign }: CardNameProps): JSX.Element {
    const localizedName = name in cardRegistry ? cardRegistry[name] : name;
    if (sign && sign.rank != 'none' && sign.suit != 'none') {
        return (<span className="card-name">{localizedName} (<CardSignView sign={sign} />)</span>);
    } else {
        return (<span className="card-name">{localizedName}</span>);
    }
}

export interface GameStringProps {
    message: GameString;
}

export default function GameStringComponent({ message }: GameStringProps): JSX.Element {
    const table = useContext(GameTableContext);
    const { users } = useContext(LobbyContext);

    if (message.format_str in gameStringRegistry) {
        const value = gameStringRegistry[message.format_str];
        if (typeof value == 'function') {
            return value(...message.format_args.map(arg => {
                if ('integer' in arg) {
                    return <>{arg.integer}</>;
                } else if ('card' in arg) {
                    if ('name' in arg.card) {
                        return <LocalizedCardName name={arg.card.name} sign={arg.card.sign} />;
                    } else {
                        return <span className="card-name unknown-name">{getLabel('ui', 'UNKNOWN_CARD')}</span>;
                    }
                } else if ('player' in arg) {
                    if (arg.player) {
                        const userid = getPlayer(table, arg.player).userid;
                        const user = users.find(user => user.id === userid);
                        return <span className="player-name">{getUsername(user)}</span>;
                    } else {
                        return <span className="player-name unknown-name">{getLabel('ui', 'UNKNOWN_PLAYER')}</span>;
                    }
                }
                throw new Error('Invalid argument in format_args');
            }));
        } else {
            return value;
        }
    } else {
        return <>{message.format_str}</>;
    }
}
