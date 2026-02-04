import { ReactNode } from "react";
import PlayerIcon from "../../Components/PlayerIcon";
import TimerWidget from "../../Components/TimerWidget";
import getLabel from "../../Locale/GetLabel";
import { Language, useLanguage } from "../../Locale/Registry";
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

export function clipUsername(language: Language, username: string): string {
  return username.length !== 0 ? username : getLabel(language, 'ui', 'USERNAME_EMPTY');
}

export default function LobbyUser({ user: { username, propic, flags, lifetime}, isSelf, align, noUserIcons, playerIcons, children }: LobbyUserProps) {
  const language = useLanguage();

  const timerWidget = lifetime > 0 && <TimerWidget duration={lifetime} />;
  const isOwner = flags.has('lobby_owner');
  const isSpectator = flags.has('spectator');
  const isDisconnected = flags.has('disconnected');
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
  let classes = 'lobby-user';
  if (isDisconnected) {
    classes += ' lobby-user-disconnected';
  }
  if (align === 'vertical') {
    classes += ' flex-col';
  } else {
    classes += ' flex-row';
  }
  if (playerIcons && playerIcons.includes('icon-winner')) {
    classes += ' lobby-user-winner';
  }
  if (isSpectator) {
    classes += ' lobby-user-spectator';
  }
  if (isSelf) {
    classes += ' lobby-user-self';
  }
  return (
    <div className={classes}>
      <div className='lobby-user-inner'>
        <img src={getPropicUrl(propic)} alt="" />
      </div>
      <div className='lobby-username'>
        <span>{clipUsername(language, username)}</span>
        { icons.length !== 0 && <div className="lobby-user-icons">
          { icons.map(icon => <PlayerIcon name={icon} key={icon} />) }
        </div> }
        {timerWidget}
      </div>
      {children}
    </div>
  );
}