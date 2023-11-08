import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";

const Header = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const closeSignUpModal = () => {
    setIsSignUpOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  const openSignUpModal = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  const openLoginModal = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
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
      {isLoginOpen && <Login closeModal={closeLoginModal} />}
    </div>
  );
};

export default Header;
