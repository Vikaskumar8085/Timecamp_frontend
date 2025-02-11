import React, {useState} from "react";
import {
  Drawer,
  Button,
  Snackbar,
  Stack,
  Badge,
  Avatar,
  Box,
  Container,
  Alert,
  Typography,
} from "@mui/material";
import {Notifications} from "@mui/icons-material";

const NotificationDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [notification, setNotification] = useState("");

  const toggleDrawer = (open) => {
    setOpenDrawer(open);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const showNotification = (message) => {
    setNotification(message);
    setOpenSnackbar(true);
  };

  const notifications = [
    "New message from John",
    "Your order has been shipped",
    "Server maintenance scheduled for midnight",
    "Server maintenance scheduled for midnight",
    "Server maintenance scheduled for midnight",
    "Server maintenance scheduled for midnight",
    "Server maintenance scheduled for midnight",
    "Server maintenance scheduled for midnight",
    "Server maintenance scheduled for midnight",
    "Server maintenance scheduled for midnight",
  ];

  return (
    <div>
      <Badge
        badgeContent={notifications.length}
        sx={{
          margin: "0px 10px",
        }}
        onClick={() => toggleDrawer(true)}
      >
        <Notifications color="#2c3e50" />
      </Badge>

      {/* Drawer for notifications */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => toggleDrawer(false)}
        // sx={{
        //   width: 250,
        //   flexShrink: 0,
        //   "& .MuiDrawer-paper": {
        //     width: 550,
        //     paddingTop: 5,
        //     backgroundColor: "#f4f4f9",
        //     padding: 2,
        //   },
        // }}
      >
        <Container maxWidth="sm" sx={{p: 2}}>
          <Stack spacing={2}>
            <h3>Notifications</h3>
            {notifications.map((notification, index) => (
              <>
                <Alert sx={{display: "flex", alignItems: "center"}}>
                  <Avatar
                    sx={{
                      margin: "0px 10px",
                    }}
                  />
                  <Typography
                    key={index}
                    sx={{margin: "10px 0px"}}
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => showNotification(notification)}
                  >
                    {notification}
                  </Typography>
                </Alert>
              </>
            ))}
          </Stack>
        </Container>
      </Drawer>

      {/* Snackbar for showing notification messages */}
      <Snackbar
        open={openSnackbar}
        message={notification}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{vertical: "bottom", horizontal: "center"}}
      />
    </div>
  );
};

export default NotificationDrawer;
