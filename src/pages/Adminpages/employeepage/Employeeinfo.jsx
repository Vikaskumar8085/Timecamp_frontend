import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import {
  fetchemployeeprojectapicall,
  fetchemployeeprojecttimesheetapicall,
  fetchsingleemployeeapicall,
} from "../../../ApiServices/AdminApiServices/Employee";
import { Paper } from "@mui/material";
import Card from "../../../common/Card/Card";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import TabComp from "../../../common/TabComponent/TabComp";
import Employeeinformation from "./EmployeeInfoPages/Employeeinformation";
import Timesheet from "./EmployeeInfoPages/Timesheet";

const Employeeinfo = () => {
  const { id } = useParams();
  const [isEmployeedata, setIsEmployeedata] = useState([]);
  const [isSubState, setisSubState] = useState(0);
  const [isEmployeeprojectdata, setIsemployeeprojectdata] = useState([]);
  const [isEmployeeProjectTimesheetdata, setIsEmployeeProjectTimesheetdata] =
    useState([]);

  const fetchsingleemployeefunc = async () => {
    try {
      const response = await fetchsingleemployeeapicall(id);
      console.log(response, "data employee data");
      if (response.success) {
        setIsEmployeedata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchemployeeprojectsfunc = async () => {
    try {
      const response = await fetchemployeeprojectapicall(id);
      if (response.success) {
        setIsemployeeprojectdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchemployeeTimesheetfunc = async () => {
    try {
      const response = await fetchemployeeprojecttimesheetapicall(id);
      if (response.success) {
        setIsEmployeeProjectTimesheetdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchsingleemployeefunc();
    fetchemployeeprojectsfunc();
    fetchemployeeTimesheetfunc();
  }, [0]);

  const tabsheader = [{ title: "Empoyee Info" }, { title: "TimeSheet" }];
  const Tabsbody = [
    {
      content: (
        <>
          <Employeeinformation
            isEmployeedata={isEmployeedata}
            isEmployeeprojectdata={isEmployeeprojectdata}
          />
        </>
      ),
    },
    {
      content: (
        <>
          <Timesheet data={isEmployeeProjectTimesheetdata} />
        </>
      ),
    },
  ];

  return (
    <Layout>
      <BreadCrumb pageName="Employee info" />
      <TabComp
        Tabsheader={tabsheader}
        TabsBody={Tabsbody}
        isSubState={isSubState}
        setisSubState={setisSubState}
      />
    </Layout>
  );
};

export default Employeeinfo;
