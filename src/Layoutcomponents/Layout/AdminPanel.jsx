import React, { useState } from "react";
import "./style.css";

const AdminPanel = () => {
  const [IsToggle, setIsToggle] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Toggle function for dropdowns
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <div className="wrapper">
      <div className="wrapper-row">
        {IsToggle && (
          <div className="wrapper-sidebar">
            <div style={{ padding: "20px", maxWidth: "300px" }}>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {/* First Dropdown */}
                <li style={{ marginBottom: "10px", position: "relative" }}>
                  <button
                    onClick={() => toggleDropdown("menu1")}
                    style={{ width: "100%", padding: "20px" }}
                  >
                    Button 1
                  </button>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: "10px",

                      marginTop: "5px",
                      background: "#f4f4f4",
                      borderRadius: "5px",
                      display: openDropdown === "menu1" ? "block" : "none",
                      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/">Dashboard</a>
                    </li>
                  </ul>
                </li>

                {/* Second Dropdown */}
                <li style={{ position: "relative" }}>
                  <button
                    onClick={() => toggleDropdown("menu2")}
                    style={{ width: "100%", padding: "20px" }}
                  >
                    Button 2
                  </button>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: "10px",
                      marginTop: "5px",
                      background: "#f4f4f4",
                      borderRadius: "5px",
                      display: openDropdown === "menu2" ? "block" : "none",
                      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/">Dashboard</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        )}
        <div
          className={"wrapper-box"}
          style={{ marginLeft: IsToggle ? "280px" : "0px" }}
        >
          <div className="wrapper-header">
            <button
              onClick={() => {
                setIsToggle(!IsToggle);
              }}
            >
              click
            </button>
          </div>
          <div className="wrapper-main">
            <h1>main box</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
