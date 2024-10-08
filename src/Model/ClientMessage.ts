import { GameAction } from "../Scenes/Game/Model/GameAction";
import { GameOptions } from "../Scenes/Game/Model/GameUpdate";
import { ImagePixels } from "../Utils/ImageSerial";
import { Empty, LobbyId, LobbyInfo, LobbyTeam, UserId } from "./ServerMessage";

export interface ClientConnect {
    username: string;
    propic: ImagePixels | null;
    session_id: number;
}

export interface LobbyMakeArgs {
    name: string;
    options: GameOptions | null;
    password: string;
}

export interface LobbyJoinArgs {
    lobby_id: LobbyId;
    password: string;
}

export type ClientMessage =
    {pong: Empty} |
    {connect: ClientConnect} |
    {user_set_name: string} |
    {user_set_propic: ImagePixels | null} |
    {lobby_make: LobbyMakeArgs} |
    {lobby_edit: LobbyInfo} |
    {lobby_join: LobbyJoinArgs} |
    {lobby_leave: Empty } |
    {lobby_chat: { message: string }} |
    {lobby_return: Empty } |
    {user_set_team: LobbyTeam} |
    {game_start: Empty } |
    {game_rejoin: { user_id: UserId }} |
    {game_action: GameAction};