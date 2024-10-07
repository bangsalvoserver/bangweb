import { SyntheticEvent } from 'react';
import Button from '../../Components/Button';
import getLabel from '../../Locale/GetLabel';
import BangLogo from '../../Components/BangLogo';
import { MAX_USERNAME_LENGTH } from '../../Model/AppSettings';
import Env from '../../Model/Env';

export interface ConnectProps {
  username?: string;
  setUsername: (value: string) => void;
  handleConnect: () => void;
}

export default function HomeScene({ username, setUsername, handleConnect }: ConnectProps) {
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
        {getLabel('ui', 'APP_WELCOME').split('\n').map((line, i) => <li key={i}>{line}</li>)}
      </ul>
      { Env.discordLink && <p><a className='inline font-bold hover:underline' href={Env.discordLink} target='_blank' rel='noreferrer'>
        <svg className='inline w-6 h-6 mr-1' viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
          <g>
            <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="currentColor" fill-rule="nonzero"/>
          </g>
        </svg>
      {getLabel('ui', 'DISCORD_LINK')}</a></p>}
      { Env.paypalDonateLink && <p><a className='inline font-bold hover:underline' href={Env.paypalDonateLink} target='_blank' rel='noreferrer'>
      <svg className='inline w-6 h-6 mr-1' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256" xmlSpace="preserve">
        <g><path fill="currentColor" d="M219.4,46.1c17.7,9,26.6,25.1,26.6,48.2c0,25.3-10.6,45.8-31.8,61.5c-20.9,15.5-50.2,23.3-87.9,23.3h-8.8c-3,0-5.8,1-8.4,3.1c-2.6,2-4.3,4.6-5.1,7.6l-10.5,45.3c-0.8,3.5-2.7,6.5-5.8,8.9c-3.1,2.5-6.4,3.7-9.9,3.7H47.3c-3.2,0-5.8-0.9-7.8-2.8c-2-1.9-3.1-4.4-3.1-7.4c0-1.1,0.6-4.2,1.9-9.3h21.6c3.3,0,6.5-1.2,9.4-3.4c2.9-2.3,4.7-5,5.3-8.2L85,171.2c0.6-3.2,2.4-5.9,5.3-8.2c2.9-2.3,6-3.4,9.4-3.4h8.5c37.5,0,66.6-7.7,87.4-23C216.5,121.2,227,101,227,76C227,63.5,224.5,53.5,219.4,46.1z M133.2,8.3c9.3,0,17.7,0.4,25.2,1.2c7.4,0.8,15.1,2.4,23,4.9c7.9,2.5,14.5,5.8,19.8,10c5.3,4.2,9.7,10,13.2,17.3c3.5,7.4,5.2,16,5.2,26c0,25.3-10.6,45.8-31.8,61.5c-21.2,15.5-50.6,23.3-88.1,23.3h-8.5c-3,0-5.8,1-8.4,3.1c-2.6,2-4.3,4.6-5.1,7.6l-10.5,45.4c-0.8,3.5-2.8,6.5-5.9,8.9c-3.2,2.5-6.5,3.7-10,3.7H20.7c-3,0-5.5-0.9-7.6-2.8c-2-1.9-3.1-4.4-3.1-7.4c0-1.3,0.1-2.2,0.2-2.8L53.4,20.9c0.8-3.5,2.8-6.5,5.9-8.9s6.5-3.7,10-3.7H133.2L133.2,8.3z M108,110.2c6.6,0,12.8-0.6,18.5-1.8c5.7-1.2,11.1-3.2,16.1-5.9c5.1-2.8,9.1-6.7,12-11.9s4.4-11.2,4.4-18.2c0-15.2-11.4-22.8-34.2-22.8h-10c-3,0-5.8,1-8.4,3.1s-4.3,4.6-5.1,7.6L92.1,100c0,0.2,0,0.5-0.1,1.1c-0.1,0.6-0.1,1-0.1,1.3c0,2.4,0.8,4.3,2.5,5.7c1.7,1.4,3.7,2.1,6,2.1H108z"/></g>
      </svg>
      {getLabel('ui', 'DONATE_PAYPAL')}</a></p>}
    </div>
    <form onSubmit={handleConnectEvent} className="flex flex-col items-center">
    <label htmlFor="username" className="font-bold text-xl">{getLabel('ui', 'LABEL_USERNAME')}</label>
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
    <Button type="submit" color="green">{getLabel('ui', 'BUTTON_CONNECT')}</Button>
  </form>
  </div>
}