import React from "react";
import User from "../api/models/User";
import { BASE_URL } from "../api/api";

const UserMenu = ({ isOpen, user }) => {
  const username = "Scott";
  return (
    <div>
      <div className={`user-menu ${isOpen ? "user-menu-active" : ""}`}>
        <ul>
          <li>
            <span>Hello, {user}</span>
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
