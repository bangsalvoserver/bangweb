import getLabel from "../../Locale/GetLabel";
import { UserId } from "../../Messages/ServerMessage";

export interface UserValue {
    id: UserId;
    name: string;
    propic: string | null;
}

export interface LobbyUserProps {
    user?: UserValue;
    isOwner?: boolean;
    alignVertical?: boolean;
}

export const DEFAULT_USER_PROPIC = "/media/icon_default_user.png";
export const PROPIC_DISCONNECTED = "/media/icon_disconnected.png";

export function getPropic(user?: UserValue) {
  return user? (user.propic ?? DEFAULT_USER_PROPIC) : PROPIC_DISCONNECTED;
}

export function getUsername(user?: UserValue) {
  return user?.name ?? getLabel('ui', 'USER_DISCONNECTED');
}

export default function LobbyUser({ user, alignVertical }: LobbyUserProps) {
  if (alignVertical) {
    return (
      <div className='text-center font-bold'>
        <p><img style={{display:'inline'}} src={getPropic(user)} /></p>
        <p>{getUsername(user)}</p>
      </div>
    )
  } else {
    return (
      <div>
      <img style={{display:'inline'}} src={getPropic(user)} />
      {getUsername(user)}
      </div>
    );
  }
}