import { LobbyId, UserId } from "../Messages/ServerMessage";
import { GameOptions } from "../Scenes/Game/Model/GameUpdate";

export default interface AppSettings {
    myUserId?: UserId;
    myLobbyId?: LobbyId;
    username: string;
    propic: string | null;
    lobbyName?: string;
    gameOptions?: GameOptions;
}

function loadString(key: string): string | undefined {
    return localStorage.getItem(key) ?? undefined;
}

function saveString(key: string, value: string | undefined) {
    if (value) {
        localStorage.setItem(key, value);
    } else {
        localStorage.removeItem(key);
    }
}

function loadInt(key: string): number | undefined {
    const value = loadString(key);
    if (value) {
        return parseInt(value);
    }
}

function saveInt(key: string, value: number | undefined) {
    saveString(key, value?.toString());
}

function loadObject<T extends object>(key: string): T | undefined {
    const value = loadString(key);
    if (value) {
        return JSON.parse(value);
    }
}

function saveObject<T extends object>(key: string, value: T | undefined) {
    saveString(key, value ? JSON.stringify(value) : undefined);
}

export function loadAppSettings(): AppSettings {
    return {
        myUserId: loadInt('user_id'),
        myLobbyId: loadInt('lobby_id'),
        username: loadString('username') ?? '',
        propic: loadString('propic') ?? null,
        lobbyName: loadString('lobby_name'),
        gameOptions: loadObject<GameOptions>('game_options')
    };
}

export function saveAppSettings(settings: AppSettings) {
    saveInt('user_id', settings.myUserId);
    saveInt('lobby_id', settings.myLobbyId);
    saveString('username', settings.username);
    saveString('propic', settings.propic ?? undefined);
    saveString('lobby_name', settings.lobbyName);
    saveObject('game_options', settings.gameOptions);
}

export type SettingsUpdate =
    { setMyUserId: UserId | undefined } |
    { setMyLobbyId: UserId | undefined } |
    { setUsername: string } |
    { setPropic: string | null } |
    { setLobbyName: string | undefined } |
    { setGameOptions: GameOptions | undefined };

export function updateSettings(settings: AppSettings, update: SettingsUpdate): AppSettings {
    if ('setMyUserId' in update) {
        return { ...settings, myUserId: update.setMyUserId };
    }
    if ('setMyLobbyId' in update) {
        return { ...settings, myLobbyId: update.setMyLobbyId };
    }
    if ('setUsername' in update) {
        return { ...settings, username: update.setUsername };
    }
    if ('setPropic' in update) {
        return { ...settings, propic: update.setPropic };
    }
    if ('setLobbyName' in update) {
        return { ...settings, lobbyName: update.setLobbyName };
    }
    if ('setGameOptions' in update) {
        return { ...settings, gameOptions: update.setGameOptions };
    }
    return settings;
}