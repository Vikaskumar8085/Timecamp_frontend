import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Layout from "../../Layoutcomponents/Layout/Layout";
import TabComp from "../../common/TabComponent/TabComp";
import ClientProjectInfo from "./ClientInfoPage/ClientProjectInfo";
import ClientProjectTimesheet from "./ClientInfoPage/ClientProjectTimesheet";
import ClientProjectTask from "./ClientInfoPage/ClientProjectTask";
import {
  fetchclientprojectinfoapicall,
  fetchclienttaskinfoapicall,
  fetchclienttimesheetinfoapicall,
} from "../../ApiServices/Cllientapiservices/Client";

const ClientPageinfo = () => {
  const {id} = useParams();
  const [isSubState, setisSubState] = useState(0);
  const [isClientprojectInfodata, setIsClientProjectInfodata] = useState([]);
  const [isclinettaskinfodata, setIsclienttaskinfodata] = useState([]);
  const [isClientTimesheetdata, setIsClientTimesheetdata] = useState([]);
  console.log(isClientTimesheetdata, "???????????");
  const fetchclientsingleprojectfunc = async () => {
    try {
      const response = await fetchclientprojectinfoapicall(id);
      if (response.success) {
        setIsClientProjectInfodata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchclienttaskinformationfunc = async () => {
    try {
      const response = await fetchclienttaskinfoapicall(id);
      if (response.success) {
        setIsclienttaskinfodata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchclienttimesheetinformationfunc = async () => {
    try {
      const response = await fetchclienttimesheetinfoapicall(id);
      if (response.success) {
        setIsClientTimesheetdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  const tabsheader = [
    {title: "Client Project Info"},
    {title: "Client Project TimeSheet"},
    {title: "Client Project Task"},
  ];
  const Tabsbody = [
    {
      content: (
        <>
          <ClientProjectInfo
            isClientprojectInfodata={isClientprojectInfodata}
          />
        </>
      ),
    },
    {
      content: (
        <>
          <ClientProjectTimesheet
            isClientTimesheetdata={isClientTimesheetdata}
          />
        </>
      ),
    },

    {
      content: (
        <>
          <ClientProjectTask isclinettaskinfodata={isclinettaskinfodata} />
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchclientsingleprojectfunc();
    fetchclienttaskinformationfunc();
    fetchclienttimesheetinformationfunc();
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

export default ClientPageinfo;
