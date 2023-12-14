import React, { useEffect, useState } from "react";
import { isAuthenticated, getUserId } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import User from "../api/models/User";

const MyLearning = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const isLoggedIn = isAuthenticated();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      const fetchData = async () => {
        try {
          const userId = getUserId(); // Implement getUserId to obtain the current user's ID
          const userData = await User.retrieveDataFromAPI(userId);
          if (userData) {
            setUser(userData);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <h2>Welcome, {user ? user.name : "Guest"}!</h2>
      <div className="mylearning-submenu-container">
        <h3>Home</h3>
        <h3>In-progress</h3>
        <h3>Saved</h3>
        <h3>Completed</h3>
      </div>
      <div className="mylearning-carousel">
        <h3>Continue Learning</h3>
      </div>
      <div className="mylearning-carousel">
        <h3>Recommended For You</h3>
      </div>
      <div className="mylearning-carousel">
        <h3>Popular Skill Paths</h3>
      </div>
      <div className="mylearning-carousel">
        <h3>Popular Courses for You</h3>
      </div>
      <div className="mylearning-carousel">
        <h3>Latest Additions</h3>
      </div>
    </div>
  );
};

export default MyLearning;
