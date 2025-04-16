import {TextField, Typography, Grid2, Button, Paper} from "@mui/material";
import React from "react";

const ProjectForecast = () => {
  return (
    <>
      <form action="">
        <Grid2 component={Paper} sx={{p: 3}} container spacing={2}>
          <Grid2
            sx={{background: "#2c3e50", p: 2, color: "white"}}
            size={{lg: 12, md: 12, sm: 12, xs: 12}}
          >
            <Typography>Project Forecast</Typography>
          </Grid2>
          <Grid2 size={{lg: 6, sm: 12, xs: 12, md: 6}}>
            <TextField fullWidth />
          </Grid2>
          <Grid2 size={{lg: 6, sm: 12, xs: 12, md: 6}}>
            <TextField />
          </Grid2>
          <Grid2>
            <Button>Submit</Button>
          </Grid2>
        </Grid2>
      </form>
    </>
  );
};

export default ProjectForecast;
