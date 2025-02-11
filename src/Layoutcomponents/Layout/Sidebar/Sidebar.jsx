import React from "react";
import {NavLink} from "react-router-dom";
import {FaUserTie, FaBuilding, FaUserShield} from "react-icons/fa";
const Sidebar = ({setDropdownOpen, isOpen, dropdownOpen, Role}) => {
  const toggleDropdown = (menu) => {
    setDropdownOpen((prev) => ({...prev, [menu]: !prev[menu]}));
  };
  return (
    <div className={`layout_wrapper_sidebar ${isOpen ? "open" : "closed"}`}>
      <nav className="sidebar_menu">
        {Role === "Admin" && (
          <ul>
            <li>
              <NavLink
                to={"/dashboard"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/company"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Company
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/profile"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Admin
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/task"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Task
              </NavLink>
            </li>

            <li className="dropdown">
              <button
                className="dropdown_btn"
                onClick={() => toggleDropdown("client")}
              >
                Client <span>{dropdownOpen.client ? "▲" : "▼"}</span>
              </button>
              <ul
                className={`dropdown_menu ${
                  dropdownOpen.client ? "show" : "hide"
                }`}
              >
                <li>
                  <NavLink to="/client" className="nav_link">
                    <FaUserTie className="icon" /> All Client
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/active-client" className="nav_link">
                    <FaBuilding className="icon" /> Active Client
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/inactive-client" className="nav_link">
                    <FaUserShield className="icon" /> Inactive Client
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Dead-client" className="nav_link">
                    <FaUserShield className="icon" /> Dead Client
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="dropdown">
              <button
                className="dropdown_btn"
                onClick={() => toggleDropdown("Employee")}
              >
                Employee <span>{dropdownOpen.Employee ? "▲" : "▼"}</span>
              </button>
              <ul
                className={`dropdown_menu ${
                  dropdownOpen.Employee ? "show" : "hide"
                }`}
              >
                <li>
                  <NavLink to="/employee" className="nav_link">
                    <FaUserTie className="icon" /> All Employee
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/active-employee" className="nav_link">
                    <FaBuilding className="icon" /> Active Employee
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/inactive-employee" className="nav_link">
                    <FaUserShield className="icon" /> Inactive Employee
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="dropdown">
              <button
                className="dropdown_btn"
                onClick={() => toggleDropdown("Contractor")}
              >
                Contractor <span>{dropdownOpen?.Contractor ? "▲" : "▼"}</span>
              </button>
              <ul
                className={`dropdown_menu ${
                  dropdownOpen.Contractor ? "show" : "hide"
                }`}
              >
                <li>
                  <NavLink to="/contractor" className="nav_link">
                    <FaUserTie className="icon" /> All Contractor
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/active-contractor" className="nav_link">
                    <FaBuilding className="icon" /> Active Contractor
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/inactive-contractor" className="nav_link">
                    <FaUserShield className="icon" /> Inactive Contractor
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <button
                className="dropdown_btn"
                onClick={() => toggleDropdown("TimeSheet")}
              >
                TimeSheet <span>{dropdownOpen?.TimeSheet ? "▲" : "▼"}</span>
              </button>
              <ul
                className={`dropdown_menu ${
                  dropdownOpen.TimeSheet ? "show" : "hide"
                }`}
              >
                <li>
                  <NavLink to="/timesheet" className="nav_link">
                    <FaUserTie className="icon" /> Timesheet
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timesheet/project-time" className="nav_link">
                    <FaBuilding className="icon" /> Project Time
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timesheet/time-summary" className="nav_link">
                    <FaUserShield className="icon" /> Time summary
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <button
                className="dropdown_btn"
                onClick={() => toggleDropdown("masters")}
              >
                Masters <span>{dropdownOpen.masters ? "▲" : "▼"}</span>
              </button>
              <ul
                className={`dropdown_menu ${
                  dropdownOpen.masters ? "show" : "hide"
                }`}
              >
                <li>
                  <NavLink to="/master/designation" className="nav_link">
                    <FaUserTie className="icon" /> Designation
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/master/department" className="nav_link">
                    <FaBuilding className="icon" /> Department
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/master/roles" className="nav_link">
                    <FaUserShield className="icon" /> Roles
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <button
                className="dropdown_btn"
                onClick={() => toggleDropdown("Project")}
              >
                Project <span>{dropdownOpen.masters ? "▲" : "▼"}</span>
              </button>
              <ul
                className={`dropdown_menu ${
                  dropdownOpen.Project ? "show" : "hide"
                }`}
              >
                <li>
                  <NavLink to="/project" className="nav_link">
                    <FaUserTie className="icon" /> Project
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/active-projects" className="nav_link">
                    <FaBuilding className="icon" /> Active Project
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/inactive-projects" className="nav_link">
                    <FaUserShield className="icon" /> Inactive Projects
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>Logout</li>
          </ul>
        )}

        {Role === "Client" && (
          <ul>
            <li>
              <NavLink
                to={"/dashboard"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/profile"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/task"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Task
              </NavLink>
            </li>
            <li className="dropdown">
              <button
                className="dropdown_btn"
                onClick={() => toggleDropdown("Project")}
              >
                Project <span>{dropdownOpen.masters ? "▲" : "▼"}</span>
              </button>
              <ul
                className={`dropdown_menu ${
                  dropdownOpen.Project ? "show" : "hide"
                }`}
              >
                <li>
                  <NavLink to="/project" className="nav_link">
                    <FaUserTie className="icon" /> Project
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/active-projects" className="nav_link">
                    <FaBuilding className="icon" /> Active Project
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/inactive-projects" className="nav_link">
                    <FaUserShield className="icon" /> Inactive Projects
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        )}
        {Role === "Employee" && (
          <>
            <ul>
              <li>
                <NavLink
                  to={"/dashboard"}
                  className="nav_link"
                  style={({isActive}) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/profile"}
                  className="nav_link"
                  style={({isActive}) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/task"}
                  className="nav_link"
                  style={({isActive}) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  Task
                </NavLink>
              </li>
              <li className="dropdown">
                <button
                  className="dropdown_btn"
                  onClick={() => toggleDropdown("Project")}
                >
                  Project <span>{dropdownOpen.masters ? "▲" : "▼"}</span>
                </button>
                <ul
                  className={`dropdown_menu ${
                    dropdownOpen.Project ? "show" : "hide"
                  }`}
                >
                  <li>
                    <NavLink to="/project" className="nav_link">
                      <FaUserTie className="icon" /> Project
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/active-projects" className="nav_link">
                      <FaBuilding className="icon" /> Active Project
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/inactive-projects" className="nav_link">
                      <FaUserShield className="icon" /> Inactive Projects
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </>
        )}
        {Role === "Contractor" && (
          <>
            <ul>
              <li>
                <NavLink
                  to={"/dashboard"}
                  className="nav_link"
                  style={({isActive}) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/profile"}
                  className="nav_link"
                  style={({isActive}) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/task"}
                  className="nav_link"
                  style={({isActive}) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  Task
                </NavLink>
              </li>
              <li className="dropdown">
                <button
                  className="dropdown_btn"
                  onClick={() => toggleDropdown("Project")}
                >
                  Project <span>{dropdownOpen.masters ? "▲" : "▼"}</span>
                </button>
                <ul
                  className={`dropdown_menu ${
                    dropdownOpen.Project ? "show" : "hide"
                  }`}
                >
                  <li>
                    <NavLink to="/project" className="nav_link">
                      <FaUserTie className="icon" /> Project
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/active-projects" className="nav_link">
                      <FaBuilding className="icon" /> Active Project
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/inactive-projects" className="nav_link">
                      <FaUserShield className="icon" /> Inactive Projects
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </>
        )}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
