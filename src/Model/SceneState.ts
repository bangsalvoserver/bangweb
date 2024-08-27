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
        isRead: boolean
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

export type ErrorType = 'lobby' | 'server';
export type ErrorState = { type: ErrorType, message: string };

export type SceneState =
    { type: 'connect' | 'loading', error?: ErrorState } |
    { type: 'waiting_area', error?: ErrorState, clientCount: number, lobbies: LobbyValue[] } |
    { type: 'lobby' | 'game', error?: ErrorState, clientCount: number, lobbies: LobbyValue[], lobbyInfo: LobbyInfo, lobbyState: LobbyState };

export type UpdateFunction<T> = (value: T) => T;

export type SceneUpdate =
    { reset: Empty } |
    { setError: ErrorState | null } |
    { setClientCount: number } |
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
        return { type: 'connect' };
    }
}

export const sceneReducer = createUnionReducer<SceneState, SceneUpdate>({
    reset() {
        return { type: 'connect' };
    },
    setError(error) {
        return { ...this, error: error ?? undefined };
    },
    setClientCount(count) {
        if ('clientCount' in this) {
            return { ...this, clientCount: count };
        }
        throw new Error('Invalid scene type: ' + this.type);
    },
    gotoLoading() {
        return { type: 'loading' };
    },
    gotoWaitingArea() {
        if ('lobbies' in this) {
            return { type: 'waiting_area', clientCount: this.clientCount, lobbies: this.lobbies };
        } else {
            return { type: 'waiting_area', clientCount: 0, lobbies: [] };
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
                lobbyState: 'lobbyState' in this ? this.lobbyState : newLobbyState(lobby_id, user_id)
            };
        }
        throw new Error('Invalid scene type: ' + this.type);
    }
});