import React, { useEffect, useState } from "react";
import { isAuthenticated, getUserId } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import User from "../api/models/User";
import Login from "../components/Login";

const MyLearning = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(true);

  useEffect(() => {
    let timeoutId;

    const checkAndFetchUser = async () => {
      const authenticationStatus = await isAuthenticated();
      if (authenticationStatus) {
        const userId = getUserId();
        const userData = await User.retrieveDataFromAPI(userId);
        setUser(userData);
      } else {
        timeoutId = setTimeout(() => {
          window.location.reload(false);
        }, 10000);
      }
    };

    checkAndFetchUser();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [navigate]);

  useEffect(() => {
    if (!isLoginOpen && !isAuthenticated()) {
      navigate("/");
    }
  }, [isLoginOpen, navigate]);

  const handleLoginModalClose = () => setIsLoginOpen(false);

  const handleSuccessfulLogin = () => {
    setIsLoginOpen(false);
    navigate("/mylearning", { replace: true });
  };

  return (
    <div>
      {user ? (
        <>
          <h1>{user.name}</h1>
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
      ) : isAuthenticated() ? (
        <div>Loading...</div>
      ) : isLoginOpen ? (
        <Login
          closeModal={handleLoginModalClose}
          onSuccess={handleSuccessfulLogin}
        />
      ) : null}
    </div>
  );
};

export default MyLearning;
