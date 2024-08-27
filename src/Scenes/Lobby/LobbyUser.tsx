import { ReactNode } from "react";
import getLabel from "../../Locale/GetLabel";
import { Milliseconds, UserId } from "../../Model/ServerMessage";
import { ImageSrc } from "../../Utils/ImageSerial";
import "./Style/LobbyUser.css";
import defaultUserPropic from "/media/icon_default_user.png";
import propicDisconnected from "/media/icon_disconnected.png";
import TimerWidget from "../../Components/TimerWidget";

export interface UserValue {
    id: UserId;
    name: string;
    propic?: ImageSrc;
    lifetime: Milliseconds;
}

export interface LobbyUserProps {
    user?: UserValue;
    isSelf?: boolean;
    isOwner?: boolean;
    align?: 'horizontal' | 'vertical';
    children?: ReactNode;
}

export const DEFAULT_USER_PROPIC = defaultUserPropic;
export const PROPIC_DISCONNECTED = propicDisconnected;

export function getPropic(user?: UserValue) {
  return user? (user.propic ?? DEFAULT_USER_PROPIC) : PROPIC_DISCONNECTED;
}

export function clipUsername(username: string): string {
  return username.length !== 0 ? username : getLabel('ui', 'USERNAME_EMPTY');
}

export function getUsername(user?: UserValue) {
  return user ? clipUsername(user.name) : getLabel('ui', 'USER_DISCONNECTED');
}

export default function LobbyUser({ isSelf, user, align, children }: LobbyUserProps) {
  const timerWidget = user && user.lifetime > 0 && <TimerWidget duration={user.lifetime} />;
  return (
    <div className={`lobby-user ${align === 'vertical' ? 'flex-col' : 'flex-row'}`}>
      <div className='lobby-user-inner'>
        <img src={getPropic(user)} alt="" />
      </div>
      <div className={`lobby-username ${isSelf ? 'lobby-username-self' : ''}`}>
        {getUsername(user)}{timerWidget}
      </div>
      {children}
    </div>
  );
}