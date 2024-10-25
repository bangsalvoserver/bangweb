import { GameAction } from "../Scenes/Game/Model/GameAction";
import { GameOptions } from "../Scenes/Game/Model/GameUpdate";
import { ImageSrc } from "../Utils/ImageSerial";
import { Empty, LobbyId, UserId } from "./ServerMessage";

export interface ClientConnect {
    username: string;
    propic: ImageSrc | null;
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
    {user_set_propic: ImageSrc | null} |
    {lobby_make: LobbyMakeArgs} |
    {lobby_game_options: GameOptions} |
    {lobby_join: LobbyJoinArgs} |
    {lobby_leave: Empty } |
    {lobby_chat: { message: string }} |
    {lobby_return: Empty } |
    {user_spectate: boolean} |
    {game_start: Empty } |
    {game_rejoin: { user_id: UserId }} |
    {game_action: GameAction};