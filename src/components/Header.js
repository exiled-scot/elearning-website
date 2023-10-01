import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="burger-menu">
        <button className="burger-button">&#9776;</button>
      </div>
      <h1 className="header-title">eLearn</h1>
      <div className="header-buttons">
        <button className="action-button">Log in</button>
        <button className="action-button">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
