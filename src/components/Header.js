import React, { useState } from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import SignUp from "../pages/SignUp"; // Import the SignUp component

const Header = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false); // Add state variable

  const openSignUpModal = () => {
    setIsSignUpOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpOpen(false);
  };

  return (
    <header className="header">
      <Link to="/">
        <h1 className="header-title">eLearn</h1>
      </Link>
      <div className="header-buttons">
        <Link to="/login" className="action-button">Log in</Link>
        <button onClick={openSignUpModal} className="action-button">Sign Up</button>
      </div>
      {isSignUpOpen && <SignUp closeModal={closeSignUpModal} />}
    </header>
  );
};

export default Header;
