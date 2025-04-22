import React from "react";
import "./Home.scss";
import {Grid2} from "@mui/material";
import logo from "../assets/auth/logo.png";
import BreadCrumb from "../common/BreadCrumb/BreadCrumb";
const Home = () => {
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
              <h1>Notification</h1>
            </div>
            <div className="header_rightside_profile">
              <h1>Profile</h1>
            </div>
          </div>
        </div>
        <div className="wrapper_box">
          {/* sidebar */}
          <div className="wrapper_sidebar">
            <ul>
              <li>Dashboard</li>
              <li>Projects</li>
              <li>Reports</li>
              <li>Settings</li>
            </ul>
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
