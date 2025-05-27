import React, {useState, useMemo} from "react";
import "./Home.scss";
import {Badge, Grid2, TextField} from "@mui/material";
import logo from "../assets/auth/logo.png";
import BreadCrumb from "../common/BreadCrumb/BreadCrumb";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {NavLink} from "react-router-dom";
import InputFileupload from "../common/InputFileupload/InputFileupload";
import {FiSearch} from "react-icons/fi";
import InputImageUpload from "../common/InputImageUpload/InputImageUpload";

import ProfileForm from "../common/SelectInput/SelectInput";
import DashboardCounter from "../common/DashboardCounter/DashboardCounter";
import InputSelect from "../common/InputSelect/InputSelect";
import InputMultiSelect from "../common/InputMultiSelect/InputCheckboxMulti";
import InputCheckboxMulti from "../common/InputMultiSelect/InputCheckboxMulti";

import ClientStatusChart from "./ClientStatusChart";
import Pagination from "../common/Pagination/Pagination";
import Table from "../common/Table/Table";
import InputSearch from "../common/InputSearch/InputSearch";
import StatCard from "./StatCard";

const Home = () => {
  const [show, setShow] = React.useState(false);
  const [isnotification, setisnotification] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(null);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  const skillOptions = [
    {value: "html", label: "HTML"},
    {value: "css", label: "CSS"},
    {value: "js", label: "JavaScript"},
    {value: "react", label: "React"},
  ];
  console.log(selectedValue, "asdf");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  // const toggleDropdown = (index) => {
  //   setDropdownOpen(dropdownOpen === index ? null : index);
  // };
  const notifications = [
    {
      id: 1,
      avatar: "https://i.pravatar.cc/40?img=1",
      title: "New message from Ayush",
      time: "5 minutes ago",
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/40?img=2",
      title: "Timesheet submitted",
      time: "30 minutes ago",
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/40?img=2",
      title: "Timesheet submitted",
      time: "30 minutes ago",
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/40?img=2",
      title: "Timesheet submitted",
      time: "30 minutes ago",
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/40?img=2",
      title: "Timesheet submitted",
      time: "30 minutes ago",
    },
    {
      id: 3,
      avatar: "https://i.pravatar.cc/40?img=3",
      title: "Your leave was approved",
      time: "2 hours ago",
    },
  ];
  // / Sample static data
  // Dummy data
  const dummyData = Array.from({length: 42}, (_, i) => ({
    id: i + 1,
    name: `Item #${i + 1}`,
    status: i % 2 === 0 ? "Active" : "Inactive",
  }));

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dummyData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyData.slice(indexOfFirstItem, indexOfLastItem);

  const handleJumpInputChange = (e) => {
    const input = parseInt(e.target.value);
    if (!isNaN(input) && input >= 1 && input <= totalPages) {
      setCurrentPage(input);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="wrapper_header">
          <div className="header_leftside">
            <img src={logo} alt="logo" />

            <div className="leftside_text">
              <h1>timecamp</h1>
              <p>Time Tracking Software</p>
            </div>

            <div className="search_input_wrapper">
              <FiSearch className="search_icon" />
              <input
                type="text"
                placeholder="Search for project, task, employees & clients"
              />
            </div>
          </div>

          <div className="header_rightside">
            {/* notification design */}
            <div className="header_rightside_notification">
              <Badge badgeContent={notifications.length} color="primary">
                <NotificationsIcon
                  style={{color: "red"}}
                  onClick={() => setisnotification(!isnotification)}
                  className="notification_icon"
                />
              </Badge>
              {isnotification && (
                <div className="notification-dropdown">
                  <div className="dropdown-header">Notifications</div>
                  <div className="dropdown-content">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div className="notification-item" key={notif.id}>
                          <img
                            src={notif.avatar}
                            alt="avatar"
                            className="avatar"
                          />
                          <div className="info">
                            <div className="title">{notif.title}</div>
                            <div className="timestamp">{notif.time}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="empty-message">No new notifications</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* notification design */}
            {/* profile compoent design */}
            <div className="profile-wrapper" onClick={() => setShow(!show)}>
              <div className="profile-info">
                <img
                  src="https://i.pravatar.cc/48?img=12"
                  alt="Admin Avatar"
                  className="avatar"
                />
                <div className="details">
                  <span className="name">John Doe</span>
                  <span className="role">Admin</span>
                </div>
                <svg
                  className={`chevron ${show ? "open" : ""}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.192l3.71-3.96a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {show && (
                <div className="dropdown-menu">
                  <a href="/profile">👤 My Profile</a>
                  <a href="#">🚪 Sign Out</a>
                </div>
              )}
            </div>
            {/* profile compoent design */}
          </div>
        </div>
        <div className="wrapper_box">
          {/* sidebar */}
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
                  <span className="chevron">
                    {dropdownOpen === 0 ? "−" : "+"}
                  </span>
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
                  <span className="chevron">
                    {dropdownOpen === 1 ? "−" : "+"}
                  </span>
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

          {/* sidebar */}
          <div className="wrapper_content">
            <BreadCrumb pageName="Home" />

            <InputCheckboxMulti
              labelText="Select Your Skills"
              options={skillOptions}
              selected={selectedSkills}
              onChange={setSelectedSkills}
            />
            <InputImageUpload />
            <ProfileForm />
            <InputSelect
              labelText="Select Designation"
              placeholder="---please select designation---"
              onChange={handleChange}
              value={selectedValue}
              options={[
                {id: 1, value: "admin", label: "Admin"},
                {id: 2, value: "manager", label: "Manager"},
                {id: 3, value: "employee", label: "Employee"},
              ]}
            />

            <InputSearch />

            {/* <ClientStatusChart /> */}

            {/* <DashboardCounter /> */}

            <StatCard />
            <div
              style={{maxWidth: "800px", margin: "2rem auto", padding: "1rem"}}
            >
              <h1 style={{textAlign: "center"}}>Paginated Dummy Table</h1>

              <Table
                data={currentItems}
                columns={[
                  {header: "ID", accessor: "id"},
                  {header: "Name", accessor: "name"},
                  {header: "Status", accessor: "status"},
                ]}
              />

              <div style={{margin: "1rem 0", textAlign: "center"}}>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  placeholder="Jump to page"
                  onChange={handleJumpInputChange}
                  style={{padding: "0.5rem", width: "120px"}}
                />
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
