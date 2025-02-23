import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import TabComp from "../../../common/TabComponent/TabComp";
import ProjectInformation from "./ProjectInfoPages/ProjectInformation";
import ProjectTimesheet from "./ProjectInfoPages/ProjectTimesheet";
import ProjectTask from "./ProjectInfoPages/ProjectTask";
import {
  fetchprojecttimesheetapicall,
  fetchsingleprojectapicall,
} from "../../../ApiServices/ProjectApiServices";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../redux/LoaderSlices/LoaderSlices";

const Projectinfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isSubState, setisSubState] = useState(0);
  const [IsprojectInfodata, setIsprojectInfodata] = useState([]);
  const [Isprojecttimesheetdata, setIsprojecttimesheetdata] = useState([]);

  console.log(Isprojecttimesheetdata, "?>>>>>>>>>>>>...");

  const fetchprojecttimesheetfunc = async () => {
    try {
      dispatch(setLoader(true));
      const response = await fetchprojecttimesheetapicall(id);
      if (response?.success) {
        dispatch(setLoader(false));
        setIsprojecttimesheetdata(response.result);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

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
    fetchprojecttimesheetfunc();
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
          <ProjectTimesheet Isprojecttimesheetdata={Isprojecttimesheetdata} />
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
