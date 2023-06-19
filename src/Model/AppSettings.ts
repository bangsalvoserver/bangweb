import { Dispatch, useEffect, useState } from "react";
import { LobbyId, UserId } from "../Messages/ServerMessage";
import { GameOptions } from "../Scenes/Game/Model/GameUpdate";

interface Converter<T> {
    fromString: (str: string) => T;
    toString: (value: T) => string;
}

const stringConverter: Converter<string> = { fromString: str => str, toString : str => str };
const intConverter: Converter<number> = { fromString: parseInt, toString: value => value.toString() };
const jsonConverter: Converter<any> = { fromString: JSON.parse, toString: JSON.stringify };

function useLocalStorage<T>(key: string, converter: Converter<T>) {
    const [value, setValue] = useState(() => {
        const stringValue = localStorage.getItem(key);
        if (stringValue) {
            return converter.fromString(stringValue);
        }
    });
    useEffect(() => {
        if (value) {
            localStorage.setItem(key, converter.toString(value));
        } else {
            localStorage.removeItem(key);
        }
    }, [value]);
    return [value, setValue] as const;
}

export default interface AppSettings {
    myUserId?: UserId;
    myLobbyId?: LobbyId;
    username: string;
    propic: string | null;
    lobbyName?: string;
    gameOptions?: GameOptions;
}

export type SettingsUpdate =
    { setMyUserId: UserId | undefined } |
    { setMyLobbyId: UserId | undefined } |
    { setUsername: string } |
    { setPropic: string | null } |
    { setLobbyName: string | undefined } |
    { setGameOptions: GameOptions | undefined };

export function useSettings() {
    const [myUserId, setMyUserId] = useLocalStorage('user_id', intConverter);
    const [myLobbyId, setMyLobbyId] = useLocalStorage('lobby_id', intConverter);
    const [username, setUsername] = useLocalStorage('username', stringConverter);
    const [propic, setPropic] = useLocalStorage('propic', stringConverter);
    const [lobbyName, setLobbyName] = useLocalStorage('lobby_name', stringConverter);
    const [gameOptions, setGameOptions] = useLocalStorage<GameOptions>('game_options', jsonConverter);

    const settings: AppSettings = {
        myUserId: myUserId,
        myLobbyId: myLobbyId,
        username: username ?? '',
        propic: propic ?? null,
        lobbyName: lobbyName,
        gameOptions: gameOptions
    };

    const settingsDispatch = (update: SettingsUpdate) => {
        if ('setMyUserId' in update) {
            setMyUserId(update.setMyUserId);
        } else if ('setMyLobbyId' in update) {
            setMyLobbyId(update.setMyLobbyId);
        } else if ('setUsername' in update) {
            setUsername(update.setUsername);
        } else if ('setPropic' in update) {
            setPropic(update.setPropic ?? undefined);
        } else if ('setLobbyName' in update) {
            setLobbyName(update.setLobbyName);
        } else if ('setGameOptions' in update) {
            setGameOptions(update.setGameOptions);
        }
    };

    return [settings, settingsDispatch] as const;
}