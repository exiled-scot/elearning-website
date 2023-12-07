import React from "react";
import User from "../api/models/User";
import { BASE_URL } from "../api/api";
import { getUserId } from "../utils/auth"; // Added import for getUserId function

const UserMenu = ({ isOpen }) => {

  const user = new User(
    "id","username","email","name"
  );

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
            <a href={`/accounts/${id}`}>Account Settings</a>
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

