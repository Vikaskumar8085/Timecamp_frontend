import React from "react";
import Grid from "@mui/material/Grid2";
import { Card } from "@mui/material";
const DashCounter = () => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 3, lg: 3, sm: 6 }}>
          <Card>1</Card>
        </Grid>{" "}
        <Grid size={{ xs: 12, md: 3, lg: 3, sm: 6 }}>
          <Card>1</Card>
        </Grid>{" "}
        <Grid size={{ xs: 12, md: 3, lg: 3, sm: 6 }}>
          <Card>1</Card>
        </Grid>{" "}
        <Grid size={{ xs: 12, md: 3, lg: 3, sm: 6 }}>
          <Card>1</Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashCounter;
