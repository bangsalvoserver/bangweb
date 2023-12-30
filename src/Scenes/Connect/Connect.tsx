import { SyntheticEvent } from 'react';
import Button from '../../Components/Button';
import getLabel from '../../Locale/GetLabel';
import { Connection } from '../../Model/UseConnection';

export interface ConnectProps {
  username?: string;
  setUsername: (value: string) => void;
  connection: Connection;
}

export default function ConnectScene({ username, setUsername, connection }: ConnectProps) {
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
  )
}