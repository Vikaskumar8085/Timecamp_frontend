import React from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import {Breadcrumbs} from "@mui/material";
import EmployeeTotalHoursByResources from "../../Component/EmployeeComponents/EmployeeTimesummary/EmployeeTotalHoursByResources";
import EmployeeTotalHoursByProject from "../../Component/EmployeeComponents/EmployeeTimesummary/EmployeeTotalHoursByProject";
import EmployeeTotalHoursByCompany from "../../Component/EmployeeComponents/EmployeeTimesummary/EmployeeTotalHoursByCompany";
import EmployeeBillingStatusDistribution from "../../Component/EmployeeComponents/EmployeeTimesummary/EmployeeBillingStatusDistribution";
import EmployeeProjectTimeUtilization from "../../Component/EmployeeComponents/EmployeeTimesummary/EmployeeProjectTimeUtilization";
import EmployeeDailyhours from "../../Component/EmployeeComponents/EmployeeTimesummary/EmployeeDailyhours";
import EmployeeApprovelbilingstatus from "../../Component/EmployeeComponents/EmployeeTimesummary/EmployeeApprovelbilingstatus";

const EmployeeTimesummary = () => {
  return (
    <Layout>
      <Breadcrumbs pageName="Employee Time Summary" />
      <EmployeeTotalHoursByResources />
      <EmployeeTotalHoursByProject />
      <EmployeeTotalHoursByCompany />
      <EmployeeBillingStatusDistribution />
      <EmployeeDailyhours />
      <EmployeeApprovelbilingstatus />
      <EmployeeProjectTimeUtilization />
    </Layout>
  );
};

export default EmployeeTimesummary;
