import { GameOptions, GameUpdate } from "../Scenes/Game/Model/GameUpdate";
import { ImagePixels } from "../Utils/ImageSerial";

export type Empty = Record<string, never>;

export type LobbyId = number;
export type UserId = number;
export type Milliseconds = number;

export interface ClientAccepted {
    session_id: number;
}

export type LobbyStateEnum = 'waiting' | 'playing' | 'finished';

export type LobbyTeam = 'game_player' | 'game_spectator';

export interface LobbyUpdate {
    lobby_id: LobbyId;
    name: string;
    num_players: number;
    num_spectators: number;
    max_players: number;
    state: LobbyStateEnum;
}

export interface LobbyInfo {
    name: string;
    options: GameOptions;
}

export interface LobbyEntered {
    user_id: UserId;
    lobby_id: LobbyId;
    name: string;
    options: GameOptions;
}

export type LobbyEdited = LobbyInfo;

export interface LobbyRemoved {
    lobby_id: LobbyId;
}

export interface UserInfo {
    name: string;
    profile_image: ImagePixels | null;
}

export type LobbyChatFlag = 'is_read';

export interface LobbyAddUser {
    user_id: UserId;
    user: UserInfo;
    team: LobbyTeam;
    flags: LobbyChatFlag[];
    lifetime: Milliseconds;
}

export interface ChatMessage {
    user_id: number;
    username: string;
    message: string;
    flags: LobbyChatFlag[];
}

export type ServerMessage =
    {ping: Empty} |
    {client_accepted: ClientAccepted} |
    {client_count: number} |
    {lobby_error: string} |
    {lobby_update: LobbyUpdate} |
    {lobby_entered: LobbyEntered} |
    {lobby_edited: LobbyEdited} |
    {lobby_removed: LobbyRemoved} |
    {lobby_add_user: LobbyAddUser} |
    {lobby_remove_user: number} |
    {lobby_kick: Empty} |
    {lobby_chat: ChatMessage} |
    {lobby_message: string} |
    {game_update: GameUpdate} |
    {game_started: Empty};