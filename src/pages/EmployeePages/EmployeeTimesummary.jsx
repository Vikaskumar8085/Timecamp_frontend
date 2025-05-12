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
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";

const EmployeeTimesummary = () => {
  return (
    <LayoutDesign>
      <Breadcrumbs pageName="Employee Time Summary" />
      <EmployeeTotalHoursByResources />
      <EmployeeTotalHoursByProject />
      <EmployeeTotalHoursByCompany />
      <EmployeeBillingStatusDistribution />
      <EmployeeDailyhours />
      <EmployeeApprovelbilingstatus />
      <EmployeeProjectTimeUtilization />
    </LayoutDesign>
  );
};

export default EmployeeTimesummary;
