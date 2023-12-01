import React, { useState } from 'react';
import { RxAvatar } from "react-icons/rx";

const UserMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const username = "USERNAME";

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  return (
    <div
      className="user-menu"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button>
        <RxAvatar size={50} />
      </button>
      {isMenuOpen && (
        <ul className="user-menu-options">
          <li>
            <span>{username}</span>
          </li>
          <li>
            <a href={`/account/${username}`}>Account Settings</a>
          </li>
          <li>
            <a href="/logout">Sign out</a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
