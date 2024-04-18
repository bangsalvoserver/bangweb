import { GameAction } from "../Scenes/Game/Model/GameAction";
import { PlayerId } from "../Scenes/Game/Model/GameUpdate";
import { Empty, LobbyId, LobbyInfo, LobbyMakeArgs, UserInfo } from "./ServerMessage";

export interface ClientConnect {
    user: UserInfo;
    session_id?: number;
    commit_hash?: string;
}

export type ClientMessage =
    {pong: Empty} |
    {connect: ClientConnect} |
    {user_edit: UserInfo} |
    {lobby_make: LobbyMakeArgs} |
    {lobby_edit: LobbyInfo} |
    {lobby_join: { lobby_id: LobbyId }} |
    {lobby_leave: Empty } |
    {lobby_chat: { message: string }} |
    {lobby_return: Empty } |
    {game_start: Empty } |
    {game_rejoin: PlayerId} |
    {game_action: GameAction};