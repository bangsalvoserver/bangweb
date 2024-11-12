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
    options: GameOptions;
}

export interface LobbyRemoved {
    lobby_id: LobbyId;
}

export type LobbyChatFlag = 'is_read' | 'translated';

export type LobbyUserFlag = 'disconnected' | 'lobby_owner' | 'spectator' | 'muted';

export interface UserValue {
    user_id: UserId;
    username: string;
    propic: string | null;
    flags: LobbyUserFlag[];
    lifetime: Milliseconds;
}

export type LobbyChatArg =
    {user: UserId} |
    {integer: number} |
    {string: string};

export interface ChatMessage {
    user_id: number;
    message: string;
    args: LobbyChatArg[];
    flags: LobbyChatFlag[];
}

export type ServerMessage =
    {ping: Empty} |
    {client_accepted: ClientAccepted} |
    {lobby_error: string} |
    {lobby_update: LobbyValue} |
    {lobby_entered: LobbyEntered} |
    {lobby_game_options: GameOptions} |
    {lobby_removed: LobbyRemoved} |
    {lobby_user_update: UserValue} |
    {lobby_kick: Empty} |
    {lobby_chat: ChatMessage} |
    {game_update: GameUpdate} |
    {game_started: Empty};