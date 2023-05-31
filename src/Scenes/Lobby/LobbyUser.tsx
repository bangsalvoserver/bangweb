import { UserId } from "../../Messages/ServerMessage";
import { getLocalizedLabel } from "../../Locale/Locale";

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

export function getPropic(user?: UserValue) {
  return user? (user.propic ?? DEFAULT_USER_PROPIC) : PROPIC_DISCONNECTED;
}

export function getUsername(user?: UserValue) {
  return user?.name ?? getLocalizedLabel('ui', 'USER_DISCONNECTED');
}

export default function LobbyUser({ user }: LobbyUserProps) {
  return (
    <div>
    <img style={{display:'inline'}} src={getPropic(user)} />
    {getUsername(user)}
    </div>
  );
}