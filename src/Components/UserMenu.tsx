import { ReactNode } from "react";

export interface UserMenuItemProps {
  onClick: () => void;
  children: ReactNode;
}

export function UserMenuItem({ onClick, children }: UserMenuItemProps) {
  return <li><a href="#" onClick={onClick} className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">{children}</a></li>;
}

export interface UserMenuProps {
  username?: string;
  children: ReactNode;
}

export default function UserMenu({ username, children }: UserMenuProps) {
  return (
    <div style={{width: '10em'}} className='z-50
    absolute top-10 right-0
    text-base list-none divide-y rounded-lg shadow bg-gray-700 divide-gray-600'
    >
      <div className="px-4 py-3">
        <span className="block text-sm text-white">{username}</span>
      </div>
      <ul className="py-2" aria-labelledby="user-menu-button">{children}</ul>
    </div>
  )
}