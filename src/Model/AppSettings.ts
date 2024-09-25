import { GameOptions } from "../Scenes/Game/Model/GameUpdate";
import { boolConverter, intConverter, jsonConverter, stringConverter, useLocalStorage, useSessionStorage } from "../Utils/UseLocalStorage";

export function useSettings() {
    const [sessionId, setSessionId] = useSessionStorage('session_id', intConverter);

    const [username, setUsername] = useLocalStorage('username', stringConverter);
    const [propic, setPropic] = useLocalStorage('propic', stringConverter);
    const [lobbyName, setLobbyName] = useLocalStorage('lobby_name', stringConverter);
    const [gameOptions, setGameOptions] = useLocalStorage<GameOptions>('game_options', jsonConverter);
    const [muteSounds, setMuteSounds] = useLocalStorage('mute_sounds', boolConverter);

    return {
        sessionId, setSessionId,
        username, setUsername,
        propic, setPropic,
        lobbyName, setLobbyName,
        gameOptions, setGameOptions,
        muteSounds, setMuteSounds
    } as const;
}

export const MAX_USERNAME_LENGTH = 50;
export const MAX_LOBBY_NAME_LENGTH = 50;

type AppSettings = ReturnType<typeof useSettings>;

export default AppSettings;