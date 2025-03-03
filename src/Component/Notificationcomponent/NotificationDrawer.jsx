import React, {useEffect, useState} from "react";
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
import {fetchuserNotificationapicall} from "../../ApiServices/AdminApiServices/Admin";
import {useSelector} from "react-redux";

const NotificationDrawer = () => {
  const userdata = useSelector((state) => {
    return state.user.values;
  });

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [notification, setNotification] = useState("");
  const [usernotificationdata, setusernotificationdata] = useState([]);
  console.log(usernotificationdata, "admin");
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

  const fetchusernotificationfunc = async () => {
    try {
      const response = await fetchuserNotificationapicall();
      if (response?.success) {
        setusernotificationdata(response?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchusernotificationfunc();
  }, [0]);

  return (
    <div>
      <Badge
        badgeContent={usernotificationdata.length}
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
            {usernotificationdata.map((notification, index) => (
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
                    {notification.Name}
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
