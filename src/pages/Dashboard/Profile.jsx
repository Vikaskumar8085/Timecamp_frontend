import React from "react";
import {useSelector} from "react-redux";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import Layout from "../../Layoutcomponents/Layout/Layout";
import {Card} from "@mui/material";
import UserProfile from "../../Component/DashboardComponents/ProfileComponent/UserProfile";

const Profile = () => {
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;
  return (
    <>
      <Layout>
        <BreadCrumb pageName="Profile" />

        {Role === "Admin" && (
          <div>
            <UserProfile user={userdata} />
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
