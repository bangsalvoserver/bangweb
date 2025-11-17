import { useContext } from "react";
import getLabel from "../../Locale/GetLabel";
import { CardRegistryEntry, getRegistries, useLanguage } from "../../Locale/Registry";
import { Language } from "../../Model/Env";
import { createUnionDispatch } from "../../Utils/UnionUtils";
import { getUser, LobbyContext } from "../Lobby/Lobby";
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

export function getCardRegistryEntry(language: Language, name: string): CardRegistryEntry {
    const { cardRegistry } = getRegistries(language);
    if (name in cardRegistry) {
        return cardRegistry[name];
    }
    return { name, hideTitle: true };
}

export function LocalizedCardName({ name, sign }: CardNameProps): JSX.Element {
    const language = useLanguage();
    const localizedName = getCardRegistryEntry(language, name).name;
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
    const language = useLanguage();

    const player = getPlayer(table, id);
    const user = getUser(users, player.user_id);
    const username = clipUsername(language, user.username);
    
    return <span className="player-name">{username}</span>;
}

export interface GameStringProps {
    message: GameString;
}

function LocalizedCardNameOrUnknown({ name, sign }: { name?: string, sign?: CardSign }) {
    const language = useLanguage();
    if (name) {
        return <LocalizedCardName name={name} sign={sign} />
    } else {
        return <span className="card-name unknown-name">{getLabel(language, 'ui', 'UNKNOWN_CARD')}</span>
    }
}

function PlayerNameViewOrUnknown({ id }: { id: PlayerId }) {
    const language = useLanguage();
    if (id) {
        return <PlayerNameView id={id} />
    } else {
        return <span className="player-name unknown-name">{getLabel(language, 'ui', 'UNKNOWN_PLAYER')}</span>
    }
}

const transformFormatArg = createUnionDispatch<FormatArg, number | JSX.Element>({
    integer: value => value,
    card: ({ name, sign }) => <LocalizedCardNameOrUnknown name={name} sign={sign} />,
    player: id => <PlayerNameViewOrUnknown id={id} />
});

export default function GameStringComponent({ message }: GameStringProps) {
    const language = useLanguage();
    const { gameStringRegistry } = getRegistries(language);

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
