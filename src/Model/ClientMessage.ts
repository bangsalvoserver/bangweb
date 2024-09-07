import { GameAction } from "../Scenes/Game/Model/GameAction";
import { GameOptions } from "../Scenes/Game/Model/GameUpdate";
import { Empty, LobbyId, LobbyInfo, LobbyTeam, UserId, UserInfo } from "./ServerMessage";

export interface ClientConnect {
    user: UserInfo;
    session_id: number;
}

export interface LobbyMakeArgs {
    name: string;
    options: GameOptions | null;
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
    {user_set_team: LobbyTeam} |
    {game_start: Empty } |
    {game_rejoin: { user_id: UserId }} |
    {game_action: GameAction};