import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {Badge} from "@mui/material";
const Notification = ({isnotification, notifications, setisnotification}) => {
  return (
    <>
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
                    <img src={notif.avatar} alt="avatar" className="avatar" />
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
    </>
  );
};

export default Notification;
