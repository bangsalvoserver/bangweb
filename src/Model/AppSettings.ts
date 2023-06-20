import { Dispatch, SetStateAction } from "react";
import { LobbyId, UserId } from "../Messages/ServerMessage";
import { GameOptions } from "../Scenes/Game/Model/GameUpdate";
import { intConverter, jsonConverter, stringConverter, useLocalStorage } from "../Utils/UseLocalStorage";

type Setter<T> = Dispatch<SetStateAction<T | undefined>>;

export default interface AppSettings {
    myUserId?: UserId;
    setMyUserId: Setter<UserId>;

    myLobbyId?: LobbyId;
    setMyLobbyId: Setter<LobbyId>;

    username?: string;
    setUsername: Setter<string>;

    propic?: string;
    setPropic: Setter<string>;

    lobbyName?: string;
    setLobbyName: Setter<string>;

    gameOptions?: GameOptions;
    setGameOptions: Setter<GameOptions>;
}

export function useSettings(): AppSettings {
    const [myUserId, setMyUserId] = useLocalStorage('user_id', intConverter);
    const [myLobbyId, setMyLobbyId] = useLocalStorage('lobby_id', intConverter);
    const [username, setUsername] = useLocalStorage('username', stringConverter);
    const [propic, setPropic] = useLocalStorage('propic', stringConverter);
    const [lobbyName, setLobbyName] = useLocalStorage('lobby_name', stringConverter);
    const [gameOptions, setGameOptions] = useLocalStorage<GameOptions>('game_options', jsonConverter);

    return {
        myUserId, setMyUserId,
        myLobbyId, setMyLobbyId,
        username, setUsername,
        propic, setPropic,
        lobbyName, setLobbyName,
        gameOptions, setGameOptions
    };
}