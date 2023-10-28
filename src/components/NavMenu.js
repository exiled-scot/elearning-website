import React from "react";
import { NavLink } from "react-router-dom";
import { FiBook, FiSearch, FiCloud, FiUser, FiActivity, FiLayers, FiClipboard } from "react-icons/fi";
import "./NavMenu.css";

const NavMenu = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/" className="nav-link" activeClassName="active">
            <FiBook className="nav-icon" />
            <span className="nav-text">My Learning</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link" activeClassName="active">
            <FiSearch className="nav-icon" />
            <span className="nav-text">Explore</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link" activeClassName="active">
            <FiCloud className="nav-icon" />
            <span className="nav-text">Cloud Labs</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link" activeClassName="active">
            <FiUser className="nav-icon" />
            <span className="nav-text">Personalised Paths</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link" activeClassName="active">
            <FiActivity className="nav-icon" />
            <span className="nav-text">Projects</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link" activeClassName="active">
            <FiLayers className="nav-icon" />
            <span className="nav-text">Skill Paths</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link" activeClassName="active">
            <FiClipboard className="nav-icon" />
            <span className="nav-text">Assessments</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
