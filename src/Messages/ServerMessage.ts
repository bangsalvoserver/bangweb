import { GameOptions } from "./GameUpdate"
import { ImagePixels } from "./ImageSerial";

export type LobbyId = number;
export type UserId = number;

export interface ClientAccepted {
  user_id: UserId;
}

export interface LobbyUpdate {
  lobby_id: LobbyId;
  name: string;
  num_players: number;
  state: string;
}

export interface LobbyInfo {
  name: string;
  options: GameOptions;
}

export interface LobbyEntered {
  lobby_id: LobbyId;
  name: string;
  options: GameOptions;
}

export type LobbyEdited = LobbyInfo;

export interface LobbyRemoved {
  lobby_id: LobbyId;
}

export interface LobbyOwner {
  id: UserId;
}

export interface UserInfo {
  name: string;
  profile_image: ImagePixels;
}

export interface LobbyAddUser {
  user_id: UserId;
  user: UserInfo;
}

export interface LobbyRemoveUser {
  user_id: UserId;
}

export interface LobbyChat {
  user_id: UserId;
  message: String;
}