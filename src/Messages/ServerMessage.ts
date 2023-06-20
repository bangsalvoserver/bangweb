import { GameOptions, GameUpdate } from "../Scenes/Game/Model/GameUpdate";
import { ImagePixels } from "../Utils/ImageSerial";

export type LobbyId = number;
export type UserId = number;

export interface ClientAccepted {
    user_id: UserId;
}

export type LobbyState = 'waiting' | 'playing' | 'finished';

export interface LobbyUpdate {
    lobby_id: LobbyId;
    name: string;
    num_players: number;
    state: LobbyState;
}

export interface LobbyMakeArgs {
    name: string;
    options?: GameOptions;
}

export interface LobbyInfo {
    name: string;
    options: GameOptions;
}

export interface LobbyEntered {
    lobby_id: LobbyId;
    name: string;
    options: GameOptions;
}

export type LobbyEdited = LobbyInfo;

export interface LobbyRemoved {
    lobby_id: LobbyId;
}

export interface LobbyOwner {
    user_id: UserId;
}

export interface UserInfo {
    name: string;
    profile_image?: ImagePixels;
}

export interface LobbyAddUser {
    user_id: UserId;
    user: UserInfo;
}

export interface LobbyRemoveUser {
    user_id: UserId;
}

export interface ChatMessage {
    user_id: UserId;
    message: string;
}

export type ServerMessage =
    {connected: {}} |
    {disconnected: {}} |
    {client_accepted: ClientAccepted} |
    {lobby_error: string} |
    {lobby_update: LobbyUpdate} |
    {lobby_entered: LobbyEntered} |
    {lobby_edited: LobbyEdited} |
    {lobby_removed: LobbyRemoved} |
    {lobby_owner: LobbyOwner} |
    {lobby_add_user: LobbyAddUser} |
    {lobby_remove_user: LobbyRemoveUser} |
    {lobby_chat: ChatMessage} |
    {game_update: GameUpdate} |
    {game_started: {}};