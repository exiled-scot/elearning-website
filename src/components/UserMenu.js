import React from "react";
import User from "../api/models/User";
import { BASE_URL } from "../api/api";

const UserMenu = ({ isOpen, user }) => {
  return (
    <div>
      <div className={`user-menu ${isOpen ? "user-menu-active" : ""}`}>
        <ul>
          <li>
            <span>Hello, {user.name}</span>
          </li>

          <li>
            <a href={`/account/${user.id}`}>Account Settings</a>
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
