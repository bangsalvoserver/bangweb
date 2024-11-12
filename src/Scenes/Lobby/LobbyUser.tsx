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
    noUserIcons?: boolean;
    playerIcons?: string[];
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

export default function LobbyUser({ user: { username, propic, flags, lifetime}, isSelf, align, noUserIcons, playerIcons, children }: LobbyUserProps) {
  const timerWidget = lifetime > 0 && <TimerWidget duration={lifetime} />;
  const isOwner = flags.includes('lobby_owner');
  const isSpectator = flags.includes('spectator');
  const isDisconnected = flags.includes('disconnected');
  let icons: string[] = [];
  if (isDisconnected) {
    icons.push('icon-disconnected');
  } else if (!noUserIcons) {
    if (isOwner) icons.push('icon-owner');
    if (isSpectator) icons.push('icon-spectator');
  }
  if (playerIcons) {
    icons.push(...playerIcons);
  }
  return (
    <div className={`lobby-user ${isDisconnected ? 'lobby-user-disconnected ' : ''}${align === 'vertical' ? 'flex-col' : 'flex-row'}`}>
      <div className='lobby-user-inner'>
        <img src={getPropicUrl(propic)} alt="" />
      </div>
      <div className='lobby-username'>
        <span className={isSelf ? 'lobby-username-self' : ''}>{clipUsername(username)}</span>
        { icons.length !== 0 && <div className="lobby-user-icons">
          { icons.map(icon => <div className={`player-icon ${icon}`} key={icon}/>) }
        </div> }
        {timerWidget}
      </div>
      {children}
    </div>
  );
}