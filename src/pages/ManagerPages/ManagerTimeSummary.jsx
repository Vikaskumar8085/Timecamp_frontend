import {Grid2, Typography} from "@mui/material";
import React from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import ManagerTotalHoursbyResources from "../../Component/ManagerComponents/TimesummaryComponent/ManagerTotalHoursbyResources";
import ManagerHourByProject from "../../Component/ManagerComponents/TimesummaryComponent/ManagerHourByProject";
import ManagerHourByCompany from "../../Component/ManagerComponents/TimesummaryComponent/ManagerHourByCompany";
import ManagerBillingDistribution from "../../Component/ManagerComponents/TimesummaryComponent/ManagerBillingDistribution";
import ManagerProjectTimeUtilization from "../../Component/ManagerComponents/TimesummaryComponent/ManagerProjectTimeUtilization";
import ManagerApprovelBillingStatus from "../../Component/ManagerComponents/TimesummaryComponent/ManagerApprovelBillingStatus";
import ManagerDailyHours from "../../Component/ManagerComponents/TimesummaryComponent/ManagerDailyHours";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";

const ManagerTimeSummary = () => {
  return (
    <LayoutDesign>
      <BreadCrumb pageName=" Manager Timesummart" />
      <ManagerTotalHoursbyResources />
      <ManagerHourByProject />
      <ManagerHourByCompany />
      <ManagerBillingDistribution />
      <ManagerApprovelBillingStatus />
      <ManagerDailyHours />
      <ManagerProjectTimeUtilization />
    </LayoutDesign>
  );
};

export default ManagerTimeSummary;
