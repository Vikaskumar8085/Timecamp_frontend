import React, {useState} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import {
  Button,
  Drawer,
  Grid2,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import UploadTimesheet from "../../../Component/AdminComponents/Timesheet/UploadTimesheet";
import {useSelector} from "react-redux";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const Timesheet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Layout>
      <BreadCrumb pageName="TimeSheet" />
      <div>
        <Button
          startIcon={<FileUploadIcon />}
          onClick={() => setIsModalOpen(true)}
          sx={{
            background: "#2c3e50",
            padding: "10px 15px",
            margin: "10px 0px",
            color: "white",
          }}
        >
          Upload Timesheet
        </Button>
        {isModalOpen ? (
          <Drawer
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            anchor="right"
          >
            <UploadTimesheet />
          </Drawer>
        ) : null}
      </div>

      <Grid2 container spacing={2}>
        <Grid2 item sm={12} md={3} lg={3}>
          1
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

export default Timesheet;
