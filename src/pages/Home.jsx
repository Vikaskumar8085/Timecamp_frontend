import React from "react";
import "./Home.scss";
import {Badge, Grid2} from "@mui/material";
import logo from "../assets/auth/logo.png";
import BreadCrumb from "../common/BreadCrumb/BreadCrumb";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {Link} from "react-router-dom";

const Home = () => {
  const [show, setShow] = React.useState(false);

  const [isopen, setisopen] = React.useState(false);
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
                <NotificationsIcon color="action" />
              </Badge>
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
              <ul>
                <li>
                  <div className="sidebarnav">
                    <span>Icon</span> <Link>Home</Link>
                  </div>
                </li>

                <li>
                  <div className="sidebarnav">
                    <button
                      className="drop-down"
                      onClick={() => setisopen(!isopen)}
                    >
                      dropdown
                      <span>{isopen == true ? "<" : ">"}</span>
                    </button>
                    {isopen === true ? (
                      <ul>
                        <li>
                          <span>data drop 1 </span>
                          <span>data drop 2</span>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </div>
                </li>
              </ul>
            </nav>
          </div>
          {/* sidebar */}
          <div className="wrapper_content">
            <BreadCrumb pageName="Home" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
