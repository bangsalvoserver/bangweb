import { ChatMessage, Empty, LobbyEntered, LobbyId, LobbyInfo, UserId } from "../Messages/ServerMessage";
import { UserValue } from "../Scenes/Lobby/LobbyUser";
import { LobbyValue } from "../Scenes/WaitingArea/LobbyElement";
import { createUnionReducer } from "../Utils/UnionUtils";

export interface LobbyState {
    lobbyId?: LobbyId;
    isGameStarted: boolean;
    users: UserValue[];
    lobbyOwner?: UserId;
    chatMessages: ChatMessage[];
}

export function newLobbyState(lobbyId?: LobbyId): LobbyState {
    return {
        lobbyId,
        isGameStarted: false,
        users: [],
        chatMessages: []
    };
}

export type SceneState =
    { type: 'connect' } |
    { type: 'waiting_area' } |
    { type: 'lobby', lobbyInfo: LobbyInfo, lobbyState: LobbyState };

export type AppState = SceneState & { lobbies: LobbyValue[] };

export type UpdateFunction<T> = (value: T) => T;

export type SceneUpdate =
    { reset: Empty } |
    { gotoWaitingArea: Empty } |
    { updateLobbies: UpdateFunction<LobbyValue[]> } |
    { updateLobbyInfo: UpdateFunction<LobbyInfo> } |
    { updateLobbyState: UpdateFunction<LobbyState> } |
    { handleLobbyEntered: LobbyEntered };

export function defaultCurrentScene(): AppState {
    return { type: 'connect', lobbies: [] };
}

export const sceneReducer = createUnionReducer<AppState, SceneUpdate>({
    reset() {
        return defaultCurrentScene();
    },
    gotoWaitingArea() {
        return { ...this, type: 'waiting_area' };
    },
    updateLobbies(mapper) {
        return { ...this, lobbies: mapper(this.lobbies) };
    },
    updateLobbyInfo(mapper) {
        if (this.type === 'lobby') {
            return { ...this, lobbyInfo: mapper(this.lobbyInfo) };
        } else {
            return this;
        }
    },
    updateLobbyState(mapper) {
        if (this.type === 'lobby') {
            return { ...this, lobbyState: mapper(this.lobbyState) };
        } else {
            return this;
        }
    },
    handleLobbyEntered({ lobby_id, name, options }) {
        if (this.type === 'lobby' && this.lobbyState.lobbyId === lobby_id) {
            return { ...this, lobbyState: { ...this.lobbyState, isGameStarted: false, users: [] } };
        } else {
            return { ...this, type: 'lobby', lobbyInfo: { name, options }, lobbyState: newLobbyState(lobby_id) };
        }
    }
});