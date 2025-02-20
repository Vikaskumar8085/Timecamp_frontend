import React, {useEffect, useState} from "react";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Grid2, Typography} from "@mui/material";
import TotalHourbyResource from "../../../Component/TimeSummarycomponent/TotalHourbyResource";
import BilledHoursByProject from "../../../Component/TimeSummarycomponent/BilledHoursByProject";
import {fetchtotalhourbyresourcesapicall} from "../../../ApiServices/TimesheetApiServices";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";

const TimesheetSummary = () => {
  const dispatch = useDispatch();
  const [istotalhourbyresourcedata, setistotalhourbyresourcedata] = useState(
    []
  );

  const fetchtotalhourbyresourcedata = async () => {
    try {
      // dispatch(setLoader(true));
      const response = await fetchtotalhourbyresourcesapicall();
      if (response.success) {
        setistotalhourbyresourcedata(response.result);
        // dispatch(setLoader(true));
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchtotalhourbyresourcedata();
  }, [0]);

  return (
    <Layout>
      <BreadCrumb pageName="Time Summary" />

      <Grid2 container spacing={3}>
        <Grid2 size={{sm: 12}}>
          <Typography variant="h5">Total hours By Resourse</Typography>
          <TotalHourbyResource
            istotalhourbyresourcedata={istotalhourbyresourcedata}
          />
        </Grid2>
        <Grid2 size={{sm: 12}}></Grid2>
        <Grid2 size={{sm: 12}}>
          <Typography variant="h5">hours By Company</Typography>
        </Grid2>
        <Grid2 size={{sm: 12}}>
          <Typography variant="h5">Billing Status Distribution</Typography>
        </Grid2>
        <Grid2 size={{sm: 12}}>
          <Typography variant="h5">DailyHours</Typography>
        </Grid2>
        <Grid2 size={{sm: 12}}>
          <Typography variant="h5">Approval and Billing Over Time</Typography>
        </Grid2>
        <Grid2 size={{sm: 12}}>
          <Typography variant="h5">Project Time Utilization</Typography>
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default TimesheetSummary;
