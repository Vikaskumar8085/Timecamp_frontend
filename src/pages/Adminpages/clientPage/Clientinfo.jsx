import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
  fetchclientprojectsapicall,
  fetchclientTimesheetapicall,
  fetchsignleclientapicall,
} from "../../../ApiServices/AdminApiServices/Client";
import Card from "../../../common/Card/Card";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Box,
  TableHead,
  TableRow,
  CardContent,
  Typography,
  Divider,
  Paper,
  Grid,
} from "@mui/material";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import TimesheetList from "./ClientTImesheet/TimesheetList";
import {useDispatch} from "react-redux";
import toast from "react-hot-toast";
import {
  approvetimesheetbyadminapicall,
  billedtimesheetbyadminapicall,
  disapprovetimesheetbyadminapicall,
} from "../../../ApiServices/AdminApiServices/Admin";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";

const Clientinfo = () => {
  const {id} = useParams();
  const [IsClientdata, setIsclientdata] = useState([]);
  const [IsClientprojectsdata, setIsclientprojectsdata] = useState([]);
  const [isClientTimesheet, setIsClientTimesheets] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch();
  const getClientInfo = async () => {
    try {
      const response = await fetchsignleclientapicall(id);
      console.log(response);
      if (response.success) {
        setIsclientdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const getclientsprojects = async () => {
    console.log("hello");
    try {
      const response = await fetchclientprojectsapicall(id);
      console.log(response, "asdlfkasdlkf");
      if (response.success) {
        setIsclientprojectsdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const getclientTimesheet = async () => {
    try {
      const response = await fetchclientTimesheetapicall(id);
      if (response.success) {
        setIsClientTimesheets(response);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const approvecontractortimesheet = async (value) => {
    try {
      dispatch(setLoader(true));
      const val = {
        id: id,
        payload: value,
      };
      const response = await approvetimesheetbyadminapicall(val);
      dispatch(setLoader(false));
      if (response.success) {
        dispatch(setLoader(false));
        toast.success(response.message);
        getclientTimesheet();
      } else {
        toast.error(response?.message);
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };
  const disapprovecontractortimesheet = async (values) => {
    try {
      dispatch(setLoader(true));
      const val = {
        id: id,
        payload: values,
      };
      const response = await disapprovetimesheetbyadminapicall(val);
      if (response?.success) {
        dispatch(setLoader(false));
        toast.success(response?.message);
        getclientTimesheet();
        setSelectedItems(null);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        getclientTimesheet();
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  const biiledclienttimesheet = async (values) => {
    try {
      dispatch(setLoader(true));
      const val = {
        id: id,
        payload: values,
      };
      const response = await billedtimesheetbyadminapicall(val);
      if (response?.success) {
        dispatch(setLoader(false));
        toast.success(response?.message);
        getclientTimesheet();
        setSelectedItems([]);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        getclientTimesheet();
        setSelectedItems([]);
      }
    } catch (error) {
      dispatch(setLoader(false));
      setSelectedItems([]);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getClientInfo();
    getclientTimesheet();
    getclientsprojects();
  }, [0]);
  return (
    <Layout>
      <BreadCrumb pageName="Client Information" />
      <Card>
        <CardContent sx={{p: 3}}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textAlign: "Start",
              mb: 2,
            }}
          >
            Client Information
          </Typography>
          <Divider sx={{mb: 2}} />

          <Grid container spacing={2}>
            {[
              {label: "Client Name", value: IsClientdata?.Client_Name},
              {label: "Client Email", value: IsClientdata?.Client_Email},
              {label: "Company Name", value: IsClientdata?.Company_Name},
              {label: "Client Phone", value: IsClientdata?.Client_Phone},
              {label: "Client Status", value: IsClientdata?.Client_Status},
              {label: "Postal Code", value: IsClientdata?.Client_Postal_Code},
              {
                label: "System Access",
                value: (
                  <span
                    style={{
                      color: IsClientdata?.System_Access ? "green" : "red",
                    }}
                  >
                    {IsClientdata?.System_Access ? "Yes" : "No"}
                  </span>
                ),
              },
              {label: "GST Number", value: IsClientdata?.GstNumber},
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "#f9f9f9",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{fontWeight: 600, color: "#333"}}
                  >
                    {item.label}:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{color: "#555", fontWeight: 500}}
                  >
                    {item.value || "N/A"}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Box>
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Project Code</TableCell>
                <TableCell align="left">Project Name</TableCell>
                <TableCell align="left">start Date</TableCell>
                <TableCell align="left">End Date</TableCell>
                <TableCell align="left">Project Hours</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {IsClientprojectsdata.length > 0
                ? IsClientprojectsdata.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{item.Project_Code}</TableCell>
                      <TableCell>{item.Project_Name}</TableCell>
                      <TableCell>{item.Start_Date}</TableCell>
                      <TableCell>{item.End_Date}</TableCell>
                      <TableCell>{item.Project_Hours}</TableCell>
                    </TableRow>
                  ))
                : "null"}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <TimesheetList
        approvecontractortimesheet={approvecontractortimesheet}
        disapprovecontractortimesheet={disapprovecontractortimesheet}
        biiledclienttimesheet={biiledclienttimesheet}
        data={isClientTimesheet}
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems}
      />
    </Layout>
  );
};

export default Clientinfo;
