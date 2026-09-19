import { SyntheticEvent } from 'react';
import BangLogo from '../../Components/BangLogo';
import Button from '../../Components/Button';
import { getLabel, useLanguage } from "../../Locale/Registry";
import { MAX_USERNAME_LENGTH } from '../../Model/AppSettings';
import Env from '../../Model/Env';
import { DISCORD_ICON } from '../../Components/Icons/DiscordIcon';

export interface ConnectProps {
  username?: string;
  setUsername: (value: string) => void;
  handleConnect: () => void;
}

export default function HomeScene({ username, setUsername, handleConnect }: ConnectProps) {
  const language = useLanguage();

  const handleConnectEvent = function(event: SyntheticEvent) {
    event.preventDefault();
    if (username) {
      handleConnect();
    }
  };

  return <div className="flex flex-col items-center">
    <div className='flex flex-col items-center mb-4'>
      <BangLogo />
      <ul className='text-xl font-semibold text-center mb-2'>
        {getLabel(language, 'ui', 'APP_WELCOME').split('\n').map((line, i) => <li key={i}>{line}</li>)}
      </ul>
      { Env.discordLink && <p>
        <a className='inline font-bold hover:underline' href={Env.discordLink} target='_blank' rel='noreferrer'>
          { DISCORD_ICON }{getLabel(language, 'ui', 'DISCORD_LINK')}
        </a>
      </p>}
    </div>
    <form onSubmit={handleConnectEvent} className="flex flex-col items-center">
    <label htmlFor="username" className="font-bold text-xl">{getLabel(language, 'ui', 'LABEL_USERNAME')}</label>
    <input
      className="
      border-2
      border-gray-300
      rounded-md
      p-2
      w-64
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      m-2
      "
      type="text"
      id="username"
      value={username}
      maxLength={MAX_USERNAME_LENGTH}
      onChange={e => setUsername(e.target.value)}
    />
    <Button type="submit" color="green">{getLabel(language, 'ui', 'BUTTON_CONNECT')}</Button>
  </form>
  </div>
}