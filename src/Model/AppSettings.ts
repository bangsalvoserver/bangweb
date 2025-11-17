import { GameOptions } from "../Scenes/Game/Model/GameUpdate";
import { boolConverter, Converter, intConverter, jsonConverter, stringConverter, useLocalStorage, useSessionStorage } from "../Utils/UseLocalStorage";
import { Language } from "./Env";

export function useSettings() {
    const [sessionId, setSessionId] = useSessionStorage('session_id', intConverter);

    const [username, setUsername] = useLocalStorage('username', stringConverter);
    const [propic, setPropic] = useLocalStorage('propic', stringConverter);
    const [lobbyName, setLobbyName] = useLocalStorage('lobby_name', stringConverter);
    const [expandLobbyOptions, setExpandLobbyOptions] = useLocalStorage('expand_lobby_options', boolConverter);  
    const [lobbyPassword, setLobbyPassword] = useLocalStorage('lobby_password', stringConverter);
    const [gameOptions, setGameOptions] = useLocalStorage<GameOptions>('game_options', jsonConverter);
    const [muteSounds, setMuteSounds] = useLocalStorage('mute_sounds', boolConverter);
    const [language, setLanguage] = useLocalStorage('language', stringConverter as Converter<Language>);

    return {
        sessionId, setSessionId,
        username, setUsername,
        propic, setPropic,
        lobbyName, setLobbyName,
        expandLobbyOptions, setExpandLobbyOptions,
        lobbyPassword, setLobbyPassword,
        gameOptions, setGameOptions,
        muteSounds, setMuteSounds,
        language, setLanguage
    } as const;
}

export const MAX_USERNAME_LENGTH = 50;
export const MAX_LOBBY_NAME_LENGTH = 50;

type AppSettings = ReturnType<typeof useSettings>;

export default AppSettings;