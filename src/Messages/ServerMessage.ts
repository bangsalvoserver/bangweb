import { GameOptions } from "./GameUpdate"

export type ClientAccepted = {
  id: number
};

export type LobbyError = {
  lobby_error: string
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

export type LobbyAddUser = {
  id: number,
  name: string,
  profile_image: string
};

export type LobbyRemoveUser = {
  id: number
};

export type LobbyChat = {
  user_id: number,
  message: String
};