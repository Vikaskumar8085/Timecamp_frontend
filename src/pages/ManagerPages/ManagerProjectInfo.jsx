import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Layout from "../../Layoutcomponents/Layout/Layout";
import TabComp from "../../common/TabComponent/TabComp";
import ManagerTask from "./ManagerProjectInfo/ManagerProjectTask";
import ManagerProjectInformation from "./ManagerProjectInfo/ManagerProjectInformation";
import ManagerProjectTimesheet from "./ManagerProjectInfo/ManagerProjectTimesheet";
import apiInstance from "../../ApiInstance/apiInstance";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {setLoader} from "../../redux/LoaderSlices/LoaderSlices";

const ManagerProjectInfo = () => {
  const [isSubState, setisSubState] = useState(0);
  const [IsManagerprojectinfo, setIsManagerProjectinfo] = useState([]);
  const [IsManagerProjectTimesheetdata, setIsManagerProjectTimesheetdata] =
    useState([]);
  const [isManagerprojecttask, setIsmanagerProjectTask] = useState([]);
  const [isMilestonoeresourcesdata, setisMilestonoeresourcesdata] = useState(
    []
  );
  const dispatch = useDispatch();
  const [IsMilestoneOpen, setIsMilestoneOpen] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  const [Ismilestone, setIsmilestone] = useState([]);
  const [IsFillTimesheet, setIsFillTimesheet] = useState(false);

  const {id} = useParams();

  // fetch manager milestone with resource func
  const fetchmanagermilestonewithresourcesfunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v2/milestone/fetch-milestone-resources/${id}`
      );
      if (response.data.success) {
        setisMilestonoeresourcesdata(response.data.result);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  // fetch manager project

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

      if (response?.data?.success) {
        setisMilestonoeresourcesdata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  // fetch milestones
  const fetchmanagermilestonesfunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v2/manager/fetch-manager-project-milestone/${id}`
      );
      if (response?.data?.success) {
        setIsmilestone(response?.data?.result);
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
      dispatch(setLoader(true));
      const response = await apiInstance.post(
        `/v2/manager/create-manager-project-task/${id}`,
        value
      );
      console.log(response, "manager task");
      if (response?.data?.success) {
        dispatch(setLoader(false));
        toast.success(response?.data?.message);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.data?.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  const handlefilltimesheet = async (values) => {
    try {
      dispatch(setLoader(true));

      const response = await apiInstance.post(
        "/v2/manager/fill-manager-timesheet",
        values
      );
      if (response?.data?.success) {
        dispatch(setLoader(false));
        toast.success(response?.data?.message);
        setIsFillTimesheet(false);
        fetchmanagerprojecttimesheetfunc();
      } else {
        dispatch(setLoader(false));
        toast.error(response?.data?.message);
        setIsFillTimesheet(false);
        fetchmanagerprojecttimesheetfunc();
      }
    } catch (error) {
      dispatch(setLoader(false));
      setIsFillTimesheet(false);
      fetchmanagerprojecttimesheetfunc();
      toast.error(error?.response?.data?.message);
    }
  };

  // remove timesheet
  const reomvemanagertimesheetfunc = async (value) => {
    try {
      const response = await apiInstance.delete(
        `/v2/manager/remove-manager-timesheet/${value}`
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        fetchmanagerprojecttimesheetfunc();
      } else {
        toast.error(response?.data?.message);
        fetchmanagerprojecttimesheetfunc();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      fetchmanagerprojecttimesheetfunc();
    }
  };

  const sendforapprovelmanagettimesheetfunc = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await apiInstance.put(
        `/v2/manager/send-for-approvel-timesheet-by-manager/${id}`,
        value
      );
      if (response?.data?.success) {
        dispatch(setLoader(false));
        toast.success(response?.data?.message);
        fetchmanagerprojecttimesheetfunc();
      } else {
        dispatch(setLoader(false));

        toast.error(response?.data?.message);
        fetchmanagerprojecttimesheetfunc();
      }
    } catch (error) {
      dispatch(setLoader(false));

      toast.error(response?.data?.message);
      fetchmanagerprojecttimesheetfunc();
    }
  };

  const approvebymanagertimesheetfunc = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await apiInstance.put(
        `/v2/manager/approve-timesheet-by-manager/${id}`,
        value
      );
      if (response?.data?.success) {
        dispatch(setLoader(false));
        toast.success(response?.data?.message);
        fetchmanagerprojecttimesheetfunc();
      } else {
        dispatch(setLoader(false));
        toast.error(response?.data?.message);
        fetchmanagerprojecttimesheetfunc();
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
      fetchmanagerprojecttimesheetfunc();
    }
  };
  const disapprovebymanagertimesheetfunc = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await apiInstance.put(
        `/v2/manager/disapprove-timesheet-by-manager/${id}`,
        value
      );
      if (response?.data?.success) {
        dispatch(setLoader(false));
        toast.success(response?.data?.message);
        fetchmanagerprojecttimesheetfunc();
      } else {
        dispatch(setLoader(false));
        toast.error(response?.data?.message);
        fetchmanagerprojecttimesheetfunc();
      }
    } catch (error) {
      dispatch(setLoader(false));
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
            IsManagerprojectinfo={IsManagerprojectinfo}
            handlefilltimesheet={handlefilltimesheet}
            setIsFillTimesheet={setIsFillTimesheet}
            IsFillTimesheet={IsFillTimesheet}
            reomvemanagertimesheetfunc={reomvemanagertimesheetfunc}
            sendforapprovelmanagettimesheetfunc={
              sendforapprovelmanagettimesheetfunc
            }
            approvebymanagertimesheetfunc={approvebymanagertimesheetfunc}
            disapprovebymanagertimesheetfunc={disapprovebymanagertimesheetfunc}
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
            Ismilestone={Ismilestone}
            isManagerprojecttask={isManagerprojecttask}
            isMilestonoeresourcesdata={isMilestonoeresourcesdata}
            IsOpen={IsOpen}
            setIsOpen={setIsOpen}
            IsMilestoneOpen={IsMilestoneOpen}
            setIsMilestoneOpen={setIsMilestoneOpen}
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
    fetchmanagermilestonesfunc();
    fetchmanagermilestonewithresourcesfunc();
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
