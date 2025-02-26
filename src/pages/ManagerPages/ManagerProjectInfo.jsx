import React, {useState} from "react";
import {useParams} from "react-router-dom";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import TabComp from "../../common/TabComponent/TabComp";
import ManagerTask from "./ManagerProjectInfo/ManagerProjectTask";
import ManagerProjectInformation from "./ManagerProjectInfo/ManagerProjectInformation";
import ManagerProjectTimesheet from "./ManagerProjectInfo/ManagerProjectTimesheet";

const ManagerProjectInfo = () => {
  const [isSubState, setisSubState] = useState(0);
  const {id} = useParams();

  const tabsheader = [
    {title: "Project Info"},
    {title: "TimeSheet Info"},
    {title: "Task"},
  ];
  const Tabsbody = [
    {
      content: (
        <>
          <ManagerProjectInformation />
        </>
      ),
    },
    {
      content: (
        <>
          <ManagerProjectTimesheet />
        </>
      ),
    },
    {
      content: (
        <>
          <ManagerTask />
        </>
      ),
    },
  ];

  return (
    <Layout>
      <TabComp
        Tabsheader={tabsheader}
        TabsBody={Tabsbody}
        isSubState={isSubState}
        setisSubState={setisSubState}
      />
    </Layout>
  );
};

export default ManagerProjectInfo;
