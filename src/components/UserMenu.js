import React from "react";
import User from "../api/models/User";
import { BASE_URL } from "../api/api";

const UserMenu = ({ isOpen, user }) => {
  const name = user ? user.name : "";
  const id = user ? user.id : "";

  return (
    <div>
      <div className={`user-menu ${isOpen ? "user-menu-active" : ""}`}>
        <ul>
          <li>
            <span>Hello, {name}</span>
          </li>

          <li>
            <a href={`/account/${id}`}>Account Settings</a>
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
