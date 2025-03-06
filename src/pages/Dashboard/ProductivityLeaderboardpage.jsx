import React, {useState} from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import TabComp from "../../common/TabComponent/TabComp";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import ProductivityLeaderBoard from "../../Component/DashboardComponents/Admin/ProductivityLeaderBoard";
import ProductivityLeaderBoardTable from "../../Component/DashboardComponents/Admin/ProductivityLeaderBoardTable";

const ProductivityLeaderboardpage = () => {
  const [isSubState, setisSubState] = useState(0);

  const tabsheader = [
    {title: "Productivity Leader Board"},
    // {title: "Project ROI"},
  ];
  const Tabsbody = [
    {
      content: (
        <>
          <ProductivityLeaderBoardTable />
        </>
      ),
    },
    {
      content: <>Project Roi</>,
    },
  ];
  return (
    <Layout>
      <BreadCrumb pageName="Productivity LeaderBoard" />
      <TabComp
        Tabsheader={tabsheader}
        TabsBody={Tabsbody}
        isSubState={isSubState}
        setisSubState={setisSubState}
      />
    </Layout>
  );
};

export default ProductivityLeaderboardpage;
