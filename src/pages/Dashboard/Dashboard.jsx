import React from "react";
import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Admindashboard from "../../Component/DashboardComponents/Admindashboard";
import Layout from "../../Layoutcomponents/Layout/Layout";
import DashCounter from "../../Component/DashboardComponents/Admin/DashCounter";

const Dashboard = () => {
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;
  return (
    <Layout>
      {Role === "Admin" && (
        <>
          <DashCounter />
        </>
      )}
      {Role === "Client" && <div>Dashboard:{userdata?.Role}</div>}
      {Role === "Employee" && <div>Dashboard:{userdata?.Role}</div>}
      {Role === "Contractor" && <div>Dashboard:{userdata?.Role}</div>}
    </Layout>
  );
};

export default Dashboard;
