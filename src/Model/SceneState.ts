import { UserValue } from "../Scenes/Lobby/LobbyUser";
import { LobbyValue } from "../Scenes/WaitingArea/LobbyElement";
import { createUnionReducer } from "../Utils/UnionUtils";
import { Empty, LobbyEntered, LobbyId, LobbyInfo, UserId } from "./ServerMessage";

export type ChatMessageState =
    {
        type: 'user',
        user_id: UserId,
        username: string,
        message: string,
        isRead: boolean
    } |
    {
        type: 'lobby',
        message: string,
        args: string[],
        isRead: boolean,
        translated: boolean
    };

export interface LobbyState {
    lobbyId: LobbyId;
    myUserId: UserId;
    users: UserValue[];
    chatMessages: ChatMessageState[];
}

export function newLobbyState(lobbyId: LobbyId, myUserId: UserId): LobbyState {
    return {
        lobbyId, myUserId,
        users: [],
        chatMessages: []
    };
}

export function isLobbyOwner(lobby: LobbyState) {
    return lobby.users.at(0)?.id === lobby.myUserId;
}

export type ErrorState =
    { type: 'lobby', message: string } |
    { type: 'server', code: number | null, message: string };

export type SceneState =
    { type: 'home' | 'loading', error?: ErrorState } |
    { type: 'waiting_area', error?: ErrorState, lobbies: LobbyValue[] } |
    { type: 'lobby' | 'game', error?: ErrorState, lobbies: LobbyValue[], lobbyInfo: LobbyInfo, lobbyState: LobbyState };

export type UpdateFunction<T> = (value: T) => T;

export type SceneUpdate =
    { reset: Empty } |
    { setError: ErrorState | null } |
    { gotoLoading: Empty } |
    { gotoWaitingArea: Empty } |
    { gotoGame: Empty } |
    { updateLobbies: UpdateFunction<LobbyValue[]> } |
    { updateLobbyInfo: UpdateFunction<LobbyInfo> } |
    { updateLobbyState: UpdateFunction<LobbyState> } |
    { handleLobbyEntered: LobbyEntered };

export function defaultCurrentScene(sessionId?: number): SceneState {
    if (sessionId) {
        return { type: 'loading' };
    } else {
        return { type: 'home' };
    }
}

export const sceneReducer = createUnionReducer<SceneState, SceneUpdate>({
    reset() {
        return { type: 'home' };
    },
    setError(error) {
        return { ...this, error: error ?? undefined };
    },
    gotoLoading() {
        return { type: 'loading' };
    },
    gotoWaitingArea() {
        if ('lobbies' in this) {
            return { type: 'waiting_area', lobbies: this.lobbies };
        } else {
            return { type: 'waiting_area', lobbies: [] };
        }
    },
    gotoGame() {
        if (this.type !== 'lobby') {
            throw new Error('Invalid scene type: ' + this.type);
        }
        return { ...this, type: 'game' };
    },
    updateLobbies(mapper) {
        if ('lobbies' in this) {
            return { ...this, lobbies: mapper(this.lobbies) };
        }
        throw new Error('Invalid scene type: ' + this.type);
    },
    updateLobbyInfo(mapper) {
        if ('lobbyInfo' in this) {
            return { ...this, lobbyInfo: mapper(this.lobbyInfo) };
        }
        throw new Error('Invalid scene type: ' + this.type);
    },
    updateLobbyState(mapper) {
        if ('lobbyState' in this) {
            return { ...this, lobbyState: mapper(this.lobbyState) };
        }
        throw new Error('Invalid scene type: ' + this.type);
    },
    handleLobbyEntered({ user_id, lobby_id, name, options }) {
        if ('lobbies' in this) {
            return { ...this, type: 'lobby',
                lobbyInfo: { name, options },
                lobbyState: 'lobbyState' in this
                    ? { ...this.lobbyState, users: this.lobbyState.users.filter(user => user.id >= 0) }
                    : newLobbyState(lobby_id, user_id)
            };
        }
        throw new Error('Invalid scene type: ' + this.type);
    }
});