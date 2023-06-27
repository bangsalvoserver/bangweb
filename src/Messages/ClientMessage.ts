import { GameAction } from "../Scenes/Game/Model/GameAction";
import { Empty, LobbyId, LobbyInfo, LobbyMakeArgs, UserId, UserInfo } from "./ServerMessage";

export interface ClientConnect {
    user: UserInfo;
    user_id?: UserId;
    commit_hash?: string;
}

export type ClientMessage =
    {connect: ClientConnect} |
    {user_edit: UserInfo} |
    {lobby_list: Empty } |
    {lobby_make: LobbyMakeArgs} |
    {lobby_edit: LobbyInfo} |
    {lobby_join: { lobby_id: LobbyId }} |
    {lobby_leave: Empty } |
    {lobby_chat: { message: string }} |
    {lobby_return: Empty } |
    {game_start: Empty } |
    {game_action: GameAction};