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

export const DEFAULT_USER_PROPIC = "/media/icon_default_user.png";
export const PROPIC_DISCONNECTED = "/media/icon_disconnected.png";

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