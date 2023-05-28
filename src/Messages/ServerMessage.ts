import { GameOptions } from "./GameUpdate"
import { ImagePixels } from "./ImageSerial";

export interface ClientAccepted {
  user_id: number;
}

export enum LobbyState {
  waiting,
  playing,
  finished
}

export interface LobbyUpdate {
  lobby_id: number;
  name: string;
  num_players: number;
  state: LobbyState;
}

export interface LobbyInfo {
  name: string;
  options: GameOptions;
}

export interface LobbyEntered {
  lobby_id: number;
  name: string;
  options: GameOptions;
}

export type LobbyEdited = LobbyInfo;

export interface LobbyRemoved {
  lobby_id: number;
}

export interface LobbyOwner {
  id: number;
}

export interface UserInfo {
  name: string;
  profile_image: ImagePixels;
}

export interface LobbyAddUser {
  user_id: number;
  user: UserInfo;
}

export interface LobbyRemoveUser {
  user_id: number;
}

export interface LobbyChat {
  user_id: number;
  message: String;
}