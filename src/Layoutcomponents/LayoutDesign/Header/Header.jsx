import React from "react";
import Notification from "../Notification/Notification";
import Profile from "../Profile/Profile";
import {FiSearch} from "react-icons/fi";
import logo from "../../../assets/auth/logo.png";
const Header = () => {
  const [show, setShow] = React.useState(false);
  const [isnotification, setisnotification] = React.useState(false);
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
  return (
    <>
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
          <Notification
            isnotification={isnotification}
            notifications={notifications}
            setisnotification={setisnotification}
          />
          {/* notification design */}
          {/* profile compoent design */}
          <Profile show={show} setShow={setShow} />
          {/* profile compoent design */}
        </div>
      </div>
    </>
  );
};

export default Header;
