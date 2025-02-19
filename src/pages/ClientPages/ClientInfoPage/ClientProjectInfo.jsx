import React from "react";
import {Card, CardContent, Typography, Grid, Chip, Box} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import WorkIcon from "@mui/icons-material/Work";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";

const ClientProjectInfo = ({isClientprojectInfodata}) => {
  const content = isClientprojectInfodata.map((item) => {
    return (
      <Card sx={{p: 2, boxShadow: 3, borderRadius: 2}}>
        <CardContent>
          {/* Project Name & Status */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight="bold">
              {item.Project_Name}
            </Typography>
            <Chip
              label={item.Project_Status ? "Active" : "Inactive"}
              color={item.Project_Status ? "success" : "error"}
              size="small"
            />
          </Box>

          {/* Project Code */}
          <Typography variant="subtitle1" color="textSecondary">
            Code: {item.Project_Code}
          </Typography>

          {/* Project Type */}
          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <WorkIcon color="primary" />
            <Typography variant="body2">{item.Project_Type}</Typography>
          </Box>

          {/* Project Hours */}
          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <AccessTimeIcon color="primary" />
            <Typography variant="body2">Hours: {item.Project_Hours}</Typography>
          </Box>

          {/* Dates */}
          <Grid container spacing={1} mt={2}>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <EventIcon color="primary" />
                <Typography variant="body2">
                  Start:{" "}
                  {new Date(
                    (parseFloat(item.Start_Date) - 25569) * 86400000
                  ).toLocaleDateString()}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <EventIcon color="secondary" />
                <Typography variant="body2">End: {item.End_Date}</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  });
  return (
    <>
      <BreadCrumb pageName="Client Project Information " />
      {content}
    </>
  );
};

export default ClientProjectInfo;
