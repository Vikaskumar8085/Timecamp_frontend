import React from "react";
import {Link} from "react-router-dom";

const Profile = ({setShow, show}) => {
  return (
    <>
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
            <Link to="/profile">👤 My Profile</Link>
            <Link to="/change-password">&#x1F512; Change Password</Link>
            <a
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
            >
              🚪 Sign Out
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
