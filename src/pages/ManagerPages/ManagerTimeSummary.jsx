import { Grid2, Typography } from "@mui/material";
import React from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";

const ManagerTimeSummary = () => {
  return (
    <Layout>
      <BreadCrumb pageName=" Manager Timesummart" />
      <Grid2 container spacing={2}>
        <Grid2 size={{ sm: 12 }}>2</Grid2>
        <Grid2 size={{ sm: 12 }}>2</Grid2>
        <Grid2 size={{ sm: 12 }}>2</Grid2>
        <Grid2 size={{ sm: 12 }}>2</Grid2>
      </Grid2>
    </Layout>
  );
};

export default ManagerTimeSummary;
