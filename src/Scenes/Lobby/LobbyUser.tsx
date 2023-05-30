import { UserId } from "../../Messages/ServerMessage";

export interface UserValue {
    id: UserId;
    name: string;
    propic: string | null;
}

export interface LobbyUserProps {
    user?: UserValue;
    isOwner?: boolean;
}

export const DEFAULT_USER_PROPIC = "/docs/images/people/profile-picture-3.jpg";
export const PROPIC_DISCONNECTED = "/docs/images/people/profile-picture-3.jpg";
export const USERNAME_DISCONNECTED = "Disconnected";

export default function LobbyUser({ user }: LobbyUserProps) {
  const propic = user ? (user.propic ?? DEFAULT_USER_PROPIC) : PROPIC_DISCONNECTED;
  const username = user?.name ?? USERNAME_DISCONNECTED;
  return (
    <div>
    <img src={propic} />
    {username}
    </div>
  );
}