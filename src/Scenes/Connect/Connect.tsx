import { SyntheticEvent } from 'react';
import Button from '../../Components/Button';
import getLabel from '../../Locale/GetLabel';

export interface ConnectProps {
  username?: string;
  setUsername: (value: string) => void;
  handleConnect: () => void;
}

export default function ConnectScene({ username, setUsername, handleConnect }: ConnectProps) {
  const handleConnectEvent = function(event: SyntheticEvent) {
    event.preventDefault();
    if (username) {
      handleConnect();
    }
  };

  return <form onSubmit={handleConnectEvent} className="flex flex-col items-center">
    <img src='logo192.png' alt={getLabel('ui', 'APP_TITLE')} />
    <label htmlFor="username" className="text-lg font-medium">{getLabel('ui', 'LABEL_USERNAME')}</label>
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
      onChange={e => setUsername(e.target.value)}
    />
    <Button type="submit" color="green">{getLabel('ui', 'BUTTON_CONNECT')}</Button>
  </form>
}