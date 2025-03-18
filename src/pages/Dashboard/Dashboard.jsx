import React from "react";
import {useSelector} from "react-redux";
import Layout from "../../Layoutcomponents/Layout/Layout";
import DashCounter from "../../Component/DashboardComponents/Admin/DashCounter";
import ProductivityLeaderBoard from "../../Component/DashboardComponents/Admin/ProductivityLeaderBoard";
import RecentProjects from "../../Component/DashboardComponents/Admin/RecentProjects";
import RecentTimesheet from "../../Component/DashboardComponents/Admin/RecentTimesheet";
import EmployeeTimeHours from "../../Component/DashboardComponents/Admin/EmployeeTimeHours";
import Managerdashboardheader from "../../Component/DashboardComponents/Manager/Managerdashboardheader";
import {Box, Card, Paper} from "@mui/material";
import {Link} from "react-router-dom";
import ManagerProductivityLeaderboard from "../../Component/DashboardComponents/Manager/ManagerProductivityLeaderboard";
import ContractordashboardCounter from "../../Component/DashboardComponents/Contractor/ContractordashboardCounter";
import Clientdashboarheader from "../../Component/DashboardComponents/Client/Clientdashboarheader";
import RecentProject from "../../Component/DashboardComponents/Client/RecentProject";

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
      {Role === "Client" && (
        <div>
          <Clientdashboarheader />
          <RecentProject />
        </div>
      )}
      {Role === "Employee" && (
        <>
          {" "}
          <div>
            <ContractordashboardCounter />
          </div>
          <div>
            <h1>Employee Project Time hour</h1>
          </div>
          <div>
            <h1>Recent Project</h1>
          </div>
        </>
      )}
      {Role === "Contractor" && (
        <div>
          <ContractordashboardCounter />
        </div>
      )}
      {Role === "Manager" && (
        <div>
          <Managerdashboardheader />
          <Card sx={{padding: 3, marginTop: 5, borderRadius: 2}}>
            <Box sx={{px: 2}}>
              <Link to={"/manager/productivity-leaderboard"}>view all</Link>
            </Box>{" "}
            <ManagerProductivityLeaderboard />
          </Card>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
