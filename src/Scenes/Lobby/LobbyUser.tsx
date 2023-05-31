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

export default function LobbyUser({ user }: LobbyUserProps) {
  const propic = user ? (user.propic ?? DEFAULT_USER_PROPIC) : PROPIC_DISCONNECTED;
  const username = user?.name ?? getLocalizedLabel('ui', 'USER_DISCONNECTED');
  return (
    <div>
    <img style={{display:'inline'}} src={propic} />
    {username}
    </div>
  );
}