import React, { useState } from 'react';
import './Header.css';
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <header className="header">
      <Link to="/">
        <h1 className="header-title">eLearn</h1>
      </Link>
      <div className="header-buttons">
        <button className="action-button">Log in</button>
        <button className="action-button">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
