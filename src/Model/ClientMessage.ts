import { GameAction } from "../Scenes/Game/Model/GameAction";
import { Empty, LobbyId, LobbyInfo, LobbyMakeArgs, UserId, UserInfo } from "./ServerMessage";

export interface ClientConnect {
    user: UserInfo;
    session_id?: number;
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
    {game_rejoin: { user_id: UserId }} |
    {game_action: GameAction};