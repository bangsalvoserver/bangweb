import { GameOptions } from "../Scenes/Game/Model/GameUpdate";
import { intConverter, jsonConverter, stringConverter, useLocalStorage, useSessionStorage } from "../Utils/UseLocalStorage";

export function useSettings() {
    const [sessionId, setSessionId] = useSessionStorage('session_id', intConverter);
    const [username, setUsername] = useLocalStorage('username', stringConverter);
    const [propic, setPropic] = useLocalStorage('propic', stringConverter);
    const [lobbyName, setLobbyName] = useLocalStorage('lobby_name', stringConverter);
    const [gameOptions, setGameOptions] = useLocalStorage<GameOptions>('game_options', jsonConverter);

    return {
        sessionId, setSessionId,
        username, setUsername,
        propic, setPropic,
        lobbyName, setLobbyName,
        gameOptions, setGameOptions
    } as const;
}

type AppSettings = ReturnType<typeof useSettings>;

export default AppSettings;