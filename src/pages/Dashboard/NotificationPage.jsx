import React, {useEffect, useState} from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import {useSelector} from "react-redux";
import apiInstance from "../../ApiInstance/apiInstance";
import {List, ListItem, ListItemText, Paper} from "@mui/material";
import Empty from "../../common/EmptyFolder/Empty";

const NotificationPage = () => {
  const userdata = useSelector((state) => {
    return state.user.values;
  });
  const [Isadmindata, setIsAdmindata] = useState([]);
  const fetchadminusernotificationfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v1/user/fetch-admin-notification"
      );
      if (response?.data?.success) {
        setIsAdmindata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchadminusernotificationfunc();
  }, [0]);

  return (
    <Layout>
      {userdata?.Role === "Admin" && (
        <>
          {Isadmindata?.length > 0 ? (
            Isadmindata.map((item, index) => {
              return (
                <Paper sx={{my: 1}}>
                  <List>
                    <ListItem key={index} divider>
                      <ListItemText
                        primary={item?.Name}
                        secondary={item?.Description}
                      />
                    </ListItem>
                  </List>
                </Paper>
              );
            })
          ) : (
            <Empty />
          )}
        </>
      )}
      {userdata?.Role === "Manager" && <>Manager</>}
      {userdata?.Role === "Employee" && <>Manager</>}
      {userdata?.Role === "Contractor" && <>Manager</>}
      {userdata?.Role === "Client" && <>Manager</>}
    </Layout>
  );
};

export default NotificationPage;
