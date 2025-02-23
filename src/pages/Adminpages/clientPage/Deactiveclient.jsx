import React, { useEffect, useState } from "react";
import { fetchinactiveclientapicall } from "../../../ApiServices/AdminApiServices/Client";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import GridViewIcon from "@mui/icons-material/GridView";
import TableViewIcon from "@mui/icons-material/TableView";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import Empty from "../../../common/EmptyFolder/Empty";
import { Link } from "react-router-dom";

const Deactiveclient = () => {
  const [isInactiveclientdata, setIsinactiveclientdata] = useState([]);
  const [viewMode, setViewMode] = useState("table");

  const getinactiveclient = async () => {
    try {
      const response = await fetchinactiveclientapicall();
      console.log(response);
      if (response.success) {
        setIsinactiveclientdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getinactiveclient();
  }, [0]);

  return (
    <Layout>
      <BreadCrumb pageName="InActive Client" />
      <div>
        <HeaderTab>
          <Button
            onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
            sx={{
              background: "#2c3e50",
              padding: "8px 10px",
              margin: "0px 10px",
              color: "white",
            }}
          >
            {viewMode === "table" ? <GridViewIcon /> : <TableViewIcon />}
          </Button>
        </HeaderTab>

        {viewMode === "table" ? (
          <Grid container spacing={2}>
            <Grid size={{ sm: 12 }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="client table">
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
                  <TableBody>
                    {isInactiveclientdata.length > 0 ? (
                      isInactiveclientdata.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.Company_Name}</TableCell>
                          <TableCell>{item.Client_Name}</TableCell>
                          <TableCell>{item.Client_Email}</TableCell>
                          <TableCell>{item.Client_Phone}</TableCell>
                          <TableCell>{item.Client_Address}</TableCell>
                          <TableCell>{item.Client_Postal_Code}</TableCell>
                          <TableCell>{item.GstNumber}</TableCell>
                          <TableCell>{item.Client_Status}</TableCell>
                          <TableCell>
                            <Link to={`/client-info/${item.Client_Id}`}>
                              View
                            </Link>
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
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {isInactiveclientdata.length > 0 ? (
              isInactiveclientdata.map((item, index) => (
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{item.Company_Name}</Typography>
                      <Typography>Name: {item.Client_Name}</Typography>
                      <Typography>Email: {item.Client_Email}</Typography>
                      <Typography>Phone: {item.Client_Phone}</Typography>
                      <Typography>Address: {item.Address}</Typography>
                      <Typography>
                        Postal Code: {item.Client_Postal_Code}
                      </Typography>
                      <Typography>Gst Number: {item.GstNumber}</Typography>
                      <Typography>Status: {item.Client_Status}</Typography>
                      <Link to={`/client-info/${item.Client_Id}`}>
                        View Details
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid size={{ sm: 12 }} display="flex" justifyContent="center">
                <Empty />
              </Grid>
            )}
          </Grid>
        )}
      </div>
    </Layout>
  );
};

export default Deactiveclient;
