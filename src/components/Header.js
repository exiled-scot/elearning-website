import React, { useState } from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import SignUp from "./SignUp";

const Header = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

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
        <button className="action-button button-28">Log in</button>
        <button onClick={openSignUpModal} className="action-button button-28">Sign Up</button>
      </div>
      {isSignUpOpen && <SignUp closeModal={closeSignUpModal} />}
    </header>
  );
};

export default Header;
