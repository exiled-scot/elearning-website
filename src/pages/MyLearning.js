import React from "react";
import { isAuthenticated } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MyLearning = (user) => {
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h2>Welcome, {isLoggedIn ? user.name : "Guest"}!</h2>
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
