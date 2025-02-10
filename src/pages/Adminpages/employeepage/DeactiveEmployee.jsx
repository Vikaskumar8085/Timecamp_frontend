import React, {useEffect, useState} from "react";
import {fetchinactiveemployeeapicall} from "../../../ApiServices/AdminApiServices/Employee";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import EmployeeTable from "../../../Component/AdminComponents/Employee/EmployeeTable";

const DeactiveEmployee = () => {
  const [IsInactiveEmployeedata, setIsInactiveEmployeedata] = useState([]);
  const getInactiveemployee = async () => {
    try {
      const response = await fetchinactiveemployeeapicall();
      console.log(response, "response");
      if (response.success) {
        setIsInactiveEmployeedata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getInactiveemployee();
  }, [0]);
  return (
    <>
      <Layout>
        <BreadCrumb pageName="InActive Employee" />
        <EmployeeTable IsEmployeeData={IsInactiveEmployeedata} />
      </Layout>
    </>
  );
};

export default DeactiveEmployee;
