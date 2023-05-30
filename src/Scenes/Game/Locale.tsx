import { CardSign } from "../../Messages/CardData";
import { GameString } from "../../Messages/GameUpdate";
import { USERNAME_DISCONNECTED, UserValue } from "../Lobby/LobbyUser";
import { GameTable, getCard, getPlayer } from "./GameTable";

export const UNKNOWN_CARD = '(Unknown Card)';

export function formatString(formatStr: JSX.Element, args: JSX.Element[]): JSX.Element {
    // TODO
    return (<div><span>{formatStr}</span>{args.map((arg, index) => <span key={index}>{arg}</span>)}</div>);
}

export function localizeMessage(message: string): JSX.Element {
    // TODO
    return (<>{message}</>);
}

export interface CardNameProps {
    name?: string;
    sign?: CardSign;
}

export function LocalizedCardName({ name, sign }: CardNameProps): JSX.Element {
    // TODO
    if (name) {
        if (sign && sign.rank != 'none' && sign.suit != 'none') {
            return (<>
                {name}
                <img style={{display:'inline'}} src={`/cards/misc/${sign.rank}.png`}/>
                <img style={{display:'inline'}} src={`/cards/misc/suit_${sign.suit}.png`}/>
            </>);
        } else {
            return (<>{name}</>);
        }
    }
    return (<>{UNKNOWN_CARD}</>);
}

export interface GameStringProps {
    table: GameTable;
    users: UserValue[];
    message: GameString;
}

export function GameStringComponent({ table, users, message}: GameStringProps): JSX.Element {
    return formatString(localizeMessage(message.format_str), message.format_args.map(arg => {
        if ('integer' in arg) return (<>{arg.integer}</>)
        if ('card' in arg) return LocalizedCardName({name: arg.card.name, sign: arg.card.sign});
        if ('player' in arg) {
            const userid = getPlayer(table, arg.player)?.userid;
            return (<>{users.find(user => user.id === userid)?.name || USERNAME_DISCONNECTED}</>);
        }
        throw new Error('Invalid argument in format_args');
    }));
}