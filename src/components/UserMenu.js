import React, { useState } from 'react';

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
      <button
        className="button-28"
        style={{
          borderRadius: '50%',
          backgroundColor: 'black',
          width: '28px',
          height: '28px',
        }}
      ></button>
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
