import {useState} from "react";
import {Link} from "react-router-dom";
import {FiHome, FiUsers, FiChevronDown, FiMenu} from "react-icons/fi";

const Sidebar = ({isOpen, setIsOpen, isSidebarOpen, setIsSidebarOpen}) => {
  return (
    <div className={`layout_sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <button
        className="sidebar_toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FiMenu />
      </button>
      <ul>
        <li>
          <Link to="/dashboard" className="menu_item">
            <FiHome /> <span>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link to="/admin" className="menu_item">
            <FiHome /> <span>Admin</span>
          </Link>
        </li>

        <li>
          <Link to="/client" className="menu_item">
            <FiHome /> <span>Client</span>
          </Link>
        </li>

        <li>
          <Link to="/employee" className="menu_item">
            <FiHome /> <span>Employee</span>
          </Link>
        </li>
        <li>
          <Link to="/contractor" className="menu_item">
            <FiHome /> <span>Contractor</span>
          </Link>
        </li>

        <li>
          <Link to="/project" className="menu_item">
            <FiHome /> <span>Project</span>
          </Link>
        </li>
        <li>
          <Link to="/project-upload" className="menu_item">
            <FiHome /> <span>Project Upload</span>
          </Link>
        </li>

        <li>
          <Link to="/task" className="menu_item">
            <FiHome /> <span>Task</span>
          </Link>
        </li>
        <li>
          <Link to="/task-upload" className="menu_item">
            <FiHome /> <span>Task Uplaod</span>
          </Link>
        </li>

        <li>
          <Link to="/timesheet" className="menu_item">
            <FiHome /> <span>TimeSheet</span>
          </Link>
        </li>

        <li>
          <Link to="/master/department" className="menu_item">
            <FiHome /> <span>Department</span>
          </Link>
        </li>
        <li>
          <Link to="/master/designation" className="menu_item">
            {" "}
            <FiHome /> <span>Designation</span>
          </Link>
        </li>
        <li>
          <Link className="menu_item" to="/master/roles">
            <FiHome /> <span>Roles</span>
          </Link>
        </li>

        {/* <li className="dropdown">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="dropdown_toggle menu_item"
          >
            <FiUsers /> <span>Client</span>{" "}
            <FiChevronDown className={`icon ${isOpen ? "rotate" : ""}`} />
          </button>
          <ul className={`dropdown_menu ${isOpen ? "open" : ""}`}>
            <li>
              <Link to="/client/active" className="menu_item">
                Active Client
              </Link>
            </li>
            <li>
              <Link to="/client/deactive" className="menu_item">
                Deactive Client
              </Link>
            </li>
            <li>
              <Link to="/client/dead" className="menu_item">
                Dead Client
              </Link>
            </li>
          </ul>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
