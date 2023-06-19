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
    setMyUserId: Dispatch<UserId | undefined>;

    myLobbyId?: LobbyId;
    setMyLobbyId: Dispatch<LobbyId | undefined>;

    username: string;
    setUsername: Dispatch<string>;

    propic: string | null;
    setPropic: Dispatch<string | null>;

    lobbyName?: string;
    setLobbyName: Dispatch<LobbyId | undefined>;

    gameOptions?: GameOptions;
    setGameOptions: Dispatch<GameOptions | undefined>;
}

export function useSettings() {
    const [myUserId, setMyUserId] = useLocalStorage('user_id', intConverter);
    const [myLobbyId, setMyLobbyId] = useLocalStorage('lobby_id', intConverter);
    const [username, setUsername] = useLocalStorage('username', stringConverter);
    const [propic, setPropic] = useLocalStorage('propic', stringConverter);
    const [lobbyName, setLobbyName] = useLocalStorage('lobby_name', stringConverter);
    const [gameOptions, setGameOptions] = useLocalStorage<GameOptions>('game_options', jsonConverter);

    return {
        myUserId, setMyUserId,
        myLobbyId, setMyLobbyId,
        username: username ?? '',
        setUsername,
        propic: propic ?? null,
        setPropic,
        lobbyName, setLobbyName
        gameOptions, setGameOptions
    };
}