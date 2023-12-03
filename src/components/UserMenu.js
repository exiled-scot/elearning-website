import React from "react";

const UserMenu = ({ isOpen, username }) => {
  return (
    <div>
      <div className={`user-menu ${isOpen ? "user-menu-active" : ""}`}>
        <ul>
          <li>
            <span>{username}</span>
          </li>

          <li>
            <a href={`/account/${username}`}>Account Settings</a>
          </li>

          <li>
            <a href="/logout">Sign Out</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
