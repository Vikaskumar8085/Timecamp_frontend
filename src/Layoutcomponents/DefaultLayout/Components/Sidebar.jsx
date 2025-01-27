import React from "react";
import "./sidebar.css";
const Sidebar = () => {
  return (
    <>
      <aside className="sidebar">
        <ul className="sidebar_menu">
          <li className="sidebar_item">
            <a href="#" className="sidebar_link">
              Dashboard
            </a>
          </li>
          <li className="sidebar_item">
            <a href="#" className="sidebar_link">
              Users
            </a>
          </li>
          <li className="sidebar_item">
            <a href="#" className="sidebar_link">
              Settings
            </a>
          </li>
          <li className="sidebar_item">
            <a href="#" className="sidebar_link">
              Reports
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
