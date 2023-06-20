import { SyntheticEvent, useContext } from 'react';
import { ConnectionContext } from '../../App';
import Button from '../../Components/Button';
import getLabel from '../../Locale/GetLabel';

export interface ConnectProps {
  username?: string;
  setUsername: (value: string) => void;
}

export default function ConnectScene({ username, setUsername }: ConnectProps) {
  const connection = useContext(ConnectionContext);

  const handleConnect = function(event: SyntheticEvent) {
    event.preventDefault();
    if (!connection.isConnected() && username) {
      connection.connect();
    }
  };

  return (
    <form onSubmit={handleConnect} className="flex flex-col items-center">
    <h1
    className='
    text-7xl
    text-center
    text-red-700
    font-bold
    p-4
    '
    >{getLabel('ui', 'APP_TITLE')}</h1>
    <label htmlFor="username" className="text-lg font-medium mb-2">{getLabel('ui', 'LABEL_USERNAME')}</label>
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
      "
      type="text"
      id="username"
      value={username}
      onChange={e => setUsername(e.target.value)}
    />
    <Button type="submit" color="green">{getLabel('ui', 'BUTTON_CONNECT')}</Button>
  </form>
  )
}