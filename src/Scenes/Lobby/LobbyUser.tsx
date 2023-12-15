import getLabel from "../../Locale/GetLabel";
import { UserId } from "../../Messages/ServerMessage";
import { ImageSrc } from "../../Utils/ImageSerial";
import "./Style/LobbyUser.css"
import defaultUserPropic from "/media/icon_default_user.png";
import propicDisconnected from "/media/icon_disconnected.png";

export interface UserValue {
    id: UserId;
    name: string;
    propic?: ImageSrc;
}

export interface LobbyUserProps {
    user?: UserValue;
    isOwner?: boolean;
    align?: 'horizontal' | 'vertical';
}

export const DEFAULT_USER_PROPIC = defaultUserPropic;
export const PROPIC_DISCONNECTED = propicDisconnected;

export function getPropic(user?: UserValue) {
  return user? (user.propic ?? DEFAULT_USER_PROPIC) : PROPIC_DISCONNECTED;
}

export function getUsername(user?: UserValue) {
  return user?.name ?? getLabel('ui', 'USER_DISCONNECTED');
}

export default function LobbyUser({ user, align }: LobbyUserProps) {
  return (
    <div className={`lobby-user ${align === 'vertical' ? 'flex-col' : 'flex-row'}`}>
      <div className='lobby-user-inner'>
        <img src={getPropic(user)} alt="" />
      </div>
      <div className='lobby-username'>
        {getUsername(user)}
      </div>
    </div>
  );
}