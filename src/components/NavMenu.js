import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FiBook,
  FiSearch,
  FiCloud,
  FiUser,
  FiActivity,
  FiLayers,
  FiClipboard,
} from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";
import "./NavMenu.css";

const NavMenu = () => {
  const [isVisible, setIsVisible] = useState(window.innerWidth >= 1080);
  const [isButtonVisible, setIsButtonVisible] = useState(
    window.innerWidth < 1080
  );

  useEffect(() => {
    function handleResize() {
      const isNavVisible = window.innerWidth >= 1080;
      setIsVisible(isNavVisible);
      setIsButtonVisible(!isNavVisible);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isButtonVisible ? (
        <IoMdMenu
          style={{
            position: "fixed",
            top: "50%",
            left: "0%",
            width: "12vw",
            height: "12vh",
          }}
        />
      ) : (
        <nav
          className="navbar"
          style={{ display: isVisible ? "block" : "none" }}
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/mylearning"
                className="nav-link"
                activeClassName="active"
              >
                <FiBook className="nav-icon" />
                <span className="nav-text">My Learning</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/explore"
                className="nav-link"
                activeClassName="active"
              >
                <FiSearch className="nav-icon" />
                <span className="nav-text">Explore</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/cloudlabs"
                className="nav-link"
                activeClassName="active"
              >
                <FiCloud className="nav-icon" />
                <span className="nav-text">Cloud Labs</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/personalisedpaths"
                className="nav-link"
                activeClassName="active"
              >
                <FiUser className="nav-icon" />
                <span className="nav-text">Personalised Paths</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/projects"
                className="nav-link"
                activeClassName="active"
              >
                <FiActivity className="nav-icon" />
                <span className="nav-text">Projects</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/skillpaths"
                className="nav-link"
                activeClassName="active"
              >
                <FiLayers className="nav-icon" />
                <span className="nav-text">Skill Paths</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/assessments"
                className="nav-link"
                activeClassName="active"
              >
                <FiClipboard className="nav-icon" />
                <span className="nav-text">Assessments</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default NavMenu;
