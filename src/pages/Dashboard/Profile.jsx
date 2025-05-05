import React, {useState} from "react";
import {useSelector} from "react-redux";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import Layout from "../../Layoutcomponents/Layout/Layout";
import UserProfile from "../../Component/DashboardComponents/ProfileComponent/UserProfile";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";

const Profile = () => {
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;

  return (
    <>
      <LayoutDesign>
        <BreadCrumb pageName="Profile" />

        {Role === "Admin" && (
          <div>
            <UserProfile user={userdata} />
          </div>
        )}
        {Role === "Client" && (
          <>
            <UserProfile user={userdata} />
          </>
        )}
        {Role === "Employee" && (
          <div>
            <UserProfile user={userdata} />
          </div>
        )}
        {Role === "Contractor" && (
          <>
            <UserProfile user={userdata} />
          </>
        )}
        {Role === "Manager" && (
          <>
            <UserProfile user={userdata} />
          </>
        )}
      </LayoutDesign>
    </>
  );
};

export default Profile;
