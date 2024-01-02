import { ChatMessage, Empty, LobbyEntered, LobbyId, LobbyInfo, UserId } from "./ServerMessage";
import { UserValue } from "../Scenes/Lobby/LobbyUser";
import { LobbyValue } from "../Scenes/WaitingArea/LobbyElement";
import { createUnionReducer } from "../Utils/UnionUtils";

export interface LobbyState {
    lobbyId?: LobbyId;
    users: UserValue[];
    lobbyOwner?: UserId;
    chatMessages: ChatMessage[];
}

export function newLobbyState(lobbyId?: LobbyId): LobbyState {
    return {
        lobbyId,
        users: [],
        chatMessages: []
    };
}

export type SceneState =
    { type: 'connect' } |
    { type: 'loading' } |
    { type: 'waiting_area', lobbies: LobbyValue[] } |
    { type: 'lobby', lobbies: LobbyValue[], lobbyInfo: LobbyInfo, lobbyState: LobbyState } |
    { type: 'game', lobbies: LobbyValue[], lobbyInfo: LobbyInfo, lobbyState: LobbyState };

export type UpdateFunction<T> = (value: T) => T;

export type SceneUpdate =
    { reset: Empty } |
    { gotoLoading: Empty } |
    { gotoWaitingArea: Empty } |
    { gotoGame: Empty } |
    { updateLobbies: UpdateFunction<LobbyValue[]> } |
    { updateLobbyInfo: UpdateFunction<LobbyInfo> } |
    { updateLobbyState: UpdateFunction<LobbyState> } |
    { handleLobbyEntered: LobbyEntered };

export function defaultCurrentScene(myUserId?: UserId): SceneState {
    if (myUserId) {
        return { type: 'loading' };
    } else {
        return { type: 'connect' };
    }
}

export const sceneReducer = createUnionReducer<SceneState, SceneUpdate>({
    reset() {
        return { type: 'connect' };
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
    handleLobbyEntered({ lobby_id, name, options }) {
        if ('lobbies' in this) {
            return { ...this, type: 'lobby',
                lobbyInfo: { name, options },
                lobbyState: 'lobbyState' in this ? this.lobbyState : newLobbyState(lobby_id)
            };
        }
        throw new Error('Invalid scene type: ' + this.type);
    }
});