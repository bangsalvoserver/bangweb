import { Id } from "../Scenes/Game/Model/GameTable";
import { GameOptions } from "../Scenes/Game/Model/GameUpdate";
import { UserValue } from "../Scenes/Lobby/LobbyUser";
import { LobbyValue } from "../Scenes/WaitingArea/LobbyElement";
import { deserializeImage } from "../Utils/ImageSerial";
import { createUnionReducer } from "../Utils/UnionUtils";
import { ChatMessage, Empty, LobbyEntered, LobbyId, LobbyUpdate, LobbyUserPropic, LobbyUserUpdate, UserId } from "./ServerMessage";

export interface LobbyState {
    lobbyId: LobbyId;
    myUserId: UserId;
    users: UserValue[];
    chatMessages: ChatMessage[];
}

export function newLobbyState(lobbyId: LobbyId, myUserId: UserId): LobbyState {
    return {
        lobbyId, myUserId,
        users: [],
        chatMessages: []
    };
}

export function isLobbyOwner(lobby: LobbyState) {
    for (const user of lobby.users) {
        if (!user.flags.includes('disconnected')) {
            return user.id === lobby.myUserId;
        }
    }
    return false;
}

export type ErrorState =
    { type: 'lobby', message: string } |
    { type: 'server', code: number | null, message: string };

export type SceneState = { error?: ErrorState } & (
    { type: 'home' } |
    { type: 'loading', message: string } |
    { type: 'waiting_area', lobbies: LobbyValue[] } |
    { type: 'lobby' | 'game', lobbyName: string, gameOptions: GameOptions, lobbyState: LobbyState }
);

export type UpdateFunction<T> = (value: T) => T;

export type SceneUpdate =
    { gotoHome: Empty } |
    { gotoLoading: string } |
    { gotoWaitingArea: Empty } |
    { gotoLobby: LobbyEntered } |
    { gotoGame: Empty } |
    { setError: ErrorState | null } |
    { updateLobbies: LobbyUpdate } |
    { removeLobby: LobbyId } |
    { setGameOptions: GameOptions } |
    { updateLobbyUser: LobbyUserUpdate } |
    { updateUserPropic: LobbyUserPropic } |
    { addLobbyChatMessage: ChatMessage };

export function defaultCurrentScene(sessionId?: number): SceneState {
    if (sessionId) {
        return { type: 'loading', message: 'LOADING' };
    } else {
        return { type: 'home' };
    }
}

function handleListUpdate<T extends Id>(values: T[], newValue: T): T[] {
    let copy = values.slice();
    const index = copy.findIndex(value => value.id === newValue.id);
    if (index >= 0) {
        copy[index] = { ...copy[index], ...newValue };
    } else {
        copy.push(newValue);
    }
    return copy;
}

function newLobbyValue({ lobby_id, name, num_players, num_spectators, max_players, secure, state }: LobbyUpdate): LobbyValue {
    return { id: lobby_id, name, num_players, num_spectators, max_players, secure, state };
}

function newUserValue({ user_id, username, flags, lifetime }: LobbyUserUpdate): UserValue {
    return { id: user_id, name: username, flags, lifetime };
}

export const sceneReducer = createUnionReducer<SceneState, SceneUpdate>({
    gotoHome() {
        return { type: 'home' };
    },
    gotoLoading(message) {
        return { type: 'loading', error: this.error, message };
    },
    gotoWaitingArea() {
        return { type: 'waiting_area', lobbies: [] };
    },
    gotoLobby({ user_id, lobby_id, name, options }) {
        return {
            type: 'lobby',
            lobbyName: name,
            gameOptions: options,
            lobbyState: 'lobbyState' in this
                ? { ...this.lobbyState, users: this.lobbyState.users.filter(user => user.id >= 0) }
                : newLobbyState(lobby_id, user_id)
        };
    },
    gotoGame() {
        if (this.type !== 'lobby') {
            throw new Error('Invalid scene type for gotoGame: ' + this.type);
        }
        return { ...this, type: 'game' };
    },
    setError(error) {
        return { ...this, error: error ?? undefined };
    },
    updateLobbies(update) {
        if (this.type !== 'waiting_area') {
            throw new Error('Invalid scene type for updateLobbies: ' + this.type);
        }
        return { ...this, lobbies: handleListUpdate(this.lobbies, newLobbyValue(update)) };
    },
    removeLobby(lobby_id) {
        if (this.type !== 'waiting_area') {
            throw new Error('Invalid scene type for removeLobby: ' + this.type);
        }
        return { ...this, lobbies: this.lobbies.filter(lobby => lobby.id !== lobby_id) };
    },
    setGameOptions(gameOptions) {
        if (this.type !== 'lobby') {
            throw new Error('Invalid scene type for setGameOptions: ' + this.type);
        }
        return { ...this, gameOptions };
    },
    updateLobbyUser(update) {
        if (this.type !== 'lobby' && this.type !== 'game') {
            throw new Error('Invalid scene type for updateLobbyUser: ' + this.type);
        }
        return { ...this, lobbyState: { ...this.lobbyState, users: handleListUpdate(this.lobbyState.users, newUserValue(update)) }};
    },
    updateUserPropic({ user_id, propic }) {
        if (this.type !== 'lobby' && this.type !== 'game') {
            throw new Error('Invalid scene type for updateUserPropic: ' + this.type);
        }
        return { ...this, lobbyState: { ...this.lobbyState,
            users: this.lobbyState.users.map(user => user.id === user_id
                ? { ...user, propic: deserializeImage(propic) }
                : user 
            )
        }};
    },
    addLobbyChatMessage(message) {
        if (this.type !== 'lobby' && this.type !== 'game') {
            throw new Error('Invalid scene type for addLobbyChatMessage: ' + this.type);
        }
        return { ...this, lobbyState: { ...this.lobbyState, chatMessages: this.lobbyState.chatMessages.concat(message) }};
    }
});