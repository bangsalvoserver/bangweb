import getLabel from "../Locale/GetLabel";

export interface UserMenuProps {
  username: string;
  closeMenu: () => void;
  handleLeaveLobby?: () => void;
  handleDisconnect: () => void;
}

export default function UserMenu({ username, closeMenu, handleLeaveLobby, handleDisconnect }: UserMenuProps) {
  const handleClick = (fn: () => void) => {
    return () => {
      closeMenu();
      fn();
    }
  };

  return (
    <div style={{width: '10em'}} className='z-50
    absolute top-10 right-0
    text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'
    >
      <div className="px-4 py-3">
        <span className="block text-sm text-gray-900 dark:text-white">{username}</span>
      </div>
      <ul className="py-2" aria-labelledby="user-menu-button">
        {handleLeaveLobby && <li>
          <a href="#" onClick={handleClick(handleLeaveLobby)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{getLabel('ui', 'BUTTON_LEAVE_LOBBY')}</a>
        </li>}
        <li>
          <a href="#" onClick={handleClick(handleDisconnect)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{getLabel('ui', 'BUTTON_DISCONNECT')}</a>
        </li>
      </ul>
    </div>
  )
}