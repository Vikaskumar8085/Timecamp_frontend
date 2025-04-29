import React from "react";
import "./Home.scss";
import {Badge, Grid2, TextField} from "@mui/material";
import logo from "../assets/auth/logo.png";
import BreadCrumb from "../common/BreadCrumb/BreadCrumb";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {NavLink} from "react-router-dom";

import Button from "../common/Button/Button";
import TModal from "../common/Modal/TModal";
import InputFileupload from "../common/InputFileupload/InputFileupload";

const Home = () => {
  const [show, setShow] = React.useState(false);
  const [isOpenmodel, setisopenModle] = React.useState(false);
  const [isnotification, setisnotification] = React.useState(false);
  const [isopen, setisopen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(null);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <>
      <div className="wrapper">
        <div className="wrapper_header">
          <div className="header_leftside">
            <img src={logo} alt="" srcset="" />
            <div className="leftside_text">
              <h1>timecamp</h1>
              <p>Time Tracking Software</p>
            </div>
            <input
              type="text"
              placeholder="search for Project , Task ,employees & clients"
            />
          </div>
          <div className="header_rightside">
            <div className="header_rightside_notification">
              <Badge badgeContent={4} color="primary">
                <NotificationsIcon
                  style={{color: "red"}}
                  onClick={() => setisnotification(!isnotification)}
                  className="notification_icon"
                />
              </Badge>
              {isnotification && (
                <div className="notification_dropdown">
                  <p>No new notifications</p>
                </div>
              )}
            </div>
            <div
              className="header_rightside_profile"
              onClick={() => setShow(!show)}
            >
              <h1>Profile ⌄</h1>
              {show && (
                <div className="dropdown">
                  <a href="/profile">My Profile</a>
                  <a href="#">Sign Out</a>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="wrapper_box">
          {/* sidebar */}
          <div className="wrapper_sidebar">
            <div className="sidebar_logo">
              <img src={logo} alt="" srcset="" />
            </div>
            <nav className="sidebar_nav">
              <div className="sidebarnav">
                {/* First item with dropdown */}
                <div className="sidebar-box">
                  <div className="nav_leftsidebar">
                    <span className="nav_icon">🏠</span>
                    <NavLink
                      to="/home"
                      className={({isActive}) =>
                        isActive ? "nav_link active" : "nav_link"
                      }
                      style={{color: "black"}}
                    >
                      Home
                    </NavLink>
                  </div>
                  <div
                    className="nav_rightsidebar"
                    onClick={() => toggleDropdown(0)}
                  >
                    {dropdownOpen === 0 ? "−" : "+"}
                  </div>
                </div>

                {dropdownOpen === 0 && (
                  <div className="dropdown_container">
                    <NavLink to="/home/item1" className="dropdown_item">
                      Sub Item 1
                    </NavLink>
                    <NavLink to="/home/item2" className="dropdown_item">
                      Sub Item 2
                    </NavLink>
                  </div>
                )}

                {/* Second item with dropdown */}
                <div className="sidebar-box">
                  <div className="nav_leftsidebar">
                    <span className="nav_icon">📁</span>
                    <NavLink
                      to="/files"
                      className={({isActive}) =>
                        isActive ? "nav_link active" : "nav_link"
                      }
                      style={{color: "black"}}
                    >
                      Files
                    </NavLink>
                  </div>
                  <div
                    className="nav_rightsidebar"
                    onClick={() => toggleDropdown(1)}
                  >
                    {dropdownOpen === 1 ? "−" : "+"}
                  </div>
                </div>

                {dropdownOpen === 1 && (
                  <div className="dropdown_container">
                    <NavLink to="/files/docs" className="dropdown_item">
                      Docs
                    </NavLink>
                    <NavLink to="/files/media" className="dropdown_item">
                      Media
                    </NavLink>
                  </div>
                )}
              </div>
            </nav>
          </div>
          {/* sidebar */}
          <div className="wrapper_content">
            <BreadCrumb pageName="Home" />
            <InputFileupload />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
