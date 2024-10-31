import { ReactNode } from "react";
import TimerWidget from "../../Components/TimerWidget";
import getLabel from "../../Locale/GetLabel";
import Env from "../../Model/Env";
import { UserValue } from "../../Model/ServerMessage";
import "./Style/LobbyUser.css";
import defaultUserPropic from "/media/icon_default_user.png";

export interface LobbyUserProps {
    user: UserValue;
    isSelf?: boolean;
    align?: 'horizontal' | 'vertical';
    children?: ReactNode;
}

export const DEFAULT_USER_PROPIC = defaultUserPropic;

export function getPropicUrl(propic: string | null) {
  if (propic) {
    return `${Env.bangImageUrl}/${propic}`;
  }
  return DEFAULT_USER_PROPIC;
}

export function clipUsername(username: string): string {
  return username.length !== 0 ? username : getLabel('ui', 'USERNAME_EMPTY');
}

export default function LobbyUser({ user: { username, propic, flags, lifetime}, isSelf, align, children }: LobbyUserProps) {
  const timerWidget = lifetime > 0 && <TimerWidget duration={lifetime} />;
  const isOwner = flags.includes('lobby_owner');
  const isSpectator = flags.includes('spectator');
  const isDisconnected = flags.includes('disconnected');
  return (
    <div className={`lobby-user ${isDisconnected ? 'lobby-user-disconnected ' : ''}${align === 'vertical' ? 'flex-col' : 'flex-row'}`}>
      <div className='lobby-user-inner'>
        <img src={getPropicUrl(propic)} alt="" />
      </div>
      <div className='lobby-username'>
        <span className={isSelf ? 'lobby-username-self' : ''}>{clipUsername(username)}</span>
        { isDisconnected ? <div className="mx-1 align-middle player-icon icon-disconnected"/>
        : <>
          {isOwner && <div className="mx-1 align-middle player-icon icon-owner"/>}
          {isSpectator && <div className="mx-1 align-middle player-icon icon-spectator"/>}
          </>
        }
        {timerWidget}
      </div>
      {children}
    </div>
  );
}