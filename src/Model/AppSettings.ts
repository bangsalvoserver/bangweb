import { GameOptions } from "../Scenes/Game/Model/GameUpdate";
import { boolConverter, intConverter, jsonConverter, stringConverter, useLocalStorage } from "../Utils/UseLocalStorage";

export function useSettings() {
    const [myUserId, setMyUserId] = useLocalStorage('user_id', intConverter);
    const [myLobbyId, setMyLobbyId] = useLocalStorage('lobby_id', intConverter);
    const [isConnected, setIsConnected] = useLocalStorage('connected', boolConverter);
    const [username, setUsername] = useLocalStorage('username', stringConverter);
    const [propic, setPropic] = useLocalStorage('propic', stringConverter);
    const [lobbyName, setLobbyName] = useLocalStorage('lobby_name', stringConverter);
    const [gameOptions, setGameOptions] = useLocalStorage<GameOptions>('game_options', jsonConverter);

    return {
        myUserId, setMyUserId,
        myLobbyId, setMyLobbyId,
        isConnected, setIsConnected,
        username, setUsername,
        propic, setPropic,
        lobbyName, setLobbyName,
        gameOptions, setGameOptions
    };
}

type AppSettings = ReturnType<typeof useSettings>;

export default AppSettings;