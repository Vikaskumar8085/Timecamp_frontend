import React, { useEffect, useState } from "react";
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
import { Notifications } from "@mui/icons-material";
import { fetchuserNotificationapicall } from "../../ApiServices/AdminApiServices/Admin";
import { useSelector } from "react-redux";
import Empty from "../../common/EmptyFolder/Empty";
import apiInstance from "../../ApiInstance/apiInstance";

const NotificationDrawer = () => {
  const userdata = useSelector((state) => {
    return state.user.values;
  });

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [notification, setNotification] = useState("");
  const [usernotificationdata, setusernotificationdata] = useState([]);
  const [isclientnotificationdata, setclientnotificationdata] = useState([]);
  const [isEmployeeNotificationdata, setIsEmployeeNotificationdata] = useState(
    []
  );
  const [IsContractorNotification, setIsContractorNotificationdata] = useState(
    []
  );
  const [IsManagerNotification, setIsManagerNotificationdata] = useState([]);
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

  // fetch client notification
  const fetchclientnotificationfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/client/fetch-client-notification"
      );
      if (response?.data.success) {
        setclientnotificationdata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  // fetch user notification

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

  const fetchemployeenotificationfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/employee/fetch-employee-notification"
      );
      if (response?.data?.success) {
        setIsEmployeeNotificationdata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchcontractornotificationfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/contractor/fetch-contractor-notification"
      );
      if (response?.data?.success) {
        setIsContractorNotificationdata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchmanagernotificationfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/manager/fetch-manager-notification"
      );
      if (response?.data?.success) {
        setIsManagerNotificationdata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  useEffect(() => {
    fetchusernotificationfunc();
    fetchclientnotificationfunc();
    fetchemployeenotificationfunc();
    fetchcontractornotificationfunc();
    fetchmanagernotificationfunc();
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
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 300,
            paddingTop: 5,
            backgroundColor: "#f4f4f9",
            padding: 2,
          },
        }}
      >
        <Container maxWidth="sm" sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h5">Notifications</Typography>
            {userdata?.Role === "Admin" && (
              <>
                {usernotificationdata.length > 0 ? (
                  usernotificationdata?.map((item, index) => {
                    return (
                      <ul>
                        <li>{item?.Name}</li>
                        <li>{item?.Description}</li>
                      </ul>
                    );
                  })
                ) : (
                  <Empty />
                )}
              </>
            )}
            {userdata?.Role === "Client" && (
              <>
                {isclientnotificationdata?.length > 0 ? (
                  isclientnotificationdata.map((item, index) => {
                    return (
                      <ul>
                        <li>{item?.Name}</li>
                        <li>{item?.Description}</li>
                      </ul>
                    );
                  })
                ) : (
                  <Empty />
                )}
              </>
            )}
            {userdata?.Role === "Employee" && (
              <>
                {isEmployeeNotificationdata?.length > 0 ? (
                  isEmployeeNotificationdata.map((item, index) => {
                    return (
                      <ul>
                        <li>{item?.Name}</li>
                        <li>{item?.Description}</li>
                      </ul>
                    );
                  })
                ) : (
                  <Empty />
                )}
              </>
            )}
            {userdata?.Role === "Contractor" && (
              <>
                {IsContractorNotification?.length > 0 ? (
                  IsContractorNotification.map((item, index) => {
                    return (
                      <ul>
                        <li>{item?.Name}</li>
                        <li>{item?.Description}</li>
                      </ul>
                    );
                  })
                ) : (
                  <Empty />
                )}
              </>
            )}
            {userdata?.Role === "Manager" && (
              <>
                {IsManagerNotification?.length > 0 ? (
                  IsManagerNotification.map((item, index) => {
                    return (
                      <ul>
                        <li>{item?.Name}</li>
                        <li>{item?.Description}</li>
                      </ul>
                    );
                  })
                ) : (
                  <Empty />
                )}
              </>
            )}
          </Stack>
        </Container>
      </Drawer>

      {/* Snackbar for showing notification messages */}
      <Snackbar
        open={openSnackbar}
        message={notification}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
};

export default NotificationDrawer;
