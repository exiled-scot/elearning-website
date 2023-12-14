import React, { useEffect, useState } from "react";
import { isAuthenticated, getUserId } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import User from "../api/models/User";
import Login from "../components/Login"; // Check if the path is correct

const MyLearning = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and fetch data
    const fetchData = async () => {
      try {
        const userId = getUserId(); // Assume getUserId is implemented
        const userData = await User.retrieveDataFromAPI(userId);
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (isAuthenticated()) {
      fetchData();
    }
  }, [navigate]);

  useEffect(() => {
    // Redirect to home if modal is closed and not logged in
    if (!isLoginOpen && !isAuthenticated()) {
      navigate("/");
    }
  }, [isLoginOpen, navigate]);

  const handleLoginModalClose = () => setIsLoginOpen(false);
  const handleSuccessfulLogin = () => {
    setIsLoginOpen(false); // Close login modal on successful login
    window.location.reload();
  };

  return (
    <div>
      <h2>Welcome, {user ? user.name : "Guest"}!</h2>
      {isAuthenticated() ? (
        <>
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
        </>
      ) : (
        <Login
          closeModal={handleLoginModalClose}
          onSuccess={handleSuccessfulLogin}
        />
      )}
    </div>
  );
};

export default MyLearning;
