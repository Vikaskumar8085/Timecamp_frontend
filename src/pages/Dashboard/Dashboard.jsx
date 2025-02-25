import React from "react";
import {useSelector} from "react-redux";
import Layout from "../../Layoutcomponents/Layout/Layout";
import DashCounter from "../../Component/DashboardComponents/Admin/DashCounter";
import ProductivityLeaderBoard from "../../Component/DashboardComponents/Admin/ProductivityLeaderBoard";
import RecentProjects from "../../Component/DashboardComponents/Admin/RecentProjects";
import RecentTimesheet from "../../Component/DashboardComponents/Admin/RecentTimesheet";
import EmployeeTimeHours from "../../Component/DashboardComponents/Admin/EmployeeTimeHours";

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
      {Role === "Employee" && <div>Dashboard:{userdata?.Role}</div>}
      {Role === "Contractor" && <div>Dashboard:{userdata?.Role}</div>}
      {Role === "Manager" && <div>Dashboard:{userdata?.Role}</div>}
    </Layout>
  );
};

export default Dashboard;
