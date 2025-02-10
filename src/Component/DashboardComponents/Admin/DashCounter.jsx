import React, {useEffect} from "react";
import Grid from "@mui/material/Grid2";
import {Card, CardContent, Typography, Box} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import {admindashcounterapicall} from "../../../ApiServices/DashboardApiServices/admindashboard";
import {setadminNumberofdashboarddata} from "../../../redux/DashboardSlices/dashSlices";
const DashCounter = () => {
  const dispatch = useDispatch();
  const dashdata = useSelector((state) => state.dash.countervalues);
  const getValue = (value) => value || "No data available";
  const dataList = [
    {label: "Staff Number", value: dashdata?.staffNo},
    {label: "Project Number", value: dashdata?.projectNo},
    {label: "Client Number", value: dashdata?.clientNo},
  ];

  const fetchNumberofdashdatafunc = async () => {
    try {
      dispatch(setLoader(true));
      const response = await admindashcounterapicall();
      if (response.success) {
        dispatch(setLoader(false));
        dispatch(setadminNumberofdashboarddata(response.result));
      } else {
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    fetchNumberofdashdatafunc();
  }, [dispatch]);

  return (
    <div>
      <Grid container spacing={2}>
        {dataList.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
            <Card
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
                textAlign: "center",
                bgcolor: "#f5f5f5",
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="primary"
                >
                  {item.label}
                </Typography>
                <Typography variant="h6">{getValue(item.value)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DashCounter;
