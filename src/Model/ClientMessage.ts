import { GameAction } from "../Scenes/Game/Model/GameAction";
import { PlayerId } from "../Scenes/Game/Model/GameUpdate";
import { Empty, LobbyId, LobbyInfo, LobbyMakeArgs, UserId, UserInfo } from "./ServerMessage";

export interface ClientConnect {
    user: UserInfo;
    user_id?: UserId;
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