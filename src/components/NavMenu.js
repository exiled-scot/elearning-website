import React, { useState } from 'react';
import './NavMenu.css';

function NavMenu() {
  const [showCategories, setShowCategories] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState({
    programming: false,
    technology: false,
    engineering: false
  });

  const toggleCategories = () => {
    setShowCategories(!showCategories);
    setShowSubmenu({
      programming: false,
      technology: false,
      engineering: false
    });
  };

  const toggleSubmenu = (submenu) => {
    setShowSubmenu((prev) => ({
      ...prev,
      [submenu]: !prev[submenu]
    }));
  };

  return (
    <div className="primary-nav">
      <nav role="navigation" className="menu">
        <li>
          <a href="#">Dashboard</a>
          <span className="icon">
            <i className="fa fa-dashboard"></i>
          </span>
        </li>
        <a href="#" className="logotype" onClick={toggleCategories}>
          Categories
          <span className={`downarrow ${showCategories ? 'open' : ''}`}>
            <i className="fa fa-caret-down"></i>
          </span>
        </a>

        {/* Programming submenu */}
        {showCategories && (
          <ul className="menu-dropdown">
            <li>
              <a href="#" onClick={() => toggleSubmenu('programming')}>
                Programming
                <span className={`downarrow ${showSubmenu.programming ? 'open' : ''}`}>
                  <i className="fa fa-caret-down"></i>
                </span>
              </a>
              <ul className={`sub-menu-dropdown ${showSubmenu.programming ? 'open' : ''}`}>
                <li>
                  <a href="">Web Development</a>
                </li>
                <li>
                  <a href="">Mobile App Development</a>
                </li>
                <li>
                  <a href="">Data Science</a>
                </li>
                <li>
                  <a href="">Game Development</a>
                </li>
              </ul>
            </li>

            {/* Technology submenu */}
            <li>
              <a href="#" onClick={() => toggleSubmenu('technology')}>
                Technology
                <span className={`downarrow ${showSubmenu.technology ? 'open' : ''}`}>
                  <i className="fa fa-caret-down"></i>
                </span>
              </a>
              <ul className={`sub-menu-dropdown ${showSubmenu.technology ? 'open' : ''}`}>
                <li>
                  <a href="">Cybersecurity</a>
                </li>
                <li>
                  <a href="">Cloud Computing</a>
                </li>
                <li>
                  <a href="">Internet of Things (IoT)</a>
                </li>
                <li>
                  <a href="">Artificial Intelligence (AI)</a>
                </li>
              </ul>
            </li>

            {/* Engineering submenu */}
            <li>
              <a href="#" onClick={() => toggleSubmenu('engineering')}>
                Engineering
                <span className={`downarrow ${showSubmenu.engineering ? 'open' : ''}`}>
                  <i className="fa fa-caret-down"></i>
                </span>
              </a>
              <ul className={`sub-menu-dropdown ${showSubmenu.engineering ? 'open' : ''}`}>
                <li>
                  <a href="">Electrical</a>
                </li>
                <li>
                  <a href="">Mechanical</a>
                </li>
                <li>
                  <a href="">Civil</a>
                </li>
                <li>
                  <a href="">Chemical</a>
                </li>
              </ul>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}

export default NavMenu;
