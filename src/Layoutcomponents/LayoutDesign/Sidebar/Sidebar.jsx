import React from "react";
import {NavLink} from "react-router-dom";
import logo from "../../../assets/auth/logo.png";

const Sidebar = ({toggleDropdown, dropdownOpen}) => {
  return (
    <>
      {" "}
      <div className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="Logo" />
        </div>

        <ul className="menu">
          {/* Item with dropdown */}
          <li className={`menu-item ${dropdownOpen === 0 ? "open" : ""}`}>
            <div className="menu-main" onClick={() => toggleDropdown(0)}>
              <div className="menu-icon-box">
                <span className="icon">🏠</span>
                <span className="label">Home</span>
              </div>
              <span className="chevron">{dropdownOpen === 0 ? "−" : "+"}</span>
            </div>
            {dropdownOpen === 0 && (
              <ul className="submenu">
                <li>
                  <NavLink to="/home/item1">Sub Item 1</NavLink>
                </li>
                <li>
                  <NavLink to="/home/item2">Sub Item 2</NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Icon-only item */}
          <li className="menu-item">
            <div className="menu-main">
              <span className="icon">📊</span>
              <NavLink
                to="/dashboard"
                className={({isActive}) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                Dashboard
              </NavLink>
            </div>
          </li>

          {/* Another item with dropdown */}
          <li className={`menu-item ${dropdownOpen === 1 ? "open" : ""}`}>
            <div className="menu-main" onClick={() => toggleDropdown(1)}>
              <span className="icon">📁</span>
              <span className="label">Files</span>
              <span className="chevron">{dropdownOpen === 1 ? "−" : "+"}</span>
            </div>
            {dropdownOpen === 1 && (
              <ul className="submenu">
                <li>
                  <NavLink to="/files/docs">Docs</NavLink>
                </li>
                <li>
                  <NavLink to="/files/media">Media</NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
