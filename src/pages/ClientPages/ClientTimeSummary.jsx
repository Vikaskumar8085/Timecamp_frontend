import React from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {Grid2} from "@mui/material";
import ClientTotalHourByResources from "../../Component/ClientComponent/ClientTotalHourByResources";
import ClientTotalHourByProject from "../../Component/ClientComponent/ClientTotalHourByProject";
import ClientTotalhourbyCompany from "../../Component/ClientComponent/ClientTotalhourbyCompany";
import ClientbillingstatusDistribution from "../../Component/ClientComponent/ClientbillingstatusDistribution";
import ClientProjectTimeutilization from "../../Component/ClientComponent/ClientProjectTimeutilization";
import ClinetDailyHours from "../../Component/ClientComponent/ClinetDailyHours";
import ClientApprovelbilledOverTime from "../../Component/ClientComponent/ClientApprovelbilledOverTime";

const ClientTimeSummary = () => {
  return (
    <>
      <Layout>
        <BreadCrumb pageName="Client TIme Summary" />
        <Grid2 container spacing={3}>
          <Grid2 size={{sm: 12}}>
            <ClientTotalHourByResources />
          </Grid2>
          <Grid2 size={{sm: 12}}>
            <ClientTotalHourByProject />
          </Grid2>
          <Grid2 size={{sm: 12}}>
            <ClientTotalhourbyCompany />
          </Grid2>
          <Grid2 size={{sm: 12}}>
            <ClientbillingstatusDistribution />
          </Grid2>
          <Grid2 size={{sm: 12}}>
            <ClinetDailyHours />
          </Grid2>
          <Grid2 size={{sm: 12}}>
            <ClientApprovelbilledOverTime/>
          </Grid2>
          <Grid2 size={{sm: 12}}>
            <ClientProjectTimeutilization />
          </Grid2>
        </Grid2>
      </Layout>
    </>
  );
};

export default ClientTimeSummary;
