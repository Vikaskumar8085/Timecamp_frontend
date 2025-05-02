import React, {useEffect, useState} from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import apiInstance from "../../ApiInstance/apiInstance";
import toast from "react-hot-toast";
import {
  Card,
  Grid2,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import {AccessTime, List, Receipt, CheckCircle} from "@mui/icons-material";

const ClientProjectTime = () => {
  const [isclientprojectTimedata, setIsclientprojectTimedata] = useState([]);
  const fetchclientprojectTimefunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/client/fetch-client-project-time"
      );
      if (response?.data?.success) {
        setIsclientprojectTimedata(response?.data?.result);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      if (error?.response?.data?.redirect) {
        window.location.href = error?.response?.data.redirect;
        localStorage.clear();
      }
      toast.error(error?.response?.data?.message);
    }
  };

  const totalHoursSum = isclientprojectTimedata.reduce(
    (sum, item) => sum + item.TotalHours,
    0
  );
  const totalEntriesSum = isclientprojectTimedata.reduce(
    (sum, item) => sum + item.TotalEntries,
    0
  );
  const totalBilledHoursSum = isclientprojectTimedata.reduce(
    (sum, item) => sum + item.BilledHours,
    0
  );
  const totalOkHoursSum = isclientprojectTimedata.reduce(
    (sum, item) => sum + item.OkHours,
    0
  );
  useEffect(() => {
    fetchclientprojectTimefunc();
  }, [0]);
  return (
    <Layout>
      <BreadCrumb pageName="Client Project TIme" />
      <Grid2 container spacing={2} sx={{my: 2}}>
        <Grid2 item sm={12} md={3} lg={3}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "#fff",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              gap: 1,
            }}
          >
            <AccessTime color="primary" />
            <Typography variant="h6">Total Hours: {totalHoursSum}</Typography>
          </Card>
        </Grid2>
        <Grid2 item sm={12} md={3} lg={3}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <List color="secondary" />
            <Typography variant="h6">
              Total Entries: {totalEntriesSum}
            </Typography>
          </Card>
        </Grid2>
        <Grid2 item sm={12} md={3} lg={3}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Receipt color="success" />
            <Typography variant="h6">
              Total Billed Hours: {totalBilledHoursSum}
            </Typography>
          </Card>
        </Grid2>
        <Grid2 item sm={12} md={3} lg={3}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <CheckCircle color="primary" />
            <Typography variant="h6">
              Total OK Hours: {totalOkHoursSum}
            </Typography>
          </Card>
        </Grid2>
      </Grid2>

      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="client table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Total Hour</TableCell>
              <TableCell>Total Entries</TableCell>
              <TableCell>Total Billed Hours</TableCell>
              <TableCell>Total Ok Hours</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isclientprojectTimedata.length > 0 ? (
              isclientprojectTimedata.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.ProjectName}</TableCell>
                  <TableCell>{item.TotalHours}</TableCell>
                  <TableCell>{item.TotalEntries}</TableCell>
                  <TableCell>{item.BilledHours}</TableCell>
                  <TableCell>{item.OkHours}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  {/* <Empty /> */}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default ClientProjectTime;
