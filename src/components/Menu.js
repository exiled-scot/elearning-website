import React, { useState } from "react";
import "./Menu.css"; // Import the CSS file for styling

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryHover = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="menu-container">
      <ul className="menu">
        <li
          className={`menu-item ${activeCategory === "Programming" ? "active" : ""}`}
          onMouseEnter={() => handleCategoryHover("Programming")}
        >
          Programming
          {activeCategory === "Programming" && (
            <ul className="sub-menu">
              <li>Web Development</li>
              <li>Mobile App Development</li>
              <li>Data Science</li>
              <li>Game Development</li>
            </ul>
          )}
        </li>
        <li
          className={`menu-item ${activeCategory === "Technology" ? "active" : ""}`}
          onMouseEnter={() => handleCategoryHover("Technology")}
        >
          Technology
          {activeCategory === "Technology" && (
            <ul className="sub-menu">
              <li>Cybersecurity</li>
              <li>Cloud Computing</li>
              <li>Internet of Things (IoT)</li>
              <li>Artificial Intelligence (AI)</li>
            </ul>
          )}
        </li>
        <li
          className={`menu-item ${activeCategory === "Engineering" ? "active" : ""}`}
          onMouseEnter={() => handleCategoryHover("Engineering")}
        >
          Engineering
          {activeCategory === "Engineering" && (
            <ul className="sub-menu">
              <li>Electrical Engineering</li>
              <li>Mechanical Engineering</li>
              <li>Civil Engineering</li>
              <li>Chemical Engineering</li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Menu;
