import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../common/HeaderTab/HeaderTab";
import { Button } from "@mui/material";

const Profile = () => {
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;
  return (
    <>
      <Layout>
        <BreadCrumb pageName="Profile" />

        {Role === "Admin" && (
          <div>
            <Card>
              <p>FirstName : {userdata.FirstName}</p>
              <p>LastName : {userdata.LastName}</p>
              <p>Email : {userdata.Email}</p>
            </Card>
          </div>
        )}
        {Role === "Client" && <div>Role:{userdata?.Role}</div>}
        {Role === "Employee" && <div>Role:{userdata?.Role}</div>}
        {Role === "Contractor" && <div>Role:{userdata?.Role}</div>}
      </Layout>
    </>
  );
};

export default Profile;
