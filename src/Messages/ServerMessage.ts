import { GameOptions } from "../Scenes/Game/Model/GameUpdate";
import { ImagePixels } from "../Utils/ImageSerial";

export type LobbyId = number;
export type UserId = number;

export interface ClientAccepted {
  user_id: UserId;
}

export type LobbyState = 'waiting' | 'playing' | 'finished';

export interface LobbyUpdate {
  lobby_id: LobbyId;
  name: string;
  num_players: number;
  state: LobbyState;
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
  user_id: UserId;
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

export interface ChatMessage {
  user_id: UserId;
  message: string;
}