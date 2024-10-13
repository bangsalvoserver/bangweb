import { ReactNode } from "react";
import TimerWidget from "../../Components/TimerWidget";
import getLabel from "../../Locale/GetLabel";
import { LobbyUserFlag, Milliseconds, UserId } from "../../Model/ServerMessage";
import { ImageSrc } from "../../Utils/ImageSerial";
import "./Style/LobbyUser.css";
import defaultUserPropic from "/media/icon_default_user.png";

export interface UserValue {
    id: UserId;
    name: string;
    propic?: ImageSrc;
    flags: LobbyUserFlag[];
    lifetime: Milliseconds;
}

export interface LobbyUserProps {
    user: UserValue;
    isSelf?: boolean;
    align?: 'horizontal' | 'vertical';
    children?: ReactNode;
}

export const DEFAULT_USER_PROPIC = defaultUserPropic;

export function getPropic(user: UserValue) {
  return user.propic ?? DEFAULT_USER_PROPIC;
}

export function clipUsername(username: string): string {
  return username.length !== 0 ? username : getLabel('ui', 'USERNAME_EMPTY');
}

export default function LobbyUser({ isSelf, user, align, children }: LobbyUserProps) {
  const timerWidget = user && user.lifetime > 0 && <TimerWidget duration={user.lifetime} />;
  const isSpectator = user && user.flags.includes('spectator');
  const isDisconnected = user && user.flags.includes('disconnected');
  return (
    <div className={`lobby-user ${isDisconnected ? 'lobby-user-disconnected ' : ''}${align === 'vertical' ? 'flex-col' : 'flex-row'}`}>
      <div className='lobby-user-inner'>
        <img src={getPropic(user)} alt="" />
      </div>
      <div className='lobby-username'>
        <span className={isSelf ? 'lobby-username-self' : ''}>{clipUsername(user.name)}</span>
        { isDisconnected ? <div className="mx-1 align-middle player-icon icon-disconnected"/>
        : isSpectator ? <div className="mx-1 align-middle player-icon icon-spectator"/>
        : null }
        {timerWidget}
      </div>
      {children}
    </div>
  );
}