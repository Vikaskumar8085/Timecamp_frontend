import React from "react";
import "./Home.scss";

const Home = () => {
  return (
    <>
      <div className="parent">
        <div className="div1">Admin Dashboard</div>
        <div className="div2 sidebar">
          <ul>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">Users</a>
            </li>
            <li>
              <a href="#">Projects</a>
            </li>
            <li>
              <a href="#">Reports</a>
            </li>
            <li>
              <a href="#">Settings</a>
            </li>
          </ul>
        </div>
        <div className="div3 content">
          <h2>Welcome, Admin</h2>
          <p>
            This is your dashboard overview. Select a menu item to begin
            managing your system.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
