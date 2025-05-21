import React, {useState} from "react";
import {useSelector} from "react-redux";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import UserProfile from "../../Component/DashboardComponents/ProfileComponent/UserProfile";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import ClientProfile from "../../Component/DashboardComponents/ProfileComponent/ClientProfile";

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
            <ClientProfile user={userdata} />
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
