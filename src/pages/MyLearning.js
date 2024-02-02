import React, { useEffect, useState } from "react";
import { isAuthenticated, getUserId } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import User from "../api/models/User";
import Login from "../components/Login";
import Card from "../components/Card";
import "./MyLearning.css";

const ContinueLearning = () => {
  return (
    <div>
      <div className="mylearning-carousel">
        <h3>Continue Learning</h3>
      </div>
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
      <div className="mylearning-carousel">
        <h3>Popular Skill Paths</h3>
      </div>
      <button className="centered-button button-29">
        Browse all skill paths
      </button>
    </div>
  );
};

const PopularCoursesForYou = ({ courses }) => {
  // Sort courses based on the highest rating
  const sortedCourses = courses
    .sort((a, b) => {
      const ratingA = a.reviews && Array.isArray(a.reviews) ? a.reviews.reduce((sum, review) => sum + review.rating, 0) : 0;
      const ratingB = b.reviews && Array.isArray(b.reviews) ? b.reviews.reduce((sum, review) => sum + review.rating, 0) : 0;
      return ratingA - ratingB;
    })
    .slice(0, 4);

  return (
    <div>
      <div className="mylearning-carousel">
        <h3>Popular Courses for You</h3>
      </div>
      <div>
        <Card courses={sortedCourses} />
      </div>
      <button className="centered-button button-29">
        Browse all popular courses
      </button>
    </div>
  );
};

const LatestAdditions = ({ courses }) => {
  // Sort the courses array by the course.updated timestamp in descending order
  const sortedCourses = courses.sort(
    (a, b) => new Date(b.updated) - new Date(a.updated)
  );

  return (
    <div>
      <div className="mylearning-carousel">
        <h3>Latest Additions</h3>
      </div>
      {/* Pass the sortedCourses array as a prop to the Card component */}
      <Card courses={sortedCourses.slice(0, 4)} />
      <button className="centered-button button-29">Browse all new</button>
    </div>
  );
};

const SavedContent = () => {
  return (
    <div>
      <div className="mylearning-carousel">
        <h3>Saved Contents</h3>
      </div>
    </div>
  );
};

const CompletedContent = () => {
  return (
    <div>
      <div className="mylearning-carousel">
        <h3>Completed Contents</h3>
      </div>
    </div>
  );
};

const MyLearning = ({ courses }) => {
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
        }, 5000); // Modified: Reduced timeout to 5000ms
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
              className={activeTab === "Home" ? "active-1" : ""}
              onClick={() => handleTabClick("Home")}
            >
              Home
            </h3>
            <h3
              className={activeTab === "In Progress" ? "active-1" : ""}
              onClick={() => handleTabClick("In Progress")}
            >
              In Progress
            </h3>
            <h3
              className={activeTab === "Saved" ? "active-1" : ""}
              onClick={() => handleTabClick("Saved")}
            >
              Saved
            </h3>
            <h3
              className={activeTab === "Completed" ? "active-1" : ""}
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
              <PopularCoursesForYou courses={courses}/>
              <LatestAdditions courses={courses}/>
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
