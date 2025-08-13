import { GameOptions, GameUpdate } from "../Scenes/Game/Model/GameUpdate";
import { Container, ContainerKey } from "../Utils/ArrayUtils";
import { Empty } from "../Utils/UnionUtils";

export type LobbyId = number;
export type UserId = number;
export type Milliseconds = number;

export interface ClientAccepted {
    session_id: number;
}

export type LobbySecurityEnum = 'open' | 'unlocked' | 'locked';

export type LobbyStateEnum = 'waiting' | 'playing' | 'finished';

export interface LobbyValue {
    lobby_id: LobbyId;
    name: string;
    num_players: number;
    num_bots: number;
    num_spectators: number;
    security: LobbySecurityEnum;
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

interface UserValueBase<K extends ContainerKey> {
    user_id: UserId;
    username: string;
    propic: string | null;
    flags: Container<K, LobbyUserFlag>;
    lifetime: Milliseconds;
}

export type UserValue = UserValueBase<'set'>;
export type UserValueArgs = UserValueBase<'array'>;

export function parseUserValue(user: UserValueArgs): UserValue {
    return { ...user, flags: new Set(user.flags) };
}

export type LobbyChatArg =
    {user: UserId} |
    {integer: number} |
    {string: string};

interface ChatMessageBase<K extends ContainerKey> {
    user_id: number;
    message: string;
    args: LobbyChatArg[];
    flags: Container<K, LobbyChatFlag>;
}

export type ChatMessage = ChatMessageBase<'set'>;
export type ChatMessageArgs = ChatMessageBase<'array'>;

export function parseChatMessage(message: ChatMessageArgs): ChatMessage {
    return { ...message, flags: new Set(message.flags) };
}

export type ServerMessage =
    {ping: Empty} |
    {client_accepted: ClientAccepted} |
    {lobby_error: string} |
    {lobby_update: LobbyValue} |
    {lobby_entered: LobbyEntered} |
    {lobby_game_options: GameOptions} |
    {lobby_removed: LobbyRemoved} |
    {lobby_user_update: UserValueArgs} |
    {lobby_kick: Empty} |
    {lobby_chat: ChatMessageArgs} |
    {game_update: GameUpdate} |
    {game_started: Empty};