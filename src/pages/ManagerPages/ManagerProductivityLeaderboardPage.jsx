import React from "react";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import Layout from "../../Layoutcomponents/Layout/Layout";
import ManagerProductivityLeaderboard from "../../Component/DashboardComponents/Manager/ManagerProductivityLeaderboard";

const ManagerProductivityLeaderboardPage = () => {
  return (
    <>
      <Layout>
        <BreadCrumb pageName="Manager Productivity LeaderBoard" />
        <ManagerProductivityLeaderboard />
      </Layout>
    </>
  );
};

export default ManagerProductivityLeaderboardPage;
