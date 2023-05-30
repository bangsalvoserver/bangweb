import { CardSign } from "../../Messages/CardData";
import { GameString } from "../../Messages/GameUpdate";
import { USERNAME_DISCONNECTED, UserValue } from "../Lobby/LobbyUser";
import { GameTable, getCard, getPlayer } from "./GameTable";

export const UNKNOWN_CARD = '(Unknown Card)';

export function formatString(formatStr: string, args: string[]): string {
    // TODO
    return formatStr + " : " + args.join(" , ");
}

export function localizeMessage(message: string): string {
    // TODO
    return message;
}

export function localizeCardName(name?: string, sign?: CardSign): string {
    // TODO
    if (name) {
        if (sign && sign.rank != 'none' && sign.suit != 'none') {
            return name + ' ' + sign.rank + ' ' + sign.suit;
        } else {
            return name;
        }
    }
    return UNKNOWN_CARD;
}

export function evaluateGameString(table: GameTable, users: UserValue[], message: GameString): string {
    return formatString(localizeMessage(message.format_str), message.format_args.map(arg => {
        if ('integer' in arg) return arg.integer.toString();
        if ('card' in arg) return localizeCardName(arg.card.name, arg.card.sign);
        if ('player' in arg) {
            const userid = getPlayer(table, arg.player)?.userid;
            return users.find(user => user.id === userid)?.name || USERNAME_DISCONNECTED;
        }
        throw new Error('Invalid argument in format_args');
    }));
}