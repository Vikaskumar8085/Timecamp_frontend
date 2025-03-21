import React, {useEffect, useState} from "react";
import {fetchinactiveclientapicall} from "../../../ApiServices/AdminApiServices/Client";
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
  TextField,
  TablePagination,
  CircularProgress,
  Box,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import VisibilityIcon from "@mui/icons-material/Visibility";

import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import Empty from "../../../common/EmptyFolder/Empty";
import {Link} from "react-router-dom";

const Deactiveclient = () => {
  const [isInactiveclientdata, setIsinactiveclientdata] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalClients, setTotalClients] = useState(0);

  const getinactiveclient = async () => {
    setLoading(true);
    try {
      const response = await fetchinactiveclientapicall({
        params: {
          search,
          page: page + 1, // Backend expects 1-based index
          limit: rowsPerPage,
        },
      });
      if (response.success) {
        setIsinactiveclientdata(response.result);
        setTotalClients(response.totalRecords);
      }
    } catch (error) {
      console.error("Error fetching inactive clients:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0); // Reset pagination when searching
  };

  useEffect(() => {
    getinactiveclient();
  }, [search, page, rowsPerPage]);

  return (
    <Layout>
      <BreadCrumb pageName="Inactive Clients" />
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

      <TextField
        label="Search Clients"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearchChange}
        sx={{mb: 2}}
      />

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : viewMode === "table" ? (
        <TableContainer component={Paper}>
          <Table aria-label="client table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Postal Code</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isInactiveclientdata.length > 0 ? (
                isInactiveclientdata.map((item, index) => (
                  <TableRow key={item.Client_Id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.Company_Name}</TableCell>
                    <TableCell>{item.Client_Name}</TableCell>
                    <TableCell>{item.Client_Email}</TableCell>
                    <TableCell>{item.Client_Phone}</TableCell>
                    <TableCell>{item.Client_Address}</TableCell>
                    <TableCell>{item.Client_Postal_Code}</TableCell>
                    <TableCell>
                      <Chip
                        label={item.Client_Status}
                        color={
                          item.Client_Status === "Active"
                            ? "success"
                            : item.Client_Status === "InActive"
                            ? "warning"
                            : "error"
                        }
                      />
                    </TableCell>
                    <Link
                      style={{textDecoration: "none"}}
                      to={`/client-info/${item.Client_Id}`}
                    >
                      <VisibilityIcon />
                    </Link>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <Empty />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Grid container spacing={2} sx={{p: 2}}>
          {isInactiveclientdata.length > 0 ? (
            isInactiveclientdata.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.Client_Id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.Company_Name}</Typography>
                    <Typography>Name: {item.Client_Name}</Typography>
                    <Typography>Email: {item.Client_Email}</Typography>
                    <Typography>Phone: {item.Client_Phone}</Typography>
                    <Typography>Address: {item.Client_Address}</Typography>
                    <Typography>
                      Postal Code: {item.Client_Postal_Code}
                    </Typography>
                    <Typography>
                      Status:{" "}
                      <Chip
                        label={item.Client_Status}
                        color={
                          item.Client_Status === "Active"
                            ? "success"
                            : item.Client_Status === "InActive"
                            ? "warning"
                            : "error"
                        }
                      />
                    </Typography>
                    <Link to={`/client-info/${item.Client_Id}`}>
                      View Details
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} display="flex" justifyContent="center">
              <Empty />
            </Grid>
          )}
        </Grid>
      )}

      <TablePagination
        component="div"
        count={totalClients}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) =>
          setRowsPerPage(parseInt(event.target.value, 10))
        }
      />
    </Layout>
  );
};

export default Deactiveclient;
