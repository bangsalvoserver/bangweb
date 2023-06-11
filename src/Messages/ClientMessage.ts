import { GameAction } from "../Scenes/Game/Model/GameAction";
import { ImagePixels } from "../Utils/ImageSerial";
import { LobbyId, LobbyInfo, UserId } from "./ServerMessage";

export interface UserInfo {
    name: string;
    profile_image?: ImagePixels;
}

export interface ClientConnect {
    user: UserInfo;
    user_id?: UserId;
    commit_hash: string;
}

export type ClientMessage =
    {connect: ClientConnect} |
    {user_edit: UserInfo} |
    {lobby_list: {}} |
    {lobby_make: LobbyInfo} |
    {lobby_edit: LobbyInfo} |
    {lobby_join: { lobby_id: LobbyId }} |
    {lobby_leave: {}} |
    {lobby_chat: { message: string }} |
    {lobby_return: {}} |
    {game_start: {}} |
    {game_action: GameAction};