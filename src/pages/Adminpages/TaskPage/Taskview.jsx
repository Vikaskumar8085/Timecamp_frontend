import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import apiInstance from "../../../ApiInstance/apiInstance";
import {Card, CardContent, Typography, Grid, Divider, Box} from "@mui/material";
import moment from "moment";

const Taskview = () => {
  const {id} = useParams();
  const [IsTaskview, setIsTaskView] = useState([]);
  console.log(IsTaskview, "daaaaaaaaaaaaa");
  const fetchtaskviewinformationfunc = async () => {
    try {
      const response = await apiInstance.get(`/v1/admin/view-task/${id}`);
      if (response.data.success) {
        setIsTaskView(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchtaskviewinformationfunc();
  }, [0]);

  return (
    <Layout>
      <BreadCrumb pageName="Task Information" />
      <Card sx={{margin: "auto", mt: 4, boxShadow: 3, p: 2}}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            TaskName: {IsTaskview?.data?.Task_Name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Status: {IsTaskview?.data?.Status} | Priority:{" "}
            {IsTaskview?.data?.Priority}
          </Typography>
          <Divider sx={{my: 2}} />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Project:</strong> {IsTaskview.ProjectName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Milestone:</strong> {IsTaskview.MilestoneName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Start Date:</strong>{" "}
                {moment(IsTaskview?.data?.StartDate).format("DD/MM/YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>End Date:</strong>{" "}
                {moment(IsTaskview?.data?.EndDate).format("DD/MM/YYYY")}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{my: 2}} />

          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Description:</strong>{" "}
              {IsTaskview?.data?.Task_description || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Estimated Time:</strong>{" "}
              {IsTaskview?.data?.Estimated_Time || "N/A"} hours
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Taskview;
