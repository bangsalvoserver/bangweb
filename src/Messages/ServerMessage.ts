import { GameOptions } from "./GameUpdate"
import { ImagePixels } from "./ImageSerial";

export type ClientAccepted = {
  user_id: number
};

export enum LobbyState {
  waiting,
  playing,
  finished
};

export type LobbyUpdate = {
  lobby_id: number,
  name: string,
  num_players: number,
  state: LobbyState
};

export type LobbyInfo = {
  name: string,
  options: GameOptions
};

export type LobbyEntered = LobbyInfo;
export type LobbyEdited = LobbyInfo;

export type LobbyRemoved = {
  lobby_id: number
};

export type LobbyOwner = {
  id: number
};

export type UserInfo = {
  name: string,
  profile_image: ImagePixels
}

export type LobbyAddUser = {
  user_id: number,
  user: UserInfo
};

export type LobbyRemoveUser = {
  user_id: number
};

export type LobbyChat = {
  user_id: number,
  message: String
};