import React, { useState, useEffect, useRef } from 'react';
import './NavMenu.css';

function NavMenu() {
  const [showNav, setShowNav] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState({
    programming: false,
    technology: false,
    engineering: false
  });

  const primaryNavRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!primaryNavRef.current) return;

      if (event.keyCode === 27) {
        // ESC key: Close the menu
        resetMenu();
      } else if (event.keyCode === 37) {
        // Left arrow key: Close the submenu
        setShowSubmenu((prev) => ({
          ...prev,
          programming: false,
          technology: false,
          engineering: false
        }));
      } else if (event.keyCode === 39) {
        // Right arrow key: Open the submenu of the selected category
        setShowSubmenu((prev) => ({
          ...prev,
          [showCategories]: true
        }));
      } else if (event.keyCode === 40) {
        // Down arrow key: Navigate to next item in the submenu
        event.preventDefault();
        const currentElement = document.activeElement;
        if (currentElement.nextElementSibling) {
          currentElement.nextElementSibling.focus();
        } else {
          currentElement.parentElement.firstElementChild.focus();
        }
      } else if (event.keyCode === 38) {
        // Up arrow key: Navigate to previous item in the submenu
        event.preventDefault();
        const currentElement = document.activeElement;
        if (currentElement.previousElementSibling) {
          currentElement.previousElementSibling.focus();
        } else {
          currentElement.parentElement.lastElementChild.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showCategories]);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

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

  const resetMenu = () => {
    setShowNav(false);
    setShowCategories(false);
    setShowSubmenu({
      programming: false,
      technology: false,
      engineering: false
    });
  };

  return (
    <div
      className={`primary-nav ${showNav ? 'show' : ''}`}
      onMouseEnter={toggleNav}
      onMouseLeave={resetMenu}
    >
      {showNav && (
        <nav role="navigation" className="menu">
          {/* Dashboard */}
          <li aria-hidden={!showCategories}>
            <a href="#">Dashboard</a>
            <span className="icon">
              <i className="fa fa-dashboard"></i>
            </span>
          </li>

          {/* Categories */}
          <a
            href="#"
            className={`logotype ${showCategories ? 'show' : ''}`}
            onClick={toggleCategories}
            tabIndex="0"
            ref={primaryNavRef}
          >
            Categories
            <span className={`downarrow ${showCategories ? 'open' : ''}`}>
              <i className="fa fa-caret-down"></i>
            </span>
          </a>

          {/* Programming submenu */}
          {showCategories && (
            <ul className={`menu-dropdown ${showCategories ? 'open' : ''}`}>
              <li>
                <a
                  href="#"
                  onClick={() => toggleSubmenu('programming')}
                  tabIndex={showSubmenu.programming ? '0' : '-1'}
                >
                  Programming
                  <span className={`downarrow ${showSubmenu.programming ? 'open' : ''}`}>
                    <i className="fa fa-caret-down"></i>
                  </span>
                </a>
                <ul
                  className={`sub-menu-dropdown ${showSubmenu.programming ? 'open' : ''}`}
                  tabIndex={showSubmenu.programming ? '0' : '-1'}
                >
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
                <a
                  href="#"
                  onClick={() => toggleSubmenu('technology')}
                  tabIndex={showSubmenu.technology ? '0' : '-1'}
                >
                  Technology
                  <span className={`downarrow ${showSubmenu.technology ? 'open' : ''}`}>
                    <i className="fa fa-caret-down"></i>
                  </span>
                </a>
                <ul
                  className={`sub-menu-dropdown ${showSubmenu.technology ? 'open' : ''}`}
                  tabIndex={showSubmenu.technology ? '0' : '-1'}
                >
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
                <a
                  href="#"
                  onClick={() => toggleSubmenu('engineering')}
                  tabIndex={showSubmenu.engineering ? '0' : '-1'}
                >
                  Engineering
                  <span className={`downarrow ${showSubmenu.engineering ? 'open' : ''}`}>
                    <i className="fa fa-caret-down"></i>
                  </span>
                </a>
                <ul
                  className={`sub-menu-dropdown ${showSubmenu.engineering ? 'open' : ''}`}
                  tabIndex={showSubmenu.engineering ? '0' : '-1'}
                >
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
      )}
    </div>
  );
}

export default NavMenu;
