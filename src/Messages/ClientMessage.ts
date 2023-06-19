import { GameAction } from "../Scenes/Game/Model/GameAction";
import { LobbyId, LobbyInfo, LobbyMakeArgs, UserId, UserInfo } from "./ServerMessage";

export interface ClientConnect {
    user: UserInfo;
    user_id?: UserId;
    commit_hash: string;
}

export type ClientMessage =
    {connect: ClientConnect} |
    {user_edit: UserInfo} |
    {lobby_list: {}} |
    {lobby_make: LobbyMakeArgs} |
    {lobby_edit: LobbyInfo} |
    {lobby_join: { lobby_id: LobbyId }} |
    {lobby_leave: {}} |
    {lobby_chat: { message: string }} |
    {lobby_return: {}} |
    {game_start: {}} |
    {game_action: GameAction};