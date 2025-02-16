import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import TabComp from "../../../common/TabComponent/TabComp";
import ProjectInformation from "./ProjectInfoPages/ProjectInformation";
import ProjectTimesheet from "./ProjectInfoPages/ProjectTimesheet";
import ProjectTask from "./ProjectInfoPages/ProjectTask";
import { fetchsingleprojectapicall } from "../../../ApiServices/ProjectApiServices";

const Projectinfo = () => {
  const { id } = useParams();
  const [isSubState, setisSubState] = useState(0);
  const [IsprojectInfodata, setIsprojectInfodata] = useState([]);

  const getsingleprojectfunc = async () => {
    try {
      const response = await fetchsingleprojectapicall(id);
      if (response.success) {
        setIsprojectInfodata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getsingleprojectfunc();
  }, [0]);

  const tabsheader = [
    { title: "Project Info" },
    { title: "TimeSheet" },
    { title: "Task" },
  ];
  const Tabsbody = [
    {
      content: (
        <>
          <ProjectInformation IsprojectInfodata={IsprojectInfodata} />
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
