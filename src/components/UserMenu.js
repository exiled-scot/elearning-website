import React, { useEffect, useState } from "react";
import User from "../api/models/User";
import { BASE_URL } from "../api/api";
import { getUserId } from "../utils/auth";

const UserMenu = ({ isOpen }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming you have the current user's ID in state or props
        const userId = getUserId();

        // Retrieve the current user's data from the API
        const user = await User.retrieveDataFromAPI(userId);

        if (user) {
          setCurrentUser(user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const name = currentUser ? currentUser.getName() : "";
  const id = currentUser ? currentUser.getId() : "";

  return (
    <div>
      <div className={`user-menu ${isOpen ? "user-menu-active" : ""}`}>
        <ul>
          <li>
            <span>Hello, {name}</span>
          </li>
          <li>
            <a href={`/purchases`}>
              <span className="icon-purchases"></span>
              My Purchases
            </a>
          </li>
          <li>
            <a href={`/accounts/${id}`}>
              <span className="icon-settings"></span>
              Account Settings
            </a>
          </li>
          <li>
            <a href={`/certificates`}>
              <span className="icon-certificates"></span>
              My Certificates
            </a>
          </li>
          <li>
            {" "}
            <a href="/logout">
              <span className="icon-logout"></span>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
