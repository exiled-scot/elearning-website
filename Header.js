import React, { useState } from 'react';
import './Header.css';
import Menu from './Menu'; // Import the Menu component
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([
    "Category 1",
    "Category 2",
    "Category 3",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setMenuOpen(false); // Close the menu
  };

  return (
    <header className="header">
      <div className="burger-menu">
        <button className="burger-button">
          &#9776;
        </button>
      </div>
      <Link to="/">
        <h1 className="header-title">eLearn</h1>
      </Link>
      <div className="header-buttons">
        <div className="category-dropdown">
          <button className="dropdown-toggle" onClick={toggleMenu}>
            {selectedCategory}
          </button>
          {menuOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => handleCategorySelect("All Categories")}>
                All Categories
              </li>
              {categories.map((category) => (
                <li key={category} onClick={() => handleCategorySelect(category)}>
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="action-button">Log in</button>
        <button className="action-button">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
