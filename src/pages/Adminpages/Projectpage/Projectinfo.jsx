import React, {useState} from "react";
import {useParams} from "react-router-dom";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import TabComp from "../../../common/TabComponent/TabComp";
import ProjectInformation from "./ProjectInfoPages/ProjectInformation";
import ProjectTimesheet from "./ProjectInfoPages/ProjectTimesheet";
import ProjectTask from "./ProjectInfoPages/ProjectTask";


const Projectinfo = () => {
  const {id} = useParams();
  const [isSubState, setisSubState] = useState(0);



  const tabsheader = [
    {title: "Project Info"},
    {title: "TimeSheet"},
    {title: "Task"},
  ];
  const Tabsbody = [
    {
      content: (
        <>
          <ProjectInformation />
        </>
      ),
    },
    {
      content: (
        <>
          <ProjectTimesheet />
        </>
      ),
    },
    {
      content: (
        <>
          <ProjectTask id={id} />
        </>
      ),
    },
  ];

  return (
    <Layout>
      <BreadCrumb pageName="Project Info" />
      <TabComp
        Tabsheader={tabsheader}
        TabsBody={Tabsbody}
        isSubState={isSubState}
        setisSubState={setisSubState}
      />
    </Layout>
  );
};

export default Projectinfo;
