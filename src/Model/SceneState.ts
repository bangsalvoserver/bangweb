import { GameOptions } from "../Scenes/Game/Model/GameUpdate";
import { createUnionReducer } from "../Utils/UnionUtils";
import { ChatMessage, Empty, isUserBot, LobbyEntered, LobbyId, LobbyUserFlag, LobbyValue, LobbyVoteStatus, UserId, UserValue } from "./ServerMessage";

export type LobbyChatMessage = ChatMessage & { history: boolean };

export interface LobbyState {
    lobbyId: LobbyId;
    myUserId: UserId;
    users: UserValue[];
    chatMessages: LobbyChatMessage[];
    vote: LobbyVoteStatus | null;
}

export function newLobbyState(lobbyId: LobbyId, myUserId: UserId): LobbyState {
    return {
        lobbyId, myUserId,
        users: [],
        chatMessages: [],
        vote: null
    };
}

export function checkMyUserFlag(lobbyState: LobbyState, flag: LobbyUserFlag) {
    const myUser = lobbyState.users.find(user => user.user_id === lobbyState.myUserId);
    return myUser !== undefined && myUser.flags.includes(flag);
}

export type ErrorState =
    { type: 'lobby', message: string } |
    { type: 'server', code: number | null, message: string };

export type SceneState = { error?: ErrorState } & (
    { type: 'home' } |
    { type: 'loading', message: string } |
    { type: 'waiting_area', lobbies: LobbyValue[] } |
    { type: 'lobby' | 'game', lobbyName: string, gameOptions: GameOptions | null, lobbyState: LobbyState }
);

export type UpdateFunction<T> = (value: T) => T;

export type SceneUpdate =
    { gotoHome: Empty } |
    { gotoLoading: string } |
    { gotoWaitingArea: Empty } |
    { gotoLobby: LobbyEntered } |
    { returnLobby: Empty } |
    { gotoGame: Empty } |
    { setError: ErrorState | null } |
    { updateLobbies: LobbyValue } |
    { removeLobby: LobbyId } |
    { setGameOptions: GameOptions } |
    { updateLobbyUser: UserValue } |
    { addLobbyChatMessage: LobbyChatMessage } |
    { setLobbyVoteStatus: LobbyVoteStatus | null };

export function defaultCurrentScene(sessionId?: number): SceneState {
    if (sessionId) {
        return { type: 'loading', message: 'LOADING' };
    } else {
        return { type: 'home' };
    }
}

function handleListUpdate<T, U>(values: T[], newValue: T, getId: (value: T) => U): T[] {
    let copy = values.slice();
    const index = copy.findIndex(value => getId(value) === getId(newValue));
    if (index >= 0) {
        copy[index] = newValue;
    } else {
        copy.push(newValue);
    }
    return copy;
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
    gotoLobby({ user_id, lobby_id, name }) {
        return {
            type: 'lobby',
            lobbyName: name,
            gameOptions: null,
            lobbyState: newLobbyState(lobby_id, user_id)
        }
    },
    returnLobby() {
        if (this.type !== 'game') {
            throw new Error('Invalid scene type for returnLobby: ' + this.type);
        }
        return {
            ...this,
            lobbyState: { ...this.lobbyState, users: this.lobbyState.users.filter(user => !isUserBot(user)) }
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
    updateLobbies(value) {
        if (this.type !== 'waiting_area') {
            throw new Error('Invalid scene type for updateLobbies: ' + this.type);
        }
        return { ...this, lobbies: handleListUpdate(this.lobbies, value, lobby => lobby.lobby_id) };
    },
    removeLobby(lobby_id) {
        if (this.type !== 'waiting_area') {
            throw new Error('Invalid scene type for removeLobby: ' + this.type);
        }
        return { ...this, lobbies: this.lobbies.filter(lobby => lobby.lobby_id !== lobby_id) };
    },
    setGameOptions(gameOptions) {
        if (this.type !== 'lobby') {
            throw new Error('Invalid scene type for setGameOptions: ' + this.type);
        }
        return { ...this, gameOptions };
    },
    updateLobbyUser(value) {
        if (this.type !== 'lobby' && this.type !== 'game') {
            throw new Error('Invalid scene type for updateLobbyUser: ' + this.type);
        }
        return { ...this, lobbyState: { ...this.lobbyState, users: handleListUpdate(this.lobbyState.users, value, value => value.user_id) }};
    },
    addLobbyChatMessage(message) {
        if (this.type !== 'lobby' && this.type !== 'game') {
            throw new Error('Invalid scene type for addLobbyChatMessage: ' + this.type);
        }
        return { ...this, lobbyState: { ...this.lobbyState, chatMessages: this.lobbyState.chatMessages.concat(message) }};
    },
    setLobbyVoteStatus(status) {
        if (this.type !== 'lobby' && this.type !== 'game') {
            throw new Error('Invalid scene type for setLobbyVoteStatus: ' + this.type);
        }
        return { ...this, lobbyState: { ...this.lobbyState, vote: status }};
    }
});