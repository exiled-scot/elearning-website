import React, { useEffect, useState } from "react";
import { isAuthenticated, getUserId } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import User from "../api/models/User";
import Login from "../components/Login";
import "./MyLearning.css";

const ContinueLearning = () => {
  return (
    <div>
      <div className="mylearning-carousel">
        <h3>Continue Learning</h3>
      </div>
      <button className="centered-button button-28">
        Browse all popular courses
      </button>
      <div
        className="line-spanning-carousel"
        style={{ paddingBottom: "50px" }}
      ></div>
    </div>
  );
};

const RecommendedForYou = () => {
  return (
    <div>
      <div className="mylearning-carousel">
        <h3>Recommended For You</h3>
      </div>
    </div>
  );
};

const PopularSkillPaths = () => {
  return (
    <div>
      <div
        className="line-spanning-carousel"
        style={{ paddingBottom: "50px" }}
      ></div>
      <div className="mylearning-carousel">
        <h3>Popular Skill Paths</h3>
      </div>
      <button className="centered-button button-28">
        Browse all skill paths
      </button>
      <div
        className="line-spanning-carousel"
        style={{ paddingBottom: "50px" }}
      ></div>
    </div>
  );
};

const PopularCoursesForYou = () => {
  return (
    <div>
      <div className="mylearning-carousel">
        <h3>Popular Courses for You</h3>
      </div>
      <button className="centered-button button-28">
        Browse all popular courses
      </button>
      <div
        className="line-spanning-carousel"
        style={{ paddingBottom: "50px" }}
      ></div>
    </div>
  );
};

const LatestAdditions = () => {
  return (
    <div>
      <div className="mylearning-carousel">
        <h3>Latest Additions</h3>
      </div>
      <button className="centered-button button-28">Browse all new</button>
      <div
        className="line-spanning-carousel"
        style={{ paddingBottom: "50px" }}
      ></div>
    </div>
  );
};

const SavedContent = () => {
  return (
    <div>
      <div className="mylearning-carousel">
        <h3>Saved Contents</h3>
      </div>
      <div
        className="line-spanning-carousel"
        style={{ paddingBottom: "50px" }}
      ></div>
    </div>
  );
};

const CompletedContent = () => {
  return (
    <div>
      <div className="mylearning-carousel">
        <h3>Completed Contents</h3>
      </div>
      <div
        className="line-spanning-carousel"
        style={{ paddingBottom: "50px" }}
      ></div>
    </div>
  );
};

const MyLearning = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Home");

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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {user ? (
        <>
          <h1 className="welcome">Welcome, {user.name}!</h1>
          <div className="mylearning-submenu-container">
            <h3
              className={activeTab === "Home" ? "active" : ""}
              onClick={() => handleTabClick("Home")}
            >
              Home
            </h3>
            <h3
              className={activeTab === "In Progress" ? "active" : ""}
              onClick={() => handleTabClick("In Progress")}
            >
              In Progress
            </h3>
            <h3
              className={activeTab === "Saved" ? "active" : ""}
              onClick={() => handleTabClick("Saved")}
            >
              Saved
            </h3>
            <h3
              className={activeTab === "Completed" ? "active" : ""}
              onClick={() => handleTabClick("Completed")}
            >
              Completed
            </h3>
          </div>

          {activeTab === "Home" && (
            <div>
              <ContinueLearning />
              <RecommendedForYou />
              <PopularSkillPaths />
              <PopularCoursesForYou />
              <LatestAdditions />
            </div>
          )}

          {activeTab === "In Progress" && (
            <div>
              <ContinueLearning />
            </div>
          )}

          {activeTab === "Saved" && (
            <div>
              <SavedContent />
            </div>
          )}

          {activeTab === "Completed" && (
            <div>
              <CompletedContent />
            </div>
          )}
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
