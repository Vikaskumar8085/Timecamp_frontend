import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Divider,
} from "@mui/material";

const ProjectInformation = ({IsprojectInfodata}) => {
  const content = IsprojectInfodata.map((item, index) => {
    return (
      <div>
        {" "}
        <Button>Report</Button>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {item.Project_Name}
            </Typography>

            <Divider sx={{mb: 2}} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Project Code:</strong> {item.Project_Code}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Start Date:</strong> {item.Start_Date}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>End Date:</strong> {item.End_Date}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Project Type:</strong> {item.Project_Type}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Hours:</strong> {item.Project_Hours}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Status:</strong>{" "}
                  {item.Project_Status ? (
                    <Chip label="Active" color="success" size="small" />
                  ) : (
                    <Chip label="Inactive" color="error" size="small" />
                  )}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Client:</strong> {item.ClientName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Project Manager:</strong>
                  {item.ProjectManagerName}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Role:</strong> {item.RoleName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Employee:</strong> {item.StaffName}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  });
  return <div>{content}</div>;
};

export default ProjectInformation;
