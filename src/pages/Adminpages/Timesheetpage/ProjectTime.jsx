import React, { useEffect, useState } from "react";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {
  Card,
  Grid2,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { fetchProjectTimeapicall } from "../../../ApiServices/TimesheetApiServices";

const ProjectTime = () => {
  const [Isprojecttimedata, setIsprojectTimedata] = useState([]);

  const getprojecttimefunc = async () => {
    try {
      const response = await fetchProjectTimeapicall();
      if (response.success) {
        setIsprojectTimedata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getprojecttimefunc();
  }, [0]);

  return (
    <Layout>
      <BreadCrumb pageName="Project Time" />
      <Grid2 container spacing={2}>
        <Grid2 item sm={12} md={3} lg={3}>
          <Card>1</Card>
        </Grid2>
        <Grid2 item sm={12} md={3} lg={3}>
          2
        </Grid2>
        <Grid2 item sm={12} md={3} lg={3}>
          3
        </Grid2>
        <Grid2 item sm={12} md={3} lg={3}>
          4
        </Grid2>
      </Grid2>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="client table">
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
            {Isprojecttimedata.length > 0 ? (
              Isprojecttimedata.map((item, index) => (
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

export default ProjectTime;
