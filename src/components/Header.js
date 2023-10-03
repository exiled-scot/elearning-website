import React, { useState } from 'react';
import './Header.css';
import Menu from './Menu'; // Import the Menu component

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Add state for menu open/close

  // Function to toggle menu open/close
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="burger-menu">
        <button className="burger-button" onClick={toggleMenu}>&#9776;</button> {/* Add onClick listener */}
      </div>
      <h1 className="header-title">eLearn</h1>
      <div className="header-buttons">
        <button className="action-button">Log in</button>
        <button className="action-button">Sign Up</button>
      </div>
      {menuOpen && <Menu />} {/* Render the Menu component when menuOpen is true */}
    </header>
  );
};

export default Header;
