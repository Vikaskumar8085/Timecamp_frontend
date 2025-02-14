import React from "react";
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
  Paper,
} from "@mui/material";

const ProjectTime = () => {
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
        <Table sx={{minWidth: 650}} aria-label="client table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Postal Code</TableCell>
              <TableCell>Gst Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {Isclientdata.length > 0 ? (
              Isclientdata.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.Company_Name}</TableCell>
                  <TableCell>{item.Client_Name}</TableCell>
                  <TableCell>{item.Client_Email}</TableCell>
                  <TableCell>{item.Client_Phone}</TableCell>
                  <TableCell>{item.Address}</TableCell>
                  <TableCell>{item.Client_Postal_Code}</TableCell>
                  <TableCell>{item.GstNumber}</TableCell>
                  <TableCell>{item.Client_Status}</TableCell>
                  <TableCell>
                    <Link to={`/client-info/${item.Client_Id}`}>View</Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <Empty />
                </TableCell>
              </TableRow>
            )}
          </TableBody> */}
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default ProjectTime;
