import React from "react";
import {useSelector} from "react-redux";
import Layout from "../../Layoutcomponents/Layout/Layout";
import DashCounter from "../../Component/DashboardComponents/Admin/DashCounter";
import ProductivityLeaderBoard from "../../Component/DashboardComponents/Admin/ProductivityLeaderBoard";
import RecentProjects from "../../Component/DashboardComponents/Admin/RecentProjects";
import RecentTimesheet from "../../Component/DashboardComponents/Admin/RecentTimesheet";
import EmployeeTimeHours from "../../Component/DashboardComponents/Admin/EmployeeTimeHours";
import Managerdashboardheader from "../../Component/DashboardComponents/Manager/Managerdashboardheader";
import {Box, Paper} from "@mui/material";
import {Link} from "react-router-dom";
import ManagerProductivityLeaderboard from "../../Component/DashboardComponents/Manager/ManagerProductivityLeaderboard";

const Dashboard = () => {
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;
  return (
    <Layout>
      {Role === "Admin" && (
        <>
          <DashCounter />
          <ProductivityLeaderBoard />
          <RecentProjects />
          <RecentTimesheet />
          <EmployeeTimeHours />
        </>
      )}
      {Role === "Client" && <div>Dashboard:{userdata?.Role}</div>}
      {Role === "Employee" && (
        <>
          {" "}
          <div>
            <h1>employee header counter</h1>
          </div>
          <div>
            <h1>Employee Project Time hour</h1>
          </div>
          <div>
            <h1>Recent Project</h1>
          </div>
        </>
      )}
      {Role === "Contractor" && <div>Dashboard:{userdata?.Role}</div>}
      {Role === "Manager" && (
        <div>
          <Managerdashboardheader />
          <ManagerProductivityLeaderboard />
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
