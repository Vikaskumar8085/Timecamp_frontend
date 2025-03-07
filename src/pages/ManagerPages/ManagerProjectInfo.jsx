import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import TabComp from "../../common/TabComponent/TabComp";
import ManagerTask from "./ManagerProjectInfo/ManagerProjectTask";
import ManagerProjectInformation from "./ManagerProjectInfo/ManagerProjectInformation";
import ManagerProjectTimesheet from "./ManagerProjectInfo/ManagerProjectTimesheet";
import apiInstance from "../../ApiInstance/apiInstance";
import toast from "react-hot-toast";

const ManagerProjectInfo = () => {
  const [isSubState, setisSubState] = useState(0);
  const [IsManagerprojectinfo, setIsManagerProjectinfo] = useState([]);
  console.log(IsManagerprojectinfo, "dfsdflsdfk");
  const [IsManagerProjectTimesheetdata, setIsManagerProjectTimesheetdata] =
    useState([]);
  console.log(IsManagerProjectTimesheetdata, ">>>>>>>>>");
  const [isManagerprojecttask, setIsmanagerProjectTask] = useState([]);
  const [isMilestonoeresourcesdata, setisMilestonoeresourcesdata] = useState(
    []
  );
  const {id} = useParams();
  //
  const fetchmanagerprojectfunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v2/manager/fetch-manager-projectinfo/${id}`
      );
      if (response?.data?.success) {
        setIsManagerProjectinfo(response?.data?.result);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // fetch manager project timesheet func
  const fetchmanagerprojecttimesheetfunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v2/manager/fetch-manager-prject-timesheets/${id}`
      );
      if (response?.data?.success) {
        setIsManagerProjectTimesheetdata(response?.data?.result);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // fetch manager Project Task
  const fetchmanagerprojecttaskfunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v2/manager/fetch-manager-project-task/${id}`
      );
      if (response?.data?.success) {
        setIsmanagerProjectTask(response?.data?.result);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // fetch manager milestone project

  const fetchmanagerprojectmilestonesfunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v2/manager/fetch-manager-projectwithmilestone`
      );
      console.log(
        response,
        ">>>>>>>>>>>>fetchmanagerprojectmilestonesfunc>>>>>>>>>"
      );

      if (response?.data?.success) {
        setisMilestonoeresourcesdata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  // create milestones

  const handleSubmitmilestone = async (value) => {
    try {
      console.log(value, ">>>>>>>>>>>>>milestone add");
      const response = await apiInstance.post(
        `/v2/manager/create-manager-project-milestone/${id}`,
        value
      );
      console.log(response);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  // add milestone
  const handleaddtask = async (value) => {
    try {
      console.log(value, ">>>>>>>>>>>>>>>>>>>>>>>>");
      const response = await apiInstance.post(
        `/v2/manager/create-manager-project-task/${id}`,
        value
      );
      console.log(response);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const tabsheader = [
    {title: "Project Info"},
    {title: "TimeSheet Info"},
    {title: "Task"},
  ];
  const Tabsbody = [
    {
      content: (
        <>
          <ManagerProjectInformation
            IsManagerprojectinfo={IsManagerprojectinfo}
          />
        </>
      ),
    },
    {
      content: (
        <>
          <ManagerProjectTimesheet
            IsManagerProjectTimesheetdata={IsManagerProjectTimesheetdata}
          />
        </>
      ),
    },
    {
      content: (
        <>
          <ManagerTask
            handleSubmitmilestone={handleSubmitmilestone}
            handleaddtask={handleaddtask}
            isManagerprojecttask={isManagerprojecttask}
            isMilestonoeresourcesdata={isMilestonoeresourcesdata}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchmanagerprojectfunc();
    fetchmanagerprojecttimesheetfunc();
    fetchmanagerprojecttaskfunc();
    fetchmanagerprojectmilestonesfunc();
  }, [0]);
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
