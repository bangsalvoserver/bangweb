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
    { type: 'waiting_area', lobbies: LobbyValue[] } |
    { type: 'lobby', lobbyInfo: LobbyInfo, lobbyState: LobbyState };

export type UpdateFunction<T> = (value: T) => T;

export type SceneUpdate =
    { reset: Empty } |
    { gotoWaitingArea: Empty } |
    { updateWaitingArea: UpdateFunction<LobbyValue[]> } |
    { updateLobbyInfo: UpdateFunction<LobbyInfo> } |
    { updateLobbyState: UpdateFunction<LobbyState> } |
    { handleLobbyEntered: LobbyEntered };

export function defaultCurrentScene(): SceneState {
    return { type: 'connect' }
}

export const sceneReducer = createUnionReducer<SceneState, SceneUpdate>({
    reset() {
        return defaultCurrentScene();
    },
    gotoWaitingArea() {
        return { type: 'waiting_area', lobbies: [] };
    },
    updateWaitingArea(reducer) {
        if (this.type === 'waiting_area') {
            return { ...this, lobbies: reducer(this.lobbies) };
        } else {
            return this;
        }
    },
    updateLobbyInfo(reducer) {
        if (this.type === 'lobby') {
            return { ...this, lobbyInfo: reducer(this.lobbyInfo) };
        } else {
            return this;
        }
    },
    updateLobbyState(reducer) {
        if (this.type === 'lobby') {
            return { ...this, lobbyState: reducer(this.lobbyState) };
        } else {
            return this;
        }
    },
    handleLobbyEntered({ lobby_id, name, options }) {
        if (this.type === 'lobby' && this.lobbyState.lobbyId === lobby_id) {
            return { ...this, lobbyState: { ...this.lobbyState, isGameStarted: false, users: [] } };
        } else {
            return { type: 'lobby', lobbyInfo: { name, options }, lobbyState: newLobbyState(lobby_id) };
        }
    }
});