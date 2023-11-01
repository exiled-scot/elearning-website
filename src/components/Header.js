import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";

const Header = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false); // Remove unused variable
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Add missing useState initialization

  const openSignUpModal = () => {
    setIsSignUpOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  return (
    <div className="container">
      <header className="header">
        <Link to="/">
          <h1 className="header-title">eLearn</h1>
        </Link>
        <div className="header-buttons">
          <button
            onClick={openLoginModal}
            className={`button-28 ${isLoginOpen ? 'button-active' : ''}`}
          >
            Log in
          </button>
          <button
            onClick={openSignUpModal}
            className={`button-28 ${isSignUpOpen ? 'button-active' : ''}`}
          >
            Sign Up
          </button>
        </div>
      </header>
      {isSignUpOpen && <SignUp closeModal={closeSignUpModal} />}
      {isLoginOpen && <Login closeModal={closeLoginModal} />} // Add the missing Login component
    </div>
  );
};

export default Header;
