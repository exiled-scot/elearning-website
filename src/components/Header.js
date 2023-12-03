import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import UserMenu from "./UserMenu";
import { RxAvatar } from "react-icons/rx";

const Header = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  const checkIsLoggedIn = () => {
    const cookie = document.cookie;
    const isLoggedIn = cookie.includes("elearn_token");
    setIsLoggedIn(isLoggedIn);
  };

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

  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="container">
      <header className="header">
        <Link to="/">
          <h1 className="header-title">eLearn</h1>
        </Link>
        <div className="header-buttons">
          {isLoggedIn ? (
            <div className="avatar-container">
              <RxAvatar size={50} />
              <UserMenu />
            </div>
          ) : (
            <>
              <button
                onClick={openLoginModal}
                className={`button-28 ${isLoginOpen ? "button-active" : ""} ${
                  isLoggedIn ? "button-inactive" : ""
                }`}
              >
                Log in
              </button>
              <button
                onClick={openSignUpModal}
                className={`button-28 ${isSignUpOpen ? "button-active" : ""}s ${
                  isLoggedIn ? "button-inactive" : ""
                }`}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>
      {isSignUpOpen && (
        <SignUp
          closeModal={closeSignUpModal}
          onSuccess={handleSuccessfulLogin}
        />
      )}
      {isLoginOpen && (
        <Login closeModal={closeLoginModal} onSuccess={handleSuccessfulLogin} />
      )}
    </div>
  );
};

export default Header;
