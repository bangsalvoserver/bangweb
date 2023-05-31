import { REGISTRIES } from "./Registry";
import { CardSign } from "../Messages/CardData";
import { GameString } from "../Messages/GameUpdate";
import { UserValue } from "../Scenes/Lobby/LobbyUser";
import { GameTable, getPlayer } from "../Scenes/Game/GameTable";

const [cardRegistry, labelRegistry, gameStringRegistry] = (() => {
    const language = navigator.language;
    if (language in REGISTRIES) {
        return REGISTRIES[language];
    } else {
        return REGISTRIES['en'];
    }
})();

export function getLocalizedLabel(group: string, name: string) {
    if (group in labelRegistry) {
        const labelGroup = labelRegistry[group];
        if (name in labelGroup) {
            return labelGroup[name];
        }
    }
    return group + '.' + name;
}

export interface CardNameProps {
    name?: string;
    sign?: CardSign;
}

export function LocalizedCardName({ name, sign }: CardNameProps): JSX.Element {
    if (name) {
        const localizedName = name in cardRegistry ? cardRegistry[name] : name;
        if (sign && sign.rank != 'none' && sign.suit != 'none') {
            return (<>
                {localizedName} (
                <img style={{display:'inline'}} src={`/cards/misc/${sign.rank}.png`}/>
                <img style={{display:'inline'}} src={`/cards/misc/suit_${sign.suit}.png`}/>)
            </>);
        } else {
            return (<>{localizedName}</>);
        }
    }
    return (<>{getLocalizedLabel('ui', 'UNKNOWN_CARD')}</>);
}

export interface GameStringProps {
    table: GameTable;
    users: UserValue[];
    message: GameString;
}

export function GameStringComponent({ table, users, message}: GameStringProps): JSX.Element {
    const formatArgs = message.format_args.map(arg => {
        if ('integer' in arg) return (<>{arg.integer}</>)
        if ('card' in arg) return LocalizedCardName({name: arg.card.name, sign: arg.card.sign});
        if ('player' in arg) {
            const userid = getPlayer(table, arg.player)?.userid;
            return (<>{users.find(user => user.id === userid)?.name || getLocalizedLabel('ui', 'USERNAME_DISCONNECTED')}</>);
        }
        throw new Error('Invalid argument in format_args');
    });

    try {
        return gameStringRegistry[message.format_str](...formatArgs);
    } catch (e: any) {
        return (<>{message.format_str}</>);
    }
}