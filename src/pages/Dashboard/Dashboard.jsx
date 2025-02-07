import React from "react";
import {Container, Grid} from "@mui/material";
import {useSelector} from "react-redux";
import Admindashboard from "../../Component/DashboardComponents/Admindashboard";
import Layout from "../../Layoutcomponents/Layout/Layout";

const Dashboard = () => {
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;
  return (
    <Layout>
      {Role === "Admin" && (
        <div>
          <div>Dashboard:{userdata?.Role}</div>
          <Admindashboard />
        </div>
      )}
      {Role === "Client" && <div>Dashboard:{userdata?.Role}</div>}
      {Role === "Employee" && <div>Dashboard:{userdata?.Role}</div>}
      {Role === "Contractor" && <div>Dashboard:{userdata?.Role}</div>}
    </Layout>
  );
};

export default Dashboard;
