import React ,{useEffect, useState}from 'react'
interface UserMenuProps {
    isMenuOpen: boolean;
  }
  

function userMenu({ isMenuOpen }: UserMenuProps) {

   

  return (
    <div
    className={`z-50 
    ${isMenuOpen ? 'block' : 'hidden'}
    my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
    id="user-dropdown"
  >
<div className="px-4 py-3">
  <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
</div>
<ul className="py-2" aria-labelledby="user-menu-button">
  <li>
    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
  </li>
  <li>
    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
  </li>
  <li>
    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
  </li>
  <li>
    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
  </li>
</ul>
</div>
  )
}

export default userMenu