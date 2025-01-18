import { GameOptions, GameUpdate } from "../Scenes/Game/Model/GameUpdate";

export type Empty = Record<string, never>;

export type LobbyId = number;
export type UserId = number;
export type Milliseconds = number;

export interface ClientAccepted {
    session_id: number;
}

export type LobbyStateEnum = 'waiting' | 'playing' | 'finished';

export interface LobbyValue {
    lobby_id: LobbyId;
    name: string;
    num_players: number;
    num_spectators: number;
    max_players: number;
    secure: boolean;
    state: LobbyStateEnum;
}

export interface LobbyEntered {
    user_id: UserId;
    lobby_id: LobbyId;
    name: string;
}

export interface LobbyRemoved {
    lobby_id: LobbyId;
}

export type LobbyUserFlag = 'disconnected' | 'lobby_owner' | 'spectator' | 'muted';

export interface UserValue {
    user_id: UserId;
    username: string;
    propic: string | null;
    flags: LobbyUserFlag[];
    lifetime: Milliseconds;
}

export function isUserBot(user: UserValue) {
    return user.user_id < 0;
}

export type LobbyStringArg =
    {user: UserId} |
    {integer: number} |
    {string: string};

export interface LobbyString {
    format_str: string;
    format_args: LobbyStringArg[];
}

export interface LobbyVoteStatus {
    message: LobbyString;
    num_yes: number;
    num_no: number;
    lifetime: Milliseconds;
}

export interface UserString {
    user_id: UserId;
    message: string;
}

export type ChatMessage = { user: UserString } | { server: string } | { lobby: LobbyString };

export type ServerMessage =
    {ping: Empty} |
    {client_accepted: ClientAccepted} |
    {lobby_error: string} |
    {lobby_update: LobbyValue} |
    {lobby_entered: LobbyEntered} |
    {lobby_returned: Empty} |
    {lobby_game_options: GameOptions} |
    {lobby_removed: LobbyRemoved} |
    {lobby_user_update: UserValue} |
    {lobby_vote_status: LobbyVoteStatus} |
    {lobby_vote_clear: Empty} |
    {lobby_kick: Empty} |
    {lobby_chat: ChatMessage} |
    {lobby_chat_history: ChatMessage} |
    {game_update: GameUpdate} |
    {game_started: Empty};